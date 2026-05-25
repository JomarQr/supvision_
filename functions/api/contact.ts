interface Env {
  SENDGRID_API_KEY: string
  TURNSTILE_SECRET_KEY?: string
  ALLOWED_ORIGINS?: string
}

interface RequestBody {
  name?: unknown
  email?: unknown
  message?: unknown
  website?: unknown
  formStartedAt?: unknown
  turnstileToken?: unknown
}

const MIN_FORM_FILL_MS = 1_500
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000
const DEFAULT_ALLOWED_ORIGINS = [
  'https://supvision.ai',
  'https://www.supvision.ai',
  'https://supvi.pages.dev',
]

function sanitize(str: string): string {
  return str.replace(/[\r\n]/g, ' ').trim()
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255
}

function normalizeOrigin(origin: string): string | undefined {
  try {
    const { protocol, host } = new URL(origin)
    if (!['http:', 'https:'].includes(protocol)) return undefined
    return `${protocol}//${host}`.toLowerCase()
  } catch {
    return undefined
  }
}

function isLocalOrigin(origin: string): boolean {
  try {
    const { hostname, protocol } = new URL(origin)
    return ['http:', 'https:'].includes(protocol) && ['localhost', '127.0.0.1', '[::1]'].includes(hostname)
  } catch {
    return false
  }
}

function isAllowedOrigin(origin: string, env: Env): boolean {
  const normalized = normalizeOrigin(origin)
  if (!normalized) return false
  if (isLocalOrigin(origin)) return true

  const extra = (env.ALLOWED_ORIGINS ?? '').split(',').map(o => normalizeOrigin(o.trim())).filter(Boolean) as string[]
  const allowed = new Set([...DEFAULT_ALLOWED_ORIGINS.map(o => normalizeOrigin(o)).filter(Boolean) as string[], ...extra])
  return allowed.has(normalized)
}

async function verifyTurnstile(token: string, ip: string, secretKey: string): Promise<boolean> {
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret: secretKey, response: token, remoteip: ip }),
  })
  if (!res.ok) return false
  const data = (await res.json()) as { success: boolean; action?: string }
  return data.success
}

export const onRequestPost: (ctx: { request: Request; env: Env }) => Promise<Response> = async ({ request, env }) => {
  const origin = request.headers.get('Origin') ?? ''
  const referrer = request.headers.get('Referer') ?? ''

  const corsHeaders: Record<string, string> = {
    'Vary': 'Origin',
    'X-Content-Type-Options': 'nosniff',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  const originOk = origin ? isAllowedOrigin(origin, env) : (referrer ? isAllowedOrigin(new URL(referrer).origin, env) : false)

  if (!originOk) {
    return new Response(JSON.stringify({ error: 'Forbidden origin' }), { status: 403, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
  }

  corsHeaders['Access-Control-Allow-Origin'] = origin || '*'

  if (!env.SENDGRID_API_KEY) {
    return new Response(JSON.stringify({ error: 'Server misconfiguration' }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
  }

  let body: RequestBody
  try {
    body = (await request.json()) as RequestBody
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
  }

  const { name, email, message, website, formStartedAt, turnstileToken } = body

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
  }
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return new Response(JSON.stringify({ error: 'Invalid input types' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
  }
  if (typeof website === 'string' && website.trim() !== '') {
    return new Response(JSON.stringify({ error: 'Spam detected' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
  }

  const submittedAt = typeof formStartedAt === 'number' ? formStartedAt : 0
  const formAge = Date.now() - submittedAt
  if (!Number.isFinite(submittedAt) || submittedAt <= 0 || formAge < MIN_FORM_FILL_MS || formAge > MAX_FORM_AGE_MS) {
    return new Response(JSON.stringify({ error: 'Invalid form session' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
  }

  if (name.length > 100 || message.length > 5000 || !isValidEmail(email)) {
    return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
  }

  const safeName = sanitize(name)
  const safeEmail = sanitize(email)
  const safeMessage = sanitize(message)

  if (env.TURNSTILE_SECRET_KEY && typeof turnstileToken === 'string' && turnstileToken) {
    const ip = request.headers.get('CF-Connecting-IP') ?? ''
    const valid = await verifyTurnstile(turnstileToken, ip, env.TURNSTILE_SECRET_KEY)
    if (!valid) {
      return new Response(JSON.stringify({ error: 'CAPTCHA verification failed' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
    }
  }

  const sgRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: 'info@supvision.ai' }] }],
      from: { name: 'supVision Contact', email: 'info@supvision.ai' },
      subject: `New message from ${safeName}`,
      content: [{ type: 'text/plain', value: `Name: ${safeName}\nEmail: ${safeEmail}\n\nMessage:\n${safeMessage}` }],
    }),
  })

  if (!sgRes.ok) {
    const errText = await sgRes.text().catch(() => '')
    console.error(`SendGrid error ${sgRes.status}: ${errText}`)
    return new Response(JSON.stringify({ error: 'Failed to send message' }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
}

export const onRequestOptions: (ctx: { request: Request; env: Env }) => Response = ({ request, env }) => {
  const origin = request.headers.get('Origin') ?? ''
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': isAllowedOrigin(origin, env) ? origin : '',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    },
  })
}
