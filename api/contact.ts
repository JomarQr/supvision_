import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import sgMail from '@sendgrid/mail';

const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_MAX = 5; // max 5 requests per IP per minute
const EMAIL_RATE_MAX = 3; // max 3 requests per email per minute
const MIN_FORM_FILL_MS = 1_500;
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000;
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const TURNSTILE_ACTION = 'contact_form';
const DEFAULT_ALLOWED_ORIGINS = ['https://supvision.ai', 'https://www.supvision.ai'];

type TurnstileVerificationResponse = {
  success: boolean;
  action?: string;
  hostname?: string;
  'error-codes'?: string[];
};

type SendGridErrorShape = {
  code?: number | string;
  response?: {
    statusCode?: number;
    body?: {
      errors?: Array<{ message?: string }>;
    };
  };
};

declare global {
  // Reuse clients across serverless invocations within the same runtime.
  var __contactRedis: Redis | undefined;
  var __contactIpLimiter: Ratelimit | undefined;
  var __contactEmailLimiter: Ratelimit | undefined;
}

function getIp(req: VercelRequest): string {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

function getConfiguredAllowedOrigins(): Set<string> {
  const configured = (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((value) => normalizeOrigin(value))
    .filter((value): value is string => Boolean(value));

  const vercelOrigins = [
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_URL,
  ]
    .filter(Boolean)
    .map((host) => normalizeOrigin(`https://${host}`))
    .filter((value): value is string => Boolean(value));

  return new Set([...DEFAULT_ALLOWED_ORIGINS, ...configured, ...vercelOrigins]);
}

function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }

  globalThis.__contactRedis ??= Redis.fromEnv();
  return globalThis.__contactRedis;
}

function getIpRateLimiter(): Ratelimit | null {
  const redis = getRedis();
  if (!redis) return null;

  globalThis.__contactIpLimiter ??= new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(RATE_MAX, `${RATE_WINDOW_MS / 1000} s`),
    prefix: 'contact-form:ip',
    analytics: true,
  });

  return globalThis.__contactIpLimiter;
}

function getEmailRateLimiter(): Ratelimit | null {
  const redis = getRedis();
  if (!redis) return null;

  globalThis.__contactEmailLimiter ??= new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(EMAIL_RATE_MAX, `${RATE_WINDOW_MS / 1000} s`),
    prefix: 'contact-form:email',
    analytics: true,
  });

  return globalThis.__contactEmailLimiter;
}

async function isRateLimited(ip: string): Promise<boolean> {
  const limiter = getIpRateLimiter();
  if (!limiter) return false;

  const result = await limiter.limit(ip);
  return !result.success;
}

async function isEmailRateLimited(email: string): Promise<boolean> {
  const limiter = getEmailRateLimiter();
  if (!limiter) return false;

  const result = await limiter.limit(email.toLowerCase());
  return !result.success;
}

function sanitize(str: string): string {
  return str.replace(/[\r\n]/g, ' ').trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

function normalizeOrigin(origin: string): string | undefined {
  try {
    const { protocol, host } = new URL(origin);
    if (!['http:', 'https:'].includes(protocol)) return undefined;
    return `${protocol}//${host}`.toLowerCase();
  } catch {
    return undefined;
  }
}

function isLocalOrigin(origin: string): boolean {
  try {
    const { hostname, protocol } = new URL(origin);
    return ['http:', 'https:'].includes(protocol)
      && ['localhost', '127.0.0.1', '[::1]'].includes(hostname);
  } catch {
    return false;
  }
}

function isAllowedOrigin(origin: string | undefined): origin is string {
  if (!origin) return false;

  const normalizedOrigin = normalizeOrigin(origin);
  if (!normalizedOrigin) return false;

  return getConfiguredAllowedOrigins().has(normalizedOrigin) || isLocalOrigin(normalizedOrigin);
}

function getReferrerOrigin(referrer: string | undefined): string | undefined {
  if (!referrer) return undefined;

  try {
    return normalizeOrigin(new URL(referrer).origin);
  } catch {
    return undefined;
  }
}

function hasValidRequestOrigin(origin: string | undefined, referrer: string | undefined): origin is string {
  const referrerOrigin = getReferrerOrigin(referrer);

  if (!origin && !referrerOrigin) return false;
  if (origin && !isAllowedOrigin(origin)) return false;
  if (referrerOrigin && !isAllowedOrigin(referrerOrigin)) return false;
  if (origin && referrerOrigin && normalizeOrigin(origin) !== referrerOrigin) return false;

  return Boolean(origin && isAllowedOrigin(origin));
}

function getSendGridErrorSummary(err: unknown): string {
  const sendGridError = err as SendGridErrorShape | undefined;
  const statusCode = sendGridError?.response?.statusCode ?? sendGridError?.code ?? 'unknown';
  const providerMessage = sendGridError?.response?.body?.errors?.[0]?.message;
  const fallbackMessage = err instanceof Error ? err.message : 'provider_error';
  const message = sanitize(providerMessage ?? fallbackMessage).slice(0, 160) || 'provider_error';

  return `status=${statusCode} message=${message}`;
}

async function verifyTurnstileToken(token: string, ip: string): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    return true;
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: ip,
    }),
  });

  if (!response.ok) {
    return false;
  }

  const data = (await response.json()) as TurnstileVerificationResponse;
  return data.success && (!data.action || data.action === TURNSTILE_ACTION);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = typeof req.headers.origin === 'string' ? req.headers.origin : undefined;
  const referrer = typeof req.headers.referer === 'string' ? req.headers.referer : undefined;
  const originAllowed = hasValidRequestOrigin(origin, referrer);

  res.setHeader('Vary', 'Origin');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (originAllowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (!originAllowed) {
    return res.status(403).json({ error: 'Forbidden origin' });
  }

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!req.headers['content-type']?.includes('application/json')) {
    return res.status(415).json({ error: 'Unsupported content type' });
  }

  // Rate limiting
  const ip = getIp(req);
  try {
    if (await isRateLimited(ip)) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }
  } catch (error) {
    console.warn('Rate limiter unavailable, skipping:', error instanceof Error ? error.message : 'unknown');
  }

  // Check API key is configured
  if (!process.env.SENDGRID_API_KEY) {
    console.error('Contact form unavailable: missing email provider configuration');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  const { name, email, message, website, formStartedAt, turnstileToken } = req.body ?? {};

  // Server-side validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    (website !== undefined && typeof website !== 'string') ||
    (formStartedAt !== undefined && typeof formStartedAt !== 'number') ||
    (turnstileToken !== undefined && typeof turnstileToken !== 'string')
  ) {
    return res.status(400).json({ error: 'Invalid input types' });
  }

  if (website && website.trim() !== '') {
    return res.status(400).json({ error: 'Spam detected' });
  }

  const submittedAt = typeof formStartedAt === 'number' ? formStartedAt : 0;
  const formAge = Date.now() - submittedAt;
  if (
    !Number.isFinite(submittedAt) ||
    submittedAt <= 0 ||
    formAge < MIN_FORM_FILL_MS ||
    formAge > MAX_FORM_AGE_MS
  ) {
    return res.status(400).json({ error: 'Invalid form session' });
  }

  if (name.length > 100) {
    return res.status(400).json({ error: 'Name too long' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }
  if (message.length > 5000) {
    return res.status(400).json({ error: 'Message too long' });
  }

  // Sanitize inputs
  const safeName    = sanitize(name);
  const safeEmail   = sanitize(email);
  const safeMessage = sanitize(message);

  if (!safeName || !safeEmail || !safeMessage) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    if (await isEmailRateLimited(safeEmail)) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }
  } catch (error) {
    console.warn('Email rate limiter unavailable, skipping:', error instanceof Error ? error.message : 'unknown');
  }

  try {
    const captchaValid = await verifyTurnstileToken(turnstileToken ?? '', ip);
    if (!captchaValid) {
      return res.status(400).json({ error: 'CAPTCHA verification failed' });
    }
  } catch (error) {
    console.warn('Turnstile unavailable, skipping:', error instanceof Error ? error.message : 'unknown');
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    await sgMail.send({
      to: ['info@supvision.ai'],
      from: { name: 'supVision Contact', email: 'info@supvision.ai' },

      subject: `New message from ${safeName}`,
      text: `Name: ${safeName}\nEmail: ${safeEmail}\n\nMessage:\n${safeMessage}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(`SendGrid error: ${getSendGridErrorSummary(err)}`);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
