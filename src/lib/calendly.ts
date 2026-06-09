const CALENDLY_URL = 'https://calendly.com/jevgenij-s-supvision/30min'
let loadPromise: Promise<void> | null = null

function ensureCalendlyLoaded(): Promise<void> {
  if ((window as any).Calendly) return Promise.resolve()
  if (loadPromise) return loadPromise
  loadPromise = new Promise<void>((resolve) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://assets.calendly.com/assets/external/widget.css'
    document.head.appendChild(link)
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.onload = () => resolve()
    document.body.appendChild(script)
  })
  return loadPromise
}

export function openCalendlyPopup() {
  document.body.style.overflow = 'hidden'
  ensureCalendlyLoaded().then(() => {
    const Cal = (window as any).Calendly
    Cal.showPopupWidget(CALENDLY_URL)
    const observer = new MutationObserver(() => {
      if (!document.querySelector('.calendly-overlay')) {
        document.body.style.overflow = ''
        observer.disconnect()
      }
    })
    observer.observe(document.body, { childList: true })
  })
}
