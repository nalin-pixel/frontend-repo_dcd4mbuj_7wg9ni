import { useEffect, useMemo, useState } from 'react'
import {
  Menu,
  X,
  Film,
  Play,
  Star,
  Calendar,
  Clock,
  CheckCircle,
  ChevronRight,
  Camera,
  Code,
  Rocket,
  MonitorPlay,
  Layers,
  MousePointer,
} from 'lucide-react'
import Spline from '@splinetool/react-spline'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const [selectedTime, setSelectedTime] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const month = useMemo(() => {
    const d = new Date(selectedDate)
    d.setDate(1)
    return d
  }, [selectedDate])

  const days = useMemo(() => {
    const start = new Date(month)
    const startWeekday = start.getDay()
    const end = new Date(month.getFullYear(), month.getMonth() + 1, 0)
    const total = end.getDate()
    const leading = Array.from({ length: startWeekday }, () => null)
    const actual = Array.from({ length: total }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))
    return [...leading, ...actual]
  }, [month])

  const timeSlots = [
    '09:00 AM', '10:00 AM', '10:30 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:30 PM', '05:00 PM'
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-orange-600/30 selection:text-white">
      {/* Custom CSS for noise, marquee, pulses */}
      <style>{`
        .noise-overlay { position: fixed; inset: 0; pointer-events: none; mix-blend-mode: soft-light; opacity: .06; background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.8"/></svg>'); background-size: 200px 200px; }
        @keyframes pulseBlob { 0%, 100% { transform: scale(1); opacity: .6 } 50% { transform: scale(1.12); opacity: .9 } }
        .blob { animation: pulseBlob 8s ease-in-out infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 22s linear infinite; }
      `}</style>

      <div className="noise-overlay"></div>

      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-40 ${scrolled ? 'bg-slate-900/70 shadow-lg shadow-black/20' : 'bg-slate-900/40'} backdrop-blur-xl border-b border-white/5 transition-all`}>
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-orange-600 to-orange-400 text-white shadow-inner shadow-black/30">
              <Film className="w-5 h-5" />
            </div>
            <span className="text-white font-black tracking-tighter text-lg">VELOCITY<span className="text-orange-500">.</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="hover:text-white/90 transition">Services</a>
            <a href="#work" className="hover:text-white/90 transition">Work</a>
            <a href="#testimonials" className="hover:text-white/90 transition">Clients</a>
          </div>

          <div className="hidden md:block">
            <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg shadow-orange-600/25 transition">
              <Calendar className="w-4 h-4" /> Book Strategy Call
            </button>
          </div>

          <button className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle Menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/5 bg-slate-900/80 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-2">
              <a href="#services" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/5">Services</a>
              <a href="#work" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/5">Work</a>
              <a href="#testimonials" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/5">Clients</a>
              <button onClick={() => { setModalOpen(true); setMenuOpen(false) }} className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-3 rounded-xl font-semibold shadow-lg shadow-orange-600/25 transition">
                <Calendar className="w-4 h-4" /> Book Strategy Call
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Spline cover */}
      <section className="relative pt-24 overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/BWzdo650n-g-M9RS/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>

        {/* Colored blobs over background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob absolute -top-24 -left-24 w-[40rem] h-[40rem] rounded-full bg-orange-600/25 blur-3xl" />
          <div className="blob absolute -bottom-24 -right-24 w-[42rem] h-[42rem] rounded-full bg-teal-400/20 blur-3xl" />
        </div>

        {/* Overlay gradient not blocking interaction */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/30 to-slate-950"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col items-start gap-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10">
              <span className="inline-flex w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-sm text-white/90">Accepting New Clients</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[0.95]">
              STOP POSTING BORING CONTENT
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl">
              We blend Hollywood‑style video with conversion‑optimized tech and sales funnels. High‑ticket content engineered to attract, engage, and close.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-orange-600/25 transition">
                <Calendar className="w-4 h-4" /> Book Strategy Call
              </button>
              <a href="#work" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
                <Play className="w-4 h-4 text-teal-400" /> View Selected Works
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              {[
                { k: '50M+', v: 'Views' },
                { k: '$12M', v: 'Revenue' },
                { k: '300+', v: 'Campaigns' },
                { k: '6x', v: 'ROAS Avg.' },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">{s.k}</div>
                  <div className="text-xs uppercase tracking-widest text-slate-400">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <section aria-label="tech-marquee" className="relative overflow-hidden border-y border-white/5 bg-slate-900/60">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-slate-950 via-transparent to-slate-950" />
        <div className="flex whitespace-nowrap py-4">
          <div className="marquee-track flex items-center gap-8 min-w-[200%] px-6">
            {Array.from({ length: 2 }).map((_, idx) => (
              <MarqueeRow key={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white">The Stack</h2>
          <p className="text-slate-400 mt-2">End‑to‑end production and growth engineering.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video column */}
          <ServiceCard icon={MonitorPlay} title="Short Form" accent="from-orange-600/80 to-orange-400/80" subtitle="TikTok • Reels • Shorts" desc="Hook‑driven edits built for attention and shares." />
          <ServiceCard icon={Camera} title="Long Form" accent="from-orange-600/80 to-orange-400/80" subtitle="YouTube • Documentary" desc="Narrative structure, color grade, sound design, story." />
          <ServiceCard icon={Layers} title="3D & VFX" accent="from-orange-600/80 to-orange-400/80" subtitle="Blender • Unreal Engine" desc="Simulation, compositing, and product‑level polish." />
        </div>

        {/* Tech column distinct */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <TechCard icon={Code} title="Web Development" pill="Cyber Teal" desc="High‑performance sites in React and Next with analytics, tracking, and lightning‑fast UX." />
          <TechCard icon={Rocket} title="Sales Funnels" pill="Conversion Engine" desc="Landing pages, A/B testing, email automations, and CRO baked into your content system." />
        </div>
      </section>

      {/* Portfolio Bento */}
      <section id="work" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white">Selected Works</h2>
            <p className="text-slate-400 mt-2">Cinematic visuals engineered to convert.</p>
          </div>
          <a href="#" className="hidden sm:inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition">
            See all <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[160px] sm:auto-rows-[200px] gap-4">
          <Bento label="VFX" gradient="from-orange-600/70 via-orange-500/60 to-teal-400/60" />
          <Bento label="Commercial" gradient="from-teal-400/60 to-orange-500/60" wide />
          <Bento label="Web Design" gradient="from-teal-400/60 via-cyan-400/60 to-teal-500/60" />
          <Bento label="Product" gradient="from-orange-500/60 to-orange-400/60" tall />
          <Bento label="Docu" gradient="from-slate-700/60 to-teal-400/60" />
          <Bento label="3D" gradient="from-orange-600/60 to-teal-400/60" wide />
          <Bento label="YouTube" gradient="from-slate-700/60 to-orange-500/60" />
          <Bento label="Brand" gradient="from-teal-400/60 to-orange-500/60" />
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white">What Clients Say</h2>
          <p className="text-slate-400 mt-2">Results that speak for themselves.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Testimonial name="Ari Patel" role="SaaS Founder" quote="We closed $420k from a single campaign. The content looked like a Netflix trailer and our funnel converted at 9%." />
          <Testimonial name="Maya Chen" role="YouTuber (1M subs)" quote="They rebuilt our channel aesthetic and the watch time skyrocketed. Editors who understand storytelling AND growth." />
          <Testimonial name="Brandon Lee" role="DTC Operator" quote="Paid social finally worked. They created a content engine, not just pretty videos. ROAS improved from 1.4x to 5.8x." />
        </div>
      </section>

      {/* CTA Strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-teal-300 text-sm"><CheckCircle className="w-4 h-4" /> Limited Spots Available</div>
            <h3 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-white">Ready to scale with Hollywood‑grade content?</h3>
            <p className="text-slate-400">Book a free audit + growth map. We’ll find your next 10X lever.</p>
          </div>
          <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-orange-600/25 transition">
            <Calendar className="w-4 h-4" /> Book Strategy Call
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-600 to-orange-400 text-white">
              <Film className="w-4 h-4" />
            </div>
            <span className="text-white font-black tracking-tighter">Let's Build Brand</span>
          </div>
          <p className="text-slate-400 text-sm">Video Editing & Tech Growth Agency • All rights reserved</p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <a href="#services" className="hover:text-slate-200">Services</a>
            <a href="#work" className="hover:text-slate-200">Work</a>
            <a href="#testimonials" className="hover:text-slate-200">Clients</a>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setModalOpen(false)}></div>
          <div className="relative w-[92%] sm:w-[680px] rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
            <div className="grid sm:grid-cols-2">
              {/* Left */}
              <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-900 to-slate-800">
                <div className="inline-flex items-center gap-2 text-teal-300 text-sm"><Sparkles className="w-4 h-4" /> Strategy Session</div>
                <h4 className="mt-2 text-xl font-extrabold tracking-tight text-white">Audit + 90‑Day Growth Plan</h4>
                <p className="text-slate-400 mt-2 text-sm leading-relaxed">We’ll analyze your content, funnel, and metrics. You’ll leave with a prioritized roadmap and exact next steps.</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Content & creative audit</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Funnel + CRO recommendations</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Channel + paid distribution plan</li>
                </ul>
                <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
                  <Clock className="w-4 h-4" /> 30–45 minutes via Zoom
                </div>
              </div>

              {/* Right */}
              <div className="p-6 sm:p-8 bg-slate-950">
                <div className="flex items-center justify-between">
                  <div className="text-white font-semibold">Pick a date</div>
                  <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg hover:bg-white/5"><X className="w-4 h-4" /></button>
                </div>

                {/* Calendar Grid */}
                <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs text-slate-400">
                  {['S','M','T','W','T','F','S'].map(d => (<div key={d} className="py-1">{d}</div>))}
                </div>
                <div className="mt-1 grid grid-cols-7 gap-1">
                  {days.map((d, i) => {
                    const isToday = d && sameDay(d, new Date())
                    const isSelected = d && sameDay(d, selectedDate)
                    return (
                      <button key={i} disabled={!d} onClick={() => d && setSelectedDate(d)} className={`h-9 rounded-lg text-sm flex items-center justify-center border ${!d ? 'opacity-0 pointer-events-none' : ''} ${isSelected ? 'bg-orange-600 text-white border-orange-500' : 'bg-white/5 hover:bg-white/10 border-white/10'} ${isToday && !isSelected ? 'ring-1 ring-teal-400/50' : ''}`}>
                        {d ? d.getDate() : ''}
                      </button>
                    )
                  })}
                </div>

                {/* Time Slots */}
                <div className="mt-4">
                  <div className="text-white font-semibold text-sm mb-2">Available times</div>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map(t => (
                      <button key={t} onClick={() => setSelectedTime(t)} className={`px-3 py-2 rounded-lg text-sm border transition ${selectedTime === t ? 'bg-teal-400/20 text-teal-200 border-teal-400/30' : 'bg-white/5 hover:bg-white/10 border-white/10'}`}>
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-teal-300" /> {t}</div>
                      </button>
                    ))}
                  </div>
                  <button className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed" disabled={!selectedTime} onClick={() => { setModalOpen(false); setTimeout(() => alert(`Booked: ${formatDate(selectedDate)} at ${selectedTime}`), 50) }}>
                    <Calendar className="w-4 h-4" /> Confirm Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MarqueeRow() {
  const items = [
    { label: 'Adobe', icon: Film },
    { label: 'Unreal Engine', icon: Layers },
    { label: 'React', icon: Code },
    { label: 'Blender', icon: Camera },
    { label: 'Next.js', icon: Code },
    { label: 'After Effects', icon: Play },
    { label: 'Premiere Pro', icon: Play },
    { label: 'Node', icon: Code },
  ]
  return (
    <>
      {items.map(({ label, icon: Icon }) => (
        <div key={label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-300">
          <Icon className="w-4 h-4 text-teal-300" />
          <span className="font-medium">{label}</span>
        </div>
      ))}
      {/* duplicate to guarantee width if needed */}
      {items.map(({ label, icon: Icon }) => (
        <div key={label + '-d'} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-300">
          <Icon className="w-4 h-4 text-teal-300" />
          <span className="font-medium">{label}</span>
        </div>
      ))}
    </>
  )
}

function ServiceCard({ icon: Icon, title, subtitle, desc, accent }) {
  return (
    <div className="group relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/60 p-6 hover:border-orange-500/40 transition">
      <div className={`absolute -inset-1 opacity-0 group-hover:opacity-20 blur-2xl bg-gradient-to-br ${accent} transition pointer-events-none`}></div>
      <div className="relative flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 border border-white/10 flex items-center justify-center text-teal-300">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <div className="text-white font-extrabold text-xl tracking-tight">{title}</div>
          <div className="text-teal-300 text-sm">{subtitle}</div>
        </div>
      </div>
      <p className="relative mt-4 text-slate-400">{desc}</p>
      <button className="relative mt-6 inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white">
        Learn more <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}

function TechCard({ icon: Icon, title, pill, desc }) {
  return (
    <div className="group relative rounded-3xl overflow-hidden border border-teal-400/20 bg-slate-900/60 p-6 hover:border-teal-400/50 transition">
      <div className="absolute -inset-1 opacity-0 group-hover:opacity-20 blur-2xl bg-gradient-to-br from-teal-400/40 to-cyan-400/40 transition pointer-events-none" />
      <div className="relative flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 border border-white/10 flex items-center justify-center text-teal-300">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <div className="inline-flex items-center gap-2">
            <div className="text-white font-extrabold text-xl tracking-tight">{title}</div>
            <span className="px-2 py-0.5 text-xs rounded-full bg-teal-400/15 border border-teal-400/30 text-teal-200">{pill}</span>
          </div>
          <p className="text-slate-400 mt-2">{desc}</p>
        </div>
      </div>
      <button className="relative mt-6 inline-flex items-center gap-2 text-sm text-teal-300 hover:text-teal-200">
        Explore <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}

function Bento({ label, gradient, wide = false, tall = false }) {
  return (
    <div className={`relative group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 ${wide ? 'col-span-2' : ''} ${tall ? 'row-span-2' : ''}`}>
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient}`}></div>
      <div className="absolute inset-0 bg-slate-950/60"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full bg-white/10 p-4 group-hover:bg-white/20 transition">
          <Play className="w-10 h-10 text-white" />
        </div>
      </div>
      <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md text-xs bg-black/50 border border-white/10 text-white">{label}</div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 ring-1 ring-inset ring-white/20 transition"></div>
    </div>
  )
}

function Testimonial({ name, role, quote }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 hover:border-orange-500/30 transition">
      <div className="flex items-center gap-1 text-amber-300">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-300/70 text-amber-300" />)}
      </div>
      <p className="mt-4 text-slate-300">“{quote}”</p>
      <div className="mt-6 text-sm text-slate-400">{name} • {role}</div>
    </div>
  )
}

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function formatDate(d) {
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export default App
