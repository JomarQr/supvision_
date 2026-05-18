import { Link } from 'react-router-dom'

const timeline = [
  {
    year: '2013',
    title: 'A decade inside fintech',
    desc: 'We started our careers inside financial services — payments, neobanking, lending. We ran operations teams, built compliance processes, and sat on both sides of customer support.',
  },
  {
    year: '2017',
    title: 'The support problem becomes personal',
    desc: 'Scaling a fintech operation meant one constant: the support queue never shrank. Every new product, every new market, every new regulation brought a new wave of tickets. We hired, trained, hired again.',
  },
  {
    year: '2020',
    title: 'The rotation problem',
    desc: 'Agent turnover in fintech support is brutal. You train someone for 8 weeks, they handle live KYC and dispute queries for 6 months, then they leave. The knowledge walks out with them. You start again.',
  },
  {
    year: '2022',
    title: 'We looked for a solution. It did not exist.',
    desc: 'Generic helpdesk AI was built for SaaS. It could not handle KYC rejection queries, it did not know what a chargeback workflow looked like, and it had no concept of FCA or PSD2 compliance. We kept patching a broken system.',
  },
  {
    year: '2023',
    title: 'We built what we needed',
    desc: 'supVision was built by fintech operators for fintech operators. Not a chatbot with a compliance badge — a purpose-built AI support layer that understands regulated financial services from the inside.',
  },
]

const values = [
  {
    title: 'Built by operators, not engineers',
    desc: 'Every feature in supVision was shaped by someone who has managed a fintech support team, handled a regulator audit, or dealt with a volume spike at 2am.',
  },
  {
    title: 'Compliance is not optional',
    desc: 'We come from an industry where a wrong answer to a customer is a regulatory event. That perspective is built into every decision we make.',
  },
  {
    title: 'We measure what matters',
    desc: 'Resolution rate, cost per ticket, escalation rate — not vanity metrics. We care about the numbers that actually tell you whether your support function is working.',
  },
  {
    title: 'We move fast because we have to',
    desc: 'Fintech moves faster than any other industry. Regulations change, products launch, markets open. supVision is built to keep up.',
  },
]

export default function About() {
  return (
    <div className="pt-24">

      {/* Hero */}
      <section className="px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-400" />
              About supVision
            </div>
            <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              We've been on your side of the queue.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-gray-500">
              supVision was built by fintech operators who lived the support problem for a decade before deciding to solve it.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">Our story</p>
            <p className="mt-3 text-base text-gray-500">Ten years in fintech before we wrote a line of supVision code.</p>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[120px] top-0 bottom-0 w-px bg-gray-200 hidden lg:block" />
            <div className="flex flex-col gap-12">
              {timeline.map((item) => (
                <div key={item.year} className="flex gap-12 lg:items-start">
                  <div className="hidden lg:flex w-[120px] flex-shrink-0 items-start justify-end pr-8 pt-1">
                    <span className="text-sm font-black" style={{ color: '#214995' }}>{item.year}</span>
                  </div>
                  <div className="relative flex-1 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                    <div className="lg:hidden mb-3">
                      <span className="text-sm font-black" style={{ color: '#214995' }}>{item.year}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The problem we lived */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-2xl font-bold uppercase text-gray-900">The problem we lived</p>
              <p className="mt-6 text-lg leading-relaxed text-gray-500">
                Fintech support is not like any other support. Your agents need to understand KYC, PSD2, chargeback workflows, AML holds, and the difference between a payment pending and a payment failed — before they can answer a single customer message.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-500">
                Training takes 6 to 8 weeks. Then the agent handles live queries for a few months. Then they leave. You start again.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-500">
                Meanwhile, tickets queue up 24 hours a day because financial services customers do not keep office hours. A payment fails at midnight. A KYC rejection comes in on a Sunday. A withdrawal hold triggers panic at 3am.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-500">
                We managed these queues. We lived the rotation. We tried every generic AI tool on the market. None of them understood what we actually needed.
              </p>
              <p className="mt-4 text-base font-semibold text-gray-900">
                So we built it ourselves.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '10+', label: 'Years inside fintech operations' },
                { value: '24/7', label: 'The reality of fintech customer support' },
                { value: '8 weeks', label: 'Average agent onboarding time we kept repeating' },
                { value: '3 days', label: 'Time to go live with supVision' },
              ].map((m) => (
                <div key={m.label} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <p className="text-3xl font-black" style={{ color: '#214995' }}>{m.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-gray-500">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-2xl font-bold uppercase text-gray-900">What we believe</p>
            <p className="mt-3 text-base text-gray-500">The principles that shaped how we built supVision.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <div key={v.title} className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-10 shadow-sm">
                <span className="text-4xl font-black" style={{ color: '#214995' }}>0{i + 1}</span>
                <h3 className="text-lg font-bold text-gray-900">{v.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-4xl rounded-2xl px-8 py-16 text-center"
          style={{ backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h2 className="text-3xl font-bold text-white">Ready to stop living the problem?</h2>
          <p className="mt-4 text-base text-blue-200">Talk to someone who has been in your position. We'll show you exactly what supVision does for teams like yours.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100">
              Book a demo
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link to="/pricing" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              See pricing
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
