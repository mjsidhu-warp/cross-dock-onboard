import { NextRequest, NextResponse } from "next/server";
import { MOCK_ROUTES } from "@/lib/mock-data";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // In production: query shipments where deliveryInfos[].warehouseId === id
  // and status in [inRouteToWareHouse, arrivedAtWareHouse, departedFromWarehouse, ...]

  return NextResponse.json({
    warehouseId: id,
    date: new Date().toISOString().split("T")[0],
    routes: MOCK_ROUTES,
  });
}
