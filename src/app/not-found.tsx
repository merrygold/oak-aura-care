import Link from "next/link";
import { buttonVariants } from "@/lib/data";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-24 text-center">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold leading-[1.02] sm:text-5xl">
        We couldn’t find that page.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground">
        The link may be out of date. Explore our services or get in touch and we’ll point you the
        right way.
      </p>
      <div className="mt-7 flex justify-center gap-3">
        <Link className={`${buttonVariants.primary} py-2 h-11 rounded-full px-5`} href="/">
          Back home
        </Link>
        <Link className={`${buttonVariants.outline} py-2 h-11 rounded-full px-5`} href="/contact">
          Talk to us
        </Link>
      </div>
    </section>
  );
}
