"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Tweet = {
  id: string;
  text: string;
  created_at: string;
};

type ApiResponse = {
  success: boolean;
  data?: Tweet[];
  error?: string;
};

const XFeed = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [status, setStatus] = useState<string>("Loading...");

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get<ApiResponse>("/api/tweets");
        const payload = response.data;
        const nextTweets = payload.data ?? [];
        setTweets(nextTweets);
        setStatus(
          payload.success
            ? nextTweets.length
              ? ""
              : "No posts yet."
            : payload.error ?? "Error loading posts."
        );
      } catch (error) {
        console.error("Error fetching tweets:", error);
        setStatus("Error loading posts.");
      }
    };

    fetchTweets();
    const interval = setInterval(fetchTweets, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded bg-white p-4 shadow">
      <h2 className="text-lg font-semibold">President's Latest Posts</h2>
      {status ? (
        <p className="mt-3 text-sm text-zinc-500">{status}</p>
      ) : (
        <ul className="mt-3">
          {tweets.map((tweet) => (
            <li key={tweet.id} className="border-b border-zinc-200 py-2">
              <p className="text-sm text-zinc-900">{tweet.text}</p>
              <span className="text-xs text-zinc-500">
                {new Date(tweet.created_at).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default XFeed;
