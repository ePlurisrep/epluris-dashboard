"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const NationalDebtTicker = () => {
  const [debt, setDebt] = useState<string>("Loading...");

  type ApiResponse = {
    success: boolean;
    data?: {
      debt: string;
    };
    error?: string;
  };

  useEffect(() => {
    const fetchDebt = async () => {
      try {
        const response = await axios.get<ApiResponse>("/api/debt");
        const payload = response.data;

        if (!payload.success || !payload.data?.debt) {
          setDebt(payload.error ?? "Unavailable");
          return;
        }

        setDebt(`$${Number(payload.data.debt).toLocaleString()}`);
      } catch (error) {
        console.error("Error fetching national debt:", error);
        setDebt("Error");
      }
    };

    fetchDebt();
    const interval = setInterval(fetchDebt, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded bg-white p-4 shadow">
      <h2 className="text-lg font-semibold">National Debt</h2>
      <p className="text-2xl">{debt}</p>
    </div>
  );
};

export default NationalDebtTicker;
