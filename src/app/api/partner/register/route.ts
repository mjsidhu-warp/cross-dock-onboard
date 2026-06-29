import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { companyName, contactName, phone, email, address, nearestMarket } =
    body;

  if (!companyName || !email) {
    return NextResponse.json(
      { error: "companyName and email are required" },
      { status: 400 }
    );
  }

  // In production: create user + warehouse records in MongoDB
  // user = { email, phone, fullName: contactName, warehouseIds: [warehouseId], status: "temporary", roleIds: [...] }
  // warehouse = { name: `PENDING-${market}-${slug}`, warehouseType: "crossdock", onboardingStatus: "draft", ... }

  const mockId = `01HYX${Date.now().toString(36).toUpperCase()}`;

  return NextResponse.json({
    success: true,
    warehouseId: mockId,
    userId: `USR-${mockId}`,
    onboardingStatus: "draft",
    message: "Registration saved. Proceed to setup.",
  });
}
