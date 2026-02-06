"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type CongressionalItem = {
  id: string;
  title: string;
  url: string;
  introduced_at: string;
};

type ApiResponse = {
  success: boolean;
  data?: CongressionalItem[];
  error?: string;
};

const CongressionalActivities = () => {
  const [items, setItems] = useState<CongressionalItem[]>([]);
  const [status, setStatus] = useState<string>("Loading...");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get<ApiResponse>("/api/congress");
        const payload = response.data;
        const nextItems = payload.data ?? [];
        setItems(nextItems);
        setStatus(
          payload.success
            ? nextItems.length
              ? ""
              : "No recent activity."
            : payload.error ?? "Error loading activity."
        );
      } catch (error) {
        console.error("Error fetching congressional activity:", error);
        setStatus("Error loading activity.");
      }
    };

    fetchActivities();
    const interval = setInterval(fetchActivities, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded bg-white p-4 shadow">
      <h2 className="text-lg font-semibold">Congressional Activity</h2>
      {status ? (
        <p className="mt-3 text-sm text-zinc-500">{status}</p>
      ) : (
        <ul className="mt-3">
          {items.map((item) => (
            <li key={item.id} className="border-b border-zinc-200 py-2">
              <a
                className="text-sm font-medium text-zinc-900 hover:underline"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.title}
              </a>
              <div className="text-xs text-zinc-500">
                {new Date(item.introduced_at).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CongressionalActivities;
