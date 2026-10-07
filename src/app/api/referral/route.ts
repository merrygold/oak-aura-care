import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReferralData = Record<string, any>;

function row(label: string, value: string | undefined | null) {
  if (!value) return "";
  return `<tr>
    <td style="padding:5px 8px 5px 0;font-size:12px;color:#7A5C9A;font-weight:700;width:38%;vertical-align:top;">${label}</td>
    <td style="padding:5px 0;font-size:13px;color:#1a1020;vertical-align:top;line-height:1.5;">${value}</td>
  </tr>`;
}

function section(title: string, rows: string) {
  const content = rows.replace(/\n/g, "").trim();
  if (!content) return "";
  return `
    <div style="margin-bottom:20px;">
      <div style="background:#5A1E82;color:#fff;font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;padding:7px 14px;border-radius:8px 8px 0 0;">${title}</div>
      <div style="background:#F8F4FC;border:1px solid #E2D0F0;border-top:none;border-radius:0 0 8px 8px;padding:14px 16px;">
        <table style="width:100%;border-collapse:collapse;">${content}</table>
      </div>
    </div>`;
}

function bool(v: boolean | undefined) {
  return v ? "Yes" : "";
}

function list(arr: string[] | undefined) {
  return arr && arr.length > 0 ? arr.join(", ") : "";
}

function buildAdminEmail(d: ReferralData, date: string): string {
  const participantName = d.participantFullName || d.referrerName || "Unknown";
  const serviceNames = (d.servicesRequested as string[] | undefined)?.join(", ") || "Not specified";

  const referrerSection = section("1. Referrer details", `
    ${row("Relationship", d.referrerType === "self" ? "Self (participant)" : d.referrerType === "family" ? "Family member or carer" : d.referrerType === "coordinator" ? "Support coordinator" : d.referrerType === "health" ? "Health professional" : d.referrerType === "plan_manager" ? "Plan manager" : d.referrerType)}
    ${row("Name", d.referrerName)}
    ${row("Email", d.referrerEmail)}
    ${row("Phone", d.referrerPhone)}
    ${row("Organisation", d.referrerOrg)}
  `);

  const participantSection = section("2. Participant details", `
    ${row("Full name", d.participantFullName)}
    ${row("Preferred name", d.participantPreferredName)}
    ${row("Date of birth", d.participantDob)}
    ${row("Gender", d.participantGender)}
    ${row("Phone", d.participantPhone)}
    ${row("Email", d.participantEmail)}
    ${row("Address", [d.participantAddress, d.participantSuburb, d.participantPostcode].filter(Boolean).join(", "))}
    ${row("Primary disability", d.participantDisability)}
    ${row("Language at home", d.participantLanguage)}
    ${row("Interpreter required", bool(d.interpreterRequired))}
    ${row("ATSI", bool(d.atsi))}
    ${row("Lives alone", bool(d.livesAlone))}
    ${row("Emergency contact", d.emergencyContactName)}
    ${row("Emergency phone", d.emergencyContactPhone)}
    ${row("Guardian/nominee", d.guardianName)}
    ${row("Guardian phone", d.guardianPhone)}
  `);

  const ndisSection = section("3. NDIS plan details", `
    ${row("NDIS number", d.ndisNumber)}
    ${row("Plan start", d.planStartDate)}
    ${row("Plan end", d.planEndDate)}
    ${row("Review date", d.reviewDate)}
    ${row("Funding management", d.fundingManagement === "self" ? "Self-managed" : d.fundingManagement === "plan" ? "Plan-managed" : d.fundingManagement === "ndia" ? "NDIA-managed" : d.fundingManagement === "unsure" ? "Not sure" : d.fundingManagement)}
    ${row("Plan manager", d.planManagerName)}
    ${row("Plan manager email", d.planManagerEmail)}
    ${row("Support coordinator", d.coordinatorName)}
    ${row("Coordinator contact", d.coordinatorContact)}
    ${row("Plan goals", d.planGoals)}
  `);

  const servicesSection = section("4. Services requested", `
    ${row("Services", serviceNames)}
  `);

  const supportSection = section("5. Support preferences", `
    ${row("Support types", list(d.supportTypes))}
    ${row("Hours per week", d.hoursPerWeek)}
    ${row("Preferred days", list(d.preferredDays))}
    ${row("Preferred times", list(d.preferredTimes))}
    ${row("Support ratio", d.supportRatio)}
    ${row("Start date", d.preferredStartDate)}
    ${row("Location", d.supportLocation)}
    ${row("Worker preferences", d.workerPreferences)}
  `);

  const healthSection = section("6. Health &amp; safety", `
    ${row("Flags", list(d.healthSafetyFlags))}
    ${row("Details", d.healthDetails)}
  `);

  const goalsSection = section("7. Goals &amp; referral reason", `
    ${row("Reason for referral", d.referralReason)}
    ${row("Other providers", d.otherProviders)}
    ${row("Documents available", list(d.documentsAttached))}
  `);

  const consentSection = section("8. Consent", `
    ${row("Consent given", d.consent1 && d.consent2 && d.consent3 ? "Yes — all three declarations accepted" : "Incomplete")}
    ${row("Signed by", d.consentName)}
    ${row("Relationship", d.consentRelationship)}
    ${row("Signature", d.consentSignature)}
    ${row("Date", d.consentDate)}
  `);

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F0EAF8;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:620px;margin:28px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(90,30,130,0.14);">
  <div style="background:linear-gradient(135deg,#5A1E82 0%,#3D1360 100%);padding:30px 36px 26px;">
    <div style="color:#C4A0E8;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Oak &amp; Aura Care</div>
    <div style="color:#fff;font-size:22px;font-weight:800;margin-top:8px;line-height:1.2;">New NDIS Referral</div>
    <div style="color:#D4B0F0;font-size:13px;margin-top:6px;">${participantName} &nbsp;·&nbsp; ${date}</div>
    <div style="background:rgba(255,255,255,0.15);border-radius:8px;margin-top:14px;padding:10px 14px;">
      <div style="color:#fff;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px;">Services requested</div>
      <div style="color:#E8D4FF;font-size:13px;">${serviceNames}</div>
    </div>
  </div>
  <div style="padding:28px 36px 20px;">
    ${referrerSection}
    ${participantSection}
    ${ndisSection}
    ${servicesSection}
    ${supportSection}
    ${healthSection}
    ${goalsSection}
    ${consentSection}
  </div>
  <div style="background:#F5F0FA;padding:18px 36px;text-align:center;border-top:1px solid #E8D8F5;">
    <div style="font-size:12px;color:#9070B0;">Oak &amp; Aura Care &nbsp;·&nbsp; info@onacare.com.au &nbsp;·&nbsp; +61 452 119 743</div>
    <div style="font-size:11px;color:#B09AC0;margin-top:4px;">This referral was submitted via the Oak &amp; Aura Care website on ${date}</div>
  </div>
</div>
</body></html>`;
}

function buildConfirmationEmail(d: ReferralData, date: string): string {
  const name = d.referrerName || "there";
  const serviceNames = (d.servicesRequested as string[] | undefined)?.join(", ") || "the selected services";
  const participantName = d.referrerType === "self"
    ? "yourself"
    : d.participantFullName || "the participant";

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F0EAF8;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:560px;margin:28px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(90,30,130,0.14);">
  <div style="background:linear-gradient(135deg,#5A1E82 0%,#3D1360 100%);padding:32px 36px 28px;text-align:center;">
    <div style="color:#C4A0E8;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Oak &amp; Aura Care</div>
    <div style="margin:14px auto;width:56px;height:56px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;">
      <span style="color:#fff;font-size:28px;">✓</span>
    </div>
    <div style="color:#fff;font-size:22px;font-weight:800;margin-top:8px;">Referral received</div>
    <div style="color:#D4B0F0;font-size:14px;margin-top:8px;">Thank you, ${name}.</div>
  </div>
  <div style="padding:30px 36px;">
    <p style="font-size:14px;color:#2a1040;line-height:1.7;margin:0 0 20px;">
      We've received your referral for <strong>${participantName}</strong> regarding <strong>${serviceNames}</strong>. A copy of this referral has been sent to our team and we'll be in touch within <strong>1 business day</strong>.
    </p>
    <div style="background:#F5F0FA;border-radius:12px;padding:20px 22px;margin-bottom:24px;">
      <div style="font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#7A4BAA;margin-bottom:12px;">What happens next</div>
      <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:12px;">
        <div style="min-width:24px;height:24px;background:#5A1E82;border-radius:50%;text-align:center;line-height:24px;color:#fff;font-size:11px;font-weight:700;">1</div>
        <div style="font-size:13px;color:#2a1040;line-height:1.5;padding-top:3px;">A member of our team reviews your referral and confirms we can meet the support needs.</div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:12px;">
        <div style="min-width:24px;height:24px;background:#5A1E82;border-radius:50%;text-align:center;line-height:24px;color:#fff;font-size:11px;font-weight:700;">2</div>
        <div style="font-size:13px;color:#2a1040;line-height:1.5;padding-top:3px;">We contact you to arrange an initial conversation about goals and support options.</div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:10px;">
        <div style="min-width:24px;height:24px;background:#5A1E82;border-radius:50%;text-align:center;line-height:24px;color:#fff;font-size:11px;font-weight:700;">3</div>
        <div style="font-size:13px;color:#2a1040;line-height:1.5;padding-top:3px;">We complete an assessment and create a support plan tailored to the participant's needs and goals.</div>
      </div>
    </div>
    <p style="font-size:13px;color:#6A5080;line-height:1.6;margin:0;">
      If you have urgent concerns or need to speak with someone sooner, please call us directly on <strong>+61 452 119 743</strong> or email <a href="mailto:info@onacare.com.au" style="color:#5A1E82;font-weight:700;">info@onacare.com.au</a>.
    </p>
  </div>
  <div style="background:#F5F0FA;padding:18px 36px;text-align:center;border-top:1px solid #E8D8F5;">
    <div style="font-size:12px;color:#9070B0;">Oak &amp; Aura Care &nbsp;·&nbsp; info@onacare.com.au &nbsp;·&nbsp; +61 452 119 743</div>
    <div style="font-size:11px;color:#B09AC0;margin-top:4px;">Submitted ${date}</div>
  </div>
</div>
</body></html>`;
}

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
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const from = process.env.SMTP_FROM ?? `"Oak & Aura Care" <${process.env.SMTP_USER}>`;
    const date = new Date().toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const participantName = data.participantFullName || data.referrerName || "New participant";

    await transporter.sendMail({
      from,
      to: "info@onacare.com.au",
      subject: `New NDIS Referral: ${participantName} — ${date}`,
      html: buildAdminEmail(data, date),
    });

    if (data.referrerEmail) {
      await transporter.sendMail({
        from,
        to: data.referrerEmail as string,
        subject: "Your referral has been received — Oak & Aura Care",
        html: buildConfirmationEmail(data, date),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Referral email error:", err);
    return NextResponse.json({ error: "Failed to send referral" }, { status: 500 });
  }
}
