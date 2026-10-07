import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SERVICES, buttonVariants, getService } from "@/lib/data";
import { CtaSection, CheckList } from "@/components/sections";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.blurb,
    openGraph: {
      title: `${service.title} | Oak & Aura Care`,
      description: service.blurb,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <section className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 pb-16 pt-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">{service.category}</p>
          <h1 className="mt-4 max-w-[16ch] font-heading text-4xl font-extrabold leading-[1.02] sm:text-5xl md:text-6xl">
            {service.title}
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-7 text-muted-foreground">
            {service.intro}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className={`${buttonVariants.primary} py-2 h-11 rounded-full px-5`} href="/contact">
              Ask about this support
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="glass-panel overflow-hidden rounded-[28px] p-3">
            <Image
              src={service.image}
              alt={service.imageAlt}
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
          <p className="eyebrow">What this can support</p>
          <h2 className="mt-3 font-heading text-3xl font-bold">
            Progress that feels useful in everyday life.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            We begin with what you want to change, protect or enjoy more. Together, we shape support
            around your strengths, preferences and existing network.
          </p>
        </div>
        <div className="glass-panel rounded-[22px] p-7">
          <CheckList items={service.benefits} />
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-12">
        <p className="eyebrow">How we can help</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {service.helps.map((help, i) => (
            <div key={help} className="glass-panel rounded-[18px] p-6">
              <span className="font-heading text-2xl font-extrabold text-primary/25">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-heading text-lg font-bold">{help}</h3>
            </div>
          ))}
        </div>
      </section>

      <CtaSection
        heading="Let’s talk about the right support for you."
        text="Tell us what matters to you. A member of our team will help you understand the next step."
      />
    </>
  );
}
