export type ContactFormPayload = {
  name: string;
  email: string;
  message: string;
  website?: string;
  formStartedAt: number;
  turnstileToken?: string;
};

export type ContactFormResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitContactForm(
  payload: ContactFormPayload,
): Promise<ContactFormResult> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        website: '',
        turnstileToken: '',
        ...payload,
      }),
    });

    const data = (await res.json().catch(() => ({}))) as { error?: string };

    if (res.ok) {
      return { ok: true };
    }

    return {
      ok: false,
      error: data.error ?? 'Something went wrong. Please try again.',
    };
  } catch {
    return { ok: false, error: 'Network error. Please try again.' };
  }
}
