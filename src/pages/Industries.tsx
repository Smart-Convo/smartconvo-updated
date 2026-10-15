import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import StackedCards from "../components/StackedCards.jsx"
import { SmartConvoMark } from "../components/SmartConvoLogo.jsx"
import { useTheme } from "../components/ThemeProvider.jsx"
import { Eyebrow, Accent, PrimaryButton, DashboardButton, FONT } from "../components/PageKit"

const industries = [
  {
    id: "government",
    name: "Municipal Government",
    shortName: "Government",
    tagline: "Automate citizen services from first ring to resolution",
    accentColor: "#7C9BFF",
    accentBg: "bg-[#7C9BFF10]",
    accentBorder: "border-[#7C9BFF30]",
    accentText: "text-[#7C9BFF] light:text-[#3446b8]",
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

/* ---- per-industry look (dark / light accent) ---- */
const LOOK: Record<string, { dark: string; light: string; stats: { v: string; l: string }[] }> = {
  government: { dark: "#7C9BFF", light: "#3446b8", stats: [{ v: "6", l: "workflows" }, { v: "5 days", l: "to go live" }, { v: "24/7", l: "coverage" }] },
  healthcare: { dark: "#34d399", light: "#047857", stats: [{ v: "6", l: "workflows" }, { v: "HIPAA", l: "ready" }, { v: "24/7", l: "coverage" }] },
  restaurants: { dark: "#fb923c", light: "#c2410c", stats: [{ v: "6", l: "workflows" }, { v: "POS", l: "orders synced" }, { v: "24/7", l: "coverage" }] },
}

function useBreakpoint() {
  const [w, setW] = useState(() => (typeof window === "undefined" ? 1280 : window.innerWidth))
  useEffect(() => {
    const on = () => setW(window.innerWidth)
    window.addEventListener("resize", on)
    return () => window.removeEventListener("resize", on)
  }, [])
  return { isPhone: w < 640, isDesktop: w >= 1024 }
}

/* ---- 3D rotating carousel of an industry's use cases ---- */
function Cylinder({ items, accent, compact }: { items: any[]; accent: string; compact: boolean }) {
  const n = items.length
  const cw = compact ? 206 : 268
  const ch = compact ? 262 : 318
  const radius = Math.round(cw / 2 / Math.tan(Math.PI / n)) + 14
  return (
    <div className="relative mx-auto mt-6 lg:mt-0" style={{ width: "100%", height: ch + 34, perspective: compact ? 1600 : 1800 }}>
      <div
        className="cyl-spin absolute left-1/2 top-4"
        style={{ width: cw, height: ch, marginLeft: -cw / 2, transformStyle: "preserve-3d" }}
      >
        {items.map((d, i) => (
          <div
            key={d.title}
            className="absolute inset-0 rounded-[22px] border border-white/10 bg-panel-2 p-4 sm:p-5 flex flex-col shadow-[0_20px_50px_-26px_rgba(0,0,0,0.8)] light:shadow-[0_20px_50px_-26px_rgba(60,30,120,0.35)]"
            style={{
              transform: `rotateY(${(360 / n) * i}deg) translateZ(${radius}px)`,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              backgroundImage: `linear-gradient(160deg, ${accent}1f, transparent 55%)`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono tracking-wider" style={{ color: accent }}>{String(i + 1).padStart(2, "0")}</span>
              <span className="h-px flex-1" style={{ background: `${accent}55` }} />
            </div>
            <h4 className="mt-4 text-[16px] sm:text-[18px] font-semibold tracking-tight text-white leading-snug">{d.title}</h4>
            <p className={`mt-1.5 text-zinc-400 leading-relaxed ${compact ? "text-[11.5px] line-clamp-4" : "text-[13px] line-clamp-4"}`}>{d.description}</p>
            <ul className="mt-auto pt-3 space-y-1 border-t border-white/10">
              {d.capabilities.slice(0, compact ? 2 : 3).map((c: string) => (
                <li key={c} className="flex items-center gap-2 text-[10.5px] sm:text-[11.5px] text-zinc-300">
                  <span className="w-3 h-px shrink-0" style={{ background: accent }} />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function Panel({ ind, idx, total, isLight, isPhone }: { ind: any; idx: number; total: number; isLight: boolean; isPhone: boolean }) {
  const look = LOOK[ind.id]
  const accent = isLight ? look.light : look.dark
  return (
    <article
      className="relative overflow-hidden rounded-[26px] sm:rounded-[36px] border border-white/10 bg-panel shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] light:shadow-[0_40px_90px_-40px_rgba(60,30,120,0.35)]"
      style={{ height: "var(--stack-slot)", minHeight: isPhone ? 600 : 560 }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(60% 70% at 85% 0%, ${accent}2e, transparent 70%), radial-gradient(50% 60% at 0% 100%, ${accent}1a, transparent 70%)` }} />
      <span className="pointer-events-none absolute right-5 sm:right-10 top-2 sm:top-3 text-[110px] sm:text-[220px] leading-none font-extrabold tracking-tighter select-none" style={{ color: accent, opacity: 0.09 }}>
        0{idx + 1}
      </span>
      <div className="relative h-full grid lg:grid-cols-12 gap-3 lg:gap-6 items-center p-5 sm:p-10 lg:p-12 content-start lg:content-center">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 sm:w-10" style={{ background: accent }} />
            <span className="text-[11px] sm:text-[12px] font-medium tracking-[0.2em] uppercase" style={{ color: accent }}>
              {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <h2 className="mt-4 sm:mt-6 text-[34px] sm:text-[56px] lg:text-[64px] font-semibold tracking-[-0.04em] leading-[0.98] text-white">{ind.name}</h2>
          <p className="mt-3 sm:mt-5 text-[14px] sm:text-[18px] leading-relaxed text-zinc-400 max-w-md">{ind.tagline}</p>
          <dl className="mt-5 sm:mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-4 max-w-md">
            {look.stats.map((s) => (
              <div key={s.l}>
                <dt className="text-[18px] sm:text-[26px] font-semibold tracking-tight text-white leading-none" style={{ color: accent }}>{s.v}</dt>
                <dd className="mt-1.5 text-[10.5px] sm:text-[12px] text-zinc-500">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="lg:col-span-7 min-w-0 mt-1">
          <Cylinder items={ind.departments} accent={accent} compact={isPhone} />
          <p className="mt-2 text-center text-[10.5px] tracking-[0.18em] uppercase text-zinc-500">Hover to pause</p>
        </div>
      </div>
    </article>
  )
}

const VALUE = [
  { t: "24/7 availability", d: "Every call answered around the clock. No hold music, no voicemail, no missed revenue.", big: true },
  { t: "Live in 5 days", d: "From sign-up to fully operational in 5 days and 45 minutes of your time." },
  { t: "HIPAA & GDPR ready", d: "Enterprise-grade security and compliance built in." },
  { t: "Custom workflows", d: "Trained on your terminology, processes and escalation paths." },
  { t: "Real-time analytics", d: "Live call volumes, resolution rates and revenue recovered.", big: true },
  { t: "Multi-language", d: "Handles diverse accents and languages fluently." },
]

export default function IndustriesPage() {
  const { isLight } = useTheme()
  const { isPhone } = useBreakpoint()
  const industriesList = industries

  return (
    <div style={{ fontFamily: FONT }} className="overflow-x-clip">
      {/* ---------- Hero ---------- */}
      <section className="relative container-large pt-8 sm:pt-14 pb-12 sm:pb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          <div className="lg:col-span-8 text-center lg:text-left">
<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex justify-center lg:justify-start"><Eyebrow>Industries</Eyebrow></motion.div>
            <h1 className="mt-5 sm:mt-7 text-[42px] sm:text-[78px] lg:text-[96px] font-semibold tracking-[-0.045em] leading-[0.95] text-white">
              {["Built", "for", "the"].map((w, i) => (
                <motion.span key={w} className="inline-block mr-[0.22em]" initial={{ opacity: 0, y: 36, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                  {w}
                </motion.span>
              ))}
              <br />
              <motion.span className="inline-block" initial={{ opacity: 0, y: 36, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}>
                <Accent>industries that matter.</Accent>
              </motion.span>
            </h1>
            <p className="mt-5 sm:mt-8 max-w-xl mx-auto lg:mx-0 text-[14px] sm:text-[19px] leading-relaxed text-zinc-400">
              Purpose-built voice automation for government, healthcare and restaurants. Tailored workflows for each sector, live in 5 days.
            </p>
            <div className="mt-6 sm:mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <PrimaryButton to="/contact">Book a demo</PrimaryButton>
              <DashboardButton />
              
            </div>
          </div>

          {/* rotating ring */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-[230px] h-[230px] sm:w-[320px] sm:h-[320px]">
              <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full ring-spin">
                <defs>
                  <path id="ind-ring" d="M150,150 m-118,0 a118,118 0 1,1 236,0 a118,118 0 1,1 -236,0" />
                </defs>
                <text className="fill-current text-zinc-400" style={{ fontSize: 17, letterSpacing: "0.34em", fontWeight: 600 }}>
                  <textPath href="#ind-ring">GOVERNMENT • HEALTHCARE • RESTAURANTS • </textPath>
                </text>
              </svg>
              <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full ring-spin-rev">
                <circle cx="150" cy="150" r="84" fill="none" strokeWidth="1.2" strokeDasharray="2 9" strokeLinecap="round" style={{ stroke: "var(--color-accent)" }} />
              </svg>
              <div className="absolute inset-[26%] rounded-full border border-white/10 bg-panel flex items-center justify-center shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] light:shadow-[0_20px_50px_-20px_rgba(60,30,120,0.4)]">
                <SmartConvoMark size={isPhone ? 44 : 64} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Stacking industry panels ---------- */}
      <section className="container-large pb-8 sm:pb-16">
        <StackedCards step={isPhone ? 10 : 16} scaleStep={0.035} dimStep={0.14}>
          {industriesList.map((ind: any, i: number) => (
            <Panel key={ind.id} ind={ind} idx={i} total={industriesList.length} isLight={isLight} isPhone={isPhone} />
          ))}
        </StackedCards>
      </section>

      {/* ---------- One platform ---------- */}
      <section className="container-large py-12 sm:py-24">
        <div className="max-w-3xl">
          <Eyebrow>Why Smart Convo</Eyebrow>
          <h2 className="mt-4 text-[32px] sm:text-[60px] font-semibold tracking-[-0.04em] leading-[1] text-white">
            One platform.<br />
            <Accent>Every industry.</Accent>
          </h2>
        </div>
        <div className="mt-8 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[minmax(150px,auto)]">
          {VALUE.map((v, i) => (
            <motion.div
              key={v.t}
              initial={{ opacity: 0, y: 26, rotateX: -12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-[22px] sm:rounded-[28px] border border-white/10 bg-panel p-4 sm:p-7 flex flex-col justify-between hover:-translate-y-1 hover:border-[#D4FF00]/40 light:hover:border-[#7c3aed]/40 transition-all duration-300 ${v.big ? "col-span-2" : ""}`}
            >
              <span className="pointer-events-none absolute -top-16 -right-10 w-44 h-44 rounded-full bg-[#D4FF00]/0 group-hover:bg-[#D4FF00]/15 light:group-hover:bg-[#7c3aed]/15 blur-[60px] transition-colors duration-500" />
              <span className="relative text-[11px] font-mono text-zinc-500">0{i + 1}</span>
              <div className="relative mt-6">
                <h3 className={`font-semibold tracking-tight text-white ${v.big ? "text-[22px] sm:text-[30px]" : "text-[16px] sm:text-[20px]"}`}>{v.t}</h3>
                <p className="mt-1.5 text-[12px] sm:text-[14px] leading-relaxed text-zinc-400">{v.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="container-large pb-16 sm:pb-28">
        <div data-keep-dark className="relative overflow-hidden rounded-[28px] sm:rounded-[44px] bg-zinc-950 border border-white/10 px-6 py-12 sm:px-16 sm:py-20 text-center">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-[#D4FF00]/15 blur-[110px]" />
          <h2 className="relative text-[30px] sm:text-[56px] font-semibold tracking-[-0.04em] leading-[1] text-white">Ready to automate<br />your operations?</h2>
          <p className="relative mt-4 sm:mt-6 max-w-xl mx-auto text-[13px] sm:text-[17px] text-zinc-400">Tell us about your industry and we will show you exactly how Smart Convo can work for your team.</p>
          <div className="relative mt-7 sm:mt-10 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton to="/contact">Book a demo</PrimaryButton>
            <DashboardButton />
          </div>
        </div>
      </section>
    </div>
  )
}
