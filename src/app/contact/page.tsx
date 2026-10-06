import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { EMAIL, LOCATION, PHONE, PHONE_HREF } from "@/lib/data";
import { EnquiryForm } from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: { absolute: "Contact Oak & Aura Care" },
  description:
    "Speak with Oak & Aura Care about disability support, aged care, SIL, careers or a general enquiry.",
  openGraph: {
    title: "Contact Oak & Aura Care",
    description: "Start a clear, friendly conversation about the support you need.",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 pb-16 pt-14 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 max-w-[16ch] font-heading text-4xl font-extrabold leading-[1.02] sm:text-5xl md:text-6xl">
            Start a conversation that goes somewhere.
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-7 text-muted-foreground">
            Tell us who you’re supporting and what you would like help with. For the fastest
            response, call our team directly.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-8 px-6 pb-16 md:grid-cols-5">
        <div className="space-y-5 md:col-span-2">
          <a href={PHONE_HREF} className="glass-panel flex items-start gap-4 rounded-[20px] p-5">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <Phone className="size-5" aria-hidden />
            </span>
            <span>
              <span className="block text-xs font-bold uppercase text-muted-foreground">Call</span>
              <span className="mt-1 block font-heading font-bold">{PHONE}</span>
            </span>
          </a>
          <a href={`mailto:${EMAIL}`} className="glass-panel flex items-start gap-4 rounded-[20px] p-5">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-foreground">
              <Mail className="size-5" aria-hidden />
            </span>
            <span>
              <span className="block text-xs font-bold uppercase text-muted-foreground">Email</span>
              <span className="mt-1 block break-all font-heading font-bold">{EMAIL}</span>
            </span>
          </a>
          <div className="glass-panel flex items-start gap-4 rounded-[20px] p-5">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sun/15 text-foreground">
              <MapPin className="size-5" aria-hidden />
            </span>
            <span>
              <span className="block text-xs font-bold uppercase text-muted-foreground">
                Location
              </span>
              <span className="mt-1 block font-heading font-bold">{LOCATION}</span>
            </span>
          </div>
        </div>
        <div className="glass-panel rounded-[24px] p-7 md:col-span-3">
          <p className="eyebrow">Send an enquiry</p>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
