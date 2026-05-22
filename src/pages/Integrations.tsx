import { Link } from 'react-router-dom'
import IntegrationFinder from '../components/ui/IntegrationFinder'

export default function Integrations() {
  return (
    <div className="pt-24" style={{ backgroundColor: '#f5f4f0' }}>


      <IntegrationFinder />

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-4xl rounded-2xl px-8 py-16 text-center"
          style={{ backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h2 className="text-3xl font-bold text-white">Don't see your tool?</h2>
          <p className="mt-4 text-base text-blue-200">
            If it has a REST API, we can connect it. Talk to us and we'll confirm compatibility before you sign anything.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/30 bg-white/10 pl-6 pr-1.5 py-1.5 text-sm font-semibold text-white">
              <span className="absolute right-[6px] top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-white transition-transform duration-500 ease-in-out group-hover:scale-[20]" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-900">Ask about your stack</span>
              <span className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-gray-900">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
