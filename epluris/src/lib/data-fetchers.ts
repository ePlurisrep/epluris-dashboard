import { supabase } from "./supabase";

// Cache system to respect rate limits
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

type CacheRow = {
  key: string;
  data: unknown;
  expires_at: string;
};

export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  duration = CACHE_DURATION
): Promise<T> {
  // Check Supabase cache table first
  const { data: cached, error: cacheError } = await supabase
    .from("cached_data")
    .select("*")
    .eq("key", key)
    .single<CacheRow>();

  if (!cacheError && cached && new Date(cached.expires_at) > new Date()) {
    return cached.data as T;
  }

  // Fetch fresh data
  const freshData = await fetcher();

  // Store in cache
  await supabase.from("cached_data").upsert({
    key,
    data: freshData,
    expires_at: new Date(Date.now() + duration).toISOString(),
  });

  return freshData;
}

// Specific fetchers
export async function fetchNationalDebt() {
  return fetchWithCache("national_debt", async () => {
    const res = await fetch(
      "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date&page[size]=1"
    );
    return res.json();
  });
}

export async function fetchRecentBills(limit = 10) {
  return fetchWithCache("recent_bills", async () => {
    const res = await fetch(
      `https://api.congress.gov/v3/bill?format=json&limit=${limit}&apiKey=${process.env.CONGRESS_GOV_API_KEY}`
    );
    return res.json();
  });
}
