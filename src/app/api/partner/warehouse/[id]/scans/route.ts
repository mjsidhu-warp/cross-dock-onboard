import { NextRequest, NextResponse } from "next/server";
import { MOCK_SCANS } from "@/lib/mock-data";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // In production: query warehouse_tasks where warehouseId === id
  // group by stage (inbound/outbound), count completed vs total
  // missed = where status !== "completed"

  return NextResponse.json({
    warehouseId: id,
    ...MOCK_SCANS,
  });
}
