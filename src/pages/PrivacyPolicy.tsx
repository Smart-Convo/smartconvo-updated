
import { useEffect, useRef, useState } from "react"
import Link from "../components/kit/NextLink"
import { GradientText } from "../components/kit/GradientText"

const sections = [
  { id: "scope", title: "Scope and Roles" },
  { id: "collection", title: "Information We Collect" },
  { id: "legal-basis", title: "Legal Basis for Processing" },
  { id: "usage", title: "How We Use Information" },
  { id: "disclosure", title: "Disclosure of Information" },
  { id: "retention", title: "Data Retention" },
  { id: "security", title: "Data Security" },
  { id: "transfers", title: "International Data Transfers" },
  { id: "rights", title: "Your Privacy Rights" },
  { id: "exercising-rights", title: "Exercising Your Rights" },
  { id: "children", title: "Data from Children" },
  { id: "no-sale", title: "No Sale of Personal Information" },
  { id: "third-party", title: "Third-Party Links" },
  { id: "changes", title: "Changes to This Policy" },
  { id: "contact", title: "Contact Information" },
]

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -30% 0px" }
    )
    sectionsRef.current.forEach((s) => { if (s) observer.observe(s) })
    return () => observer.disconnect()
  }, [])

  const sectionCls = "py-10 border-t border-white/10"
  const h2Cls = "text-2xl font-bold mb-4"
  const h3Cls = "text-lg font-bold mb-2 mt-6"
  const pCls = "text-sm text-zinc-300 leading-relaxed"
  const listCls = "space-y-1.5 text-sm text-zinc-300 ml-4"

  return (
    <div>
      

      {/* Hero */}
      <section className="pt-10 sm:pt-16 pb-10 sm:pb-16">
        <div className="container-large">
          <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider mb-3">Legal / Privacy</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4">
            Privacy <GradientText>Policy</GradientText>
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4FF00]" />
              Effective Date: August 25, 2025
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8d8d8d]" />
              Last Updated: November 20, 2025
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {[
              { icon: "🔒", label: "Encrypted & Secure" },
              { icon: "🛡️", label: "GDPR Compliant" },
              { icon: "👤", label: "No Data Selling" },
            ].map((b) => (
              <div key={b.label} className="p-4 border border-white/10 rounded-xl bg-white/[0.04]">
                <span className="text-lg mb-1 block">{b.icon}</span>
                <p className="text-xs text-zinc-300 font-medium">{b.label}</p>
              </div>
            ))}
          </div>

          {/* Intro */}
          <div className="mt-8 p-6 border border-[#D4FF00]/20 rounded-xl bg-white/[0.04]">
            <p className="text-[#D4FF00] font-bold text-sm mb-2">Your Privacy Matters</p>
            <p className={pCls}>
              Pentagon AI respects your privacy and is committed to protecting personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard personal information when you interact with our AI-powered voice and conversational services. By accessing or using the Services, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white/[0.03] rounded-t-[2.5rem] -mt-4 relative z-10">
        <div className="container-large py-10 sm:py-16">
          <div className="grid lg:grid-cols-[240px_1fr] gap-6 sm:gap-10">
            {/* Sidebar Nav */}
            <nav className="hidden lg:block">
              <div className="sticky top-28 space-y-1 max-h-[70vh] overflow-y-auto">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-xs transition-all duration-200 cursor-pointer ${
                      activeSection === s.id
                        ? "bg-[#D4FF00]/10 text-[#D4FF00] font-bold border-l-2 border-[#D4FF00]"
                        : "text-zinc-400 hover:text-zinc-300 hover:bg-white/[0.06]"
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </nav>

            {/* Content */}
            <div className="bg-zinc-900/70 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 md:p-12 shadow-sm">

              {/* 1. Scope and Roles */}
              <section id="scope" ref={(el) => { sectionsRef.current[0] = el }} className={sectionCls} style={{ borderTop: "none" }}>
                <h2 className={h2Cls}>1. Scope and Roles</h2>
                <p className={pCls}>Depending on the context:</p>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div className="p-5 border border-[#D4FF00]/20 rounded-xl bg-white/[0.04]">
                    <p className="text-[#D4FF00] font-bold text-sm mb-1">Data Controller</p>
                    <p className="text-xs text-zinc-300">Pentagon AI acts as a data controller for website visitors, prospects, and direct users.</p>
                  </div>
                  <div className="p-5 border border-white/10 rounded-xl bg-white/[0.04]">
                    <p className="font-bold text-sm mb-1">Data Processor</p>
                    <p className="text-xs text-zinc-300">Pentagon AI acts as a data processor/service provider when providing Services on behalf of customers such as municipalities, enterprises, and restaurants.</p>
                  </div>
                </div>
                <p className={`${pCls} mt-3`}>Customers remain responsible for determining how end-user data is collected and used within their deployments.</p>
              </section>

              {/* 2. Information We Collect */}
              <section id="collection" ref={(el) => { sectionsRef.current[1] = el }} className={sectionCls}>
                <h2 className={h2Cls}>2. Information We Collect</h2>

                <h3 className={h3Cls}>2.1 Information Collected Automatically</h3>
                <p className={pCls}>When you access our website or Services, we may collect:</p>
                <div className="grid sm:grid-cols-2 gap-2 mt-3">
                  {["IP address", "Browser type and version", "Operating system", "Device identifiers", "Access times and pages viewed", "Referring URLs"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-zinc-300">
                      <span className="w-1 h-1 rounded-full bg-[#D4FF00]" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className={`${pCls} mt-2`}>This information is used for security, analytics, and performance optimization.</p>

                <h3 className={h3Cls}>2.2 Information You Provide Directly</h3>
                <p className={pCls}>We may collect personal information that you voluntarily provide, including:</p>
                <ul className={`${listCls} mt-2`}>
                  <li>• Name</li><li>• Email address</li><li>• Phone number</li><li>• Company or organization name</li><li>• Business contact details</li><li>• Information submitted through forms, demos, or inquiries</li>
                </ul>

                <h3 className={h3Cls}>2.3 Voice, Call, and AI Interaction Data</h3>
                <p className={pCls}>Our Services may process voice calls, transcripts, or conversational data.</p>
                <div className="mt-3 p-4 border border-[#03cf86]/30 rounded-xl bg-[#03cf86]/5">
                  <p className="text-[#03cf86] font-bold text-sm mb-2">Call Recording Policy:</p>
                  <ul className={listCls}>
                    <li>• Call recording is <strong>disabled by default</strong></li>
                    <li>• Recordings or transcripts are processed or stored only if explicitly enabled by the customer</li>
                    <li>• Pentagon AI does not retain call recordings unless configured to do so by the customer</li>
                    <li>• Pentagon AI processes such data solely to provide the Services and in accordance with customer instructions</li>
                  </ul>
                </div>
              </section>

              {/* 3. Legal Basis */}
              <section id="legal-basis" ref={(el) => { sectionsRef.current[2] = el }} className={sectionCls}>
                <h2 className={h2Cls}>3. Legal Basis for Processing (GDPR)</h2>
                <p className={pCls}>Where applicable under GDPR, we process personal data based on one or more of the following legal bases:</p>
                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                  {["Performance of a contract", "Legitimate business interests", "Compliance with legal obligations", "Consent, where required"].map((b) => (
                    <div key={b} className="p-3 border border-white/10 rounded-lg bg-white/[0.04] text-xs text-zinc-300">{b}</div>
                  ))}
                </div>
              </section>

              {/* 4. Usage */}
              <section id="usage" ref={(el) => { sectionsRef.current[3] = el }} className={sectionCls}>
                <h2 className={h2Cls}>4. How We Use Information</h2>
                <p className={pCls}>We use personal information to:</p>
                <ul className={`${listCls} mt-2`}>
                  {["Provide, operate, and maintain the Services", "Create and manage user accounts", "Communicate service updates and support messages", "Improve system performance, reliability, and security", "Analyze usage trends and improve functionality", "Respond to inquiries and requests", "Comply with legal and regulatory obligations"].map((u) => (
                    <li key={u} className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] mt-1.5 flex-shrink-0" />{u}</li>
                  ))}
                </ul>
              </section>

              {/* 5. Disclosure */}
              <section id="disclosure" ref={(el) => { sectionsRef.current[4] = el }} className={sectionCls}>
                <h2 className={h2Cls}>5. Disclosure of Information</h2>
                <p className={pCls}>We may disclose personal information:</p>
                <ul className={`${listCls} mt-2`}>
                  <li>• To service providers and subprocessors that support our operations</li>
                  <li>• To comply with legal obligations or lawful requests</li>
                  <li>• To protect rights, safety, and security</li>
                  <li>• In connection with corporate transactions (e.g., merger or acquisition)</li>
                </ul>
                <div className="mt-4 p-4 border border-[#D4FF00]/20 rounded-xl bg-white/[0.04]">
                  <p className="text-[#D4FF00] font-bold text-sm">We do not sell personal information.</p>
                </div>
              </section>

              {/* 6. Retention */}
              <section id="retention" ref={(el) => { sectionsRef.current[5] = el }} className={sectionCls}>
                <h2 className={h2Cls}>6. Data Retention</h2>
                <p className={pCls}>We retain personal information only for as long as necessary to:</p>
                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                  {["Provide the Services", "Fulfill contractual obligations", "Comply with legal requirements", "Resolve disputes and enforce agreements"].map((r) => (
                    <div key={r} className="p-3 border border-white/10 rounded-lg bg-white/[0.04] text-xs text-zinc-300">{r}</div>
                  ))}
                </div>
                <p className={`${pCls} mt-3`}>Retention periods vary depending on data type and legal requirements. Data is securely deleted or anonymized when no longer required.</p>
              </section>

              {/* 7. Security */}
              <section id="security" ref={(el) => { sectionsRef.current[6] = el }} className={sectionCls}>
                <h2 className={h2Cls}>7. Data Security</h2>
                <p className={pCls}>We implement administrative, technical, and organizational safeguards designed to protect personal information. However, no system can be guaranteed to be 100% secure.</p>
              </section>

              {/* 8. International Transfers */}
              <section id="transfers" ref={(el) => { sectionsRef.current[7] = el }} className={sectionCls}>
                <h2 className={h2Cls}>8. International Data Transfers</h2>
                <p className={pCls}>Personal information may be processed or stored outside your jurisdiction, including in Canada, the United States, or other locations where our service providers operate. Where required, we implement appropriate safeguards for cross-border transfers.</p>
              </section>

              {/* 9. Your Rights */}
              <section id="rights" ref={(el) => { sectionsRef.current[8] = el }} className={sectionCls}>
                <h2 className={h2Cls}>9. Your Privacy Rights</h2>

                <h3 className={h3Cls}>9.1 GDPR Rights (EU/EEA)</h3>
                <p className={pCls}>If you are located in the EU or EEA, you have the right to:</p>
                <div className="grid sm:grid-cols-2 gap-2 mt-3">
                  {["Access your personal data", "Correct inaccurate data", "Request deletion", "Restrict or object to processing", "Request data portability", "Lodge a complaint with a supervisory authority"].map((r) => (
                    <div key={r} className="p-3 border border-[#3877ef]/20 rounded-lg bg-[#3877ef]/5 text-xs text-zinc-300">{r}</div>
                  ))}
                </div>

                <h3 className={h3Cls}>9.2 CCPA / CPRA Rights (California)</h3>
                <p className={pCls}>California residents have the right to:</p>
                <ul className={`${listCls} mt-2`}>
                  <li>• Know what personal information is collected</li>
                  <li>• Request deletion of personal information</li>
                  <li>• Correct inaccurate information</li>
                  <li>• Opt out of sale or sharing (Pentagon AI does not sell data)</li>
                  <li>• Not be discriminated against for exercising privacy rights</li>
                </ul>

                <h3 className={h3Cls}>9.3 PIPEDA Rights (Canada)</h3>
                <p className={pCls}>Canadian residents have the right to:</p>
                <ul className={`${listCls} mt-2`}>
                  <li>• Access their personal information</li>
                  <li>• Request corrections</li>
                  <li>• Withdraw consent, subject to legal or contractual limitations</li>
                </ul>
              </section>

              {/* 10. Exercising Rights */}
              <section id="exercising-rights" ref={(el) => { sectionsRef.current[9] = el }} className={sectionCls}>
                <h2 className={h2Cls}>10. Exercising Your Rights</h2>
                <p className={pCls}>Requests to exercise privacy rights may be submitted by contacting us at:</p>
                <div className="mt-3 p-4 border border-[#D4FF00]/20 rounded-xl bg-white/[0.04]">
                  <p className="text-sm font-bold mb-1">Email:</p>
                  <a href="mailto:info@pentagonai.co" className="text-[#D4FF00] text-sm hover:underline">info@pentagonai.co</a>
                </div>
                <p className={`${pCls} mt-3`}>Where Pentagon AI acts as a processor, requests may be redirected to the relevant customer acting as data controller.</p>
              </section>

              {/* 11. Children */}
              <section id="children" ref={(el) => { sectionsRef.current[10] = el }} className={sectionCls}>
                <h2 className={h2Cls}>11. Data from Children</h2>
                <div className="p-4 border border-[#f5a623]/30 rounded-xl bg-[#f5a623]/5">
                  <p className={pCls}>The Services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children. If such information is identified, it will be deleted promptly.</p>
                </div>
              </section>

              {/* 12. No Sale */}
              <section id="no-sale" ref={(el) => { sectionsRef.current[11] = el }} className={sectionCls}>
                <h2 className={h2Cls}>12. No Sale of Personal Information</h2>
                <div className="p-5 border border-[#03cf86]/30 rounded-xl bg-[#03cf86]/5">
                  <p className="text-[#03cf86] font-bold text-sm">Pentagon AI does not sell, rent, or trade personal information to third parties for monetary or commercial benefit.</p>
                </div>
              </section>

              {/* 13. Third-Party */}
              <section id="third-party" ref={(el) => { sectionsRef.current[12] = el }} className={sectionCls}>
                <h2 className={h2Cls}>13. Third-Party Links and Services</h2>
                <p className={pCls}>Our Services may contain links to third-party websites or services. We are not responsible for the privacy practices of third parties.</p>
              </section>

              {/* 14. Changes */}
              <section id="changes" ref={(el) => { sectionsRef.current[13] = el }} className={sectionCls}>
                <h2 className={h2Cls}>14. Changes to This Privacy Policy</h2>
                <p className={pCls}>We may update this Privacy Policy from time to time. Updates will be reflected by the &quot;Last Updated&quot; date. Continued use of the Services constitutes acceptance of the updated policy.</p>
              </section>

              {/* 15. Contact */}
              <section id="contact" ref={(el) => { sectionsRef.current[14] = el }} className={sectionCls}>
                <h2 className={h2Cls}>15. Contact Information</h2>
                <p className={pCls}>If you have questions, concerns, or requests regarding this Privacy Policy, please contact:</p>
                <div className="mt-4 p-6 border border-[#D4FF00]/20 rounded-xl bg-white/[0.04]">
                  <p className="font-bold mb-2">Pentagon AI</p>
                  <a href="mailto:info@pentagonai.co" className="text-[#D4FF00] text-sm hover:underline">info@pentagonai.co</a>
                </div>
              </section>

              {/* Bottom CTA */}
              <div className="mt-12 p-8 border border-[#D4FF00]/20 rounded-[1.5rem] bg-white/[0.04] text-center">
                <h3 className="text-xl font-bold mb-2">Questions About Your Privacy?</h3>
                <p className="text-sm text-zinc-400 max-w-lg mx-auto mb-6">We&apos;re committed to transparency. Reach out to our team for any privacy-related inquiries or concerns.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/terms-and-conditions" className="px-5 py-2.5 border border-white/10 rounded-[62.5rem] text-sm font-medium hover:border-[#D4FF00] hover:text-[#D4FF00] transition-all">
                    View Terms &amp; Conditions
                  </Link>
                  <a href="mailto:info@pentagonai.co" className="px-5 py-2.5 rounded-[62.5rem] text-sm font-bold text-white transition-all hover:brightness-110" style={{ background: "#D4FF00", color: "#0a0a0a" }}>
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  )
}
