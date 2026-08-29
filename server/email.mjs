// Transactional delivery through Resend.
//
// Called with a plain fetch rather than the SDK: it is one POST, and keeping the
// dependency out means nothing extra to bundle into the Netlify function.
import { PLATFORM_LABEL } from './util.mjs';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const HOW_TO = {
  ios: [
    'Tap the button above on your iPhone or iPad. The App Store opens with the code already filled in.',
    'Confirm the offer. Fezer Plus switches on for a month, free.',
    'If the button does not open the App Store, open the App Store app, tap your photo in the top right, choose "Redeem Gift Card or Code" and enter the code by hand.',
  ],
  android: [
    'Tap the button above on your Android phone. Google Play opens with the code already filled in.',
    'Confirm, then open Fezer. Plus is on for a month, free.',
    'If the button does not open Play, open the Play Store, tap your photo in the top right, then Payments & subscriptions - Redeem code, and enter the code by hand.',
  ],
};

/**
 * The one-month code, addressed to the person who asked for it.
 *
 * The code is printed in full as well as wrapped in the button: the button is
 * the tracked path, but a code you cannot read is a code you cannot type in
 * when a deep link fails to open.
 */
export function renderPromoEmail({ name, platform, code, redeemUrl, siteUrl }) {
  const firstName = String(name).trim().split(/\s+/)[0] || 'there';
  const steps = HOW_TO[platform];
  // "in the App Store" but "in Google Play" -- one takes the article, one does not.
  const store = platform === 'ios' ? 'the App Store' : 'Google Play';

  const text = [
    `Hi ${firstName},`,
    '',
    `Here is your code for one month of Fezer Plus, free, on ${PLATFORM_LABEL[platform]}.`,
    '',
    `    ${code}`,
    '',
    `Redeem it: ${redeemUrl}`,
    '',
    ...steps.map((step, i) => `${i + 1}. ${step}`),
    '',
    'The code works once, on one account. It has no cash value and there is nothing',
    'to cancel: the month simply ends unless you decide to continue.',
    '',
    'Plan the day, track what actually happens, then compare the two.',
    '',
    `Fezer  ${siteUrl}`,
  ].join('\n');

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f4f5f7;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your Fezer Plus code: ${escapeHtml(code)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
          <tr><td style="background:#0d2b57;padding:28px 32px;">
            <div style="color:#ffffff;font-size:18px;font-weight:600;letter-spacing:-0.01em;">Fezer</div>
            <div style="color:#9ec7ff;font-size:13px;margin-top:4px;">One month of Fezer Plus, on us</div>
          </td></tr>

          <tr><td style="padding:32px;">
            <p style="margin:0 0 16px;font-size:16px;line-height:1.55;color:#171717;">Hi ${escapeHtml(firstName)},</p>
            <p style="margin:0 0 24px;font-size:16px;line-height:1.55;color:#404040;">
              Here is your code for a free month of Fezer Plus on <strong>${escapeHtml(PLATFORM_LABEL[platform])}</strong>.
            </p>

            <div style="border:1px dashed #c9d4e5;background:#f7f9fc;border-radius:12px;padding:20px;text-align:center;">
              <div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6b7280;">Your code</div>
              <div style="margin-top:8px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:19px;font-weight:700;letter-spacing:0.06em;color:#0d2b57;word-break:break-all;">${escapeHtml(code)}</div>
            </div>

            <div style="text-align:center;margin:26px 0 8px;">
              <a href="${escapeHtml(redeemUrl)}" style="display:inline-block;background:#0d2b57;color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;padding:14px 30px;border-radius:999px;">Redeem in ${escapeHtml(store)}</a>
            </div>
            <p style="margin:0 0 26px;text-align:center;font-size:13px;color:#8a8f98;">Open this on the device you use Fezer on.</p>

            <ol style="margin:0;padding-left:20px;color:#404040;font-size:14px;line-height:1.65;">
              ${steps.map((step) => `<li style="margin-bottom:8px;">${escapeHtml(step)}</li>`).join('')}
            </ol>

            <p style="margin:26px 0 0;font-size:13px;line-height:1.6;color:#8a8f98;">
              The code works once, on one account. There is nothing to cancel: the free month
              simply ends unless you choose to continue.
            </p>
          </td></tr>

          <tr><td style="border-top:1px solid #ececf1;padding:20px 32px;text-align:center;">
            <p style="margin:0;font-size:13px;color:#8a8f98;">
              Plan the day. Track what happens. Compare the two.<br />
              <a href="${escapeHtml(siteUrl)}" style="color:#0d2b57;text-decoration:none;">fezer.app</a>
            </p>
          </td></tr>
        </table>
        <p style="max-width:520px;margin:16px auto 0;font-size:12px;line-height:1.5;color:#9aa0a6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;text-align:center;">
          You are getting this because you asked for a promo code at ${escapeHtml(siteUrl)}. This is a
          one-off message -- you are not subscribed to anything.
        </p>
      </td></tr>
    </table>
  </body>
</html>`;

  return {
    subject: `Your free month of Fezer Plus (code inside)`,
    html,
    text,
  };
}

/**
 * Returns `{ ok, id, error }` rather than throwing: a delivery failure must not
 * lose the code that was already allocated to this person. The caller records
 * the failure on the claim so the same code can be re-sent later.
 */
export async function sendEmail({ to, subject, html, text, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.PROMO_EMAIL_FROM || 'Fezer <hello@fezer.app>';

  if (!apiKey) {
    return { ok: false, error: 'RESEND_API_KEY is not set' };
  }

  const payload = { from, to: [to], subject, html, text };
  if (replyTo || process.env.PROMO_EMAIL_REPLY_TO) {
    payload.reply_to = replyTo || process.env.PROMO_EMAIL_REPLY_TO;
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      return { ok: false, error: body?.message || `Resend responded ${response.status}` };
    }
    return { ok: true, id: body?.id ?? null };
  } catch (error) {
    return { ok: false, error: error?.message || 'Network error talking to Resend' };
  }
}

/**
 * Chooses a transport and sends.
 *
 * With no Resend key configured -- the normal state on localhost -- the message
 * is written to `.data/outbox/` and its redeem link logged, so the whole flow
 * including the tracking redirect can be exercised end to end before a single
 * real email leaves the building. Set PROMO_EMAIL_TRANSPORT=resend to force the
 * real thing, or =console to force the dry run.
 */
export async function deliverPromoEmail({ to, subject, html, text, code }) {
  const forced = process.env.PROMO_EMAIL_TRANSPORT;
  const transport = forced || (process.env.RESEND_API_KEY ? 'resend' : 'console');

  if (transport === 'resend') {
    const result = await sendEmail({ to, subject, html, text });
    return { ...result, transport: 'resend' };
  }

  try {
    const fs = await import('node:fs/promises');
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const safe = to.replace(/[^a-z0-9]+/gi, '_');
    await fs.mkdir('.data/outbox', { recursive: true });
    await fs.writeFile(`.data/outbox/${stamp}_${safe}.html`, html, 'utf8');
    await fs.writeFile(`.data/outbox/${stamp}_${safe}.txt`, `To: ${to}\nSubject: ${subject}\n\n${text}`, 'utf8');
  } catch {
    // A read-only filesystem is not a reason to fail the claim.
  }

  console.log(`\n[promo] dry-run email -> ${to}\n[promo] subject: ${subject}\n[promo] code: ${code}\n[promo] saved to .data/outbox/\n`);
  return { ok: true, id: null, transport: 'console' };
}
