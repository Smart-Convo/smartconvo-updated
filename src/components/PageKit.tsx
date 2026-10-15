import React from "react"
import { Link } from "react-router-dom"
import { ArrowUpRight, LayoutDashboard } from "lucide-react"
import { DASHBOARD_URL } from "../lib/links"

export const FONT = '"Bricolage Grotesque", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'

/** Small uppercase label with a leading rule. Not a pill. */
export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-[11px] sm:text-[12px] font-medium tracking-[0.22em] uppercase text-zinc-500 ${className}`}>
      <span className="h-px w-7 bg-accent" />
      {children}
    </div>
  )
}

/** Gradient accent text that stays readable in light and dark. */
export function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-[#D4FF00] to-accent-2 light:from-[#5b21b6] light:to-[#8b5cf6] bg-clip-text text-transparent pb-[0.08em]">
      {children}
    </span>
  )
}

export function PrimaryButton({ to, children, className = "" }: { to: string; children: React.ReactNode; className?: string }) {
  return (
    <Link to={to} className={`group inline-flex items-center gap-2.5 h-[48px] sm:h-[54px] pl-6 pr-1.5 rounded-full bg-[#D4FF00] text-zinc-950 text-[14px] sm:text-[15px] font-semibold shadow-[0_10px_34px_rgba(212,255,0,0.35)] ${className}`}>
      {children}
      <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-950 text-[#D4FF00] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
        <ArrowUpRight className="w-4 h-4" strokeWidth={2.4} />
      </span>
    </Link>
  )
}

/** The prominent link to the live product. Opens in a new tab. */
export function DashboardButton({ className = "", label = "Open dashboard" }: { className?: string; label?: string }) {
  return (
    <a
      href={DASHBOARD_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2.5 h-[48px] sm:h-[54px] px-5 sm:px-6 rounded-full border-2 border-white/25 hover:border-[#D4FF00] light:hover:border-[#6d28d9] text-white hover:text-[#D4FF00] light:hover:text-[#6d28d9] text-[14px] sm:text-[15px] font-semibold transition-colors ${className}`}
    >
      <LayoutDashboard className="w-[18px] h-[18px]" strokeWidth={2} />
      {label}
      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.4} />
    </a>
  )
}
