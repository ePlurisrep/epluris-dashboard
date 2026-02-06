import { NextResponse } from "next/server";
import { fetchNationalDebt, fetchRecentBills } from "@/lib/data-fetchers";
import axios from "axios";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export async function GET() {
  const results: any = { debt: null, bills: null, tweets: null, posts: null, warnings: [] };

  // Fetch national debt
  try {
    const debtRes = await fetchNationalDebt();
    const debtValue = debtRes?.data?.[0]?.tot_pub_debt_out_amt as string | undefined;
    results.debt = debtValue ?? null;

    if (isSupabaseConfigured && supabase && debtValue) {
      try {
        await supabase.from("debt_records").insert({ recorded_at: new Date().toISOString(), debt_amount: debtValue });
      } catch (e) {
        results.warnings.push("Failed to persist debt record: " + (e as Error).message);
      }
    }
  } catch (e) {
    console.error("Debt fetch failed", e);
    results.warnings.push("Debt fetch failed");
  }

  // Fetch recent bills
  try {
    const billsRes = await fetchRecentBills(10);
    const bills = billsRes?.bills ?? billsRes?.data ?? [];
    results.bills = bills;

    if (isSupabaseConfigured && supabase && Array.isArray(bills)) {
      try {
        const upserts = bills.map((b: any, idx: number) => ({
          id: b.billNumber ?? b.bill_number ?? `bill-${idx}`,
          title: b.title ?? b.bill_title ?? "Untitled",
          url: b.url ?? b.url ?? "https://www.congress.gov/",
          introduced_at: b.introducedDate ?? b.introduced_at ?? new Date().toISOString(),
        }));

        await supabase.from("bills").upsert(upserts, { onConflict: "id" });
      } catch (e) {
        results.warnings.push("Failed to persist bills: " + (e as Error).message);
      }
    }
  } catch (e) {
    console.error("Bills fetch failed", e);
    results.warnings.push("Bills fetch failed");
  }

  // Fetch tweets via internal API (may require token)
  try {
    const tweetsRes = await fetch(new URL("/api/tweets", process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000").toString());
    if (tweetsRes.ok) {
      const payload = await tweetsRes.json();
      results.tweets = payload.data ?? [];

      if (isSupabaseConfigured && supabase && Array.isArray(payload.data)) {
        try {
          const upserts = payload.data.map((t: any) => ({ id: t.id, text: t.text, created_at: t.created_at }));
          await supabase.from("tweets").upsert(upserts, { onConflict: "id" });
        } catch (e) {
          results.warnings.push("Failed to persist tweets: " + (e as Error).message);
        }
      }
    } else {
      const err = await tweetsRes.text();
      results.warnings.push("Tweets fetch failed: " + err);
    }
  } catch (e) {
    console.error("Tweets fetch failed", e);
    results.warnings.push("Tweets fetch failed");
  }

  // Fetch posts from Supabase "posts" table if available
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: postsData, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false }).limit(20);
      if (error) {
        results.warnings.push("Failed to read posts: " + error.message);
      } else {
        results.posts = postsData ?? [];
      }
    } catch (e) {
      results.warnings.push("Failed to read posts: " + (e as Error).message);
    }
  } else {
    results.warnings.push("Supabase not configured; posts not available.");
  }

  return NextResponse.json({ success: true, data: results });
}
