import emailjs from '@emailjs/browser';

// Same EmailJS service / template / public key as the Contact page form
const SERVICE_ID = 'service_0wptkk6';
const TEMPLATE_ID = 'template_0x1wzok';
const PUBLIC_KEY = '1nvz4SCWKMu2KkTvT';

/**
 * Sends a demo request through the same template as the Contact form.
 * The template shows name / email / company / message, so every detail is also written into `message`.
 */
export function sendDemoRequest({ name, email, phone, company, industry, monthlyCalls, notes, calculatorData }) {
  const lines = [
    'NEW DEMO REQUEST (website modal)',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone / WhatsApp: ${phone}`,
    `Company: ${company}`,
    `Industry: ${industry}`,
    `Expected monthly calls: ${monthlyCalls}`,
  ];
  if (notes) lines.push('', `Notes: ${notes}`);
  if (calculatorData) {
    const cur = calculatorData.currency === 'USD' ? '$' : 'Rs';
    lines.push(
      '',
      'ROI calculator results:',
      `- Estimated monthly loss: ${cur} ${calculatorData.monthlyLoss?.toLocaleString?.() ?? calculatorData.monthlyLoss}`,
      `- Projected monthly recovery: ${cur} ${calculatorData.recoveredMonthly?.toLocaleString?.() ?? calculatorData.recoveredMonthly}`,
      `- Missed calls per month: ${calculatorData.missedCallsMonth ?? 'n/a'}`,
      `- Locations: ${calculatorData.locations ?? 'n/a'}`
    );
  }
  lines.push('', `Submitted: ${new Date().toISOString()}`);

  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      name,
      email,
      company,
      message: lines.join('\n'),
      // extra fields in case the template uses them
      phone,
      industry,
      monthly_calls: monthlyCalls,
      from_name: name,
      reply_to: email,
      subject: `Demo request: ${company} (${monthlyCalls} calls/mo)`,
    },
    PUBLIC_KEY
  );
}
