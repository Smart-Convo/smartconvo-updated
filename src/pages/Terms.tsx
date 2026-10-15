
import { useEffect, useRef, useState } from "react"
import Link from "../components/kit/NextLink"
import { Eyebrow, Accent, FONT } from "../components/PageKit"

const sections = [
  { id: "services", title: "The Services" },
  { id: "fees", title: "Fees and Payment" },
  { id: "term", title: "Term" },
  { id: "termination", title: "Suspension and Termination" },
  { id: "ai-limitations", title: "AI and Service Limitations" },
  { id: "call-recording", title: "Call Recording and Data" },
  { id: "confidentiality", title: "Confidentiality and Feedback" },
  { id: "accounts", title: "User Accounts" },
  { id: "privacy", title: "Privacy Compliance" },
  { id: "data-requests", title: "Data Subject Requests" },
  { id: "warranties", title: "Disclaimer of Warranties" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "indemnification", title: "Indemnification" },
  { id: "communications", title: "Communications" },
  { id: "general", title: "General Provisions" },
  { id: "governing-law", title: "Governing Law" },
  { id: "contact", title: "Contact Information" },
]

export default function TermsPage() {
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

  const sectionCls = "py-10 sm:py-12 border-t border-white/10 scroll-mt-28"
  const h2Cls = "text-[26px] sm:text-[36px] font-semibold tracking-[-0.03em] leading-tight text-white mb-5"
  const h3Cls = "text-[17px] sm:text-[19px] font-semibold tracking-tight text-white mb-2 mt-8"
  const pCls = "text-[15px] sm:text-[16px] text-zinc-300 leading-[1.75]"
  const listCls = "space-y-2 text-[15px] sm:text-[16px] text-zinc-300 leading-[1.7] ml-5 list-disc marker:text-accent"

  return (
    <div style={{ fontFamily: FONT }} className="overflow-x-clip">
      {/* Hero */}
      <section className="container-large pt-8 sm:pt-16 pb-10 sm:pb-16">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-5 sm:mt-8 text-[44px] sm:text-[88px] lg:text-[112px] font-semibold tracking-[-0.05em] leading-[0.94] text-white">
          Terms and <Accent>Conditions</Accent>
        </h1>
        <div className="mt-8 sm:mt-12 grid lg:grid-cols-12 gap-8 lg:gap-12">
          <dl className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-6 self-start border-t border-white/10 pt-5">
            <div><dt className="text-[11px] tracking-[0.2em] uppercase text-zinc-500">Effective</dt><dd className="mt-1.5 text-[16px] sm:text-[19px] font-medium text-white">August 25, 2025</dd></div>
            <div><dt className="text-[11px] tracking-[0.2em] uppercase text-zinc-500">Last updated</dt><dd className="mt-1.5 text-[16px] sm:text-[19px] font-medium text-white">November 20, 2025</dd></div>
          </dl>
          <p className="lg:col-span-8 text-[16px] sm:text-[22px] leading-[1.55] text-zinc-300 border-l-2 border-accent pl-5 sm:pl-8">
            These Terms and Conditions constitute a legally binding agreement between Pentagon AI and you. By accessing, registering for, or using the Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must not access or use the Services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container-large pb-16 sm:pb-28">
          <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-16 border-t border-white/10 pt-8 sm:pt-12">
            {/* Sidebar Nav */}
            <nav className="hidden lg:block" aria-label="Table of contents">
              <div className="sticky top-28 max-h-[72vh] overflow-y-auto pr-2">
                <div className="text-[11px] tracking-[0.2em] uppercase text-zinc-500 mb-4">On this page</div>
                <ol className="border-l border-white/10">
                  {sections.map((s, i) => {
                    const on = activeSection === s.id
                    return (
                      <li key={s.id}>
                        <button
                          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
                          className={`flex w-full items-baseline gap-3 text-left -ml-px pl-4 py-1.5 text-[13px] border-l-2 transition-colors cursor-pointer ${on ? "border-accent text-white font-medium" : "border-transparent text-zinc-500 hover:text-white"}`}
                        >
                          <span className={`font-mono text-[11px] ${on ? "text-accent" : "text-zinc-600"}`}>{String(i + 1).padStart(2, "0")}</span>
                          {s.title}
                        </button>
                      </li>
                    )
                  })}
                </ol>
              </div>
            </nav>

            {/* Content */}
            <div className="min-w-0 max-w-3xl">

              {/* 1. The Services */}
              <section id="services" ref={(el) => { sectionsRef.current[0] = el }} className={sectionCls} style={{ borderTop: "none" }}>
                <h2 className={h2Cls}>1. The Services</h2>

                <h3 className={h3Cls}>1.1 Overview</h3>
                <p className={pCls}>Pentagon AI provides artificial intelligence–powered voice and conversational automation services, which may include inbound and outbound voice agents, call handling, transcription, analytics, dashboards, APIs, and integrations with third-party systems such as telephony providers, point-of-sale platforms, CRMs, or other software tools (collectively, the &quot;Services&quot;).</p>
                <p className={`${pCls} mt-2`}>The Services may be used by municipalities, restaurants, enterprises, and individual consumers, subject to these Terms.</p>

                <h3 className={h3Cls}>1.2 License Grant</h3>
                <p className={pCls}>Subject to compliance with these Terms, Pentagon AI grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Services solely for your internal business or personal purposes during the term of this Agreement.</p>
                <div className="mt-3 pl-5 py-2 border-l-2 border-white/25">
                  <p className="text-xs text-zinc-400 mb-2 font-medium">You may not:</p>
                  <ul className={listCls}>
                    <li>Copy, modify, or create derivative works of the Services</li>
                    <li>Reverse engineer, decompile, or disassemble any portion of the Services</li>
                    <li>Resell, sublicense, lease, or otherwise commercially exploit the Services without written authorization</li>
                    <li>Use the Services for unlawful, deceptive, abusive, or fraudulent purposes</li>
                  </ul>
                  <p className="text-xs text-zinc-400 mt-2">All rights not expressly granted are reserved by Pentagon AI.</p>
                </div>

                <h3 className={h3Cls}>1.3 Updates and Availability</h3>
                <p className={pCls}>The Services may be updated, modified, or enhanced from time to time. Scheduled maintenance, updates, or third-party outages may result in temporary interruptions. You are responsible for maintaining compatible devices, systems, and connectivity.</p>
              </section>

              {/* 2. Fees and Payment */}
              <section id="fees" ref={(el) => { sectionsRef.current[1] = el }} className={sectionCls}>
                <h2 className={h2Cls}>2. Fees and Payment</h2>
                <p className={pCls}>You agree to pay all applicable fees according to your selected subscription, pilot, or enterprise agreement. Unless otherwise stated in writing:</p>
                <ul className={`${listCls} mt-2`}>
                  <li>Fees are billed on a recurring basis</li>
                  <li>Fees are non-refundable</li>
                  <li>You are responsible for all applicable taxes, excluding Pentagon AI&apos;s income taxes</li>
                  <li>Any billing disputes must be reported within one hundred twenty (120) days of the applicable charge</li>
                </ul>
              </section>

              {/* 3. Term */}
              <section id="term" ref={(el) => { sectionsRef.current[2] = el }} className={sectionCls}>
                <h2 className={h2Cls}>3. Term</h2>
                <p className={pCls}>These Terms commence on the date you first access or use the Services and continue on a month-to-month basis, unless otherwise agreed in writing, until terminated by either party in accordance with these Terms.</p>
              </section>

              {/* 4. Suspension and Termination */}
              <section id="termination" ref={(el) => { sectionsRef.current[3] = el }} className={sectionCls}>
                <h2 className={h2Cls}>4. Suspension and Termination</h2>

                <h3 className={h3Cls}>4.1 Suspension or Termination by Pentagon AI</h3>
                <p className={pCls}>Pentagon AI may suspend or terminate your access to the Services, with or without notice, if you:</p>
                <ul className={`${listCls} mt-2`}>
                  <li>Violate these Terms</li>
                  <li>Use the Services in a manner that harms or risks harm to Pentagon AI, its intellectual property, or reputation</li>
                  <li>Exceed normal, reasonable, or agreed-upon usage limits</li>
                  <li>Engage in unlawful, fraudulent, or abusive conduct</li>
                  <li>Become insolvent, bankrupt, or subject to similar proceedings</li>
                </ul>

                <h3 className={h3Cls}>4.2 Termination by You</h3>
                <p className={pCls}>You may terminate your use of the Services at any time. Termination will take effect at the end of the current billing cycle. Fees already paid are non-refundable.</p>
              </section>

              {/* 5. AI Limitations */}
              <section id="ai-limitations" ref={(el) => { sectionsRef.current[4] = el }} className={sectionCls}>
                <h2 className={h2Cls}>5. Artificial Intelligence and Service Limitations</h2>
                <p className={pCls}>You acknowledge and agree that:</p>
                <div className="mt-3 pl-5 py-2 border-l-2 border-[#f5a623]/70">
                  <ul className={listCls}>
                    <li>The Services rely on artificial intelligence and automated decision-making</li>
                    <li>AI responses may be inaccurate, incomplete, delayed, or inappropriate</li>
                    <li>The Services are provided &quot;as-is&quot; and &quot;as available&quot;, without guarantees of accuracy or performance</li>
                    <li>You are solely responsible for reviewing, configuring, monitoring, and validating AI behavior and outputs before relying on them</li>
                  </ul>
                </div>
              </section>

              {/* 6. Call Recording */}
              <section id="call-recording" ref={(el) => { sectionsRef.current[5] = el }} className={sectionCls}>
                <h2 className={h2Cls}>6. Call Recording, Transcription, and Data Handling</h2>

                <h3 className={h3Cls}>6.1 Call Recording</h3>
                <p className={pCls}>The Services may support call recording and transcription features. Pentagon AI does not retain call recordings by default. Recording and storage occur only if explicitly enabled by the Customer.</p>
                <p className={`${pCls} mt-2`}>If enabled, calls may be recorded, transcribed, and stored in accordance with Customer configuration and applicable law.</p>

                <h3 className={h3Cls}>6.2 Customer Responsibility</h3>
                <p className={pCls}>You are solely responsible for:</p>
                <ul className={`${listCls} mt-2`}>
                  <li>Providing any required disclosures to callers</li>
                  <li>Obtaining lawful consent for recording or transcription</li>
                  <li>Complying with all applicable recording, privacy, and data protection laws</li>
                </ul>
                <p className={`${pCls} mt-2`}>Pentagon AI acts as a service provider or processor and does not control how Customers deploy the Services.</p>
              </section>

              {/* 7. Confidentiality */}
              <section id="confidentiality" ref={(el) => { sectionsRef.current[6] = el }} className={sectionCls}>
                <h2 className={h2Cls}>7. Confidentiality, Data, and Feedback</h2>

                <h3 className={h3Cls}>7.1 Confidential Information</h3>
                <p className={pCls}>Each party agrees to protect the other party&apos;s non-public business, technical, or commercial information (&quot;Confidential Information&quot;) and not disclose it except as required by law or permitted under these Terms.</p>

                <h3 className={h3Cls}>7.2 Exceptions</h3>
                <p className={pCls}>Confidential Information does not include information that:</p>
                <ul className={`${listCls} mt-2`}>
                  <li>Is publicly available without breach</li>
                  <li>Was lawfully known prior to disclosure</li>
                  <li>Is independently developed</li>
                  <li>Is lawfully obtained from a third party</li>
                </ul>

                <h3 className={h3Cls}>7.3 Aggregated and Anonymized Data</h3>
                <p className={pCls}>Pentagon AI may use aggregated or anonymized data for analytics, research, service improvement, and development, subject to applicable privacy laws.</p>

                <h3 className={h3Cls}>7.4 Feedback</h3>
                <p className={pCls}>Any suggestions, ideas, or feedback you provide may be used by Pentagon AI without restriction or compensation.</p>
              </section>

              {/* 8. User Accounts */}
              <section id="accounts" ref={(el) => { sectionsRef.current[7] = el }} className={sectionCls}>
                <h2 className={h2Cls}>8. User Accounts and Content</h2>
                <p className={pCls}>You retain ownership of your content and data. You grant Pentagon AI a limited license to process such data solely to provide the Services.</p>
                <p className={`${pCls} mt-2`}>You are responsible for:</p>
                <ul className={`${listCls} mt-2`}>
                  <li>Maintaining accurate account information</li>
                  <li>Safeguarding account credentials</li>
                  <li>All activity conducted under your account</li>
                  <li>Promptly notifying Pentagon AI of unauthorized access</li>
                </ul>
              </section>

              {/* 9. Privacy Compliance */}
              <section id="privacy" ref={(el) => { sectionsRef.current[8] = el }} className={sectionCls}>
                <h2 className={h2Cls}>9. Compliance with Privacy Laws</h2>
                <p className={pCls}>Pentagon AI processes personal data in accordance with applicable data protection laws, including PIPEDA, GDPR, and CCPA/CPRA, where applicable. Personal data handling, user rights, and retention practices are described in our Privacy Policy, which forms part of this Agreement by reference.</p>
                <p className="text-sm font-bold mt-2">Pentagon AI does not sell personal information.</p>
              </section>

              {/* 10. Data Subject Requests */}
              <section id="data-requests" ref={(el) => { sectionsRef.current[9] = el }} className={sectionCls}>
                <h2 className={h2Cls}>10. Data Subject Requests</h2>
                <p className={pCls}>Where required by law, Pentagon AI will assist Customers in responding to valid data subject requests. Requests received directly from end users may be redirected to the applicable Customer acting as data controller.</p>
              </section>

              {/* 11. Disclaimer of Warranties */}
              <section id="warranties" ref={(el) => { sectionsRef.current[10] = el }} className={sectionCls}>
                <h2 className={h2Cls}>11. Disclaimer of Warranties</h2>
                <div className="pl-5 py-2 border-l-2 border-accent/70">
                  <p className={pCls}>TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICES ARE PROVIDED &quot;AS-IS&quot;, WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>
                </div>
              </section>

              {/* 12. Limitation of Liability */}
              <section id="liability" ref={(el) => { sectionsRef.current[11] = el }} className={sectionCls}>
                <h2 className={h2Cls}>12. Limitation of Liability</h2>
                <p className={pCls}>To the maximum extent permitted by law:</p>
                <div className="mt-3 pl-5 py-2 border-l-2 border-accent/70 space-y-2">
                  <p className={pCls}>• Pentagon AI&apos;s total liability shall not exceed the fees paid by you in the three (3) months preceding the event giving rise to the claim</p>
                  <p className={pCls}>• Pentagon AI shall not be liable for indirect, incidental, consequential, or special damages, including loss of profits, data, or business</p>
                </div>
              </section>

              {/* 13. Indemnification */}
              <section id="indemnification" ref={(el) => { sectionsRef.current[12] = el }} className={sectionCls}>
                <h2 className={h2Cls}>13. Indemnification</h2>
                <p className={pCls}>You agree to indemnify and hold harmless Pentagon AI from any claims, damages, losses, or expenses arising from:</p>
                <ul className={`${listCls} mt-2`}>
                  <li>Your misuse of the Services</li>
                  <li>Your violation of applicable laws</li>
                  <li>Your deployment or configuration of AI behavior</li>
                </ul>
              </section>

              {/* 14. Communications */}
              <section id="communications" ref={(el) => { sectionsRef.current[13] = el }} className={sectionCls}>
                <h2 className={h2Cls}>14. Communications</h2>
                <p className={pCls}>You authorize Pentagon AI to contact you using the contact information you provide, including by email, phone, or text, for service-related communications. You are responsible for any carrier or messaging fees.</p>
              </section>

              {/* 15. General Provisions */}
              <section id="general" ref={(el) => { sectionsRef.current[14] = el }} className={sectionCls}>
                <h2 className={h2Cls}>15. General Provisions</h2>
                <ul className={listCls}>
                  <li>You represent that you have the authority to enter into these Terms</li>
                  <li>Pentagon AI may update these Terms from time to time; continued use constitutes acceptance</li>
                  <li>These Terms constitute the entire agreement between the parties and supersede prior agreements</li>
                  <li>You may not assign these Terms without prior written consent; Pentagon AI may assign freely</li>
                </ul>
              </section>

              {/* 16. Governing Law */}
              <section id="governing-law" ref={(el) => { sectionsRef.current[15] = el }} className={sectionCls}>
                <h2 className={h2Cls}>16. Governing Law and Jurisdiction</h2>
                <p className={pCls}>These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein. The courts located in Toronto, Ontario shall have exclusive jurisdiction.</p>
              </section>

              {/* 17. Contact */}
              <section id="contact" ref={(el) => { sectionsRef.current[16] = el }} className={sectionCls}>
                <h2 className={h2Cls}>17. Contact Information</h2>
                <p className={pCls}>If you have any questions about these Terms, please contact us:</p>
                <div className="mt-4 pl-5 py-2 border-l-2 border-accent/70">
                  <p className="font-bold mb-2">Pentagon AI</p>
                  <p className="text-sm text-zinc-300">Email: <a href="mailto:info@pentagonai.co" className="text-accent hover:underline">info@pentagonai.co</a></p>
                </div>
              </section>

              {/* Bottom CTA */}
              <div className="mt-12 pl-5 py-2 border-l-2 border-accent/70 text-center">
                <h3 className="text-xl font-bold mb-2">Have Questions About Our Terms?</h3>
                <p className="text-sm text-zinc-400 max-w-lg mx-auto mb-6">Our team is here to help clarify any concerns.</p>
                <Link href="/contact" className="inline-block px-6 py-3 rounded-[62.5rem] text-sm font-bold text-white transition-all hover:brightness-110" style={{ background: "#D4FF00", color: "#0a0a0a" }}>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
      </section>

      
    </div>
  )
}
