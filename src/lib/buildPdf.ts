import PDFDocument from "pdfkit";

// Brand colours
const PURPLE = "#4A1070";
const PURPLE_LIGHT = "#7A40A8";
const DARK = "#1A1030";
const MID = "#4A3068";
const LIGHT = "#9070B8";
const BG = "#F5F0FD";
const WHITE = "#FFFFFF";
const TEAL = "#2D7A5A";
const RULE = "#E0D0F0";

type Field = { label: string; value: string | undefined | null };

function val(v: string | boolean | undefined | null): string {
  if (v === true) return "Yes";
  if (!v) return "";
  return String(v);
}

function joinList(arr: string[] | undefined): string {
  return arr && arr.length > 0 ? arr.join(", ") : "";
}

function fundingLabel(t: string | undefined): string {
  const map: Record<string, string> = { self: "Self-managed", plan: "Plan-managed", ndia: "NDIA-managed", unsure: "Not sure" };
  return (t && map[t]) || t || "";
}

function referrerLabel(t: string | undefined): string {
  const map: Record<string, string> = {
    self: "Self (participant)", family: "Family member or carer",
    coordinator: "Support coordinator", health: "Health professional", plan_manager: "Plan manager",
  };
  return (t && map[t]) || t || "";
}

// ─── Core builder ────────────────────────────────────────────────────────────

function addHeader(doc: PDFKit.PDFDocument, title: string, subtitle: string, ref: string): void {
  // purple banner
  doc.rect(0, 0, doc.page.width, 110).fill(PURPLE);

  doc.font("Helvetica-Bold").fontSize(7).fillColor("white")
    .text("OAK & AURA CARE", 50, 28, { characterSpacing: 2 });

  doc.font("Helvetica-Bold").fontSize(22).fillColor(WHITE)
    .text(title, 50, 42);

  doc.font("Helvetica").fontSize(10).fillColor("white").opacity(0.8)
    .text(subtitle, 50, 72);

  doc.opacity(1);

  // ref badge top-right
  const badgeX = doc.page.width - 160;
  doc.roundedRect(badgeX, 32, 115, 24, 5).fill("rgba(255,255,255,0.18)");
  doc.font("Helvetica-Bold").fontSize(9).fillColor(WHITE)
    .text(ref, badgeX, 40, { width: 115, align: "center" });
}

function addSectionHeading(doc: PDFKit.PDFDocument, title: string, color = PURPLE): void {
  const y = doc.y + 14;
  doc.rect(50, y, doc.page.width - 100, 22).fill(color);
  doc.font("Helvetica-Bold").fontSize(8).fillColor(WHITE)
    .text(title.toUpperCase(), 60, y + 7);
  doc.y = y + 22;
}

function addFields(doc: PDFKit.PDFDocument, fields: Field[]): void {
  const active = fields.filter(f => val(f.value));
  if (active.length === 0) return;

  const startY = doc.y;
  const colLabel = 50;
  const colValue = 185;
  const rowH = 20;
  const totalH = active.length * rowH + 8;

  doc.rect(50, startY, doc.page.width - 100, totalH).fill(BG);

  active.forEach((f, i) => {
    const y = startY + 6 + i * rowH;
    // zebra
    if (i % 2 === 1) {
      doc.rect(50, y - 1, doc.page.width - 100, rowH).fill("#EDE6F5");
    }
    doc.font("Helvetica-Bold").fontSize(8).fillColor(PURPLE_LIGHT)
      .text(f.label, colLabel + 8, y + 4, { width: colValue - colLabel - 16 });
    doc.font("Helvetica").fontSize(9).fillColor(DARK)
      .text(val(f.value), colValue, y + 3, { width: doc.page.width - colValue - 60, lineGap: 1 });
  });

  doc.y = startY + totalH + 4;
}

function addMessageBlock(doc: PDFKit.PDFDocument, label: string, text: string): void {
  if (!text) return;
  addSectionHeading(doc, label, TEAL);
  const startY = doc.y;
  doc.rect(50, startY, doc.page.width - 100, 8).fill(BG); // top pad
  doc.font("Helvetica").fontSize(10).fillColor(DARK)
    .text(text, 62, startY + 8, { width: doc.page.width - 124, lineGap: 3 });
  const endY = doc.y + 12;
  doc.rect(50, startY, doc.page.width - 100, endY - startY).fill(BG);
  // re-render text over the bg
  doc.font("Helvetica").fontSize(10).fillColor(DARK)
    .text(text, 62, startY + 8, { width: doc.page.width - 124, lineGap: 3 });
  doc.y = endY;
}

function addFooter(doc: PDFKit.PDFDocument): void {
  const y = doc.page.height - 42;
  doc.rect(0, y, doc.page.width, 42).fill(BG);
  doc.moveTo(50, y).lineTo(doc.page.width - 50, y).lineWidth(0.5).strokeColor(RULE).stroke();
  doc.font("Helvetica").fontSize(8).fillColor(LIGHT)
    .text(
      "Oak & Aura Care  ·  info@onacare.com.au  ·  +61 452 119 743  ·  Sydney NSW 2000  ·  Registered NDIS Provider",
      50, y + 14,
      { align: "center", width: doc.page.width - 100 },
    );
}

// ─── Public helpers ───────────────────────────────────────────────────────────

export function buildContactPdf(
  name: string, email: string, phone: string,
  topic: string, message: string,
  date: string, time: string, ref: string,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: "A4", bufferPages: true });
    const chunks: Buffer[] = [];
    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    addHeader(doc, "Website Enquiry", `${name}  ·  ${date} at ${time}`, ref);
    doc.y = 126;

    addSectionHeading(doc, "Contact details");
    addFields(doc, [
      { label: "Full name", value: name },
      { label: "Email", value: email },
      { label: "Phone", value: phone },
      { label: "Topic", value: topic },
      { label: "Submitted", value: `${date} at ${time}` },
      { label: "Reference", value: ref },
    ]);

    addMessageBlock(doc, "Message", message);

    doc.font("Helvetica").fontSize(8).fillColor(LIGHT)
      .text(`This document was generated automatically from a form submission on the Oak & Aura Care website on ${date}.`,
        50, doc.y + 20, { align: "center", width: doc.page.width - 100 });

    addFooter(doc);
    doc.end();
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildReferralPdf(d: Record<string, any>, date: string, time: string, ref: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: "A4", bufferPages: true });
    const chunks: Buffer[] = [];
    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const participantName = d.participantFullName || d.referrerName || "Unknown";
    const serviceNames = (d.servicesRequested as string[] | undefined)?.join(", ") || "Not specified";

    addHeader(doc, "NDIS Referral", `${participantName}  ·  ${date} at ${time}`, ref);
    doc.y = 126;

    // Services badge
    doc.roundedRect(50, doc.y, doc.page.width - 100, 26, 6).fill(TEAL);
    doc.font("Helvetica-Bold").fontSize(8.5).fillColor(WHITE)
      .text(`Services requested: ${serviceNames}`, 60, doc.y - 19, { width: doc.page.width - 120 });
    doc.y += 12;

    addSectionHeading(doc, "1. Referrer details");
    addFields(doc, [
      { label: "Relationship", value: referrerLabel(d.referrerType) },
      { label: "Name", value: d.referrerName },
      { label: "Email", value: d.referrerEmail },
      { label: "Phone", value: d.referrerPhone },
      { label: "Organisation", value: d.referrerOrg },
    ]);

    addSectionHeading(doc, "2. Participant details");
    addFields(doc, [
      { label: "Full name", value: d.participantFullName },
      { label: "Preferred name", value: d.participantPreferredName },
      { label: "Date of birth", value: d.participantDob },
      { label: "Gender", value: d.participantGender },
      { label: "Phone", value: d.participantPhone },
      { label: "Email", value: d.participantEmail },
      { label: "Address", value: [d.participantAddress, d.participantSuburb, d.participantPostcode].filter(Boolean).join(", ") },
      { label: "Primary disability", value: d.participantDisability },
      { label: "Language at home", value: d.participantLanguage },
      { label: "Interpreter needed", value: val(d.interpreterRequired) },
      { label: "ATSI", value: val(d.atsi) },
      { label: "Lives alone", value: val(d.livesAlone) },
      { label: "Emergency contact", value: d.emergencyContactName },
      { label: "Emergency phone", value: d.emergencyContactPhone },
      { label: "Guardian / nominee", value: d.guardianName },
      { label: "Guardian phone", value: d.guardianPhone },
    ]);

    addSectionHeading(doc, "3. NDIS plan details", "#1A5580");
    addFields(doc, [
      { label: "NDIS number", value: d.ndisNumber },
      { label: "Plan start", value: d.planStartDate },
      { label: "Plan end", value: d.planEndDate },
      { label: "Review date", value: d.reviewDate },
      { label: "Funding management", value: fundingLabel(d.fundingManagement) },
      { label: "Plan manager", value: d.planManagerName },
      { label: "Plan manager email", value: d.planManagerEmail },
      { label: "Support coordinator", value: d.coordinatorName },
      { label: "Coordinator contact", value: d.coordinatorContact },
      { label: "Plan goals", value: d.planGoals },
    ]);

    addSectionHeading(doc, "4. Services requested", TEAL);
    addFields(doc, [{ label: "Services", value: serviceNames }]);

    addSectionHeading(doc, "5. Support preferences", "#3D6A20");
    addFields(doc, [
      { label: "Support types", value: joinList(d.supportTypes) },
      { label: "Hours per week", value: d.hoursPerWeek },
      { label: "Preferred days", value: joinList(d.preferredDays) },
      { label: "Preferred times", value: joinList(d.preferredTimes) },
      { label: "Support ratio", value: d.supportRatio },
      { label: "Preferred start", value: d.preferredStartDate },
      { label: "Location", value: d.supportLocation },
      { label: "Worker preferences", value: d.workerPreferences },
    ]);

    addSectionHeading(doc, "6. Health & safety", "#8B3010");
    addFields(doc, [
      { label: "Flags", value: joinList(d.healthSafetyFlags) },
      { label: "Details", value: d.healthDetails },
    ]);

    addSectionHeading(doc, "7. Goals & referral reason", "#5A4010");
    addFields(doc, [
      { label: "Reason for referral", value: d.referralReason },
      { label: "Other providers", value: d.otherProviders },
      { label: "Documents available", value: joinList(d.documentsAttached) },
    ]);

    addSectionHeading(doc, "8. Consent", "#2A5040");
    addFields(doc, [
      { label: "Consent given", value: d.consent1 && d.consent2 && d.consent3 ? "Yes — all three declarations accepted" : "Incomplete" },
      { label: "Signed by", value: d.consentName },
      { label: "Relationship", value: d.consentRelationship },
      { label: "Signature", value: d.consentSignature },
      { label: "Date", value: d.consentDate },
    ]);

    doc.font("Helvetica").fontSize(8).fillColor(LIGHT)
      .text(`Generated automatically from a form submission on the Oak & Aura Care website on ${date} at ${time}.`,
        50, doc.y + 20, { align: "center", width: doc.page.width - 100 });

    // footer on every page
    const range = doc.bufferedPageRange();
    for (let i = 0; i < range.count; i++) {
      doc.switchToPage(range.start + i);
      addFooter(doc);
      if (range.count > 1) {
        doc.font("Helvetica").fontSize(8).fillColor(LIGHT)
          .text(`Page ${i + 1} of ${range.count}`, 0, doc.page.height - 28, { align: "center" });
      }
    }

    doc.end();
  });
}
