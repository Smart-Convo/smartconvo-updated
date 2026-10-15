import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react"
import { sendLead } from "../lib/sendLead"
import { Eyebrow, Accent, FONT } from "../components/PageKit"
import { DASHBOARD_URL } from "../lib/links"

const field =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[15px] text-white placeholder:text-zinc-500 focus:outline-none focus:border-accent focus:ring-4 focus:ring-[#D4FF00]/10 light:focus:ring-[#7c3aed]/15 transition-all"

const phones = ["+1 (873) 371-5579", "+1 (416) 876-3223", "+92 300 8047485"]


function DashboardBanner() {
  const bars = [38, 62, 48, 80, 58, 92, 70, 100, 76, 88]
  return (
    <section className="container-large pb-14 sm:pb-28">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[48px] p-6 sm:p-14 lg:p-16" style={{ background: "#D4FF00", color: "#0a0a0a" }}>
        <div className="pointer-events-none absolute -top-32 -left-20 w-[480px] h-[480px] rounded-full bg-[#fff]/60 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-40 right-0 w-[520px] h-[520px] rounded-full blur-[110px]" style={{ background: "rgba(124,58,237,0.28)" }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-[11px] sm:text-[12px] font-semibold tracking-[0.22em] uppercase" style={{ color: "rgba(10,10,10,0.65)" }}>
              <span className="h-px w-7" style={{ background: "#0a0a0a" }} /> Already a customer?
            </div>
            <h2 className="mt-4 sm:mt-6 text-[34px] sm:text-[64px] lg:text-[76px] font-semibold tracking-[-0.045em] leading-[0.96]">
              Your calls, leads and analytics live in the dashboard.
            </h2>
            <a
              href={DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 sm:mt-10 inline-flex items-center gap-3 h-[54px] sm:h-[64px] pl-7 pr-2 rounded-full text-[15px] sm:text-[18px] font-semibold shadow-[0_18px_40px_-14px_rgba(0,0,0,0.6)] hover:scale-[1.02] transition-transform"
              style={{ background: "#0a0a0a", color: "#D4FF00" }}
            >
              Open dashboard
              <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ background: "#D4FF00", color: "#0a0a0a" }}>
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.4} />
              </span>
            </a>
            <p className="mt-3 text-[12.5px] sm:text-[14px]" style={{ color: "rgba(10,10,10,0.65)" }}>dashboard.pentagonai.co</p>
          </div>

          {/* live mini dashboard */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[22px] sm:rounded-[28px] p-4 sm:p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
              style={{ background: "#0b0c0f", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" /><span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" /><span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" /></div>
                <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "#D4FF00" }}><span className="relative flex w-1.5 h-1.5"><span className="absolute inset-0 rounded-full animate-ping opacity-70" style={{ background: "#D4FF00" }} /><span className="relative w-1.5 h-1.5 rounded-full" style={{ background: "#D4FF00" }} /></span>Live</span>
              </div>
              <div className="mt-4 text-[12px]" style={{ color: "#8b90a0" }}>Calls handled this month</div>
              <div className="text-[34px] sm:text-[46px] font-semibold tracking-tight leading-none tabular-nums">12,480</div>
              <div className="mt-4 flex items-end gap-1.5 h-[110px] sm:h-[130px]">
                {bars.map((h, i) => (
                  <motion.span
                    key={i}
                    className="flex-1 rounded-t-md origin-bottom"
                    style={{ background: i === 7 ? "#D4FF00" : "#2c2e36", height: `${h}%` }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                {[["91%", "resolved"], ["0 sec", "wait"], ["3,206", "leads"]].map(([v, l]) => (
                  <div key={l}><div className="text-[15px] sm:text-[18px] font-semibold">{v}</div><div className="text-[11px]" style={{ color: "#8b90a0" }}>{l}</div></div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state === "sending") return
    setState("sending")
    const fd = new FormData(formRef.current!)
    sendLead("contact", {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("company") || ""),
      message: String(fd.get("message") || ""),
    })
      .then(() => {
        setState("sent")
        formRef.current?.reset()
        setTimeout(() => setState("idle"), 5000)
      })
      .catch(() => {
        setState("error")
        setTimeout(() => setState("idle"), 5000)
      })
  }

  const label = state === "sending" ? "Sending…" : state === "sent" ? "Message sent" : state === "error" ? "Failed. Try again" : "Send message"

  return (
    <div style={{ fontFamily: FONT }} className="overflow-x-clip">
      {/* ---------- Hero ---------- */}
      <section className="container-large pt-8 sm:pt-16 pb-8 sm:pb-14">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}><Eyebrow>Contact</Eyebrow></motion.div>
        <h1 className="mt-5 sm:mt-8 text-[52px] sm:text-[110px] lg:text-[148px] font-semibold tracking-[-0.055em] leading-[0.9] text-white">
          {["Let's"].map((w) => (
            <motion.span key={w} className="inline-block mr-[0.2em]" initial={{ opacity: 0, y: 44, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
          ))}
          <motion.span className="inline-block" initial={{ opacity: 0, y: 44, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}>
            <Accent>talk.</Accent>
          </motion.span>
        </h1>
        <p className="mt-5 sm:mt-9 max-w-2xl text-[14px] sm:text-[20px] leading-relaxed text-zinc-400">
          Ready to transform your customer communication? Tell us what you need and we will show you how AI voice agents can help your business grow.
        </p>
      </section>

      {/* ---------- Details + form ---------- */}
      <section className="container-large pb-12 sm:pb-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
          {/* left: details */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <dl className="border-t border-white/10">
              <div className="py-5 sm:py-7 border-b border-white/10 grid grid-cols-[28px_1fr] gap-x-4">
                <Mail className="w-5 h-5 mt-1 text-accent" strokeWidth={1.8} />
                <div>
                  <dt className="text-[11px] tracking-[0.2em] uppercase text-zinc-500">Email</dt>
                  <dd className="mt-1.5"><a href="mailto:info@pentagonai.co" className="text-[20px] sm:text-[28px] font-semibold tracking-tight text-white hover:text-accent transition-colors break-all">info@pentagonai.co</a></dd>
                </div>
              </div>
              <div className="py-5 sm:py-7 border-b border-white/10 grid grid-cols-[28px_1fr] gap-x-4">
                <Phone className="w-5 h-5 mt-1 text-accent" strokeWidth={1.8} />
                <div>
                  <dt className="text-[11px] tracking-[0.2em] uppercase text-zinc-500">Phone / WhatsApp</dt>
                  <dd className="mt-1.5 space-y-0.5">
                    {phones.map((p) => (
                      <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="block text-[18px] sm:text-[24px] font-semibold tracking-tight text-white hover:text-accent transition-colors">{p}</a>
                    ))}
                  </dd>
                </div>
              </div>
              <div className="py-5 sm:py-7 border-b border-white/10 grid grid-cols-[28px_1fr] gap-x-4">
                <MapPin className="w-5 h-5 mt-1 text-accent" strokeWidth={1.8} />
                <div>
                  <dt className="text-[11px] tracking-[0.2em] uppercase text-zinc-500">Office</dt>
                  <dd className="mt-1.5 text-[15px] sm:text-[18px] leading-snug text-white">150 King St W, Suite 200<br />Toronto, Ontario M5H 1J9, Canada</dd>
                  <a href="https://maps.google.com/?q=150+King+St+W+Suite+200+Toronto+Ontario+Canada" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-accent hover:underline underline-offset-4">Open in Maps <ArrowUpRight className="w-3.5 h-3.5" /></a>
                </div>
              </div>
            </dl>

            <div className="mt-6 sm:mt-8 relative overflow-hidden rounded-[22px] sm:rounded-[28px] border border-white/10 h-[200px] sm:h-[260px]">
              <iframe
                title="Smart Convo office map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.8276729474805!2d-79.38569492346621!3d43.64860735110451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d1eced3c73%3A0x96a1c3b6d6b6d6b6!2s150%20King%20St%20W%2C%20Toronto%2C%20ON%20M5H%201J9%2C%20Canada!5e0!3m2!1sen!2s!4v1706865600000!5m2!1sen!2s"
                className="absolute inset-0 w-full h-full border-0 opacity-70 contrast-90 saturate-50 dark:opacity-60"
                style={{ filter: "grayscale(100%)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* right: form */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <form ref={formRef} onSubmit={onSubmit} className="relative overflow-hidden rounded-[26px] sm:rounded-[36px] border border-white/10 bg-panel p-5 sm:p-10 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.9)] light:shadow-[0_40px_90px_-50px_rgba(60,30,120,0.35)]">
              <div className="pointer-events-none absolute -top-24 -right-16 w-72 h-72 rounded-full bg-[#D4FF00]/10 light:bg-[#7c3aed]/12 blur-[90px]" />
              <h2 className="relative text-[24px] sm:text-[36px] font-semibold tracking-[-0.03em] text-white">Send us a message</h2>
              <p className="relative mt-1.5 text-[13px] sm:text-[15px] text-zinc-400">We reply within 24 hours.</p>

              <div className="relative mt-6 sm:mt-8 grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="block text-[12px] font-medium tracking-wide text-zinc-400 mb-2">Name</span>
                  <input id="name" name="name" required placeholder="Your name" className={field} />
                </label>
                <label className="block">
                  <span className="block text-[12px] font-medium tracking-wide text-zinc-400 mb-2">Email</span>
                  <input id="email" name="email" type="email" required placeholder="you@company.com" className={field} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="block text-[12px] font-medium tracking-wide text-zinc-400 mb-2">Company <span className="text-zinc-500">(optional)</span></span>
                  <input id="company" name="company" placeholder="Your company" className={field} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="block text-[12px] font-medium tracking-wide text-zinc-400 mb-2">Message</span>
                  <textarea id="message" name="message" required rows={6} placeholder="Tell us about your needs…" className={`${field} resize-none`} />
                </label>
              </div>

              <div className="relative mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="group inline-flex items-center justify-center gap-2.5 h-[52px] sm:h-[58px] pl-7 pr-1.5 rounded-full bg-[#D4FF00] text-zinc-950 text-[15px] sm:text-[16px] font-semibold shadow-[0_12px_36px_rgba(212,255,0,0.35)] disabled:opacity-60 cursor-pointer"
                >
                  {label}
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-950 text-[#D4FF00] flex items-center justify-center transition-transform group-hover:translate-x-0.5"><ArrowUpRight className="w-5 h-5" strokeWidth={2.4} /></span>
                </button>
                <p className="flex items-center gap-2 text-[12.5px] text-zinc-500">
                  <span className="relative flex w-2 h-2"><span className="absolute inset-0 rounded-full bg-[#34d399] animate-ping opacity-60" /><span className="relative w-2 h-2 rounded-full bg-[#34d399]" /></span>
                  Team available now
                </p>
              </div>
              {state === "error" && <p className="relative mt-4 text-[13px] text-rose-500">We couldn't send that. Please email info@pentagonai.co directly.</p>}
            </form>
          </div>
        </div>
      </section>

      <DashboardBanner />
    </div>
  )
}
