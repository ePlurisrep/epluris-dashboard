import { NextResponse } from "next/server";
import { fetchNationalDebt } from "@/lib/data-fetchers";

export async function GET() {
  try {
    const response = await fetchNationalDebt();
    const debtValue = response?.data?.[0]?.tot_pub_debt_out_amt as
      | string
      | undefined;

    if (!debtValue) {
      return NextResponse.json(
        { success: false, error: "National debt unavailable." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, data: { debt: debtValue } });
  } catch (error) {
    console.error("Failed to fetch national debt:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch national debt." },
      { status: 500 }
    );
  }
}
