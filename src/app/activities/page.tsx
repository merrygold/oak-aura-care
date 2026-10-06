import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/lib/data";
import { CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Community activities",
  description:
    "Community activities shaped around interests, connection, confidence and everyday goals.",
  openGraph: {
    title: "Community activities | Oak & Aura Care",
    description: "Meaningful ways to connect, learn and take part in your community.",
  },
};

const ACTIVITIES = [
  ["Create", "Arts, music, cooking and hands-on projects."],
  ["Move", "Gentle recreation, outdoor time and active interests."],
  ["Connect", "Social groups, events and shared community experiences."],
  ["Learn", "Everyday skills, confidence and trying something new."],
];

export default function ActivitiesPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 pb-16 pt-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">Our activities</p>
          <h1 className="mt-4 max-w-[16ch] font-heading text-4xl font-extrabold leading-[1.02] sm:text-5xl md:text-6xl">
            More ways to take part—and feel part of something.
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-7 text-muted-foreground">
            Community participation starts with your interests. We support you to discover
            activities, build confidence and form connections that can continue beyond the program.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className={`${buttonVariants.primary} py-2 h-11 rounded-full px-5`} href="/contact">
              Ask what’s coming up
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="glass-panel overflow-hidden rounded-[28px] p-3">
            <Image
              src="/images/community-activity.jpg"
              alt="A diverse community group gardening together outdoors"
              width={1200}
              height={900}
              priority
              className="aspect-[4/3] w-full rounded-[20px] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-12">
        <p className="eyebrow">Choose your kind of day</p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIVITIES.map(([title, text]) => (
            <div key={title} className="glass-panel rounded-[20px] p-6">
              <h2 className="font-heading text-xl font-bold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Activities shown are representative. Contact the team for the current program and
          availability.
        </p>
      </section>

      <CtaSection
        heading="What would you like to try?"
        text="Tell us about your interests, comfort level and goals. We’ll help find a good next step."
      />
    </>
  );
}
