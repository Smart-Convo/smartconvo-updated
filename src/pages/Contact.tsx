
import { useRef, useState } from "react"
import { sendLead } from "../lib/sendLead"
import { SectionWrapper } from "../components/kit/SectionWrapper"
import { GradientText } from "../components/kit/GradientText"
import { SectionTag } from "../components/kit/SectionTag"
import { Button } from "../components/kit/Button"
import { TrustBadge } from "../components/kit/TrustBadge"

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSending(true)
    setSent(false)
    setError(false)

    const fd = new FormData(formRef.current!)
    sendLead("contact", {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("company") || ""),
      message: String(fd.get("message") || ""),
    })
      .then(
        () => {
          setIsSending(false)
          setSent(true)
          formRef.current?.reset()
          setTimeout(() => setSent(false), 4000)
        },
        () => {
          setIsSending(false)
          setError(true)
          setTimeout(() => setError(false), 4000)
        }
      )
  }

  const contactInfo = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
      ),
      title: "Email",
      detail: "info@pentagonai.co",
    },
    {
  icon: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  title: "Phone",
  detail: (
    <>
      +1 (873) 371-5579
      <br />
      +1 (416) 876-3223
      <br />
      +92 300 8047485
    </>
  ),
},
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      ),
      title: "Location",
      detail: "150 King St W Suite 200, M5H 1J9, Toronto, Ontario, Canada",
    },
  ]

  return (
    <div>
      

      {/* Hero */}
      <section className="pt-10 sm:pt-16 pb-10 sm:pb-16">
        <div className="container-large text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mt-4 mb-4 leading-tight">
            Get in <GradientText>Touch</GradientText>
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your customer communication? Let&apos;s talk about how{" "}
            <span className="text-[#D4FF00] font-bold">Pentagon AI</span> can help your business grow with AI-powered voice agents.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <SectionWrapper bg="peach" rounded overlaps>
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
          {/* Contact Form */}
          <div className="bg-zinc-900/70 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send us a message</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-500 focus:border-[#D4FF00]/50 focus:outline-none focus:ring-2 focus:ring-[#D4FF00]/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-500 focus:border-[#D4FF00]/50 focus:outline-none focus:ring-2 focus:ring-[#D4FF00]/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-white mb-1.5">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  placeholder="Your company"
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-500 focus:border-[#D4FF00]/50 focus:outline-none focus:ring-2 focus:ring-[#D4FF00]/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your needs..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-500 focus:border-[#D4FF00]/50 focus:outline-none focus:ring-2 focus:ring-[#D4FF00]/20 transition-all resize-none"
                />
              </div>

              {/* Response Badge */}
              <div className="flex items-center justify-between bg-[#D4FF0008] border border-[#D4FF0020] rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#D4FF0010] rounded-lg">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4FF00" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Response Time</p>
                    <p className="text-xs text-zinc-400">We&apos;ll reply within 24 hours</p>
                  </div>
                </div>
                <TrustBadge text="Available now" className="hidden sm:flex" />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3 rounded-[62.5rem] font-bold text-sm transition-all duration-200 hover:brightness-110 hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
                style={{ background: "#D4FF00", color: "#0a0a0a" }}
              >
                {isSending ? "Sending..." : sent ? "Message Sent!" : error ? "Error — Try Again" : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900/70 rounded-[1rem] p-6 border border-white/10 hover:border-[#D4FF00]/30 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#D4FF0010] rounded-xl text-[#D4FF00] flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-zinc-300">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="relative bg-zinc-900/70 rounded-[1rem] overflow-hidden border border-white/10 hover:border-[#D4FF00]/30 transition-all duration-300 h-[280px] group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60 z-10 pointer-events-none" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.8276729474805!2d-79.38569492346621!3d43.64860735110451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d1eced3c73%3A0x96a1c3b6d6b6d6b6!2s150%20King%20St%20W%2C%20Toronto%2C%20ON%20M5H%201J9%2C%20Canada!5e0!3m2!1sen!2s!4v1706865600000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) contrast(90%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-500"
              />
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-zinc-900/90 backdrop-blur-sm border border-[#D4FF00]/20 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#D4FF0010] rounded-lg">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4FF00" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold">Our Office</p>
                    <p className="text-xs text-zinc-400">Toronto, Canada</p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=150+King+St+W+Suite+200+Toronto+Ontario+Canada"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[#D4FF0010] hover:bg-[#D4FF0020] border border-[#D4FF00]/20 rounded-md text-xs text-[#D4FF00] font-bold transition-colors"
                  >
                    View
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      
    </div>
  )
}
