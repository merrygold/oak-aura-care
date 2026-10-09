import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://onacare.com.au";
const LOGO_URL = `${SITE_URL}/images/logo.png`;

function emailWrapper(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>Oak &amp; Aura Care</title>
</head>
<body style="margin:0;padding:0;background:#EDE6F5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#EDE6F5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(60,10,110,0.13);">
        ${body}
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function logoHeader(title: string, subtitle: string): string {
  return `
<tr>
  <td style="background:linear-gradient(135deg,#4A1070 0%,#2D0B50 100%);padding:36px 40px 32px;text-align:center;">
    <img src="${LOGO_URL}" alt="Oak &amp; Aura Care" width="80" height="80"
         style="display:block;margin:0 auto 18px;border-radius:16px;border:3px solid rgba(255,255,255,0.25);">
    <div style="color:#C8A0E8;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:8px;">Oak &amp; Aura Care</div>
    <div style="color:#ffffff;font-size:26px;font-weight:800;line-height:1.2;margin-bottom:8px;">${title}</div>
    <div style="color:#D8B8F4;font-size:14px;line-height:1.5;">${subtitle}</div>
  </td>
</tr>`;
}

function detailRow(label: string, value: string): string {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:10px 16px 10px 0;font-size:12px;color:#8050A8;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;white-space:nowrap;vertical-align:top;width:130px;">${label}</td>
      <td style="padding:10px 0;font-size:14px;color:#1a1030;line-height:1.6;vertical-align:top;">${value}</td>
    </tr>`;
}

function cardSection(title: string, accent: string, rows: string): string {
  const content = rows.replace(/\n/g, "").trim();
  if (!content) return "";
  return `
<tr><td style="padding:0 40px 24px;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="border-radius:12px;overflow:hidden;border:1px solid ${accent}30;">
    <tr>
      <td style="background:${accent};padding:10px 18px;">
        <span style="color:#fff;font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;">${title}</span>
      </td>
    </tr>
    <tr>
      <td style="background:#FAF7FE;padding:6px 18px 10px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">${content}</table>
      </td>
    </tr>
  </table>
</td></tr>`;
}

function footerRow(): string {
  return `
<tr>
  <td style="background:#F3EEF9;padding:22px 40px;border-top:1px solid #E0D0F0;text-align:center;">
    <div style="font-size:13px;color:#7050A0;font-weight:600;">Oak &amp; Aura Care</div>
    <div style="font-size:12px;color:#9070B8;margin-top:4px;">
      <a href="mailto:info@onacare.com.au" style="color:#7050A0;text-decoration:none;">info@onacare.com.au</a>
      &nbsp;·&nbsp; +61 452 119 743 &nbsp;·&nbsp; Sydney NSW 2000
    </div>
    <div style="font-size:11px;color:#B09AC8;margin-top:6px;">
      Registered NDIS Provider &nbsp;·&nbsp; ABN available on request
    </div>
  </td>
</tr>`;
}

function buildAdminEmail(
  name: string,
  email: string,
  phone: string,
  topic: string,
  message: string,
  date: string,
  time: string,
): string {
  return emailWrapper(`
    ${logoHeader("New Website Enquiry", `Received ${date} at ${time}`)}
    <tr><td style="padding:32px 40px 8px;">
      <p style="margin:0;font-size:15px;color:#2a1050;line-height:1.7;">
        A new enquiry has been submitted through the Oak &amp; Aura Care website. All details are below.
      </p>
    </td></tr>
    ${cardSection("Contact details", "#4A1070",
      detailRow("Full name", name) +
      detailRow("Email", `<a href="mailto:${email}" style="color:#5A1E82;">${email}</a>`) +
      detailRow("Phone", phone ? `<a href="tel:${phone.replace(/\s/g, '')}" style="color:#5A1E82;">${phone}</a>` : "") +
      detailRow("Topic", topic) +
      detailRow("Submitted", `${date} at ${time}`)
    )}
    ${cardSection("Their message", "#2D7A5A",
      `<tr><td style="padding:14px 0 6px;">
        <p style="font-size:14px;color:#1a1030;line-height:1.8;margin:0;white-space:pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      </td></tr>`
    )}
    <tr><td style="padding:0 40px 32px;">
      <table cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td style="background:#4A1070;border-radius:8px;padding:12px 24px;">
            <a href="mailto:${email}?subject=Re: Your enquiry — ${topic.replace(/"/g, '')}"
               style="color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;letter-spacing:0.04em;">
              Reply to ${name} →
            </a>
          </td>
        </tr>
      </table>
    </td></tr>
    ${footerRow()}
  `);
}

function buildUserConfirmationEmail(
  name: string,
  email: string,
  phone: string,
  topic: string,
  message: string,
  date: string,
  time: string,
): string {
  const firstName = name.split(" ")[0];
  return emailWrapper(`
    ${logoHeader("We've received your enquiry", `Thank you, ${firstName}.`)}
    <tr><td style="padding:32px 40px 8px;">
      <p style="margin:0;font-size:15px;color:#2a1050;line-height:1.7;">
        Hi ${firstName}, we've received your message and a member of our team will be in touch
        with you within <strong>1&ndash;2 business days</strong>.
      </p>
    </td></tr>
    ${cardSection("Your enquiry summary", "#4A1070",
      detailRow("Name", name) +
      detailRow("Email", email) +
      detailRow("Phone", phone || "—") +
      detailRow("Topic", topic) +
      detailRow("Submitted", `${date} at ${time}`)
    )}
    ${cardSection("Your message", "#2D7A5A",
      `<tr><td style="padding:14px 0 6px;">
        <p style="font-size:14px;color:#1a1030;line-height:1.8;margin:0;white-space:pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      </td></tr>`
    )}
    <tr><td style="padding:0 40px 16px;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
             style="background:#F5F0FD;border-radius:14px;border-left:4px solid #4A1070;">
        <tr>
          <td style="padding:20px 24px;">
            <div style="font-size:12px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#6040A0;margin-bottom:12px;">What happens next</div>
            <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
              <tr>
                <td valign="top" width="30" style="padding-bottom:10px;">
                  <div style="width:22px;height:22px;background:#4A1070;border-radius:50%;text-align:center;line-height:22px;color:#fff;font-size:11px;font-weight:700;">1</div>
                </td>
                <td style="padding-bottom:10px;padding-left:8px;font-size:13px;color:#2a1050;line-height:1.6;">
                  Our team reviews your enquiry and matches you to the right support specialist.
                </td>
              </tr>
              <tr>
                <td valign="top" width="30" style="padding-bottom:10px;">
                  <div style="width:22px;height:22px;background:#4A1070;border-radius:50%;text-align:center;line-height:22px;color:#fff;font-size:11px;font-weight:700;">2</div>
                </td>
                <td style="padding-bottom:10px;padding-left:8px;font-size:13px;color:#2a1050;line-height:1.6;">
                  We'll reach out by phone or email to discuss your needs and next steps.
                </td>
              </tr>
              <tr>
                <td valign="top" width="30">
                  <div style="width:22px;height:22px;background:#4A1070;border-radius:50%;text-align:center;line-height:22px;color:#fff;font-size:11px;font-weight:700;">3</div>
                </td>
                <td style="padding-left:8px;font-size:13px;color:#2a1050;line-height:1.6;">
                  We work together to create a support plan built around your goals.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td></tr>
    <tr><td style="padding:0 40px 32px;">
      <p style="margin:0;font-size:13px;color:#6A5090;line-height:1.7;">
        Need to speak with someone sooner? Call us on
        <a href="tel:+61452119743" style="color:#4A1070;font-weight:700;">+61 452 119 743</a>
        or email <a href="mailto:info@onacare.com.au" style="color:#4A1070;font-weight:700;">info@onacare.com.au</a>.
      </p>
    </td></tr>
    ${footerRow()}
  `);
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, topic, message } = await req.json() as {
      name: string; email: string; phone?: string; topic: string; message: string;
    };

    if (!name || !email || !topic || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json(
        { error: "Email service not configured. Please contact us directly at info@onacare.com.au" },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.office365.com",
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE !== "false",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const from = process.env.SMTP_FROM ?? `"Oak & Aura Care" <${process.env.SMTP_USER}>`;
    const now = new Date();
    const date = now.toLocaleDateString("en-AU", { day: "2-digit", month: "long", year: "numeric" });
    const time = now.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit", timeZone: "Australia/Sydney" });
    const phoneStr = phone ?? "";

    await transporter.sendMail({
      from,
      to: "Info@onacare.com.au",
      replyTo: email,
      subject: `New enquiry from ${name} — ${topic}`,
      html: buildAdminEmail(name, email, phoneStr, topic, message, date, time),
    });

    await transporter.sendMail({
      from,
      to: email,
      replyTo: "Info@onacare.com.au",
      subject: `We've received your enquiry — Oak & Aura Care`,
      html: buildUserConfirmationEmail(name, email, phoneStr, topic, message, date, time),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact email error:", err);
    return NextResponse.json({ error: "Failed to send enquiry" }, { status: 500 });
  }
}
