"use client";

import { useState } from "react";
import { buttonVariants } from "@/lib/data";

const inputClasses =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

const labelClasses = "text-sm font-medium leading-none";

export function EnquiryForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="mt-6 rounded-[18px] border border-accent/30 bg-accent/10 p-6 text-sm leading-6">
        <p className="font-heading font-bold">Thank you—your enquiry is on its way.</p>
        <p className="mt-2 text-muted-foreground">
          A member of our team will be in touch to talk through the next step.
        </p>
      </div>
    );
  }

  return (
    <form
      className="mt-6 grid gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-2">
        <label className={labelClasses} htmlFor="name">
          Your name
        </label>
        <input className={inputClasses} id="name" name="name" required placeholder="Name" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className={labelClasses} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className={inputClasses}
            id="email"
            name="email"
            required
            placeholder="you@example.com"
          />
        </div>
        <div className="grid gap-2">
          <label className={labelClasses} htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            className={inputClasses}
            id="phone"
            name="phone"
            placeholder="Phone number"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <label className={labelClasses} htmlFor="topic">
          What can we help with?
        </label>
        <input
          className={inputClasses}
          id="topic"
          name="topic"
          required
          placeholder="A service, SIL, careers or another question"
        />
      </div>
      <div className="grid gap-2">
        <label className={labelClasses} htmlFor="message">
          Tell us a little more
        </label>
        <textarea
          className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Share only what you are comfortable sharing."
        />
      </div>
      <button className={`${buttonVariants.primary} py-2 h-11 rounded-full justify-self-start px-6`} type="submit">
        Send enquiry
      </button>
    </form>
  );
}
