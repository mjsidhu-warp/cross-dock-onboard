import { NextRequest, NextResponse } from "next/server";
import { EMPTY_SETUP } from "@/lib/mock-data";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // In production: fetch from MongoDB
  return NextResponse.json({
    warehouseId: id,
    onboardingStatus: "setup_in_progress",
    checklist: {
      ...EMPTY_SETUP,
      rateTermsAccepted: true,
      rateTermsAcceptedAt: "2026-06-28T10:00:00Z",
    },
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  // In production: update MongoDB warehouse/onboarding record

  return NextResponse.json({
    warehouseId: id,
    updated: Object.keys(body),
    success: true,
  });
}
