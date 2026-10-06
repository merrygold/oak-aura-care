import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICE_CATEGORIES, SERVICES, buttonVariants } from "@/lib/data";
import { CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Disability & care services",
  description:
    "Explore personalised support for daily living, wellbeing, independence and community participation.",
  openGraph: {
    title: "Disability & care services | Oak & Aura Care",
    description: "Explore support built around your life, goals and choices.",
  },
};

function ServiceCard({ slug }: { slug: string }) {
  const service = SERVICES.find((s) => s.slug === slug)!;
  return (
    <Link
      className="glass-panel group rounded-[22px] p-7 transition-transform hover:-translate-y-1"
      href={`/services/${service.slug}`}
    >
      <h2 className="font-heading text-2xl font-bold">{service.title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.blurb}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary">
        Explore support
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 pb-16 pt-14 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="eyebrow">Our services</p>
          <h1 className="mt-4 max-w-[16ch] font-heading text-4xl font-extrabold leading-[1.02] sm:text-5xl md:text-6xl">
            The right support should fit the life you want.
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-7 text-muted-foreground">
            Explore practical, person-centred support designed to strengthen choice, confidence and
            connection.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className={`${buttonVariants.primary} py-2 h-11 rounded-full px-5`} href="/contact">
              Talk through your options
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {SERVICE_CATEGORIES.map((category) => (
        <section key={category.name} className="mx-auto max-w-[1600px] px-6 py-10">
          <p className="eyebrow">{category.name}</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {category.slugs.map((slug) => (
              <ServiceCard key={slug} slug={slug} />
            ))}
          </div>
        </section>
      ))}

      <CtaSection
        heading="Let’s talk about the right support for you."
        text="Tell us what matters to you. A member of our team will help you understand the next step."
      />
    </>
  );
}
