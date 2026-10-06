import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
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
