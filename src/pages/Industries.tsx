
import { useState } from "react"
import { SectionWrapper } from "../components/kit/SectionWrapper"
import { GradientText } from "../components/kit/GradientText"
import { SectionTag } from "../components/kit/SectionTag"
import { Button } from "../components/kit/Button"
import { TrustBadge } from "../components/kit/TrustBadge"

const industries = [
  {
    id: "government",
    name: "Municipal Government",
    shortName: "Government",
    tagline: "Automate citizen services from first ring to resolution",
    accentColor: "#7C9BFF",
    accentBg: "bg-[#7C9BFF10]",
    accentBorder: "border-[#7C9BFF30]",
    accentText: "text-[#7C9BFF]",
    hoverBorder: "hover:border-[#7C9BFF40]",
    activeBg: "bg-[#7C9BFF10]",
    activeBorder: "border-[#7C9BFF50]",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    departments: [
      {
        id: 0,
        title: "Water & Sewage",
        description: "Handle billing inquiries, report leaks, schedule meter reads, and manage service connection requests all automated and routed in real time.",
        capabilities: ["Billing & Payment Support", "Leak & Burst Reporting", "New Connection Requests", "Meter Read Scheduling"],
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
      },
      {
        id: 1,
        title: "Waste Management",
        description: "Residents can check pickup schedules, report missed collections, and request special bulk pickups through natural conversation.",
        capabilities: ["Pickup Schedule Info", "Missed Collection Reports", "Bulk Waste Requests", "Recycling Guidelines"],
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>,
      },
      {
        id: 2,
        title: "Roads & Infrastructure",
        description: "Pothole reporting, road closure info, sidewalk repairs, and construction updates captured and routed automatically.",
        capabilities: ["Pothole & Damage Reports", "Road Closure Updates", "Sidewalk Repair Requests", "Construction Schedules"],
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/></svg>,
      },
      {
        id: 3,
        title: "Parks & Recreation",
        description: "Facility bookings, program registration, park maintenance requests, and event info all handled conversationally.",
        capabilities: ["Facility Reservations", "Program Registration", "Maintenance Requests", "Event Information"],
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76l-7.24 8"/></svg>,
      },
      {
        id: 4,
        title: "Utilities & Energy",
        description: "Outage reporting, billing questions, energy efficiency programs, and service transfers instant AI responses.",
        capabilities: ["Outage Reporting", "Bill Inquiries", "Efficiency Programs", "Service Transfers"],
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
      },
      {
        id: 5,
        title: "Transit & Transport",
        description: "Route information, pass purchases, accessibility inquiries, and service alerts delivered in real time by AI.",
        capabilities: ["Route & Schedule Info", "Pass & Fare Inquiries", "Accessibility Support", "Service Alerts"],
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>,
      },
    ],
  },
  {
    id: "healthcare",
    name: "Hospitals & Clinics",
    shortName: "Healthcare",
    tagline: "Transform patient communications with 24/7 AI support",
    accentColor: "#059669",
    accentBg: "bg-[#05966910]",
    accentBorder: "border-[#05966930]",
    accentText: "text-[#059669]",
    hoverBorder: "hover:border-[#05966940]",
    activeBg: "bg-[#05966910]",
    activeBorder: "border-[#05966950]",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    departments: [
      {
        id: 0,
        title: "Appointment Scheduling",
        description: "AI handles the full booking cycle new appointments, reschedules, cancellations, and automated reminders freeing your front desk entirely.",
        capabilities: ["New Appointment Booking", "Reschedule & Cancellation", "Automated Reminders", "Waitlist Management"],
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
      },
      {
        id: 1,
        title: "Patient Inquiries",
        description: "Answer common patient questions instantly insurance coverage, test result availability, medication queries, and referral status without hold times.",
        capabilities: ["Insurance Verification", "Test Result Status", "Medication Questions", "Referral Tracking"],
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>,
      },
      {
        id: 2,
        title: "After Hours Support",
        description: "Provide 24/7 coverage for non emergency calls prescription refill requests, advice line routing, symptom triage, and on call escalation.",
        capabilities: ["Prescription Refill Requests", "On Call Escalation", "Symptom Triage", "After Hours Guidance"],
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      },
      {
        id: 3,
        title: "Billing & Insurance",
        description: "Handle billing inquiries, explain EOBs, set up payment plans, and guide patients through insurance claims reducing front desk workload dramatically.",
        capabilities: ["Billing Inquiries", "Payment Plans", "EOB Explanations", "Claims Guidance"],
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
      },
      {
        id: 4,
        title: "Emergency Routing",
        description: "Intelligently classify inbound calls and route emergencies to the right team instantly ensuring zero delays when patient safety is on the line.",
        capabilities: ["Emergency Escalation", "Urgent Call Routing", "Department Transfer", "911 Guidance"],
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
      },
      {
        id: 5,
        title: "Staff Coordination",
        description: "Streamline internal communications shift coverage, duty scheduling, department announcements, and staff notifications all handled through AI.",
        capabilities: ["Shift Coverage", "Duty Scheduling", "Internal Notifications", "Department Announcements"],
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
      },
    ],
  },
  {
    id: "restaurants",
    name: "Restaurants",
    shortName: "Restaurants",
    tagline: "Never miss a reservation, order, or revenue opportunity",
    accentColor: "#ea580c",
    accentBg: "bg-[#ea580c10]",
    accentBorder: "border-[#ea580c30]",
    accentText: "text-[#ea580c]",
    hoverBorder: "hover:border-[#ea580c40]",
    activeBg: "bg-[#ea580c10]",
    activeBorder: "border-[#ea580c50]",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    departments: [
      {
        id: 0,
        title: "Reservations & Bookings",
        description: "AI manages your entire reservation flow table bookings, party sizes, special seating requests, and cancellations with zero hold times, day or night.",
        capabilities: ["Table Reservations", "Party & Event Bookings", "Special Requests", "Cancellation Handling"],
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>,
      },
      {
        id: 1,
        title: "Phone Orders",
        description: "Take complete phone orders with item customization, upselling suggestions, and secure payment processing like your best server, available 24/7.",
        capabilities: ["Full Order Taking", "Item Customization", "Upselling & Add ons", "Payment via SMS Link"],
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
      },
      {
        id: 2,
        title: "Customer Inquiries",
        description: "Answer menu questions, allergen queries, opening hours, location info, and daily specials instantly and accurately every time, without tying up staff.",
        capabilities: ["Menu & Pricing Info", "Allergen Questions", "Opening Hours", "Daily Specials"],
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>,
      },
      {
        id: 3,
        title: "Delivery & Pickup",
        description: "Coordinate delivery and curbside pickup confirm ETAs, handle order changes, communicate delays, and update customers proactively without staff involvement.",
        capabilities: ["Order Confirmation", "ETA Updates", "Order Modifications", "Curbside Coordination"],
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
      },
      {
        id: 4,
        title: "Feedback & Recovery",
        description: "Capture post visit feedback, route complaints to the right manager immediately, and turn negative experiences into loyal customers automatically.",
        capabilities: ["Post Visit Feedback", "Complaint Routing", "Manager Escalation", "Recovery Offers"],
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
      },
      {
        id: 5,
        title: "Catering & Events",
        description: "Handle all catering inquiries, large event bookings, custom menu requests, and deposit collection turning every large inquiry into confirmed revenue.",
        capabilities: ["Catering Inquiries", "Event Bookings", "Custom Menu Requests", "Deposit Handling"],
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
      },
    ],
  },
]

export default function IndustriesPage() {
  const [activeIndustryId, setActiveIndustryId] = useState("government")
  const [activeDept, setActiveDept] = useState(0)

  const activeIndustry = industries.find((i) => i.id === activeIndustryId)!
  const activeDeptData = activeIndustry.departments[activeDept]

  const handleIndustrySwitch = (id: string) => {
    setActiveIndustryId(id)
    setActiveDept(0)
  }

  return (
    <div>
      

      {/* ── Hero ── */}
      <section className="pt-10 sm:pt-16 pb-10 sm:pb-16">
        <div className="container-large text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mt-4 mb-4 leading-tight">
            Built for the <GradientText>Industries That Matter</GradientText>
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Pentagon AI delivers purpose built voice automation for government, healthcare, and restaurants tailored workflows for each sector, live in 5 days.
          </p>
        </div>
      </section>

      {/* ── Industry Selector + Department Explorer ── */}
      <SectionWrapper bg="peach" rounded overlaps>
        <div className="animate-on-scroll space-y-6 sm:space-y-8">

          {/* Industry Picker Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {industries.map((industry) => {
              const isActive = activeIndustryId === industry.id
              return (
                <button
                  key={industry.id}
                  onClick={() => handleIndustrySwitch(industry.id)}
                  className={`relative text-left rounded-[1.25rem] sm:rounded-[1.5rem] border-2 p-5 sm:p-6 transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? `${industry.activeBg} ${industry.activeBorder} shadow-lg`
                      : "bg-zinc-900/70 border-white/10 hover:border-white/20 hover:shadow-md"
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-[1.25rem]"
                      style={{ background: industry.accentColor }}
                    />
                  )}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isActive ? industry.accentBg : "bg-white/[0.06]"
                      }`}
                      style={{ color: isActive ? industry.accentColor : "#8d8d8d" }}
                    >
                      {industry.icon}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border transition-all ${
                        isActive
                          ? `${industry.accentBg} ${industry.accentText} ${industry.accentBorder}`
                          : "bg-white/[0.06] text-zinc-400 border-transparent"
                      }`}
                    >
                      {industry.departments.length} use cases
                    </span>
                  </div>
                  <p
                    className={`text-base sm:text-lg font-black mb-1 transition-colors ${
                      isActive ? industry.accentText : "text-white"
                    }`}
                  >
                    {industry.name}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-snug">
                    {industry.tagline}
                  </p>
                </button>
              )
            })}
          </div>

          {/* Department Explorer */}
          <div className="grid lg:grid-cols-[260px_1fr] gap-4 sm:gap-6">
            {/* Sidebar Tabs */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-[var(--global-padding)] px-[var(--global-padding)] lg:mx-0 lg:px-0 scrollbar-none">
              {activeIndustry.departments.map((dept) => {
                const isActive = activeDept === dept.id
                return (
                  <button
                    key={dept.id}
                    onClick={() => setActiveDept(dept.id)}
                    className={`flex items-center gap-2 sm:gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 shrink-0 cursor-pointer border ${
                      isActive
                        ? `${activeIndustry.activeBg} ${activeIndustry.activeBorder}`
                        : `bg-zinc-900/70 border-white/10 text-zinc-400 ${activeIndustry.hoverBorder} hover:text-zinc-300`
                    }`}
                  >
                    <span
                      className="[&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5 flex-shrink-0"
                      style={{ color: isActive ? activeIndustry.accentColor : "#8d8d8d" }}
                    >
                      {dept.icon}
                    </span>
                    <span
                      className="text-xs sm:text-sm font-medium whitespace-nowrap"
                      style={{ color: isActive ? activeIndustry.accentColor : undefined }}
                    >
                      {dept.title}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Detail Panel */}
            <div className="bg-zinc-900/70 rounded-[1.25rem] sm:rounded-[1.5rem] border border-white/10 p-6 sm:p-8 lg:p-10 min-h-[280px] transition-all duration-300">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 border"
                  style={{
                    backgroundColor: `${activeIndustry.accentColor}12`,
                    borderColor: `${activeIndustry.accentColor}30`,
                    color: activeIndustry.accentColor,
                  }}
                >
                  {activeDeptData.icon}
                </div>
                <div>
                  <p
                    className="text-[11px] font-bold uppercase tracking-wider mb-0.5"
                    style={{ color: activeIndustry.accentColor }}
                  >
                    {activeIndustry.shortName}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black text-white">{activeDeptData.title}</h3>
                </div>
              </div>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 max-w-2xl">
                {activeDeptData.description}
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {activeDeptData.capabilities.map((cap, i) => (
                  <span
                    key={i}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-medium border transition-all duration-200"
                    style={{
                      backgroundColor: `${activeIndustry.accentColor}08`,
                      borderColor: `${activeIndustry.accentColor}25`,
                      color: "#d4d4d8",
                    }}
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Shared Value Props ── */}
      <SectionWrapper bg="warm-grey" rounded overlaps>
        <div className="animate-on-scroll">
          <div className="text-center mb-10 sm:mb-14">
            <SectionTag>Why Pentagon AI</SectionTag>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-4 mb-4">
              One platform. <GradientText>Every industry.</GradientText>
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto">
              Regardless of sector, every Pentagon AI deployment shares the same enterprise grade foundation.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                title: "24/7 Availability",
                description: "Your AI agent answers every call around the clock no hold music, no voicemail, no missed revenue.",
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
                title: "Live in 5 Days",
                description: "From sign up to fully operational our onboarding takes just 5 days and 45 minutes of your time.",
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                title: "HIPAA & GDPR Ready",
                description: "Enterprise grade security and compliance baked in your data and your customers' data stay protected.",
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
                title: "Custom Workflows",
                description: "Every agent is trained on your specific business your terminology, your processes, your escalation paths.",
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
                title: "Real Time Analytics",
                description: "A live dashboard shows call volumes, resolution rates, escalations, and revenue recovered always visible.",
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                title: "Multi Language Support",
                description: "Handles diverse accents and languages fluently ensuring every caller is understood and served equally.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-zinc-900/70 rounded-[1rem] border border-white/10 p-5 sm:p-6 hover:border-[#D4FF00]/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#7C9BFF10] flex items-center justify-center text-[#D4FF00] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-[15px] font-bold mb-2 group-hover:text-[#D4FF00] transition-colors">{item.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── CTA ── */}
      <section className="relative bg-zinc-900/60 border-y border-white/10 py-16 sm:py-24 overflow-hidden">
        
        <div className="container-large relative z-10 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 sm:mb-6">
            Ready to automate your operations?
          </h2>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8">
            Tell us about your industry and we&apos;ll show you exactly how Pentagon AI can work for your team.
          </p>
          <Button variant="gradient" size="lg" href="/contact">
            Book a Demo
          </Button>
          <div className="mt-6">
            <TrustBadge
              text="Serving government, healthcare, and restaurants across Canada"
              className="justify-center text-white/80 [&_span]:text-white/80"
            />
          </div>
        </div>
      </section>

      
    </div>
  )
}
