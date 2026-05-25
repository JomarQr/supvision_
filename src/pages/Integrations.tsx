import { Link } from 'react-router-dom'
import IntegrationFinder from '../components/ui/IntegrationFinder'

export default function Integrations() {
  return (
    <div className="pt-14 lg:pt-20" style={{ backgroundColor: '#faf8f5' }}>


      <IntegrationFinder />

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-4xl rounded-2xl px-8 py-16 text-center"
          style={{ backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h2
            className="text-[1.75rem] leading-tight text-white sm:text-[3.25rem]"
            style={{ fontFamily: "'Canela', serif", fontWeight: 300 }}
          >
            Don&apos;t see your tool?
          </h2>
          <p className="mt-4 text-base text-blue-200">
            If it has a REST API, we can connect it. Talk to us and we&apos;ll confirm compatibility before you sign anything.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              <span>Ask about your stack</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-white">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
