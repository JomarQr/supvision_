import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import ModelSelectorCard from './ModelSelectorCard'
import {
  DATA_ACCESS_ITEMS,
  LANG_SLOT,
  LANGUAGES,
  LOG_SCENARIOS,
  MODEL_ANIM_STEPS,
} from './solutionShowcaseData'

type LangItem = { id: number; langIdx: number; slot: number }

type SolutionShowcaseProps = {
  variant: 'mobile' | 'desktop'
  modelAnimIdx: number
  logScene: number
  logRevealedSteps: number
  logDecisionShown: boolean
  logFading: boolean
  langItems: LangItem[]
  liftedSlot: number
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
      <span className={`relative leading-snug text-gray-900 ${textClass}`} style={{ fontFamily: "'Canela', serif", fontWeight: 300 }}>
        Pay only for what you need.
      </span>
    </span>
  )
}

function ModelPickerIntro({ size = 'mobile' }: { size?: 'mobile' | 'desktop' }) {
  if (size === 'desktop') {
    return (
      <div className="flex flex-col justify-center">
        <p className="text-5xl leading-snug text-gray-900" style={{ fontFamily: "'Canela', serif", fontWeight: 300 }}>
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
      <p className="mt-4 text-[1.75rem] leading-snug text-gray-900" style={{ fontFamily: "'Canela', serif", fontWeight: 300 }}>
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
      className={`flex w-full flex-col overflow-hidden rounded-2xl pt-6 ${tall ? 'h-[420px]' : 'h-96'}`}
      style={{ background: '#141414' }}
    >
      <div className="mb-4 flex-shrink-0 px-5">
        <span style={{ color: '#f3f4f6', fontWeight: 600, fontSize: '0.9rem', fontFamily: "'Figtree', sans-serif" }}>
          Choose which data the agent can access
        </span>
      </div>
      <div className={`flex flex-col gap-2.5 ${tall ? 'px-8' : 'px-14'}`}>
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
                fontFamily: "'Figtree', sans-serif",
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

function DecisionLogsPanel({
  logScene,
  logRevealedSteps,
  logDecisionShown,
  logFading,
  tall,
}: {
  logScene: number
  logRevealedSteps: number
  logDecisionShown: boolean
  logFading: boolean
  tall?: boolean
}) {
  const scenario = LOG_SCENARIOS[logScene]
  return (
    <div
      className={`flex w-full flex-col rounded-2xl px-6 pb-5 pt-7 ${tall ? 'h-[420px]' : 'h-96'}`}
      style={{ background: '#141414', opacity: logFading ? 0 : 1, transition: 'opacity 0.5s ease' }}
    >
      <div className="mb-5 flex flex-shrink-0 items-center gap-2">
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4b5563', flexShrink: 0, display: 'inline-block' }} />
        <span
          style={{
            color: '#f3f4f6',
            fontWeight: 600,
            fontSize: '1.08rem',
            fontFamily: "'Figtree', sans-serif",
            textAlign: 'left',
            border: '1.5px solid rgba(255,255,255,0.25)',
            borderRadius: 9999,
            padding: '3px 14px',
            background: 'rgba(255,255,255,0.06)',
          }}
        >
          {scenario.query}
        </span>
      </div>
      <div className="flex flex-col gap-2.5 pl-4">
        {scenario.steps.slice(0, logRevealedSteps).map((step, i) => (
          <div key={i} className="flex items-start gap-2.5" style={{ animation: 'log-in 0.35s ease both' }}>
            <span
              style={{
                color: step.type === 'success' ? '#22c55e' : step.type === 'warning' ? '#f59e0b' : '#6b7280',
                fontSize: '0.75rem',
                lineHeight: '1.5rem',
                flexShrink: 0,
                fontWeight: 700,
              }}
            >
              {step.type === 'success' ? '✓' : step.type === 'warning' ? '!' : '→'}
            </span>
            <span
              style={{
                color: step.type === 'info' ? '#9ca3af' : '#e5e7eb',
                fontSize: '0.85rem',
                fontFamily: "'Figtree', sans-serif",
                lineHeight: 1.5,
                textAlign: 'left',
              }}
            >
              {step.text}
            </span>
          </div>
        ))}
      </div>
      {logDecisionShown && (
        <div className="mt-auto flex justify-center pt-4" style={{ animation: 'log-in 0.4s ease both' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '9px 22px',
              borderRadius: 9999,
              background: `${scenario.color}1a`,
              border: `1.5px solid ${scenario.color}`,
              color: scenario.color,
              fontWeight: 700,
              fontSize: '0.88rem',
              fontFamily: "'Figtree', sans-serif",
              letterSpacing: '0.08em',
            }}
          >
            {scenario.decision === 'ESCALATED' ? '⚠' : '✓'}&nbsp;{scenario.decision}
          </div>
        </div>
      )}
    </div>
  )
}

function LanguagesPanel({ langItems, liftedSlot, tall }: { langItems: LangItem[]; liftedSlot: number; tall?: boolean }) {
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl ${tall ? 'h-[420px]' : 'h-96'}`} style={{ background: '#1a1a1a' }}>
      {langItems.map(({ id, langIdx, slot }) => {
        const s = LANG_SLOT[Math.min(Math.max(slot + 1, 0), LANG_SLOT.length - 1)]
        const flagSize = Math.round(s.h * 0.64)
        const fontSize = `${(s.h * 0.54) / 16}rem`
        const lifted = slot === liftedSlot
        return (
          <div
            key={id}
            style={{
              position: 'absolute',
              bottom: s.bottom + (lifted ? 28 : 0),
              left: '50%',
              transform: 'translateX(-50%)',
              width: s.w,
              height: s.h,
              opacity: s.op,
              zIndex: s.zi,
              transition:
                'bottom 0.4s cubic-bezier(0.4,0,0.2,1), width 0.55s cubic-bezier(0.4,0,0.2,1), height 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.55s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 8px',
                height: '100%',
                background: '#1e1e1e',
                borderRadius: 9999,
                border: '3.5px solid #ffffff',
                overflow: 'hidden',
              }}
            >
              <div style={{ width: flagSize, height: flagSize, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: '#333' }}>
                <img
                  src={`https://flagcdn.com/w80/${LANGUAGES[langIdx].code}.png`}
                  alt={LANGUAGES[langIdx].name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  color: 'white',
                  fontSize,
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                }}
              >
                {LANGUAGES[langIdx].name}
              </span>
            </div>
          </div>
        )
      })}
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
      <h3 className="text-2xl leading-snug text-gray-900 lg:text-[1.65rem]" style={{ fontFamily: "'Canela', serif", fontWeight: 350 }}>
        {title}
      </h3>
      <p className="max-w-xs text-sm leading-relaxed text-gray-500 lg:max-w-none">{description}</p>
      {children}
    </div>
  )
}

function NeverSleepsCard({ compact }: { compact?: boolean }) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-4 bg-cover bg-center ${compact ? 'rounded-2xl px-8 py-10' : 'mt-4 rounded-[20px] px-6 py-6'}`}
      style={{
        borderRadius: compact ? undefined : 20,
        backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.png)',
      }}
    >
      <h3
        className={`text-center leading-snug text-white ${compact ? 'text-3xl lg:text-4xl' : 'text-3xl'}`}
        style={{ fontFamily: "'Canela', serif", fontWeight: 300 }}
      >
        Support that never sleeps
      </h3>
      <p className={`text-center leading-relaxed text-white ${compact ? 'max-w-md text-base' : 'text-sm'}`}>
        supVision runs 24/7 — resolving queries on web, mobile, and API while your team sleeps.
      </p>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-gray-900"
        style={{ borderRadius: 9999, backgroundColor: '#E5D9CC' }}
      >
        Book a demo!
      </Link>
    </div>
  )
}

export default function SolutionShowcase({
  variant,
  modelAnimIdx,
  logScene,
  logRevealedSteps,
  logDecisionShown,
  logFading,
  langItems,
  liftedSlot,
}: SolutionShowcaseProps) {
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

          <div className="mt-20 mx-auto max-w-4xl">
            {/* Top row: Data Access left, AI Decision Logs right + lower */}
            <div className="flex items-start gap-8">
              <div style={{ flex: '0 0 48%' }}>
                <FeatureBlock
                  title="Data Access Controls"
                  description="Control exactly which systems and data fields supVision can access per query type, so sensitive data is never exposed beyond its intended scope."
                >
                  <DataAccessPanel tall />
                </FeatureBlock>
              </div>
              <div style={{ flex: '0 0 48%', marginTop: '72px' }}>
                <FeatureBlock
                  title="AI Decision Logs"
                  description="See exactly why supVision chose to resolve or escalate each query, with the full reasoning chain exposed for compliance review or agent training."
                >
                  <DecisionLogsPanel
                    logScene={logScene}
                    logRevealedSteps={logRevealedSteps}
                    logDecisionShown={logDecisionShown}
                    logFading={logFading}
                    tall
                  />
                </FeatureBlock>
              </div>
            </div>
            {/* Bottom: Languages below Data Access, shifted slightly left */}
            <div style={{ maxWidth: '48%', marginTop: '32px', marginLeft: '-24px' }}>
              <FeatureBlock
                title="100+ Languages"
                description="supVision automatically detects your customer's language and responds in kind — whether it's English, Arabic, or Mandarin. No setup, no routing rules, no extra cost."
              >
                <LanguagesPanel langItems={langItems} liftedSlot={liftedSlot} tall />
              </FeatureBlock>
            </div>
          </div>

          <div className="mt-24 flex flex-col items-center gap-6">
            <Link
              to="/support-agent"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
              style={{ backgroundColor: '#214995' }}
            >
              Explore all features
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
            <div className="w-full max-w-2xl">
              <NeverSleepsCard compact />
            </div>
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

          <div className="mt-4 flex flex-col items-center gap-3 text-center">
            <FeatureBlock
              title="AI Decision Logs"
              description="See exactly why supVision chose to resolve or escalate each query, with the full reasoning chain exposed for compliance review or agent training."
            >
              <DecisionLogsPanel
                logScene={logScene}
                logRevealedSteps={logRevealedSteps}
                logDecisionShown={logDecisionShown}
                logFading={logFading}
              />
            </FeatureBlock>
          </div>

          <div className="mt-4 flex flex-col items-center gap-3 text-center">
            <FeatureBlock
              title="100+ Languages"
              description="supVision automatically detects your customer's language and responds in kind — whether it's English, Arabic, or Mandarin. No setup, no routing rules, no extra cost."
            >
              <LanguagesPanel langItems={langItems} liftedSlot={liftedSlot} />
            </FeatureBlock>
            <Link
              to="/support-agent"
              className="mt-1 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: '#214995' }}
            >
              Explore all features
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
            <NeverSleepsCard />
          </div>
        </div>
      </section>
    </>
  )
}
