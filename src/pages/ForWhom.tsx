import { Link } from 'react-router-dom'
import ForWhomCardsSection from '../components/forWhom/ForWhomCardsSection'
import { forWhomIndustries, forWhomRoles } from '../data/forWhom'
import PageMeta from '../components/PageMeta'

const canelaStyle = { fontFamily: "'Nohemi', sans-serif", fontWeight: 300 } as const

export default function ForWhom() {
  return (
    <div className="pt-14 lg:pt-24" style={{ backgroundColor: '#faf8f5' }}>
      <PageMeta
        title="Who supVision is For — Fintech Teams"
        description="Built for fintech support leaders, compliance officers, operations teams, and founders scaling customer support without scaling headcount."
        path="/for-whom"
      />
      <section className="px-4 pb-4 pt-6 text-center sm:px-6 lg:pb-8 lg:pt-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">For whom</p>
          <h1 className="mt-4 text-[1.85rem] leading-tight text-gray-900 sm:text-[2.75rem]" style={canelaStyle}>
            Built for regulated finance teams
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-500">
            Whether you run payments, neobanks, or lending — or you lead support, compliance, or growth — supVision fits your stack and your KPIs.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
              style={{ backgroundColor: '#101827' }}
            >
              <span>Let&apos;s chat</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-white">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <ForWhomCardsSection title="By industry" subtitle="Vertical-specific workflows, integrations, and compliance out of the box." items={forWhomIndustries} />

      <section className="px-4 py-10 sm:px-6" style={{ backgroundColor: '#1A1A1A' }}>
        <ForWhomCardsSection
          title="By role"
          subtitle="Outcomes that matter to the people who own support, risk, and growth."
          items={forWhomRoles}
          darkShell
        />
      </section>

      <section className="px-4 py-16 text-center sm:px-6 lg:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl px-6 py-12 sm:px-10" style={{ backgroundColor: '#1A1A1A' }}>
          <h2 className="text-[1.65rem] leading-snug text-white sm:text-[2rem]" style={canelaStyle}>
            Not sure where you fit?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-gray-400">
            Tell us your stack and ticket mix — we&apos;ll map supVision to your industry and team in one call.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
          >
            Talk to sales
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
