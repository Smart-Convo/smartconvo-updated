
import { useEffect, useRef, useState } from "react"
import Link from "../components/kit/NextLink"
import { GradientText } from "../components/kit/GradientText"

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
          <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider mb-3">Legal / Terms</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4">
            Terms and <GradientText>Conditions</GradientText>
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4FF00]" />
              Effective Date: August 25, 2025
            </div>
            <span>Last Updated: November 20, 2025</span>
          </div>

          {/* Important Notice */}
          <div className="mt-8 p-6 border border-accent/20 rounded-xl bg-white/[0.04]">
            <p className="text-accent font-bold text-sm mb-2">Important Notice</p>
            <p className={pCls}>
              These Terms and Conditions constitute a legally binding agreement between Pentagon AI and you. By accessing, registering for, or using the Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must not access or use the Services.
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
                {sections.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-xs transition-all duration-200 cursor-pointer ${
                      activeSection === s.id
                        ? "bg-[#D4FF00]/10 text-accent font-bold border-l-2 border-accent"
                        : "text-zinc-400 hover:text-zinc-300 hover:bg-white/[0.06]"
                    }`}
                  >
                    <span className="text-zinc-400 mr-1">{i + 1}.</span> {s.title}
                  </button>
                ))}
              </div>
            </nav>

            {/* Content */}
            <div className="bg-zinc-900/70 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 md:p-12 shadow-sm">

              {/* 1. The Services */}
              <section id="services" ref={(el) => { sectionsRef.current[0] = el }} className={sectionCls} style={{ borderTop: "none" }}>
                <h2 className={h2Cls}>1. The Services</h2>

                <h3 className={h3Cls}>1.1 Overview</h3>
                <p className={pCls}>Pentagon AI provides artificial intelligence–powered voice and conversational automation services, which may include inbound and outbound voice agents, call handling, transcription, analytics, dashboards, APIs, and integrations with third-party systems such as telephony providers, point-of-sale platforms, CRMs, or other software tools (collectively, the &quot;Services&quot;).</p>
                <p className={`${pCls} mt-2`}>The Services may be used by municipalities, restaurants, enterprises, and individual consumers, subject to these Terms.</p>

                <h3 className={h3Cls}>1.2 License Grant</h3>
                <p className={pCls}>Subject to compliance with these Terms, Pentagon AI grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Services solely for your internal business or personal purposes during the term of this Agreement.</p>
                <div className="mt-3 p-4 border border-white/10 rounded-xl bg-white/[0.04]">
                  <p className="text-xs text-zinc-400 mb-2 font-medium">You may not:</p>
                  <ul className={listCls}>
                    <li>• Copy, modify, or create derivative works of the Services</li>
                    <li>• Reverse engineer, decompile, or disassemble any portion of the Services</li>
                    <li>• Resell, sublicense, lease, or otherwise commercially exploit the Services without written authorization</li>
                    <li>• Use the Services for unlawful, deceptive, abusive, or fraudulent purposes</li>
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
                  <li>• Fees are billed on a recurring basis</li>
                  <li>• Fees are non-refundable</li>
                  <li>• You are responsible for all applicable taxes, excluding Pentagon AI&apos;s income taxes</li>
                  <li>• Any billing disputes must be reported within one hundred twenty (120) days of the applicable charge</li>
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
                  <li>• Violate these Terms</li>
                  <li>• Use the Services in a manner that harms or risks harm to Pentagon AI, its intellectual property, or reputation</li>
                  <li>• Exceed normal, reasonable, or agreed-upon usage limits</li>
                  <li>• Engage in unlawful, fraudulent, or abusive conduct</li>
                  <li>• Become insolvent, bankrupt, or subject to similar proceedings</li>
                </ul>

                <h3 className={h3Cls}>4.2 Termination by You</h3>
                <p className={pCls}>You may terminate your use of the Services at any time. Termination will take effect at the end of the current billing cycle. Fees already paid are non-refundable.</p>
              </section>

              {/* 5. AI Limitations */}
              <section id="ai-limitations" ref={(el) => { sectionsRef.current[4] = el }} className={sectionCls}>
                <h2 className={h2Cls}>5. Artificial Intelligence and Service Limitations</h2>
                <p className={pCls}>You acknowledge and agree that:</p>
                <div className="mt-3 p-4 border border-[#f5a623]/30 rounded-xl bg-[#f5a623]/5">
                  <ul className={listCls}>
                    <li>• The Services rely on artificial intelligence and automated decision-making</li>
                    <li>• AI responses may be inaccurate, incomplete, delayed, or inappropriate</li>
                    <li>• The Services are provided &quot;as-is&quot; and &quot;as available&quot;, without guarantees of accuracy or performance</li>
                    <li>• You are solely responsible for reviewing, configuring, monitoring, and validating AI behavior and outputs before relying on them</li>
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
                  <li>• Providing any required disclosures to callers</li>
                  <li>• Obtaining lawful consent for recording or transcription</li>
                  <li>• Complying with all applicable recording, privacy, and data protection laws</li>
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
                  <li>• Is publicly available without breach</li>
                  <li>• Was lawfully known prior to disclosure</li>
                  <li>• Is independently developed</li>
                  <li>• Is lawfully obtained from a third party</li>
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
                  <li>• Maintaining accurate account information</li>
                  <li>• Safeguarding account credentials</li>
                  <li>• All activity conducted under your account</li>
                  <li>• Promptly notifying Pentagon AI of unauthorized access</li>
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
                <div className="p-4 border border-accent/20 rounded-xl bg-white/[0.04]">
                  <p className={pCls}>TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICES ARE PROVIDED &quot;AS-IS&quot;, WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>
                </div>
              </section>

              {/* 12. Limitation of Liability */}
              <section id="liability" ref={(el) => { sectionsRef.current[11] = el }} className={sectionCls}>
                <h2 className={h2Cls}>12. Limitation of Liability</h2>
                <p className={pCls}>To the maximum extent permitted by law:</p>
                <div className="mt-3 p-4 border border-accent/20 rounded-xl bg-white/[0.04] space-y-2">
                  <p className={pCls}>• Pentagon AI&apos;s total liability shall not exceed the fees paid by you in the three (3) months preceding the event giving rise to the claim</p>
                  <p className={pCls}>• Pentagon AI shall not be liable for indirect, incidental, consequential, or special damages, including loss of profits, data, or business</p>
                </div>
              </section>

              {/* 13. Indemnification */}
              <section id="indemnification" ref={(el) => { sectionsRef.current[12] = el }} className={sectionCls}>
                <h2 className={h2Cls}>13. Indemnification</h2>
                <p className={pCls}>You agree to indemnify and hold harmless Pentagon AI from any claims, damages, losses, or expenses arising from:</p>
                <ul className={`${listCls} mt-2`}>
                  <li>• Your misuse of the Services</li>
                  <li>• Your violation of applicable laws</li>
                  <li>• Your deployment or configuration of AI behavior</li>
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
                  <li>• You represent that you have the authority to enter into these Terms</li>
                  <li>• Pentagon AI may update these Terms from time to time; continued use constitutes acceptance</li>
                  <li>• These Terms constitute the entire agreement between the parties and supersede prior agreements</li>
                  <li>• You may not assign these Terms without prior written consent; Pentagon AI may assign freely</li>
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
                <div className="mt-4 p-6 border border-accent/20 rounded-xl bg-white/[0.04]">
                  <p className="font-bold mb-2">Pentagon AI</p>
                  <p className="text-sm text-zinc-300">Email: <a href="mailto:info@pentagonai.co" className="text-accent hover:underline">info@pentagonai.co</a></p>
                </div>
              </section>

              {/* Bottom CTA */}
              <div className="mt-12 p-8 border border-accent/20 rounded-[1.5rem] bg-white/[0.04] text-center">
                <h3 className="text-xl font-bold mb-2">Have Questions About Our Terms?</h3>
                <p className="text-sm text-zinc-400 max-w-lg mx-auto mb-6">Our team is here to help clarify any concerns.</p>
                <Link href="/contact" className="inline-block px-6 py-3 rounded-[62.5rem] text-sm font-bold text-white transition-all hover:brightness-110" style={{ background: "#D4FF00", color: "#0a0a0a" }}>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  )
}
