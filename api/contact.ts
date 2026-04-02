import type { VercelRequest, VercelResponse } from '@vercel/node';
import sgMail from '@sendgrid/mail';

// Simple in-memory rate limiter (resets on cold start, good enough for serverless)
const rateLimit = new Map<string, { count: number; ts: number }>();
const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_MAX = 5; // max 5 requests per IP per minute

function getIp(req: VercelRequest): string {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now - entry.ts > RATE_WINDOW_MS) {
    rateLimit.set(ip, { count: 1, ts: now });
    return false;
  }
  entry.count += 1;
  if (entry.count > RATE_MAX) return true;
  return false;
}

function sanitize(str: string): string {
  return str.replace(/[\r\n]/g, ' ').trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS — only allow same origin
  res.setHeader('Access-Control-Allow-Origin', 'https://www.supvision.ai');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limiting
  const ip = getIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  // Check API key is configured
  if (!process.env.SENDGRID_API_KEY) {
    console.error('SENDGRID_API_KEY is not set');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  const { name, email, message } = req.body ?? {};

  // Server-side validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid input types' });
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

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    await sgMail.sendMultiple({
      to: ['info@supvision.ai'],
      from: { name: 'supVision Contact', email: 'info@supvision.ai' },

      subject: `New message from ${safeName}`,
      text: `Name: ${safeName}\nEmail: ${safeEmail}\n\nMessage:\n${safeMessage}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('SendGrid error:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
