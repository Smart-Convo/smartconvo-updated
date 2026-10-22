import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

export type LeadKind = 'demo' | 'contact';

export interface LeadFields {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  monthlyCalls?: string;
  message?: string;
  roiSummary?: string;
}

const has = (v?: string) => !!(v && v.trim());
const clean = (v?: string) => (v || '').trim();
const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

/* ---------- HTML blocks. Only fields that have a value are rendered, so nothing empty shows up in the email ---------- */
const TILE =
  'background:#f6f7f9;border:1px solid #eceef2;border-radius:16px;';

function tile(label: string, value: string, link?: string) {
  const v = link ? `<a href="${link}" style="color:#0a0b0d;">${esc(value)}</a>` : esc(value);
  return (
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="tile" style="${TILE}"><tr><td style="padding:14px 16px;">` +
    `<div class="font t2" style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#7b8190;">${label}</div>` +
    `<div class="font t1" style="margin-top:5px;font-size:15px;font-weight:600;color:#0a0b0d;word-break:break-word;">${v}</div>` +
    `</td></tr></table>`
  );
}

function detailsRows(tiles: string[]) {
  if (!tiles.length) return '';
  let rows = '';
  for (let i = 0; i < tiles.length; i += 2) {
    const left = tiles[i];
    const right = tiles[i + 1];
    if (right) {
      rows +=
        `<tr><td class="col" width="50%" valign="top" style="padding:0 6px 12px 0;">${left}</td>` +
        `<td class="col" width="50%" valign="top" style="padding:0 0 12px 6px;">${right}</td></tr>`;
    } else {
      rows += `<tr><td class="col" colspan="2" valign="top" style="padding:0 0 12px 0;">${left}</td></tr>`;
    }
  }
  return (
    `<tr><td class="px" style="padding:30px 36px 6px;">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table></td></tr>`
  );
}

const messageBlock = (m: string) =>
  `<tr><td class="px" style="padding:14px 36px 6px;">` +
  `<div class="font t2" style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#7b8190;margin-bottom:10px;">Message</div>` +
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>` +
  `<td style="width:3px;background:#D4FF00;border-radius:3px;">&nbsp;</td>` +
  `<td class="font t1" style="padding:2px 0 2px 16px;font-size:16px;line-height:26px;color:#1b1d23;white-space:pre-wrap;">${esc(m)}</td>` +
  `</tr></table></td></tr>`;

const roiBlock = (r: string) =>
  `<tr><td class="px" style="padding:22px 36px 6px;">` +
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="tile" style="background:#0a0b0d;border-radius:18px;"><tr><td style="padding:18px 20px;">` +
  `<div class="font" style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#D4FF00;">ROI calculator estimate</div>` +
  `<div class="font" style="margin-top:8px;font-size:14px;line-height:23px;color:#e4e7ee;white-space:pre-wrap;">${esc(r)}</div>` +
  `</td></tr></table></td></tr>`;

const companyLine = (c: string) =>
  `<tr><td class="font" style="padding-top:6px;font-size:15px;color:#c9cdd8;">${esc(c)}</td></tr>`;

/**
 * One sender for every form (Contact page + Book a demo modal), one EmailJS template.
 * Optional parts are pre-rendered as HTML and inserted with {{{triple braces}}}; empty fields are left out entirely.
 */
export function sendLead(kind: LeadKind, f: LeadFields) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || TEMPLATE_ID.includes('REPLACE_ME')) {
    return Promise.reject(new Error('EmailJS is not configured. Check the VITE_EMAILJS_* values in .env'));
  }
  const isDemo = kind === 'demo';
  const name = clean(f.name);
  const email = clean(f.email);
  const company = clean(f.company);
  const message = clean(f.message);

  const tiles: string[] = [tile('Email', email, `mailto:${esc(email)}`)];
  if (has(f.phone)) tiles.push(tile('Phone / WhatsApp', clean(f.phone)));
  if (has(f.industry)) tiles.push(tile('Industry', clean(f.industry)));
  if (has(f.monthlyCalls)) tiles.push(tile('Expected monthly calls', clean(f.monthlyCalls)));

  const subject = isDemo
    ? `Demo request: ${company || name}${has(f.monthlyCalls) ? ` (${clean(f.monthlyCalls)} calls/mo)` : ''}`
    : `New message from ${name}`;

  const params = {
    form_type: isDemo ? 'Demo request' : 'Contact message',
    subject,
    preheader: [`${isDemo ? 'Demo request' : 'Message'} from ${name}`, company && `(${company})`, message && `: ${message.slice(0, 90)}`].filter(Boolean).join(' '),
    name,
    email,
    reply_to: email,
    company_html: has(company) ? companyLine(company) : '',
    details_html: detailsRows(tiles),
    message_html: has(message) ? messageBlock(message) : '',
    roi_html: has(f.roiSummary) ? roiBlock(clean(f.roiSummary)) : '',
    submitted_at: new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }),
    page: typeof window !== 'undefined' ? window.location.href : '',
  };
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);
}

/** Readable ROI calculator summary for the email */
export function roiText(c: any): string {
  if (!c) return '';
  const cur = c.currency === 'USD' ? '$' : 'Rs';
  const rate = c.currency === 'USD' ? 280 : 1;
  const m = (v: any) => (typeof v === 'number' ? `${cur} ${Math.round(v / rate).toLocaleString()}` : String(v ?? 'n/a'));
  const lines: string[] = [];
  if (c.scenario) lines.push(`Model: ${c.industry} · ${c.scenario}`);
  if (c.roiPercent !== undefined) {
    lines.push(
      `ROI: ${Math.round(c.roiPercent * 10) / 10}%`,
      `Value generated per month: ${m(c.valueGenerated)}`,
      `Smart Convo monthly cost: ${m(c.monthlyCost)}`,
      `Net gain per month: ${m(c.netGain)}`
    );
    (c.inputs || []).forEach(([k, v]: [string, string]) => lines.push(`- ${k}: ${v}`));
    return lines.join('\n');
  }
  // older calculator format
  const n = (v: any) => (typeof v === 'number' ? v.toLocaleString() : String(v ?? 'n/a'));
  return [
    `Estimated monthly loss: ${cur} ${n(c.monthlyLoss)}`,
    `Projected monthly recovery: ${cur} ${n(c.recoveredMonthly)}`,
    `Missed calls per month: ${n(c.missedCallsMonth)}`,
    `Locations: ${n(c.locations)}`,
  ].join('\n');
}
