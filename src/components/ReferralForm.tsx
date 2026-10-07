"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { SERVICES, buttonVariants } from "@/lib/data";

// ── Types ──────────────────────────────────────────────────────────────

interface ReferralData {
  referrerType: string;
  referrerName: string;
  referrerEmail: string;
  referrerPhone: string;
  referrerOrg: string;
  participantFullName: string;
  participantPreferredName: string;
  participantDob: string;
  participantGender: string;
  participantPhone: string;
  participantEmail: string;
  participantAddress: string;
  participantSuburb: string;
  participantPostcode: string;
  participantDisability: string;
  participantLanguage: string;
  interpreterRequired: boolean;
  atsi: boolean;
  livesAlone: boolean;
  emergencyContactName: string;
  emergencyContactPhone: string;
  guardianName: string;
  guardianPhone: string;
  ndisNumber: string;
  planStartDate: string;
  planEndDate: string;
  reviewDate: string;
  fundingManagement: string;
  planManagerName: string;
  planManagerEmail: string;
  coordinatorName: string;
  coordinatorContact: string;
  planGoals: string;
  servicesRequested: string[];
  supportTypes: string[];
  hoursPerWeek: string;
  preferredDays: string[];
  preferredTimes: string[];
  supportRatio: string;
  preferredStartDate: string;
  supportLocation: string;
  workerPreferences: string;
  healthSafetyFlags: string[];
  healthDetails: string;
  referralReason: string;
  otherProviders: string;
  documentsAttached: string[];
  consent1: boolean;
  consent2: boolean;
  consent3: boolean;
  consentName: string;
  consentRelationship: string;
  consentSignature: string;
  consentDate: string;
}

type Errors = Partial<Record<keyof ReferralData, string>>;
type Updater = (patch: Partial<ReferralData>) => void;

const STORAGE_KEY = "oak_aura_referral_draft";

const STEPS = [
  "About you",
  "Participant",
  "NDIS plan",
  "Services",
  "Support",
  "Health",
  "Goals",
  "Consent",
];

const STEP_DESCRIPTIONS = [
  "Who is completing this referral?",
  "Details about the person being referred",
  "NDIS funding and plan information",
  "Which services are you requesting?",
  "Type, hours and timing of support needed",
  "Health, safety and medical considerations",
  "Reason for referral and participant goals",
  "Consent declaration and submission",
];

function blankData(): ReferralData {
  return {
    referrerType: "",
    referrerName: "",
    referrerEmail: "",
    referrerPhone: "",
    referrerOrg: "",
    participantFullName: "",
    participantPreferredName: "",
    participantDob: "",
    participantGender: "",
    participantPhone: "",
    participantEmail: "",
    participantAddress: "",
    participantSuburb: "",
    participantPostcode: "",
    participantDisability: "",
    participantLanguage: "",
    interpreterRequired: false,
    atsi: false,
    livesAlone: false,
    emergencyContactName: "",
    emergencyContactPhone: "",
    guardianName: "",
    guardianPhone: "",
    ndisNumber: "",
    planStartDate: "",
    planEndDate: "",
    reviewDate: "",
    fundingManagement: "",
    planManagerName: "",
    planManagerEmail: "",
    coordinatorName: "",
    coordinatorContact: "",
    planGoals: "",
    servicesRequested: [],
    supportTypes: [],
    hoursPerWeek: "",
    preferredDays: [],
    preferredTimes: [],
    supportRatio: "",
    preferredStartDate: "",
    supportLocation: "",
    workerPreferences: "",
    healthSafetyFlags: [],
    healthDetails: "",
    referralReason: "",
    otherProviders: "",
    documentsAttached: [],
    consent1: false,
    consent2: false,
    consent3: false,
    consentName: "",
    consentRelationship: "",
    consentSignature: "",
    consentDate: new Date().toLocaleDateString("en-AU"),
  };
}

// ── UI primitives ──────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl border border-border/60 bg-white/70 px-4 py-2.5 text-sm shadow-sm placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all disabled:cursor-not-allowed disabled:opacity-55";

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-xs text-destructive">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-muted-foreground/60">{hint}</p>
      ) : null}
    </div>
  );
}

function TxtInput({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={inputCls}
    />
  );
}

function TxtArea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={inputCls + " resize-none"}
    />
  );
}

function CheckItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <span
        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border-2 transition-all ${
          checked ? "border-primary bg-primary text-primary-foreground" : "border-border/70 bg-white/60"
        }`}
        aria-hidden
      >
        {checked && (
          <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span className="text-sm leading-5">{label}</span>
    </label>
  );
}

function TogglePill({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`rounded-full border-2 px-3.5 py-1 text-xs font-bold transition-all ${
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border/60 bg-white/60 hover:border-primary/40"
      }`}
    >
      {label}
    </button>
  );
}

function RadioCard({
  value,
  label,
  description,
  selected,
  onSelect,
}: {
  value: string;
  label: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-xl border-2 p-3.5 text-left transition-all ${
        selected
          ? "border-primary bg-primary/8 ring-2 ring-primary/15"
          : "border-border/60 bg-white/60 hover:border-primary/40"
      }`}
    >
      <span className="block text-sm font-semibold">{label}</span>
      {description && <span className="mt-0.5 block text-xs text-muted-foreground">{description}</span>}
    </button>
  );
}

// ── Validation ─────────────────────────────────────────────────────────

function validateStep(step: number, d: ReferralData): Errors {
  const e: Errors = {};
  if (step === 1) {
    if (!d.referrerType) e.referrerType = "Please select who is completing this form";
    if (!d.referrerName.trim()) e.referrerName = "Required";
    if (!d.referrerEmail.trim() || !d.referrerEmail.includes("@")) e.referrerEmail = "Valid email required";
    if (!d.referrerPhone.trim()) e.referrerPhone = "Required";
  }
  if (step === 2) {
    if (!d.participantFullName.trim()) e.participantFullName = "Required";
    if (!d.participantDob) e.participantDob = "Required";
    if (!d.participantAddress.trim()) e.participantAddress = "Required";
    if (!d.participantSuburb.trim()) e.participantSuburb = "Required";
    if (!d.participantPostcode.trim()) e.participantPostcode = "Required";
    if (!d.emergencyContactName.trim()) e.emergencyContactName = "Required";
    if (!d.emergencyContactPhone.trim()) e.emergencyContactPhone = "Required";
  }
  if (step === 4) {
    if (d.servicesRequested.length === 0) e.servicesRequested = "Please select at least one service";
  }
  if (step === 7) {
    if (!d.referralReason.trim()) e.referralReason = "Please provide a reason for this referral";
  }
  if (step === 8) {
    if (!d.consent1) e.consent1 = "Required";
    if (!d.consent2) e.consent2 = "Required";
    if (!d.consent3) e.consent3 = "Required";
    if (!d.consentName.trim()) e.consentName = "Required";
    if (!d.consentRelationship.trim()) e.consentRelationship = "Required";
    if (!d.consentSignature.trim()) e.consentSignature = "Signature required";
  }
  return e;
}

// ── Step components ────────────────────────────────────────────────────

function Step1({ d, upd, errors }: { d: ReferralData; upd: Updater; errors: Errors }) {
  const types = [
    { value: "self", label: "Myself", description: "I am the participant" },
    { value: "family", label: "Family or carer", description: "Completing on behalf of someone" },
    { value: "coordinator", label: "Support coordinator", description: "Professional referral" },
    { value: "health", label: "Health professional", description: "GP, nurse, allied health" },
    { value: "plan_manager", label: "Plan manager", description: "Managing NDIS funds" },
    { value: "other", label: "Other", description: "" },
  ];

  return (
    <div className="grid gap-6">
      <Field label="Who is completing this form?" required error={errors.referrerType}>
        <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
          {types.map((t) => (
            <RadioCard key={t.value} {...t} selected={d.referrerType === t.value} onSelect={() => upd({ referrerType: t.value })} />
          ))}
        </div>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your full name" required error={errors.referrerName}>
          <TxtInput value={d.referrerName} onChange={(v) => upd({ referrerName: v })} placeholder="Jane Smith" />
        </Field>
        <Field label="Your email" required error={errors.referrerEmail} hint="Confirmation will be sent here">
          <TxtInput type="email" value={d.referrerEmail} onChange={(v) => upd({ referrerEmail: v })} placeholder="jane@example.com" />
        </Field>
        <Field label="Your phone" required error={errors.referrerPhone}>
          <TxtInput type="tel" value={d.referrerPhone} onChange={(v) => upd({ referrerPhone: v })} placeholder="04xx xxx xxx" />
        </Field>
        {d.referrerType !== "self" && (
          <Field label="Organisation" hint="If applicable">
            <TxtInput value={d.referrerOrg} onChange={(v) => upd({ referrerOrg: v })} placeholder="Organisation name" />
          </Field>
        )}
      </div>
    </div>
  );
}

function Step2({ d, upd, errors }: { d: ReferralData; upd: Updater; errors: Errors }) {
  const isSelf = d.referrerType === "self";
  return (
    <div className="grid gap-6">
      {isSelf && (
        <div className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent-foreground">
          Since you&apos;re completing this for yourself, your name and contact have been pre-filled. Update any details below.
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" required error={errors.participantFullName}>
          <TxtInput value={d.participantFullName} onChange={(v) => upd({ participantFullName: v })} placeholder="Full legal name" />
        </Field>
        <Field label="Preferred name" hint="Optional">
          <TxtInput value={d.participantPreferredName} onChange={(v) => upd({ participantPreferredName: v })} placeholder="What they like to be called" />
        </Field>
        <Field label="Date of birth" required error={errors.participantDob}>
          <TxtInput type="date" value={d.participantDob} onChange={(v) => upd({ participantDob: v })} />
        </Field>
        <Field label="Gender" hint="Optional">
          <TxtInput value={d.participantGender} onChange={(v) => upd({ participantGender: v })} placeholder="e.g. Male, Female, Non-binary" />
        </Field>
        <Field label="Phone">
          <TxtInput type="tel" value={d.participantPhone} onChange={(v) => upd({ participantPhone: v })} placeholder="04xx xxx xxx" />
        </Field>
        <Field label="Email">
          <TxtInput type="email" value={d.participantEmail} onChange={(v) => upd({ participantEmail: v })} placeholder="participant@example.com" />
        </Field>
      </div>
      <Field label="Home address" required error={errors.participantAddress}>
        <TxtInput value={d.participantAddress} onChange={(v) => upd({ participantAddress: v })} placeholder="Street address" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Suburb" required error={errors.participantSuburb}>
          <TxtInput value={d.participantSuburb} onChange={(v) => upd({ participantSuburb: v })} placeholder="Suburb" />
        </Field>
        <Field label="Postcode" required error={errors.participantPostcode}>
          <TxtInput value={d.participantPostcode} onChange={(v) => upd({ participantPostcode: v })} placeholder="2000" />
        </Field>
        <Field label="Primary disability or diagnosis">
          <TxtInput value={d.participantDisability} onChange={(v) => upd({ participantDisability: v })} placeholder="e.g. ABI, Autism, SCI" />
        </Field>
        <Field label="Language spoken at home">
          <TxtInput value={d.participantLanguage} onChange={(v) => upd({ participantLanguage: v })} placeholder="e.g. English, Mandarin" />
        </Field>
      </div>
      <div className="grid gap-3 rounded-xl border border-border/50 bg-white/40 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Additional</p>
        <CheckItem label="Interpreter required" checked={d.interpreterRequired} onChange={(v) => upd({ interpreterRequired: v })} />
        <CheckItem label="Aboriginal and/or Torres Strait Islander" checked={d.atsi} onChange={(v) => upd({ atsi: v })} />
        <CheckItem label="Lives alone" checked={d.livesAlone} onChange={(v) => upd({ livesAlone: v })} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Emergency contact — name & relationship" required error={errors.emergencyContactName}>
          <TxtInput value={d.emergencyContactName} onChange={(v) => upd({ emergencyContactName: v })} placeholder="e.g. Sarah Smith — daughter" />
        </Field>
        <Field label="Emergency contact phone" required error={errors.emergencyContactPhone}>
          <TxtInput type="tel" value={d.emergencyContactPhone} onChange={(v) => upd({ emergencyContactPhone: v })} placeholder="04xx xxx xxx" />
        </Field>
        <Field label="Guardian or nominee" hint="If applicable">
          <TxtInput value={d.guardianName} onChange={(v) => upd({ guardianName: v })} placeholder="Name" />
        </Field>
        <Field label="Guardian phone" hint="If applicable">
          <TxtInput type="tel" value={d.guardianPhone} onChange={(v) => upd({ guardianPhone: v })} placeholder="04xx xxx xxx" />
        </Field>
      </div>
    </div>
  );
}

function Step3({ d, upd }: { d: ReferralData; upd: Updater }) {
  const funding = [
    { value: "self", label: "Self-managed" },
    { value: "plan", label: "Plan-managed" },
    { value: "ndia", label: "NDIA-managed" },
    { value: "unsure", label: "Not sure" },
  ];
  return (
    <div className="grid gap-6">
      <div className="rounded-xl border border-border/50 bg-accent/8 px-4 py-3 text-sm text-muted-foreground">
        All fields in this section are optional. They help us connect with your coordinator and plan your supports faster.
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="NDIS number">
          <TxtInput value={d.ndisNumber} onChange={(v) => upd({ ndisNumber: v })} placeholder="430 000 000" />
        </Field>
        <Field label="Plan start date">
          <TxtInput type="date" value={d.planStartDate} onChange={(v) => upd({ planStartDate: v })} />
        </Field>
        <Field label="Plan end date">
          <TxtInput type="date" value={d.planEndDate} onChange={(v) => upd({ planEndDate: v })} />
        </Field>
        <Field label="Next review date">
          <TxtInput type="date" value={d.reviewDate} onChange={(v) => upd({ reviewDate: v })} />
        </Field>
      </div>
      <Field label="How is the funding managed?">
        <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
          {funding.map((f) => (
            <RadioCard key={f.value} value={f.value} label={f.label} selected={d.fundingManagement === f.value} onSelect={() => upd({ fundingManagement: f.value })} />
          ))}
        </div>
      </Field>
      {d.fundingManagement === "plan" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Plan manager name">
            <TxtInput value={d.planManagerName} onChange={(v) => upd({ planManagerName: v })} placeholder="Name or organisation" />
          </Field>
          <Field label="Plan manager invoice email">
            <TxtInput type="email" value={d.planManagerEmail} onChange={(v) => upd({ planManagerEmail: v })} placeholder="invoices@planmanager.com.au" />
          </Field>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Support coordinator name">
          <TxtInput value={d.coordinatorName} onChange={(v) => upd({ coordinatorName: v })} placeholder="Name" />
        </Field>
        <Field label="Coordinator phone or email">
          <TxtInput value={d.coordinatorContact} onChange={(v) => upd({ coordinatorContact: v })} placeholder="04xx or email@example.com" />
        </Field>
      </div>
      <Field label="NDIS plan goals relevant to this referral">
        <TxtArea rows={4} value={d.planGoals} onChange={(v) => upd({ planGoals: v })} placeholder="Summarise the goals this referral will help address…" />
      </Field>
    </div>
  );
}

function Step4({ d, upd, errors }: { d: ReferralData; upd: Updater; errors: Errors }) {
  function toggle(slug: string) {
    upd({
      servicesRequested: d.servicesRequested.includes(slug)
        ? d.servicesRequested.filter((s) => s !== slug)
        : [...d.servicesRequested, slug],
    });
  }
  return (
    <div className="grid gap-3">
      <p className="text-sm text-muted-foreground">Select all services you would like to enquire about. You may request more than one.</p>
      {errors.servicesRequested && <p className="text-xs text-destructive">{errors.servicesRequested}</p>}
      {SERVICES.map((svc) => {
        const sel = d.servicesRequested.includes(svc.slug);
        return (
          <button
            key={svc.slug}
            type="button"
            onClick={() => toggle(svc.slug)}
            className={`flex items-start gap-4 rounded-[18px] border-2 p-4 text-left transition-all ${
              sel ? "border-primary bg-primary/8 ring-2 ring-primary/15" : "border-border/60 bg-white/60 hover:border-primary/40"
            }`}
          >
            <span
              className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border-2 transition-all ${
                sel ? "border-primary bg-primary text-primary-foreground" : "border-border/70 bg-white/60"
              }`}
              aria-hidden
            >
              {sel && (
                <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-tight">{svc.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{svc.blurb}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-primary/70">{svc.category}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function Step5({ d, upd }: { d: ReferralData; upd: Updater }) {
  function toggleArr(field: "supportTypes" | "preferredDays" | "preferredTimes", val: string) {
    const arr = d[field];
    upd({ [field]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val] });
  }

  const supportTypes = ["Personal care", "Household tasks", "Meal preparation", "Community access", "Group activities", "Transport", "Overnight support", "Supported Independent Living", "Other"];
  const hours = [{ v: "under5", l: "Under 5 hrs" }, { v: "5to10", l: "5–10 hrs" }, { v: "11to20", l: "11–20 hrs" }, { v: "21to40", l: "21–40 hrs" }, { v: "over40", l: "Over 40 hrs" }, { v: "unsure", l: "Not sure" }];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const times = ["Morning", "Afternoon", "Evening", "Overnight"];
  const ratios = [{ v: "1:1", l: "1:1" }, { v: "2:1", l: "2:1" }, { v: "group", l: "Small group" }, { v: "unsure", l: "Not sure" }];

  return (
    <div className="grid gap-6">
      <div className="rounded-xl border border-border/50 bg-accent/8 px-4 py-3 text-sm text-muted-foreground">All fields in this section are optional.</div>
      <Field label="Type of support needed">
        <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
          {supportTypes.map((t) => (
            <CheckItem key={t} label={t} checked={d.supportTypes.includes(t)} onChange={() => toggleArr("supportTypes", t)} />
          ))}
        </div>
      </Field>
      <Field label="Hours of support per week">
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {hours.map((h) => (
            <button key={h.v} type="button" onClick={() => upd({ hoursPerWeek: h.v })}
              className={`rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-all ${d.hoursPerWeek === h.v ? "border-primary bg-primary/8" : "border-border/60 bg-white/60 hover:border-primary/40"}`}>
              {h.l}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Preferred days">
        <div className="mt-2 flex flex-wrap gap-2">
          {days.map((d_) => <TogglePill key={d_} label={d_} selected={d.preferredDays.includes(d_)} onToggle={() => toggleArr("preferredDays", d_)} />)}
        </div>
      </Field>
      <Field label="Preferred times">
        <div className="mt-2 flex flex-wrap gap-2">
          {times.map((t) => <TogglePill key={t} label={t} selected={d.preferredTimes.includes(t)} onToggle={() => toggleArr("preferredTimes", t)} />)}
        </div>
      </Field>
      <Field label="Support ratio">
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ratios.map((r) => (
            <button key={r.v} type="button" onClick={() => upd({ supportRatio: r.v })}
              className={`rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-all ${d.supportRatio === r.v ? "border-primary bg-primary/8" : "border-border/60 bg-white/60 hover:border-primary/40"}`}>
              {r.l}
            </button>
          ))}
        </div>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Preferred start date">
          <TxtInput type="date" value={d.preferredStartDate} onChange={(v) => upd({ preferredStartDate: v })} />
        </Field>
        <Field label="Location / suburb">
          <TxtInput value={d.supportLocation} onChange={(v) => upd({ supportLocation: v })} placeholder="Where support is needed" />
        </Field>
      </div>
      <Field label="Support worker preferences" hint="Gender, language, cultural background, interests or other preferences">
        <TxtArea rows={3} value={d.workerPreferences} onChange={(v) => upd({ workerPreferences: v })} placeholder="Any preferences to help us find the right match…" />
      </Field>
    </div>
  );
}

function Step6({ d, upd }: { d: ReferralData; upd: Updater }) {
  const flags = [
    "Mobility aids or transfers", "Mealtime or swallowing support", "Medication support",
    "Behaviour support plan in place", "Restrictive practices in place", "Epilepsy or seizures",
    "Continence support", "Complex health needs", "Pets or smokers in the home",
  ];
  function toggle(f: string) {
    upd({ healthSafetyFlags: d.healthSafetyFlags.includes(f) ? d.healthSafetyFlags.filter((x) => x !== f) : [...d.healthSafetyFlags, f] });
  }
  return (
    <div className="grid gap-6">
      <div className="rounded-xl border border-border/50 bg-accent/8 px-4 py-3 text-sm text-muted-foreground">
        This helps us match the right staff and prepare your care plan. All fields optional.
      </div>
      <Field label="Health and safety considerations">
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {flags.map((f) => <CheckItem key={f} label={f} checked={d.healthSafetyFlags.includes(f)} onChange={() => toggle(f)} />)}
        </div>
      </Field>
      <Field label="Details" hint="Describe any of the above, or any risks our staff should know before visiting">
        <TxtArea rows={4} value={d.healthDetails} onChange={(v) => upd({ healthDetails: v })} placeholder="Provide any relevant context about health or safety considerations…" />
      </Field>
    </div>
  );
}

function Step7({ d, upd, errors }: { d: ReferralData; upd: Updater; errors: Errors }) {
  const docs = ["NDIS plan", "Functional or OT assessment", "Behaviour support plan", "Medical reports", "Mealtime management plan", "Other"];
  function toggleDoc(doc: string) {
    upd({ documentsAttached: d.documentsAttached.includes(doc) ? d.documentsAttached.filter((x) => x !== doc) : [...d.documentsAttached, doc] });
  }
  return (
    <div className="grid gap-6">
      <Field label="Reason for referral" required error={errors.referralReason} hint="What does the participant want to achieve? What prompted this referral?">
        <TxtArea rows={5} value={d.referralReason} onChange={(v) => upd({ referralReason: v })} placeholder="Describe the reason for this referral and what the participant would like to achieve…" />
      </Field>
      <Field label="Other providers currently involved" hint="GPs, specialists, allied health, other disability providers">
        <TxtArea rows={3} value={d.otherProviders} onChange={(v) => upd({ otherProviders: v })} placeholder="e.g. GP: Dr A. Smith, OT: Allied Health Co…" />
      </Field>
      <Field label="Documents available to share">
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {docs.map((doc) => <CheckItem key={doc} label={doc} checked={d.documentsAttached.includes(doc)} onChange={() => toggleDoc(doc)} />)}
        </div>
      </Field>
    </div>
  );
}

function Step8({ d, upd, errors }: { d: ReferralData; upd: Updater; errors: Errors }) {
  const consentErrors = errors.consent1 || errors.consent2 || errors.consent3;
  return (
    <div className="grid gap-6">
      <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
        <p className="text-sm font-semibold">Consent declaration</p>
        <p className="mt-1 text-xs text-muted-foreground">All three declarations below are required before submitting.</p>
      </div>
      <div className="grid gap-3">
        {[
          { key: "consent1" as const, label: "The participant (or their guardian or nominee) knows about this referral and consents to it.", checked: d.consent1 },
          { key: "consent2" as const, label: "The participant consents to Oak & Aura Care collecting, storing and sharing their information to arrange supports.", checked: d.consent2 },
          { key: "consent3" as const, label: "The participant consents to Oak & Aura Care contacting the people and providers named in this form.", checked: d.consent3 },
        ].map(({ key, label, checked }) => (
          <div key={key} className={`rounded-xl border-2 p-4 transition-all ${checked ? "border-primary/40 bg-primary/5" : consentErrors ? "border-destructive/40 bg-destructive/3" : "border-border/60 bg-white/50"}`}>
            <CheckItem label={label} checked={checked} onChange={(v) => upd({ [key]: v })} />
          </div>
        ))}
        {consentErrors && <p className="text-xs text-destructive">All three declarations are required to proceed.</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name of person giving consent" required error={errors.consentName}>
          <TxtInput value={d.consentName} onChange={(v) => upd({ consentName: v })} placeholder="Full name" />
        </Field>
        <Field label="Relationship to participant" required error={errors.consentRelationship}>
          <TxtInput value={d.consentRelationship} onChange={(v) => upd({ consentRelationship: v })} placeholder="e.g. Self, mother, support coordinator" />
        </Field>
      </div>
      <Field label="Signature" required error={errors.consentSignature} hint="Type your full name as your electronic signature">
        <TxtInput value={d.consentSignature} onChange={(v) => upd({ consentSignature: v })} placeholder="Type your full name" />
      </Field>
      <Field label="Date">
        <TxtInput value={d.consentDate} onChange={() => {}} disabled />
      </Field>
    </div>
  );
}

// ── Stepper ────────────────────────────────────────────────────────────

function Stepper({ step }: { step: number }) {
  const total = STEPS.length;
  return (
    <div className="border-b border-border/40 bg-background/92 px-4 py-3 backdrop-blur-sm sm:px-6 sm:py-4">
      <div className="mx-auto max-w-3xl">
        {/* Mobile: text + bar */}
        <div className="flex items-center justify-between sm:hidden">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Step {step} of {total}</p>
            <p className="mt-0.5 font-heading text-sm font-bold">{STEPS[step - 1]}</p>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i + 1 < step ? "w-4 bg-accent" : i + 1 === step ? "w-4 bg-primary" : "w-2 bg-border"}`} />
            ))}
          </div>
        </div>
        {/* Desktop: full stepper */}
        <div className="hidden sm:flex items-start">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 items-start">
              <div className="flex flex-col items-center">
                <div className={`grid size-7 place-items-center rounded-full text-xs font-bold transition-all ${i + 1 < step ? "bg-accent text-accent-foreground" : i + 1 === step ? "bg-primary text-primary-foreground shadow-md ring-4 ring-primary/20" : "bg-muted text-muted-foreground"}`}>
                  {i + 1 < step ? (
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                  ) : i + 1}
                </div>
                <span className={`mt-1.5 text-center text-[9px] font-semibold leading-tight ${i + 1 === step ? "text-primary" : "text-muted-foreground/60"}`} style={{ maxWidth: "52px" }}>
                  {label}
                </span>
              </div>
              {i < total - 1 && (
                <div className={`mt-3.5 h-0.5 flex-1 transition-colors ${i + 1 < step ? "bg-accent" : "bg-border/50"}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Success screen ─────────────────────────────────────────────────────

function SuccessScreen({ data }: { data: ReferralData }) {
  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <div className="mx-auto mb-6 grid size-20 place-items-center rounded-full bg-accent/20 ring-8 ring-accent/10">
        <Check className="size-10 text-accent" strokeWidth={2.5} />
      </div>
      <h1 className="font-heading text-3xl font-extrabold leading-tight">Referral received</h1>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        Thank you, <strong>{data.referrerName}</strong>. We&apos;ve received your referral and our team will be in touch within <strong>1 business day</strong>.
      </p>
      {data.referrerEmail && (
        <p className="mt-2 text-sm text-muted-foreground">
          A confirmation email has been sent to <strong>{data.referrerEmail}</strong>.
        </p>
      )}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/" className={`${buttonVariants.primary} h-11 rounded-full px-7`}>
          Back to home
        </Link>
        <Link href="/services" className={`${buttonVariants.outline} h-11 rounded-full px-7`}>
          View all services
        </Link>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────

export function ReferralForm({ preselectedService }: { preselectedService?: string }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ReferralData>(blankData);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const initialized = useRef(false);

  // Load from localStorage + apply preselected service
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    let saved: Partial<ReferralData> = {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) saved = JSON.parse(raw);
    } catch {}
    setData((prev) => {
      const merged = { ...prev, ...saved };
      if (preselectedService && !merged.servicesRequested.includes(preselectedService)) {
        merged.servicesRequested = [...merged.servicesRequested, preselectedService];
      }
      return merged;
    });
  }, [preselectedService]);

  // Auto-save to localStorage
  useEffect(() => {
    const t = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
    }, 600);
    return () => clearTimeout(t);
  }, [data]);

  // Auto-populate participant from referrer when "self"
  const prevType = useRef(data.referrerType);
  useEffect(() => {
    if (data.referrerType === "self" && prevType.current !== "self") {
      setData((prev) => ({
        ...prev,
        participantFullName: prev.participantFullName || prev.referrerName,
        participantPhone: prev.participantPhone || prev.referrerPhone,
        participantEmail: prev.participantEmail || prev.referrerEmail,
      }));
    }
    prevType.current = data.referrerType;
  }, [data.referrerType]);

  const upd: Updater = (patch) => setData((prev) => ({ ...prev, ...patch }));

  function goNext() {
    const e = validateStep(step, data);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setErrors({});
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit() {
    const e = validateStep(8, data);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error || "Failed");
      }
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error && err.message.length < 200
          ? err.message
          : "There was a problem submitting your referral. Please try again or call us on +61 452 119 743.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) return <SuccessScreen data={data} />;

  const steps = [
    <Step1 key={1} d={data} upd={upd} errors={errors} />,
    <Step2 key={2} d={data} upd={upd} errors={errors} />,
    <Step3 key={3} d={data} upd={upd} />,
    <Step4 key={4} d={data} upd={upd} errors={errors} />,
    <Step5 key={5} d={data} upd={upd} />,
    <Step6 key={6} d={data} upd={upd} />,
    <Step7 key={7} d={data} upd={upd} errors={errors} />,
    <Step8 key={8} d={data} upd={upd} errors={errors} />,
  ];

  return (
    <div>
      <Stepper step={step} />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {/* Step header */}
        <div className="mb-6">
          <p className="eyebrow">{`Step ${step} of ${STEPS.length}`}</p>
          <h1 className="mt-2 font-heading text-2xl font-extrabold sm:text-3xl">{STEPS[step - 1]}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{STEP_DESCRIPTIONS[step - 1]}</p>
        </div>

        {/* Form card */}
        <div className="glass-panel rounded-[26px] p-6 sm:p-8">
          {steps[step - 1]}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className={`${buttonVariants.outline} h-11 rounded-full px-5`}
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </button>
          ) : (
            <Link href="/services" className={`${buttonVariants.outline} h-11 rounded-full px-5`}>
              <ArrowLeft className="size-4" aria-hidden />
              Services
            </Link>
          )}

          {step < STEPS.length ? (
            <button
              type="button"
              onClick={goNext}
              className={`${buttonVariants.primary} h-11 rounded-full px-6`}
            >
              Continue
              <ArrowRight className="size-4" aria-hidden />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className={`${buttonVariants.primary} h-11 rounded-full px-6`}
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  Submitting…
                </>
              ) : (
                <>
                  Submit referral
                  <Check className="size-4" aria-hidden />
                </>
              )}
            </button>
          )}
        </div>

        {submitError && (
          <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/8 px-4 py-3 text-sm text-destructive">
            {submitError}
          </div>
        )}

        <p className="mt-5 text-center text-xs text-muted-foreground/50">
          Your progress is saved automatically — you can safely close this page and return later.
        </p>
      </div>
    </div>
  );
}
