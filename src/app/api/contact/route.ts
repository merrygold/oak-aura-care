import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function buildAdminEmail(name: string, email: string, phone: string, topic: string, message: string, date: string): string {
  function row(label: string, value: string) {
    if (!value) return "";
    return `<tr>
      <td style="padding:5px 8px 5px 0;font-size:12px;color:#7A5C9A;font-weight:700;width:35%;vertical-align:top;">${label}</td>
      <td style="padding:5px 0;font-size:13px;color:#1a1020;vertical-align:top;line-height:1.5;">${value}</td>
    </tr>`;
  }

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F0EAF8;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:600px;margin:28px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(90,30,130,0.14);">
  <div style="background:linear-gradient(135deg,#5A1E82 0%,#3D1360 100%);padding:30px 36px 26px;">
    <div style="color:#C4A0E8;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Oak &amp; Aura Care</div>
    <div style="color:#fff;font-size:22px;font-weight:800;margin-top:8px;line-height:1.2;">New Website Enquiry</div>
    <div style="color:#D4B0F0;font-size:13px;margin-top:6px;">${name} &nbsp;·&nbsp; ${date}</div>
  </div>
  <div style="padding:28px 36px 20px;">
    <div style="margin-bottom:20px;">
      <div style="background:#5A1E82;color:#fff;font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;padding:7px 14px;border-radius:8px 8px 0 0;">Contact details</div>
      <div style="background:#F8F4FC;border:1px solid #E2D0F0;border-top:none;border-radius:0 0 8px 8px;padding:14px 16px;">
        <table style="width:100%;border-collapse:collapse;">
          ${row("Name", name)}
          ${row("Email", email)}
          ${row("Phone", phone)}
          ${row("Topic", topic)}
        </table>
      </div>
    </div>
    <div style="margin-bottom:20px;">
      <div style="background:#5A1E82;color:#fff;font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;padding:7px 14px;border-radius:8px 8px 0 0;">Message</div>
      <div style="background:#F8F4FC;border:1px solid #E2D0F0;border-top:none;border-radius:0 0 8px 8px;padding:16px;">
        <p style="font-size:13px;color:#1a1020;line-height:1.7;margin:0;">${message.replace(/\n/g, "<br>")}</p>
      </div>
    </div>
  </div>
  <div style="background:#F5F0FA;padding:18px 36px;text-align:center;border-top:1px solid #E8D8F5;">
    <div style="font-size:12px;color:#9070B0;">Oak &amp; Aura Care &nbsp;·&nbsp; info@onacare.com.au &nbsp;·&nbsp; +61 452 119 743</div>
    <div style="font-size:11px;color:#B09AC0;margin-top:4px;">Submitted via the Oak &amp; Aura Care website on ${date}</div>
  </div>
</div>
</body></html>`;
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
      host: process.env.SMTP_HOST ?? "mail.onacare.com.au",
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: process.env.SMTP_SECURE !== "false",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const from = process.env.SMTP_FROM ?? `"Oak & Aura Care" <${process.env.SMTP_USER}>`;
    const date = new Date().toLocaleDateString("en-AU", { day: "2-digit", month: "long", year: "numeric" });

    await transporter.sendMail({
      from,
      to: "Info@onacare.com.au",
      replyTo: email,
      subject: `New enquiry from ${name} — ${topic}`,
      html: buildAdminEmail(name, email, phone ?? "", topic, message, date),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact email error:", err);
    return NextResponse.json({ error: "Failed to send enquiry" }, { status: 500 });
  }
}
