import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react'
import PageMeta from '../components/PageMeta'
import locationAnim from '../assets/about-anim/system-regular-89-location-hover-spin.json'
import mailAnim from '../assets/about-anim/system-regular-191-mail-envelope-close-hover-mail-closed.json'
import phoneAnim from '../assets/about-anim/system-regular-47-chat-hover-chat.json'
import transparencyAnim from '../assets/values-anim/doodle-black-308-avatar-search-hover-pinch.json'
import flexibilityAnim from '../assets/values-anim/doodle-black-185-settings-sliders-hover-pinch.json'
import innovationAnim from '../assets/values-anim/doodle-black-296-bulb-hover-pinch.json'

const timeline = [
  {
    year: '2013',
    title: 'A decade inside fintech',
    desc: 'We started as a Payment Orchestrator — inside financial services, running operations teams, building compliance processes, and sitting on both sides of customer support across payments, neobanking, and lending.',
    img: '/photo_about_us/A decade inside fintech.webp',
  },
  {
    year: '2017',
    title: 'The support problem becomes personal',
    desc: 'Scaling a fintech operation meant one constant: the support queue never shrank. Every new product, every new market, every new regulation brought a new wave of tickets. We hired, trained, hired again.',
    img: '/photo_about_us/The support problem becomes personal.webp',
  },
  {
    year: '2020',
    title: 'The rotation problem',
    desc: 'Agent turnover in fintech support is brutal. You train someone for 8 weeks, they handle live verification and dispute queries for 6 months, then they leave. The knowledge walks out with them. You start again.',
    img: '/photo_about_us/The rotation problem.webp',
  },
  {
    year: '2022',
    title: 'We looked for a solution. It did not exist.',
    desc: 'Generic helpdesk AI was built for SaaS. It could not handle verification rejection queries, it did not know what a chargeback workflow looked like, and it had no concept of FCA or PSD2 compliance. We kept patching a broken system.',
    img: '/photo_about_us/We looked for a solution. It did not exist..webp',
  },
  {
    year: '2026',
    title: 'We built what we needed',
    desc: 'supVision was built by fintech operators for fintech operators. Not a chatbot with a compliance badge - a purpose-built AI support layer that understands regulated financial services from the inside.',
    img: '/photo_about_us/We built what we needed.webp',
  },
]


const values = [
  {
    title: 'Transparency',
    desc: 'Transparency creates alignment and trust. We share context, communicate decisions clearly, and speak openly about both challenges and progress. Nothing important is hidden or softened. Open dialogue, questions, and honest feedback help everyone understand not only actions, but intent.',
    img: '/photo_values/2I5A9579 (1).webp',
    anim: transparencyAnim,
  },
  {
    title: 'Flexibility',
    desc: 'Adapting quickly to change matters. We work without rigid templates, adjust approaches as reality shifts, and respect individual circumstances. Experimentation is encouraged, as well as rethinking plans when it leads to a better outcome - for the team, customers, and the business.',
    img: '/photo_values/2I5A9736.webp',
    anim: flexibilityAnim,
  },
  {
    title: 'Innovation',
    desc: 'A way of thinking that shapes how we work. We question how things are done, seek simpler and more effective solutions, and stay open to new approaches. Ideas are tested in real work, while curiosity and the courage to think differently drive improvements in processes and products.',
    img: '/photo_values/2I5A9802 (1).webp',
    anim: innovationAnim,
  },
]

function ValueRow({ v, i }: { v: typeof values[number]; i: number }) {
  const [hovered, setHovered] = useState(false)
  const lottieRef = useRef<any>(null)

  const handleEnter = () => {
    setHovered(true)
    lottieRef.current?.goToAndPlay(0, true)
  }
  const handleLeave = () => {
    setHovered(false)
    lottieRef.current?.goToAndStop(0, true)
  }

  return (
    <div
      key={v.title}
      data-reveal
      className={`flex flex-col gap-8 lg:items-start lg:gap-14 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="mb-4">
          <Lottie lottieRef={lottieRef} animationData={v.anim} autoplay={false} loop={false} style={{ width: 96, height: 96 }} />
        </div>
        <h3 className="text-[2rem] leading-tight text-gray-900 sm:text-[2.5rem]" style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}>{v.title}</h3>
        <p className="mt-4 text-base leading-relaxed text-gray-500">{v.desc}</p>
      </div>
      {/* Image */}
      <div className="w-full lg:w-[40%] flex-shrink-0">
        <img src={v.img} alt={v.title} className="w-full rounded-2xl object-cover" style={{ height: '320px', objectPosition: 'center' }} loading="lazy" />
      </div>
    </div>
  )
}

export default function About() {
  const storyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dotFillRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineFillRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = storyRef.current
    const track = trackRef.current
    if (!section || !track) return

    const updateHeight = () => {
      const extra = Math.max(0, track.scrollWidth - window.innerWidth)
      // section height drives how long the sticky panel is pinned; sticky element is calc(100vh-5rem)
      section.style.height = `calc(100vh - 5rem + ${extra * 0.65}px)`
    }

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const navH = 80 // px — fixed navbar height
      // section sticks when its top hits navH; scrollable distance = total height minus viewport minus navH
      const scrollable = section.offsetHeight - (window.innerHeight - navH)
      if (scrollable <= 0) return
      // progress: 0 when section top is at navH, 1 when fully scrolled
      const progress = Math.min(1, Math.max(0, -(rect.top - navH) / scrollable))
      const maxX = track.scrollWidth - window.innerWidth
      track.style.transform = `translateX(-${progress * maxX}px)`

      const seg = progress * (timeline.length - 1)
      dotFillRefs.current.forEach((el, i) => {
        if (!el) return
        // fill goes 0→1 as the card travels from off-screen to centered (seg i-1 → i)
        const fill = Math.min(1, Math.max(0, seg - i + 1))
        el.style.transform = `scale(${fill})`
      })
      lineFillRefs.current.forEach((el, i) => {
        if (!el) return
        const fill = Math.min(1, Math.max(0, seg - i))
        el.style.width = `${fill * 100}%`
      })
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('resize', updateHeight)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="pt-0">
      <PageMeta
        title="About supVision — Built by Fintech Operators"
        description="15+ years inside fintech operations. We built supVision because we lived the problem firsthand. Meet the team behind autonomous fintech support."
        path="/about"
      />

      {/* Hero */}
      <section className="px-4 pt-10 pb-8 sm:px-6 lg:px-8 lg:pt-12">
        <div data-reveal className="mx-auto max-w-3xl px-6 text-center">
          <h1
            className="whitespace-nowrap text-center text-[2rem] leading-tight sm:text-[3.25rem] lg:text-6xl"
            style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300, color: '#111827' }}
          >
            What is supVision?
          </h1>
          <p className="mt-6 text-base leading-relaxed text-gray-600 mx-auto max-w-2xl">
            supVision is a purpose-built AI support layer for fintech - not a generic helpdesk tool with a compliance badge. It handles KYC queries, disputes, and payment failures, enforces your policy on every interaction, logs everything for audit, goes live in 3 days, and scales across markets without adding headcount. Built by operators who spent a decade living the problem.
          </p>
        </div>

      </section>

      {/* Team photo */}
      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <img loading="lazy"
            src="/2I5A9685.webp"
            alt="supVision team"
            className="w-full rounded-2xl object-cover"
            style={{ aspectRatio: '16/9', objectPosition: 'center' }}
          />
          <div className="mt-6 flex justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: '#101827' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F97316' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#101827' }}
            >
              <span>Get a consultation</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-white">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Story - horizontal pin scroll */}
      <div ref={storyRef} className="relative">
        <div className="sticky top-20 overflow-hidden" style={{ backgroundColor: '#faf8f5', height: 'calc(100vh - 5rem)' }}>
          {/* Header - centered */}
          <div className="pt-16 pb-10 text-center">
            <p className="mt-1 text-base text-gray-500">Fifteen years in fintech before we wrote a line of supVision code.</p>
          </div>

          {/* Horizontal track - first card starts at screen center */}
          <div
            ref={trackRef}
            className="flex gap-6 will-change-transform"
            style={{
              width: 'max-content',
              paddingLeft: 'calc(50vw - min(calc((100vw - 3rem) / 2), 200px))',
              paddingRight: 'calc(50vw - min(calc((100vw - 3rem) / 2), 200px))',
              paddingBottom: '40px',
            }}
          >
            {timeline.map((item, i) => (
              <div key={item.year} className="flex w-[min(100vw-3rem,400px)] flex-shrink-0 flex-col items-center sm:w-[400px]">
                {/* Card — fixed height so all dots stay at the same Y */}
                <div
                  className="flex h-[420px] w-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white text-center shadow-md"
                >
                  <img src={item.img} alt={item.title} className="h-[190px] w-full object-cover flex-shrink-0" loading="lazy" />
                  <div className="flex flex-1 flex-col items-center justify-center p-6">
                    <h3
                      className="text-xl leading-tight text-gray-900 sm:text-2xl"
                      style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500">{item.desc}</p>
                  </div>
                </div>

                {/* Dot row — centered in column */}
                <div className="relative mt-8 flex w-full justify-center" style={{ height: '40px' }}>
                  {i < timeline.length - 1 && (
                    <div
                      className="absolute rounded-full bg-gray-200"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 'calc(100% + 1.5rem)',
                        height: '4px',
                        zIndex: 0,
                      }}
                    >
                      <div
                        ref={el => { lineFillRefs.current[i] = el }}
                        className="absolute left-0 top-0 h-full rounded-full"
                        style={{ width: '0%', backgroundColor: '#214995' }}
                      />
                    </div>
                  )}

                  <div
                    className="relative z-[1] flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 bg-white"
                    style={{ borderColor: '#214995' }}
                  >
                    <div
                      ref={el => { dotFillRefs.current[i] = el }}
                      className="h-full w-full rounded-full"
                      style={{ backgroundColor: '#214995', transform: 'scale(0)', transformOrigin: 'center' }}
                    />
                  </div>
                </div>

                <span className="mt-3 block text-center text-base font-bold text-gray-700">{item.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Values */}
      <section className="pt-8 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl lg:px-6">
          <div data-reveal className="mb-12 text-center">
            <h2
              className="text-[2rem] leading-tight text-gray-900 sm:text-[3.25rem]"
              style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
            >
              The values that drive us
            </h2>
          </div>
          <div className="flex flex-col gap-16">
            {values.map((v, i) => (
              <ValueRow key={v.title} v={v} i={i} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: '#101827' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F97316' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#101827' }}
            >
              <span>Let's chat</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-white">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Our offices */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl lg:px-6">
          <div data-reveal className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
            <div className="w-full overflow-hidden rounded-3xl lg:w-[45%] flex-shrink-0">
              <img src="/map.webp" alt="Tallinn office location" className="h-full w-full object-cover" style={{ aspectRatio: '4/3', minHeight: '260px' }} loading="lazy" />
            </div>

            <div className="flex flex-col justify-center gap-6 rounded-3xl border border-gray-100 bg-white p-8 text-left shadow-sm sm:p-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Headquarter</p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">Tallinn, Estonia</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Our European base where the supVision team builds, ships, and supports fintech teams operating across global markets.
                </p>
              </div>

              <div className="h-px bg-gray-100" />

              {(() => {
                const ContactRow = ({ anim, href, children, isBlock = false }: { anim: object; href?: string; children: React.ReactNode; isBlock?: boolean }) => {
                  const [hovered, setHovered] = useState(false)
                  const lottieRef = useRef<any>(null)
                  useEffect(() => {
                    if (!lottieRef.current) return
                    if (hovered) { lottieRef.current.goToAndPlay(0, true) }
                    else { lottieRef.current.goToAndStop(0, true) }
                  }, [hovered])
                  const icon = (
                    <div
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{ border: '1.5px solid #111827', background: 'transparent' }}
                    >
                      <Lottie lottieRef={lottieRef} animationData={anim} autoplay={false} loop={false} style={{ width: 22, height: 22 }} />
                    </div>
                  )
                  if (isBlock) return (
                    <div className="flex w-full items-start gap-3" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                      <div className="mt-0.5">{icon}</div>
                      {children}
                    </div>
                  )
                  return (
                    <div className="flex items-center gap-3" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                      {icon}
                      {href ? <a href={href} className="text-sm text-gray-700 hover:underline">{children}</a> : children}
                    </div>
                  )
                }
                return (
                  <div className="flex flex-col items-start gap-4">
                    <ContactRow anim={locationAnim} isBlock>
                      <div className="min-w-0 text-left">
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">WILARIUM OÜ</p>
                        <p className="mt-1 break-words text-sm leading-relaxed text-gray-700">
                          Harju maakond, Tallinn, Kesklinna linnaosa, Vesivärava tn 50, 10152
                        </p>
                      </div>
                    </ContactRow>
                    <ContactRow anim={mailAnim} href="mailto:info@supvision.ai">info@supvision.ai</ContactRow>
                    <ContactRow anim={phoneAnim} href="https://t.me/+447737124949">+44 77 3712 4949</ContactRow>
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-8 pb-24 px-4 sm:px-6 lg:px-8">
        <div
          data-reveal
          className="mx-auto max-w-4xl rounded-2xl px-8 py-16 text-center"
          style={{ backgroundImage: 'url(/bg/28ee30bd-2183-47b1-8d31-c83327d52f27.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h2
            className="text-[2rem] leading-tight text-white sm:text-[3.25rem]"
            style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 300 }}
          >
            Ready to stop living the problem?
          </h2>
          <p className="mt-4 text-base text-blue-200">Talk to someone who has been in your position. We'll show you exactly what supVision does for teams like yours.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors"
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F97316'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#111827'; }}
            >
              <span>Book a demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 flex-shrink-0">
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
