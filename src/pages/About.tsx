import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion"
import { useTheme } from "../components/ThemeProvider.jsx"
import { Eyebrow, Accent, PrimaryButton, DashboardButton, FONT } from "../components/PageKit"
import { useEffect, useRef, useState } from "react"

const capabilities = [
  { title: "AI Engineering", description: "Advanced natural language processing and machine learning models.", tech: ["GPT-4", "Custom NLP", "Voice Recognition"] },
  { title: "Voice Technology", description: "Crystal-clear, human-like voice synthesis and real-time processing.", tech: ["Neural TTS", "Low latency", "Multi-language"] },
  { title: "Integration Expertise", description: "Seamless connection with your existing business systems.", tech: ["CRM", "POS", "Booking systems"] },
  { title: "24/7 Reliability", description: "Enterprise-grade infrastructure with a 99.9% uptime target.", tech: ["Cloud native", "Auto-scaling", "Monitoring"] },
  { title: "Data Security", description: "Bank-level encryption and compliance with industry standards.", tech: ["SOC 2", "GDPR", "HIPAA ready"] },
  { title: "Continuous Learning", description: "AI that gets smarter with every conversation.", tech: ["ML pipeline", "A/B testing", "Analytics"] },
]

const values = [
  { value: "Innovation first", description: "We push the boundaries of what is possible with AI, constantly exploring new ways to improve customer communication." },
  { value: "Customer success", description: "Your growth is our success. We are committed to measurable results and exceptional support." },
  { value: "Transparency", description: "Clear pricing, honest communication, and openness about our capabilities and limitations." },
  { value: "Accessibility", description: "Enterprise-grade AI should be available to businesses of every size, not just the Fortune 500." },
]

const INDUSTRIES = ["Government", "Enterprise", "Restaurants", "Healthcare", "Hospitality", "Automotive"]

function useIsPhone() {
  const [p, setP] = useState(() => typeof window !== "undefined" && window.innerWidth < 640)
  useEffect(() => { const on = () => setP(window.innerWidth < 640); window.addEventListener("resize", on); return () => window.removeEventListener("resize", on) }, [])
  return p
}

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-8% 0px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any },
}


/* Scroll-driven portal: a lime circle opens from the corner and floods the screen, turning Mission into Vision. */
function PortalMV({ isPhone, isLight }: { isPhone: boolean; isLight: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const radius = useTransform(scrollYProgress, [0.18, 0.82], [0, 160])
  const clip = useMotionTemplate`circle(${radius}% at ${isPhone ? 80 : 88}% ${isPhone ? 92 : 90}%)`
  const missionScale = useTransform(scrollYProgress, [0.15, 0.8], [1, 0.9])
  const missionOpacity = useTransform(scrollYProgress, [0.25, 0.7], [1, 0.1])
  const missionBlur = useTransform(scrollYProgress, [0.25, 0.7], [0, 10])
  const missionFilter = useMotionTemplate`blur(${missionBlur}px)`
  const hint = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const h1 = isPhone ? "26px" : "clamp(34px, 4.4vw, 62px)"
  const ink = "#0a0a0a"

  return (
    <div ref={ref} className="relative" style={{ height: isPhone ? "230svh" : "270svh" }}>
      <div className="sticky" style={{ top: isPhone ? 76 : 96, height: isPhone ? "calc(100svh - 170px)" : "calc(100svh - 120px)", minHeight: isPhone ? 480 : 540 }}>
        <div className="relative h-full overflow-hidden rounded-[26px] sm:rounded-[40px] border border-white/10 bg-panel shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] light:shadow-[0_40px_90px_-40px_rgba(60,30,120,0.35)]">
          {/* Mission layer */}
          <motion.div className="absolute inset-0 p-6 sm:p-14 flex flex-col justify-between" style={{ scale: missionScale, opacity: missionOpacity, filter: missionFilter }}>
            <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(60% 80% at 10% 0%, ${isLight ? "rgba(124,58,237,0.16)" : "rgba(212,255,0,0.10)"}, transparent 70%)` }} />
            <Eyebrow>Our mission</Eyebrow>
            <p className="relative font-medium tracking-[-0.03em] leading-[1.1] text-white max-w-4xl" style={{ fontSize: h1 }}>
              To empower organizations with cutting-edge AI that transforms operations, improves customer experiences and drives measurable business outcomes across every industry.
            </p>
            <span />
          </motion.div>

          {/* Vision layer, revealed through the circle */}
          <motion.div className="absolute inset-0" style={{ clipPath: clip, WebkitClipPath: clip }}>
            <div className="absolute inset-0 p-6 sm:p-14 flex flex-col justify-between" style={{ background: "#D4FF00", color: ink }}>
              <div className="pointer-events-none absolute -top-24 -left-16 w-[420px] h-[420px] rounded-full bg-[#fff]/50 blur-[90px]" />
              <div className="relative flex items-center gap-3 text-[11px] sm:text-[12px] font-medium tracking-[0.22em] uppercase" style={{ color: "rgba(10,10,10,0.7)" }}>
                <span className="h-px w-7" style={{ background: ink }} /> Our vision
              </div>
              <p className="relative font-medium tracking-[-0.03em] leading-[1.1] max-w-4xl" style={{ fontSize: h1, color: ink }}>
                A world where artificial intelligence is accessible to all, so businesses of every size can compete globally with enterprise-grade tools once reserved for the Fortune 500.
              </p>
              <div className="relative text-[12px] tracking-[0.18em] uppercase" style={{ color: "rgba(10,10,10,0.7)" }}>Pentagon AI</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  const { isLight } = useTheme()
  const isPhone = useIsPhone()
  const lime = isLight ? "#4d6a00" : "#D4FF00"


  return (
    <div style={{ fontFamily: FONT }} className="overflow-x-clip">
      {/* ---------- Hero ---------- */}
      <section className="container-large pt-8 sm:pt-16 pb-10 sm:pb-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Eyebrow>About us</Eyebrow>
        </motion.div>
        <h1 className="mt-5 sm:mt-8 text-[46px] sm:text-[96px] lg:text-[132px] font-semibold tracking-[-0.05em] leading-[0.92] text-white">
          {["We", "teach"].map((w, i) => (
            <motion.span key={w} className="inline-block mr-[0.2em]" initial={{ opacity: 0, y: 44, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8, delay: 0.08 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
          ))}
          <br />
          <motion.span className="inline-block" initial={{ opacity: 0, y: 44, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <Accent>machines to listen.</Accent>
          </motion.span>
        </h1>
        <div className="mt-8 sm:mt-14 grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <p className="lg:col-span-6 text-[15px] sm:text-[21px] leading-relaxed text-zinc-400">
            Pentagon AI builds <span className="text-white font-medium">AI-powered voice agents</span> that understand, engage and convert, around the clock, for any industry.
          </p>
          <dl className="lg:col-span-6 grid grid-cols-3 border-t border-white/10">
            {[["Toronto", "Canada"], ["6+", "industries served"], ["24/7", "always answering"]].map(([v, l], i) => (
              <div key={l} className={`pt-4 ${i ? "pl-4 sm:pl-6 border-l border-white/10" : ""}`}>
                <dt className="text-[20px] sm:text-[34px] font-semibold tracking-tight text-white leading-none">{v}</dt>
                <dd className="mt-2 text-[11px] sm:text-[13px] text-zinc-500">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* industries marquee */}
      <div className="border-y border-white/10 py-4 sm:py-6 overflow-hidden" style={{ WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)", maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)" }}>
        <div className="flex w-max animate-marquee-slow">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0">
              {INDUSTRIES.map((t) => (
                <span key={t + k} className="flex items-center text-[26px] sm:text-[52px] font-semibold tracking-[-0.03em] text-transparent" style={{ WebkitTextStroke: `1px ${isLight ? "rgba(20,20,40,0.55)" : "rgba(255,255,255,0.55)"}` }}>
                  {t}
                  <span className="mx-5 sm:mx-9 w-2 h-2 sm:w-3 sm:h-3 rotate-45" style={{ background: lime }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Mission & Vision: portal reveal ---------- */}
      <section className="container-large pt-14 sm:pt-28 pb-6 sm:pb-12">
        <PortalMV isPhone={isPhone} isLight={isLight} />
      </section>

      {/* ---------- Capabilities ---------- */}
      <section className="container-large py-12 sm:py-28">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>What we bring</Eyebrow>
              <h2 className="mt-4 sm:mt-6 text-[34px] sm:text-[60px] font-semibold tracking-[-0.04em] leading-[0.98] text-white">
                A team that<br /><Accent>ships voice.</Accent>
              </h2>
              <p className="mt-4 sm:mt-6 text-[14px] sm:text-[17px] leading-relaxed text-zinc-400 max-w-sm">AI engineers, voice-technology experts and customer-experience specialists, dedicated to transforming business communication.</p>
            </div>
          </div>
          <div className="lg:col-span-8 border-t border-white/10">
            {capabilities.map((c, i) => (
              <motion.div key={c.title} {...reveal} transition={{ ...reveal.transition, delay: 0.03 }} className="group grid grid-cols-[34px_1fr] sm:grid-cols-[64px_1fr_auto] gap-x-4 gap-y-2 py-6 sm:py-9 border-b border-white/10 hover:pl-2 sm:hover:pl-4 transition-all duration-300">
                <span className="text-[12px] sm:text-[14px] font-mono text-zinc-500 pt-1.5 group-hover:text-accent transition-colors">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[20px] sm:text-[30px] font-semibold tracking-[-0.02em] text-white group-hover:text-accent transition-colors">{c.title}</h3>
                  <p className="mt-1.5 text-[13px] sm:text-[16px] leading-relaxed text-zinc-400 max-w-xl">{c.description}</p>
                </div>
                <p className="col-start-2 sm:col-start-auto sm:text-right text-[11.5px] sm:text-[13px] leading-relaxed text-zinc-500 sm:max-w-[170px] sm:pt-2">{c.tech.join("  /  ")}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Values ---------- */}
      <section className="container-large pb-12 sm:pb-28">
        <Eyebrow>Our values</Eyebrow>
        <div className="mt-8 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 sm:gap-y-14">
          {values.map((v, i) => (
            <motion.div key={v.value} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }} className="border-t-2 pt-5 sm:pt-7" style={{ borderColor: lime }}>
              <div className="text-[44px] sm:text-[72px] font-semibold tracking-[-0.05em] leading-none text-white opacity-90">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-4 sm:mt-6 text-[20px] sm:text-[26px] font-semibold tracking-[-0.02em] text-white">{v.value}</h3>
              <p className="mt-2 text-[13px] sm:text-[15px] leading-relaxed text-zinc-400">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="container-large pb-16 sm:pb-28">
        <div data-keep-dark className="relative overflow-hidden rounded-[28px] sm:rounded-[44px] bg-zinc-950 border border-white/10 px-6 py-12 sm:px-16 sm:py-20 text-center">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-[#D4FF00]/15 blur-[110px]" />
          <h2 className="relative text-[30px] sm:text-[56px] font-semibold tracking-[-0.04em] leading-[1] text-white">Let's build your<br />voice agent.</h2>
          <p className="relative mt-4 sm:mt-6 max-w-xl mx-auto text-[13px] sm:text-[17px] text-zinc-400">Talk to our team, or jump straight into the product.</p>
          <div className="relative mt-7 sm:mt-10 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton to="/contact">Contact us</PrimaryButton>
            <DashboardButton />
          </div>
        </div>
      </section>
    </div>
  )
}
