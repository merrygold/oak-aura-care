import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/lib/data";
import { CtaSection, CheckList } from "@/components/sections";

export const metadata: Metadata = {
  title: "Hospital & aged-care transitions",
  description:
    "Coordinated disability support for a safer move from hospital or residential care into your home.",
  openGraph: {
    title: "Hospital & aged-care transitions | Oak & Aura Care",
    description: "A clearer, coordinated path from care to home.",
  },
};

const COORDINATED = [
  "Needs and home-readiness planning",
  "Coordination with family and care teams",
  "Connecting equipment and community supports",
  "Progressive support as routines settle",
];

export default function TransitionsPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 pb-16 pt-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">Complex transitions</p>
          <h1 className="mt-4 max-w-[16ch] font-heading text-4xl font-extrabold leading-[1.02] sm:text-5xl md:text-6xl">
            From care to home, with fewer gaps.
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-7 text-muted-foreground">
            Leaving hospital or residential care can bring many decisions at once. We bring the
            people and practical details together so the move feels safer, clearer and more
            settled.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className={`${buttonVariants.primary} py-2 h-11 rounded-full px-5`} href="/contact">
              Plan a transition
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="glass-panel overflow-hidden rounded-[28px] p-3">
            <Image
              src="/images/transition-care.webp"
              alt="An older person and family member reviewing a transition plan with a support coordinator"
              width={1200}
              height={900}
              priority
              className="aspect-[4/3] w-full rounded-[20px] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-8 px-6 py-12 md:grid-cols-2">
        <div>
          <p className="eyebrow">A joined-up approach</p>
          <h2 className="mt-3 font-heading text-3xl font-bold">One plan around the whole move.</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            We work with you, your family and existing care team to understand what needs to be
            ready before you leave. Then we help organise the supports that make home safer and more
            sustainable.
          </p>
        </div>
        <div className="glass-panel rounded-[22px] p-7">
          <CheckList
            items={[
              "Leave care with a clear support plan",
              "Reduce gaps between services",
              "Settle into home with the right team around you",
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-12">
        <p className="eyebrow">What we coordinate</p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {COORDINATED.map((title) => (
            <div key={title} className="glass-panel rounded-[20px] p-6">
              <h3 className="font-heading text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Clear communication, practical preparation and steady follow-through at every stage.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-12">
        <div className="rounded-[26px] bg-primary p-8 text-primary-foreground sm:p-12">
          <p className="eyebrow">Built around the person</p>
          <h2 className="mt-3 max-w-2xl font-heading text-3xl font-bold">
            A safe discharge is only the beginning.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-primary-foreground/75">
            Our support continues while new routines settle. We review what is working, respond to
            changes and help the person regain confidence in their own home and community.
          </p>
        </div>
      </section>

      <CtaSection
        heading="Preparing for a move from care?"
        text="Speak with our team early so we can understand the situation and help map the next steps."
      />
    </>
  );
}
