import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/lib/data";
import { CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "SIL vacancy enquiries",
  description:
    "Talk with Oak & Aura Care about current Supported Independent Living options and finding the right home match.",
  openGraph: {
    title: "SIL vacancy enquiries | Oak & Aura Care",
    description: "Explore supported living around your needs, routines and preferred way of life.",
  },
};

const CONSIDERATIONS = [
  ["The person", "Your routines, communication, support needs and what makes home feel right."],
  ["The household", "Compatibility, shared spaces, location and the rhythm of everyday life."],
  ["The support", "Staffing, access, transport and how support can change over time."],
];

export default function VacanciesPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 pb-16 pt-14 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="eyebrow">SIL vacancies</p>
          <h1 className="mt-4 max-w-[16ch] font-heading text-4xl font-extrabold leading-[1.02] sm:text-5xl md:text-6xl">
            A good home match starts with a good conversation.
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-7 text-muted-foreground">
            Supported Independent Living should feel safe, comfortable and compatible with the way
            you want to live. Contact us for current availability rather than relying on an
            out-of-date listing.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className={`${buttonVariants.primary} py-2 h-11 rounded-full px-5`} href="/contact">
              Ask about current options
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-12">
        <p className="eyebrow">What we consider</p>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {CONSIDERATIONS.map(([title, text]) => (
            <div key={title} className="glass-panel rounded-[22px] p-7">
              <h2 className="font-heading text-xl font-bold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-[22px] border border-accent/30 bg-accent/10 p-6">
          <p className="font-heading font-bold">
            Current vacancy details are confirmed directly by our team.
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This demo does not display unverified homes or availability. Enquire with the team for
            an up-to-date conversation.
          </p>
        </div>
      </section>

      <CtaSection
        heading="Tell us what a good home looks like."
        text="Tell us what matters to you. A member of our team will help you understand the next step."
      />
    </>
  );
}
