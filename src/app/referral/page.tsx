import type { Metadata } from "next";
import { ReferralForm } from "@/components/ReferralForm";

export const instant = false;

export const metadata: Metadata = {
  title: { absolute: "Request a service — Oak & Aura Care" },
  description:
    "Submit an NDIS referral for yourself or someone you support. We respond within 1 business day.",
};

export default async function ReferralPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  return <ReferralForm preselectedService={service} />;
}
