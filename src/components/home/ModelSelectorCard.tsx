import type { ReactNode } from 'react'
import type { ModelAnimStep } from './solutionShowcaseData'

const PROVIDER_ICONS: Record<string, ReactNode> = {
  openai: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0" fill="currentColor">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.065L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.843-3.369 2.02-1.168a.076.076 0 0 1 .071 0l4.83 2.786a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.402-.676zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  ),
  anthropic: <img src="/antchropic.png" alt="Anthropic" className="h-5 w-5 flex-shrink-0 object-contain" />,
  google: <img src="/google studio.png" alt="Google AI Studio" className="h-5 w-5 flex-shrink-0 object-contain" />,
  perplexity: <img src="/perplexity.png" alt="Perplexity" className="h-5 w-5 flex-shrink-0 object-contain" />,
}

const PROVIDERS = [
  { name: 'OpenAI', ik: 'openai', models: ['GPT-5 mini', 'GPT-5.4', 'GPT-5 Pro ⚡', 'o3 ⚡'] },
  { name: 'Anthropic', ik: 'anthropic', models: ['Claude Opus 4.6', 'Claude Sonnet 4.5', 'Claude Haiku 4.5'] },
  { name: 'Google AI Studio', ik: 'google', models: ['Gemini 2.5 Pro', 'Gemini 2.5 Flash'] },
  { name: 'Perplexity', ik: 'perplexity', models: ['Sonar Pro', 'Sonar'] },
]

export default function ModelSelectorCard({ step, className = '' }: { step: ModelAnimStep; className?: string }) {
  return (
    <div className={`relative rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}>
      <div className="px-4 pb-1 pt-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Model</span>
        <span className="ml-1 text-xs text-red-400">*</span>
      </div>
      <div className="mx-3 mb-3 flex items-center gap-3 rounded-xl px-3 py-2.5" style={{ border: '1.5px solid #214995', background: '#f0f4ff' }}>
        {PROVIDER_ICONS[step.sm.ik]}
        <span className="flex-1 text-sm font-semibold text-gray-900">{step.sm.m}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-gray-400">
          <path fillRule="evenodd" d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="divide-y divide-gray-100 px-3 pb-3">
        {PROVIDERS.map(p => {
          const isOpen = step.ep === p.name
          return (
            <div key={p.name}>
              <div className="flex items-center gap-3 py-3">
                <span className="text-gray-700">{PROVIDER_ICONS[p.ik]}</span>
                <span className="flex-1 text-sm font-medium text-gray-800">{p.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 flex-shrink-0 text-gray-400"
                  style={{ transition: 'transform 0.25s ease', transform: isOpen ? 'rotate(90deg)' : 'none' }}
                >
                  <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </div>
              <div style={{ overflow: 'hidden', maxHeight: isOpen ? '200px' : '0px', transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1)' }}>
                <div className="flex flex-col gap-0.5 pb-2 pl-8">
                  {p.models.map(m => (
                    <div
                      key={m}
                      className="rounded-lg px-3 py-2 text-sm"
                      style={{
                        color: step.hm === m ? '#214995' : step.sm.m === m ? '#214995' : '#374151',
                        fontWeight: step.hm === m || step.sm.m === m ? 600 : 400,
                        background: step.hm === m ? 'rgba(33,73,149,0.1)' : step.sm.m === m ? 'rgba(33,73,149,0.06)' : 'transparent',
                        transition: 'background 0.2s ease',
                      }}
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          left: step.cx,
          top: step.cy,
          transition: 'top 1.1s cubic-bezier(0.4,0,0.2,1), left 1.0s cubic-bezier(0.4,0,0.2,1)',
          transform: 'translate(-4px, -4px)',
          pointerEvents: 'none',
          zIndex: 50,
        }}
      >
        <img
          src="/cursor.png"
          alt=""
          className="object-contain"
          style={{
            width: 28,
            height: 28,
            transition: 'transform 0.2s ease',
            transform: step.hm ? 'scale(0.85)' : 'scale(1)',
          }}
        />
      </div>
    </div>
  )
}
