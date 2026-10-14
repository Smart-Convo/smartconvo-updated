import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Check, Mail } from 'lucide-react';
import { SmartConvoMark } from './SmartConvoLogo';
import { sendLead, roiText } from '../lib/sendLead';

const INDUSTRIES = [
  'Real estate', 'Retail & e-commerce', 'Healthcare', 'Hospitals & clinics', 'Government', 'Restaurants',
  'Hospitality & hotels', 'Automotive', 'Banking & finance', 'Insurance', 'Telecom', 'Education',
  'Logistics & delivery', 'Travel & tourism', 'Legal services', 'Fitness & wellness', 'Home services', 'Other',
];
const CALL_VOLUMES = ['Under 500', '500 – 2,000', '2,000 – 10,000', '10,000+'];

const clean = (str = '') => str.replace(/<[^>]*>?/gm, '').trim();

const inputCls =
  'w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-[15px] text-white placeholder:text-zinc-600 focus:outline-none focus:border-accent/70 focus:bg-white/[0.06] focus:ring-4 focus:ring-accent/10 transition-all aria-[invalid=true]:border-rose-400/50 aria-[invalid=true]:bg-rose-500/[0.04]';

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="block text-[12px] font-medium tracking-wide text-zinc-400 mb-2">{label}</span>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.span
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 6 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="block text-[12.5px] text-rose-300/90 overflow-hidden"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

function Chips({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`px-4 py-2.5 rounded-full text-[13.5px] font-medium border transition-all cursor-pointer ${
              on
                ? 'bg-[#D4FF00] text-zinc-950 border-accent shadow-[0_0_24px_rgba(212,255,0,0.25)]'
                : 'bg-white/[0.04] text-zinc-300 border-white/10 hover:border-white/25 hover:text-white'
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function IndustryList({ options, value, onChange, invalid }) {
  const [atBottom, setAtBottom] = useState(false);
  const onScroll = (e) => {
    const el = e.currentTarget;
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 6);
  };

  return (
    <div className={`relative rounded-2xl border bg-white/[0.03] transition-colors ${invalid ? 'border-rose-400/50' : 'border-white/10'}`}>
      <div
        onScroll={onScroll}
        role="listbox"
        aria-label="Industry"
        className="max-h-[188px] overflow-y-auto overscroll-contain p-1.5 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.18)_transparent]"
      >
        {options.map((o) => {
          const on = value === o;
          return (
            <button
              key={o}
              type="button"
              role="option"
              aria-selected={on}
              onClick={() => onChange(o)}
              className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-left text-[14.5px] transition-colors cursor-pointer ${
                on ? 'bg-[#D4FF00] text-zinc-950 font-medium' : 'text-zinc-300 hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              <span>{o}</span>
              {on && <Check className="w-4 h-4" strokeWidth={3} />}
            </button>
          );
        })}
      </div>
      {/* bottom fade hint that more options are below */}
      <div className={`pointer-events-none absolute inset-x-1.5 bottom-1.5 h-8 rounded-b-xl bg-gradient-to-t from-[#0b0c0f] to-transparent transition-opacity ${atBottom ? 'opacity-0' : 'opacity-100'}`} />
    </div>
  );
}

export default function LeadModal({ isOpen, onClose, calculatorData }) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const [errors, setErrors] = useState({});
  const [failed, setFailed] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    industry: '',
    industryOther: '',
    monthlyCalls: '',
    notes: '',
    hp_field: '',
  });
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => (er[k] ? { ...er, [k]: undefined } : er));
  };

  // Prefill from ROI calculator
  useEffect(() => {
    if (!calculatorData) return;
    setForm((f) => {
      const next = { ...f };
      const ind = (calculatorData.industry || '').toLowerCase();
      if (!f.industry) {
        if (ind.includes('real')) next.industry = 'Real estate';
        else if (ind.includes('retail') || ind.includes('commerce')) next.industry = 'Retail & e-commerce';
        else if (ind.includes('health') || ind.includes('clinic')) next.industry = 'Healthcare';
      }
      return next;
    });
  }, [calculatorData]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const next = () => {
    const name = clean(form.fullName);
    const email = clean(form.email).toLowerCase();
    const digits = clean(form.phone).replace(/\D/g, '');
    const e = {};
    if (name.length < 2) e.fullName = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'That email doesn\'t look right.';
    if (digits.length < 7 || digits.length > 16) e.phone = 'Enter a valid phone number.';
    if (clean(form.companyName).length < 2) e.companyName = 'Please enter your company.';
    setErrors(e);
    if (Object.keys(e).length === 0) setStep(2);
  };

  const finalIndustry = form.industry === 'Other' ? (clean(form.industryOther) || 'Other') : form.industry;

  const submit = async (ev) => {
    ev.preventDefault();
    if (step === 1) { next(); return; } // Enter on step 1 = Continue, never a half-filled submit
    if (status === 'loading') return;
    setFailed(false);
    if (form.hp_field) { setStatus('success'); return; } // bot trap
    const e = {};
    if (!form.industry) e.industry = 'Pick the closest match.';
    if (form.industry === 'Other' && clean(form.industryOther).length < 2) e.industryOther = 'Tell us your industry.';
    if (!form.monthlyCalls) e.monthlyCalls = 'Choose a range. A rough estimate is fine.';
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus('loading');
    try {
      await sendLead('demo', {
        name: clean(form.fullName),
        email: clean(form.email).toLowerCase(),
        phone: clean(form.phone),
        company: clean(form.companyName),
        industry: finalIndustry,
        monthlyCalls: form.monthlyCalls,
        message: clean(form.notes),
        roiSummary: roiText(calculatorData),
      });
      setStatus('success');
    } catch (err) {
      console.warn('Demo request email failed', err);
      // Keep a local copy so the lead is never lost
      try {
        const q = JSON.parse(localStorage.getItem('smart_convo_leads') || '[]');
        q.push({ ...form, hp_field: undefined, industry: finalIndustry, calculatorData, submittedAt: new Date().toISOString() });
        localStorage.setItem('smart_convo_leads', JSON.stringify(q.slice(-20)));
      } catch { /* storage unavailable */ }
      setStatus('idle');
      setFailed(true);
    }
  };

  const mailtoHref = `mailto:info@pentagonai.co?subject=${encodeURIComponent(`Demo request: ${clean(form.companyName)}`)}&body=${encodeURIComponent(
    [
      `Name: ${clean(form.fullName)}`,
      `Email: ${clean(form.email)}`,
      `Phone / WhatsApp: ${clean(form.phone)}`,
      `Company: ${clean(form.companyName)}`,
      `Industry: ${finalIndustry}`,
      `Expected monthly calls: ${form.monthlyCalls}`,
      form.notes ? `Notes: ${clean(form.notes)}` : '',
    ].filter(Boolean).join('\n')
  )}`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-xl"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="relative z-10 w-full max-w-[480px] my-8 rounded-[32px] bg-panel border border-white/10 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] overflow-hidden text-white"
      >
        {/* ambient glow */}
        <div className="pointer-events-none absolute -top-32 -right-24 w-80 h-80 rounded-full bg-[#D4FF00]/[0.12] blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 w-80 h-80 rounded-full bg-[#6C5CE7]/[0.12] blur-[100px]" />

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative p-7 sm:p-9">
          <AnimatePresence mode="wait" initial={false}>
            {status === 'success' ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4"
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-[#D4FF00] text-zinc-950 flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(212,255,0,0.45)]"
                >
                  <Check className="w-8 h-8" strokeWidth={3} />
                </motion.div>
                <h3 id="lead-modal-title" className="mt-7 text-[28px] font-semibold tracking-[-0.02em]">You're all set.</h3>
                <p className="mt-2 text-[15px] text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  Thanks, {clean(form.fullName).split(' ')[0]}. Our team will reach out within 24 hours to set up your demo.
                </p>
                <div className="mt-7 rounded-2xl bg-white/[0.04] border border-white/10 divide-y divide-white/[0.07] text-left text-[14px]">
                  {[
                    ['Company', form.companyName],
                    ['Industry', finalIndustry],
                    ['Monthly calls', form.monthlyCalls],
                    ['We\'ll contact', form.phone],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-zinc-500">{k}</span>
                      <span className="font-medium text-white">{v}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={onClose}
                  className="mt-7 w-full py-4 rounded-full bg-white text-zinc-950 light:text-[#fff] font-semibold text-[15px] hover:bg-[#D4FF00] light:hover:text-zinc-950 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} onKeyDown={(e) => { if (e.key === 'Enter' && step === 1 && e.target.tagName === 'INPUT') { e.preventDefault(); next(); } }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} noValidate>
                {/* header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                    <SmartConvoMark size={26} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[1, 2].map((n) => (
                      <span key={n} className={`h-1 rounded-full transition-all duration-300 ${step >= n ? 'w-8 bg-[#D4FF00]' : 'w-4 bg-white/15'}`} />
                    ))}
                  </div>
                  <span className="text-[12px] text-zinc-500 tracking-wide">Step {step} of 2</span>
                </div>

                <h3 id="lead-modal-title" className="text-[30px] leading-[1.1] font-semibold tracking-[-0.03em]">
                  {step === 1 ? 'Book your demo.' : 'Tell us about your calls.'}
                </h3>
                <p className="mt-2 mb-7 text-[15px] text-zinc-400">
                  {step === 1 ? 'See Smart Convo handle your calls. It takes under a minute.' : 'So we can tailor the demo to your business.'}
                </p>

                {/* honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input type="text" tabIndex={-1} autoComplete="off" value={form.hp_field} onChange={set('hp_field')} />
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  {step === 1 ? (
                    <motion.div key="s1" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }} className="space-y-4">
                      <Field label="Full name" error={errors.fullName}>
                        <input className={inputCls} placeholder="Tariq Mehmood" maxLength={80} value={form.fullName} onChange={set('fullName')} aria-invalid={!!errors.fullName} autoFocus />
                      </Field>
                      <Field label="Work email" error={errors.email}>
                        <input className={inputCls} type="email" placeholder="tariq@company.com" maxLength={100} value={form.email} onChange={set('email')} aria-invalid={!!errors.email} />
                      </Field>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="Phone / WhatsApp" error={errors.phone}>
                          <input className={inputCls} type="tel" placeholder="+92 300 1234567" maxLength={24} value={form.phone} onChange={set('phone')} aria-invalid={!!errors.phone} />
                        </Field>
                        <Field label="Company" error={errors.companyName}>
                          <input className={inputCls} placeholder="Your company" maxLength={100} value={form.companyName} onChange={set('companyName')} aria-invalid={!!errors.companyName} />
                        </Field>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="s2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.2 }} className="space-y-6">
                      <div>
                        <span className="block text-[12px] font-medium tracking-wide text-zinc-400 mb-3">Your industry</span>
                        <IndustryList invalid={!!errors.industry} options={INDUSTRIES} value={form.industry} onChange={(v) => { setForm((f) => ({ ...f, industry: v })); setErrors((er) => ({ ...er, industry: undefined })); }} />
                        {errors.industry && <p className="mt-2 text-[12.5px] text-rose-300/90">{errors.industry}</p>}
                        {form.industry === 'Other' && (
                          <div className="mt-3">
                            <input className={inputCls} placeholder="Your industry" maxLength={60} value={form.industryOther} onChange={set('industryOther')} aria-invalid={!!errors.industryOther} autoFocus />
                            {errors.industryOther && <p className="mt-2 text-[12.5px] text-rose-300/90">{errors.industryOther}</p>}
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="block text-[12px] font-medium tracking-wide text-zinc-400 mb-3">Expected monthly calls</span>
                        <Chips options={CALL_VOLUMES} value={form.monthlyCalls} onChange={(v) => { setForm((f) => ({ ...f, monthlyCalls: v })); setErrors((er) => ({ ...er, monthlyCalls: undefined })); }} />
                        {errors.monthlyCalls && <p className="mt-2 text-[12.5px] text-rose-300/90">{errors.monthlyCalls}</p>}
                      </div>
                      <Field label="Anything else? (optional)">
                        <textarea className={`${inputCls} resize-none`} rows={2} maxLength={400} placeholder="Goals, tools you use, questions…" value={form.notes} onChange={set('notes')} />
                      </Field>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence initial={false}>
                  {failed && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5"
                    >
                      <p className="text-[14.5px] font-medium text-white">That didn't go through.</p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-zinc-400">
                        Your details are saved on this device. Send them to us by email and we'll take it from there.
                      </p>
                      <a
                        href={mailtoHref}
                        className="mt-4 inline-flex items-center gap-2 h-[44px] px-5 rounded-full bg-white text-zinc-950 light:text-[#fff] text-[14px] font-medium hover:bg-[#D4FF00] light:hover:text-zinc-950 transition-colors"
                      >
                        <Mail className="w-4 h-4" /> Email us your request
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-7 flex items-center gap-3">
                  {step === 2 && (
                    <button
                      type="button"
                      onClick={() => { setErrors({}); setFailed(false); setStep(1); }}
                      className="w-[54px] h-[54px] shrink-0 rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/[0.12] flex items-center justify-center text-white transition-colors cursor-pointer"
                      aria-label="Back"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  )}
                  {step === 1 ? (
                    <button
                      key="continue"
                      type="button"
                      onClick={next}
                      className="flex-1 h-[54px] rounded-full bg-[#D4FF00] hover:bg-[#c6ee00] text-zinc-950 font-semibold text-[15px] flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(212,255,0,0.3)] transition-all cursor-pointer active:scale-[0.99]"
                    >
                      Continue <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  ) : (
                    <button
                      key="book"
                      type="submit"
                      disabled={status === 'loading'}
                      className="flex-1 h-[54px] rounded-full bg-[#D4FF00] hover:bg-[#c6ee00] disabled:opacity-60 text-zinc-950 font-semibold text-[15px] flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(212,255,0,0.3)] transition-all cursor-pointer active:scale-[0.99]"
                    >
                      {status === 'loading' ? 'Sending…' : 'Book my demo'}
                      {status !== 'loading' && <ArrowRight className="w-4 h-4" strokeWidth={2.5} />}
                    </button>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
