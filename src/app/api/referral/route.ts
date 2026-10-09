import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReferralData = Record<string, any>;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://onacare.com.au";
const LOGO_URL = `${SITE_URL}/images/logo.png`;

// ─── Shared email primitives ────────────────────────────────────────────────

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
      <table width="620" cellpadding="0" cellspacing="0" role="presentation" style="max-width:620px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(60,10,110,0.13);">
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

function detailRow(label: string, value: string | undefined | null): string {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:9px 14px 9px 0;font-size:11px;color:#8050A8;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;white-space:nowrap;vertical-align:top;width:150px;">${label}</td>
      <td style="padding:9px 0;font-size:13px;color:#1a1030;line-height:1.6;vertical-align:top;">${value}</td>
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function bool(v: boolean | undefined): string {
  return v ? "Yes" : "";
}

function list(arr: string[] | undefined): string {
  return arr && arr.length > 0 ? arr.join(", ") : "";
}

function referrerLabel(type: string | undefined): string {
  const map: Record<string, string> = {
    self: "Self (participant)",
    family: "Family member or carer",
    coordinator: "Support coordinator",
    health: "Health professional",
    plan_manager: "Plan manager",
  };
  return (type && map[type]) || type || "";
}

function fundingLabel(type: string | undefined): string {
  const map: Record<string, string> = {
    self: "Self-managed",
    plan: "Plan-managed",
    ndia: "NDIA-managed",
    unsure: "Not sure",
  };
  return (type && map[type]) || type || "";
}

// ─── Admin email ──────────────────────────────────────────────────────────────

function buildAdminEmail(d: ReferralData, date: string, time: string): string {
  const participantName = d.participantFullName || d.referrerName || "Unknown";
  const serviceNames = (d.servicesRequested as string[] | undefined)?.join(", ") || "Not specified";

  const serviceBadge = `
<tr>
  <td style="padding:0 40px 28px;">
    <table cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td style="background:#2D7A5A;border-radius:8px;padding:10px 20px;">
          <span style="color:#fff;font-size:12px;font-weight:700;letter-spacing:0.05em;">Services requested: ${serviceNames}</span>
        </td>
      </tr>
    </table>
  </td>
</tr>`;

  return emailWrapper(`
    ${logoHeader("New NDIS Referral", `${participantName} &nbsp;·&nbsp; ${date} at ${time}`)}
    <tr><td style="padding:28px 40px 8px;">
      <p style="margin:0;font-size:15px;color:#2a1050;line-height:1.7;">
        A new NDIS referral has been submitted. All sections are detailed below.
      </p>
    </td></tr>
    ${serviceBadge}
    ${cardSection("1. Referrer details", "#4A1070",
      detailRow("Relationship", referrerLabel(d.referrerType)) +
      detailRow("Name", d.referrerName) +
      detailRow("Email", d.referrerEmail ? `<a href="mailto:${d.referrerEmail}" style="color:#5A1E82;">${d.referrerEmail}</a>` : "") +
      detailRow("Phone", d.referrerPhone ? `<a href="tel:${String(d.referrerPhone).replace(/\s/g,'')}" style="color:#5A1E82;">${d.referrerPhone}</a>` : "") +
      detailRow("Organisation", d.referrerOrg)
    )}
    ${cardSection("2. Participant details", "#3D1080",
      detailRow("Full name", d.participantFullName) +
      detailRow("Preferred name", d.participantPreferredName) +
      detailRow("Date of birth", d.participantDob) +
      detailRow("Gender", d.participantGender) +
      detailRow("Phone", d.participantPhone ? `<a href="tel:${String(d.participantPhone).replace(/\s/g,'')}" style="color:#5A1E82;">${d.participantPhone}</a>` : "") +
      detailRow("Email", d.participantEmail ? `<a href="mailto:${d.participantEmail}" style="color:#5A1E82;">${d.participantEmail}</a>` : "") +
      detailRow("Address", [d.participantAddress, d.participantSuburb, d.participantPostcode].filter(Boolean).join(", ")) +
      detailRow("Primary disability", d.participantDisability) +
      detailRow("Language at home", d.participantLanguage) +
      detailRow("Interpreter needed", bool(d.interpreterRequired)) +
      detailRow("ATSI", bool(d.atsi)) +
      detailRow("Lives alone", bool(d.livesAlone)) +
      detailRow("Emergency contact", d.emergencyContactName) +
      detailRow("Emergency phone", d.emergencyContactPhone) +
      detailRow("Guardian / nominee", d.guardianName) +
      detailRow("Guardian phone", d.guardianPhone)
    )}
    ${cardSection("3. NDIS plan details", "#1A5580",
      detailRow("NDIS number", d.ndisNumber) +
      detailRow("Plan start", d.planStartDate) +
      detailRow("Plan end", d.planEndDate) +
      detailRow("Review date", d.reviewDate) +
      detailRow("Funding management", fundingLabel(d.fundingManagement)) +
      detailRow("Plan manager", d.planManagerName) +
      detailRow("Plan manager email", d.planManagerEmail) +
      detailRow("Support coordinator", d.coordinatorName) +
      detailRow("Coordinator contact", d.coordinatorContact) +
      detailRow("Plan goals", d.planGoals)
    )}
    ${cardSection("4. Services requested", "#2D7A5A",
      detailRow("Services", serviceNames)
    )}
    ${cardSection("5. Support preferences", "#3D6A20",
      detailRow("Support types", list(d.supportTypes)) +
      detailRow("Hours per week", d.hoursPerWeek) +
      detailRow("Preferred days", list(d.preferredDays)) +
      detailRow("Preferred times", list(d.preferredTimes)) +
      detailRow("Support ratio", d.supportRatio) +
      detailRow("Preferred start", d.preferredStartDate) +
      detailRow("Location", d.supportLocation) +
      detailRow("Worker preferences", d.workerPreferences)
    )}
    ${cardSection("6. Health &amp; safety", "#8B3010",
      detailRow("Flags", list(d.healthSafetyFlags)) +
      detailRow("Details", d.healthDetails)
    )}
    ${cardSection("7. Goals &amp; referral reason", "#5A4010",
      detailRow("Reason for referral", d.referralReason) +
      detailRow("Other providers", d.otherProviders) +
      detailRow("Documents available", list(d.documentsAttached))
    )}
    ${cardSection("8. Consent", "#2A5040",
      detailRow("Consent given", d.consent1 && d.consent2 && d.consent3 ? "Yes — all three declarations accepted" : "Incomplete") +
      detailRow("Signed by", d.consentName) +
      detailRow("Relationship", d.consentRelationship) +
      detailRow("Signature", d.consentSignature) +
      detailRow("Date", d.consentDate)
    )}
    <tr><td style="padding:0 40px 8px;">
      <table cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td style="background:#4A1070;border-radius:8px;padding:12px 24px;">
            <a href="mailto:${d.referrerEmail || d.participantEmail || ''}?subject=Re: NDIS Referral — ${participantName}"
               style="color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;letter-spacing:0.04em;">
              Reply to referrer →
            </a>
          </td>
        </tr>
      </table>
    </td></tr>
    <tr><td style="padding:0 40px 32px;">
      <p style="margin:0;font-size:12px;color:#9070B0;">Submitted via the Oak &amp; Aura Care website on ${date} at ${time}.</p>
    </td></tr>
    ${footerRow()}
  `);
}

// ─── User confirmation email ──────────────────────────────────────────────────

function buildConfirmationEmail(d: ReferralData, date: string, time: string): string {
  const referrerFirstName = (d.referrerName || "there").split(" ")[0];
  const serviceNames = (d.servicesRequested as string[] | undefined)?.join(", ") || "the selected services";
  const participantName = d.referrerType === "self" ? "yourself" : d.participantFullName || "the participant";

  return emailWrapper(`
    ${logoHeader("Referral received", `Thank you, ${referrerFirstName}.`)}
    <tr><td style="padding:32px 40px 16px;">
      <p style="margin:0;font-size:15px;color:#2a1050;line-height:1.7;">
        We've received your NDIS referral for <strong>${participantName}</strong> regarding
        <strong>${serviceNames}</strong>. A member of our team will be in touch within
        <strong>1 business day</strong>.
      </p>
    </td></tr>
    ${cardSection("Your referral summary", "#4A1070",
      detailRow("Referrer", d.referrerName) +
      detailRow("Participant", d.participantFullName || "—") +
      detailRow("Services", serviceNames) +
      detailRow("Submitted", `${date} at ${time}`) +
      (d.ndisNumber ? detailRow("NDIS number", d.ndisNumber) : "")
    )}
    <tr><td style="padding:0 40px 16px;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
             style="background:#F5F0FD;border-radius:14px;border-left:4px solid #4A1070;">
        <tr>
          <td style="padding:20px 24px;">
            <div style="font-size:12px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#6040A0;margin-bottom:14px;">What happens next</div>
            <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
              <tr>
                <td valign="top" width="30" style="padding-bottom:12px;">
                  <div style="width:24px;height:24px;background:#4A1070;border-radius:50%;text-align:center;line-height:24px;color:#fff;font-size:11px;font-weight:700;">1</div>
                </td>
                <td style="padding-bottom:12px;padding-left:10px;font-size:13px;color:#2a1050;line-height:1.6;vertical-align:top;">
                  Our team reviews your referral and confirms we can meet the support needs.
                </td>
              </tr>
              <tr>
                <td valign="top" width="30" style="padding-bottom:12px;">
                  <div style="width:24px;height:24px;background:#4A1070;border-radius:50%;text-align:center;line-height:24px;color:#fff;font-size:11px;font-weight:700;">2</div>
                </td>
                <td style="padding-bottom:12px;padding-left:10px;font-size:13px;color:#2a1050;line-height:1.6;vertical-align:top;">
                  We contact you to arrange a conversation about goals and support options.
                </td>
              </tr>
              <tr>
                <td valign="top" width="30">
                  <div style="width:24px;height:24px;background:#4A1070;border-radius:50%;text-align:center;line-height:24px;color:#fff;font-size:11px;font-weight:700;">3</div>
                </td>
                <td style="padding-left:10px;font-size:13px;color:#2a1050;line-height:1.6;vertical-align:top;">
                  We complete an assessment and build a support plan around the participant's goals.
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

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const data: ReferralData = await req.json();

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
    const participantName = data.participantFullName || data.referrerName || "New participant";

    await transporter.sendMail({
      from,
      to: "Info@onacare.com.au",
      replyTo: data.referrerEmail as string | undefined,
      subject: `New NDIS Referral: ${participantName} — ${date}`,
      html: buildAdminEmail(data, date, time),
    });

    if (data.referrerEmail) {
      await transporter.sendMail({
        from,
        to: data.referrerEmail as string,
        replyTo: "Info@onacare.com.au",
        subject: "Your NDIS referral has been received — Oak & Aura Care",
        html: buildConfirmationEmail(data, date, time),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Referral email error:", err);
    return NextResponse.json({ error: "Failed to send referral" }, { status: 500 });
  }
}
