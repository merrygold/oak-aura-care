"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, buttonVariants } from "@/lib/data";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        className="glass-nav mx-auto flex max-w-[1600px] items-center gap-3 rounded-full px-3 py-2.5 sm:px-5"
        aria-label="Main navigation"
      >
        <Link
          className="flex min-w-0 items-center gap-2.5"
          aria-label="Oak & Aura Care home"
          href="/"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/12 ring-1 ring-primary/25">
            <span className="size-3 rounded-full bg-primary" />
          </span>
          <span className="truncate font-heading text-[15px] font-bold text-foreground">
            Oak &amp; Aura Care
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-6 text-sm font-semibold text-muted-foreground lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              className={`transition-colors hover:text-foreground ${
                pathname.startsWith(link.href) ? "text-foreground" : ""
              }`}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          className={`${buttonVariants.primary} h-9 py-2 ml-auto hidden rounded-full px-5 sm:inline-flex lg:ml-0`}
          href="/contact"
        >
          Talk to us
        </Link>

        <button
          className={`${buttonVariants.outline} h-9 w-9 ml-auto rounded-full border-0 bg-transparent shadow-none lg:hidden`}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </nav>

      {open ? (
        <div className="glass-panel mx-auto mt-2 max-w-[1600px] rounded-[22px] p-4 lg:hidden">
          <div className="grid gap-1 text-sm font-semibold text-muted-foreground">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                className={`rounded-full px-4 py-2.5 transition-colors hover:bg-accent hover:text-accent-foreground ${
                  pathname.startsWith(link.href) ? "text-foreground" : ""
                }`}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              className={`${buttonVariants.primary} mt-2 h-10 rounded-full px-5`}
              href="/contact"
              onClick={() => setOpen(false)}
            >
              Talk to us
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
