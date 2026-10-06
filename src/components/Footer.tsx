import Link from "next/link";
import { EMAIL, LOCATION, PHONE, PHONE_HREF } from "@/lib/data";

function Logo() {
  return (
    <Link className="flex min-w-0 items-center gap-2.5" aria-label="Oak & Aura Care home" href="/">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/12 ring-1 ring-primary/25">
        <span className="size-3 rounded-full bg-primary" />
      </span>
      <span className="truncate font-heading text-[15px] font-bold text-foreground">
        Oak &amp; Aura Care
      </span>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Personalised disability, aged care and youth support that protects dignity, choice and
            everyday independence.
          </p>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow">Explore</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <Link className="hover:text-foreground" href="/services">
              Services
            </Link>
            <Link className="hover:text-foreground" href="/about">
              About
            </Link>
            <Link className="hover:text-foreground" href="/vacancies">
              SIL vacancies
            </Link>
            <Link className="hover:text-foreground" href="/careers">
              Careers
            </Link>
            <Link className="hover:text-foreground" href="/activities">
              Activities
            </Link>
            <Link className="hover:text-foreground" href="/contact">
              Contact
            </Link>
          </div>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow">Connect</p>
          <a className="mt-3 block text-sm text-muted-foreground hover:text-foreground" href={PHONE_HREF}>
            {PHONE}
          </a>
          <a className="mt-2 block text-sm text-muted-foreground hover:text-foreground" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <p className="mt-2 text-sm text-muted-foreground">{LOCATION}</p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-6 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>We acknowledge the Traditional Custodians of the lands on which we live and work.</p>
          <p>© 2026 Oak &amp; Aura Care</p>
        </div>
      </div>
    </footer>
  );
}
