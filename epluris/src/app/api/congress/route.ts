import { NextResponse } from "next/server";
import { fetchRecentBills } from "@/lib/data-fetchers";

type CongressBill = {
  billNumber?: string;
  title?: string;
  url?: string;
  introducedDate?: string;
};

type CongressResponse = {
  bills?: CongressBill[];
};

export async function GET() {
  const apiKey = process.env.CONGRESS_GOV_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing CONGRESS_API_KEY." },
      { status: 500 }
    );
  }

  try {
    const response = (await fetchRecentBills(10)) as CongressResponse;

    const items = (response.bills ?? []).map((bill, index) => ({
      id: bill.billNumber ?? `bill-${index}`,
      title: bill.title ?? "Untitled bill",
      url: bill.url ?? "https://www.congress.gov/",
      introduced_at: bill.introducedDate ?? new Date().toISOString(),
    }));

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Failed to fetch congressional activity:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch congressional activity." },
      { status: 500 }
    );
  }
}
