import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/lib/data";
import { CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: { absolute: "Careers at Oak & Aura Care" },
  description:
    "Build a meaningful care career with a team focused on dignity, consistency and individual choice.",
  openGraph: {
    title: "Careers at Oak & Aura Care",
    description:
      "Join a purpose-led team supporting people to live with greater choice and confidence.",
  },
};

const TEAM = [
  ["Work with purpose", "See how thoughtful support can change the texture of everyday life."],
  ["Keep growing", "Build practical capability through guidance, reflection and learning."],
  ["Belong to a team", "Share responsibility with colleagues who communicate and show up."],
];

export default function CareersPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 pb-16 pt-14 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="eyebrow">Careers</p>
          <h1 className="mt-4 max-w-[16ch] font-heading text-4xl font-extrabold leading-[1.02] sm:text-5xl md:text-6xl">
            Bring your skill. Keep your humanity.
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-7 text-muted-foreground">
            We welcome thoughtful, dependable people who want to support individuals, families and
            carers with respect, consistency and genuine care.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className={`${buttonVariants.primary} py-2 h-11 rounded-full px-5`} href="/contact">
              Express your interest
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-12">
        <p className="eyebrow">Life on the team</p>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {TEAM.map(([title, text]) => (
            <div key={title} className="glass-panel rounded-[22px] p-7">
              <h2 className="font-heading text-xl font-bold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <p className="eyebrow">Before you apply</p>
            <h2 className="mt-3 font-heading text-3xl font-bold">
              Care work carries real responsibility.
            </h2>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            Requirements vary by role and may include relevant experience or qualifications,
            screening checks and a driver licence. Contact us for current roles and the requirements
            that apply.
          </p>
        </div>
      </section>

      <CtaSection
        heading="Interested in joining Oak & Aura Care?"
        text="Send your details and tell us what kind of work you’re looking for. We’ll share current opportunities and next steps."
      />
    </>
  );
}
