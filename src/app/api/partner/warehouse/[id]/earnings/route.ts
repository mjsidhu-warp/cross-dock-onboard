import { NextRequest, NextResponse } from "next/server";
import { MOCK_EARNINGS, MOCK_EARNINGS_HISTORY } from "@/lib/mock-data";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // In production:
  // 1. Count completed warehouse_tasks by stage for date range
  // 2. Multiply by financeSettings rates (or accepted rate card)
  // 3. Cross-reference warehouse_invoices if available

  return NextResponse.json({
    warehouseId: id,
    current: MOCK_EARNINGS,
    history: MOCK_EARNINGS_HISTORY,
  });
}
