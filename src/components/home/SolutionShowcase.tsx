import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import ModelSelectorCard from './ModelSelectorCard'
import {
  DATA_ACCESS_ITEMS,
  MODEL_ANIM_STEPS,
} from './solutionShowcaseData'

type SolutionShowcaseProps = {
  variant: 'mobile' | 'desktop'
  modelAnimIdx: number
}

function PayOnlyHighlight({ size = 'mobile' }: { size?: 'mobile' | 'desktop' }) {
  const textClass = size === 'desktop' ? 'text-4xl' : 'text-[1.75rem]'
  const svgStyle = size === 'desktop'
    ? { width: 'calc(100% + 160px)', height: 'calc(100% + 24px)', left: '-130px', top: '-12px', transform: 'rotate(-3deg)' }
    : { width: 'calc(100% + 100px)', height: 'calc(100% + 24px)', left: '-50px', top: '-12px', transform: 'rotate(-3deg)' }
  return (
    <span className="relative inline-block px-6 py-1">
      <svg
        aria-hidden="true"
        viewBox="-205 -38 410 76"
        className="pointer-events-none absolute"
        style={svgStyle}
      >
        <path
          d="M -187 10 C -191 -22, -122 -34, 4 -32 C 124 -30, 190 -18, 192 7 C 194 30, 122 38, -4 36 C -120 34, -189 26, -187 10 Z"
          fill="none"
          stroke="#FB9A05"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={`relative leading-snug text-gray-900 ${textClass}`} style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
        Pay only for what you need.
      </span>
    </span>
  )
}

function ModelPickerIntro({ size = 'mobile' }: { size?: 'mobile' | 'desktop' }) {
  if (size === 'desktop') {
    return (
      <div className="flex flex-col justify-center">
        <p className="text-5xl leading-snug text-gray-900" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
          Pick any AI for any task.
        </p>
        <PayOnlyHighlight size={size} />
        <p className="mt-4 max-w-md text-base leading-relaxed text-gray-500">
          supVision routes each query to the most cost-efficient model — GPT for speed, Claude for reasoning, Gemini for documents — so you never overpay on tokens.
        </p>
        <div className="mt-6">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
            style={{ backgroundColor: '#214995' }}
          >
            Book a demo
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
              <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div className="text-center">
      <p className="mt-4 text-[1.75rem] leading-snug text-gray-900" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>
        Pick any AI for any task.
      </p>
      <PayOnlyHighlight size={size} />
      <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-gray-500">
        supVision routes each query to the most cost-efficient model — GPT for speed, Claude for reasoning, Gemini for documents — so you never overpay on tokens.
      </p>
    </div>
  )
}

function DataAccessPanel({ tall }: { tall?: boolean }) {
  return (
    <div
      className={`flex w-full flex-col overflow-hidden rounded-2xl pt-6 ${tall ? 'h-[500px]' : 'h-96'}`}
      style={{ background: '#141414' }}
    >
      <div className="mb-4 flex-shrink-0 px-5">
        <span style={{ color: '#f3f4f6', fontWeight: 600, fontSize: '0.9rem', fontFamily: "'Nohemi', sans-serif" }}>
          Choose which data the agent can access
        </span>
      </div>
      <div className={`flex flex-col gap-2.5 ${tall ? 'px-8' : 'px-5'}`}>
        {DATA_ACCESS_ITEMS.map(item => (
          <div
            key={item.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '7px 8px',
              borderRadius: 12,
              background: item.highlight ? 'rgba(251,154,5,0.18)' : '#242424',
              border: item.highlight ? '1px solid rgba(251,154,5,0.5)' : '1px solid rgba(255,255,255,0.1)',
              transform: item.highlight ? 'translateX(40px)' : undefined,
            }}
          >
            <span
              style={{
                color: item.highlight ? '#FB9A05' : '#e5e7eb',
                fontWeight: 600,
                fontSize: '0.88rem',
                fontFamily: "'Nohemi', sans-serif",
              }}
            >
              {item.name}
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 8,
                background: item.allowed ? 'rgba(34,197,94,0.15)' : item.highlight ? 'rgba(251,154,5,0.2)' : 'rgba(239,68,68,0.15)',
                color: item.allowed ? '#22c55e' : item.highlight ? '#FB9A05' : '#ef4444',
                fontSize: '1.2rem',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {item.allowed ? '✓' : '✗'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}


function FeatureBlock({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center lg:items-stretch lg:text-center">
      <h3 className="text-2xl leading-snug text-gray-900 lg:text-[2.1rem]" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 350 }}>
        {title}
      </h3>
      <p className="max-w-xs text-sm leading-relaxed text-gray-500 lg:max-w-none lg:text-base">{description}</p>
      {children}
    </div>
  )
}


export default function SolutionShowcase({ variant, modelAnimIdx }: SolutionShowcaseProps) {
  const step = MODEL_ANIM_STEPS[modelAnimIdx]
  const isDesktop = variant === 'desktop'

  if (isDesktop) {
    return (
      <section className="hidden bg-[#faf8f5] px-6 py-16 lg:block lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <ModelSelectorCard step={step} className="h-[440px]" />
            <ModelPickerIntro size="desktop" />
          </div>

          <div className="mt-20 mx-auto max-w-3xl">
            <FeatureBlock
              title="Data Access Controls"
              description="Control exactly which systems and data fields supVision can access per query type, so sensitive data is never exposed beyond its intended scope."
            >
              <DataAccessPanel tall />
            </FeatureBlock>
          </div>

        </div>
      </section>
    )
  }

  return (
    <>
      <section className="px-4 pb-4 pt-10 lg:hidden">
        <ModelPickerIntro />
        <ModelSelectorCard step={step} className="mt-6 h-[440px]" />
      </section>

      <section className="px-4 py-6 lg:hidden">
        <div className="flex flex-col gap-5">
          <div className="mt-4 flex flex-col items-center gap-3 text-center">
            <FeatureBlock
              title="Data Access Controls"
              description="Control exactly which systems and data fields supVision can access per query type, so sensitive data is never exposed beyond its intended scope."
            >
              <DataAccessPanel />
            </FeatureBlock>
          </div>

        </div>
      </section>
    </>
  )
}
