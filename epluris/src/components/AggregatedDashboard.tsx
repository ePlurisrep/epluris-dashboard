"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type Aggregated = {
  debt?: string | null;
  bills?: any[];
  tweets?: any[];
  posts?: any[];
  warnings?: string[];
};

export default function AggregatedDashboard() {
  const [agg, setAgg] = useState<Aggregated | null>(null);
  const [status, setStatus] = useState<string>("Loading...");

  useEffect(() => {
    let mounted = true;
    async function fetchAgg() {
      try {
        const res = await axios.get("/api/aggregate");
        if (!mounted) return;
        setAgg(res.data.data);
        setStatus("");
      } catch (e) {
        console.error("Aggregate fetch failed", e);
        setStatus("Error fetching aggregate");
      }
    }

    fetchAgg();
    const id = setInterval(fetchAgg, 5 * 60 * 1000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  if (status) return <div className="rounded bg-white p-4 shadow">{status}</div>;
  if (!agg) return null;

  return (
    <div className="rounded bg-white p-4 shadow">
      <h2 className="text-lg font-semibold">Merged Data</h2>
      <div className="mt-3">
        <strong>National Debt:</strong> <div>{agg.debt ?? "Unavailable"}</div>
      </div>
      <div className="mt-3">
        <strong>Bills:</strong>
        <ul>
          {(agg.bills ?? []).slice(0, 5).map((b: any) => (
            <li key={b.id}>{b.title ?? b.name ?? JSON.stringify(b)}</li>
          ))}
        </ul>
      </div>
      <div className="mt-3">
        <strong>Posts:</strong>
        <ul>
          {(agg.posts ?? []).slice(0, 5).map((p: any) => (
            <li key={p.id}>{p.title ?? p.id}</li>
          ))}
        </ul>
      </div>
      <div className="mt-3">
        <strong>Tweets:</strong>
        <ul>
          {(agg.tweets ?? []).slice(0, 5).map((t: any) => (
            <li key={t.id}>{t.text}</li>
          ))}
        </ul>
      </div>
      {agg.warnings?.length ? (
        <div className="mt-3 text-sm text-yellow-600">
          <strong>Warnings:</strong>
          <ul>
            {agg.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
