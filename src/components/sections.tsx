import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Quote, MapPin } from "lucide-react";
import { buttonVariants } from "@/lib/data";

export function CtaSection({
  heading,
  text,
}: {
  heading: string;
  text: string;
}) {
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-12">
      <div className="glass-panel rounded-[28px] p-8 text-center sm:p-12">
        <h2 className="mx-auto max-w-2xl font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground">{text}</p>
        <div className="mt-7">
          <Link className={`${buttonVariants.primary} py-2 h-11 rounded-full px-5`} href="/contact">
            Start a conversation
            <ArrowRight aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
          <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
            <Check className="size-3" aria-hidden />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function StatsBand({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <section className="mx-auto max-w-[1600px] px-6 pb-16">
      <div className="glass-panel grid gap-6 rounded-[24px] px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.value} className="text-center sm:text-left">
            <p className="font-heading text-4xl font-extrabold text-primary">{stat.value}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TestimonialGrid({
  testimonials,
}: {
  testimonials: { quote: string; name: string; role: string }[];
}) {
  return (
    <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t, i) => (
        <figure
          key={t.name}
          data-reveal
          data-reveal-delay={(i % 3) * 90}
          className="glass-panel flex flex-col rounded-[22px] p-7"
        >
          <Quote className="size-5 text-primary/50" aria-hidden />
          <blockquote className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">
            {t.quote}
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-primary/12 font-heading text-sm font-extrabold text-primary ring-1 ring-primary/25">
              {t.name.charAt(0)}
            </span>
            <span>
              <span className="block font-heading text-sm font-bold text-foreground">{t.name}</span>
              <span className="block text-xs text-muted-foreground">{t.role}</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function StorySection({
  image,
  imageAlt,
  eyebrow,
  heading,
  paragraphs,
  ctaHref = "/contact",
  ctaLabel = "Talk about your transition",
}: {
  image: string;
  imageAlt: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="mx-auto max-w-[1600px] px-6 pb-16">
      <div className="glass-panel overflow-hidden rounded-[26px]">
        <div className="grid md:grid-cols-2">
          <Image
            src={image}
            alt={imageAlt}
            width={1200}
            height={1008}
            className="h-full min-h-80 w-full object-cover"
          />
          <div className="p-8 sm:p-10">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight">{heading}</h2>
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-4 text-sm leading-7 text-muted-foreground">
                {p}
              </p>
            ))}
            <Link
              className={`${buttonVariants.primary} mt-6 h-9 rounded-full px-4 py-2`}
              href={ctaHref}
            >
              {ctaLabel}
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LocationStrip({
  regions,
}: {
  regions: { name: string; detail: string }[];
}) {
  return (
    <section className="mx-auto max-w-[1600px] px-6 pb-16">
      <div className="glass-panel grid gap-6 rounded-[24px] p-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <p className="eyebrow">Where we work</p>
          <h2 className="mt-3 font-heading text-2xl font-bold">Support across greater Sydney.</h2>
        </div>
        {regions.map((region) => (
          <div key={region.name} className="rounded-[18px] border border-border/70 p-5">
            <p className="flex items-center gap-2 font-heading font-bold">
              <MapPin className="size-4 text-primary" aria-hidden />
              {region.name}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{region.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
