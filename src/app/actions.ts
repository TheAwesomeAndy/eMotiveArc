"use server";

import { headers } from "next/headers";
import { handleInquiry } from "@/lib/inquiry-handler";
import type { InquiryState } from "@/lib/inquiry";

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return handleInquiry(formData, { ip, now: Date.now() });
}
