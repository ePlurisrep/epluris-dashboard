import { NextResponse } from "next/server";
import axios from "axios";

type TweetResponse = {
  data?: Array<{
    id: string;
    text: string;
    created_at: string;
  }>;
};

export async function GET() {
  const token = process.env.TWITTER_BEARER_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "Missing TWITTER_BEARER_TOKEN." },
      { status: 500 }
    );
  }

  try {
    const response = await axios.get<TweetResponse>(
      "https://api.twitter.com/2/tweets/search/recent",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          query: "from:Potus",
          max_results: 10,
          "tweet.fields": "created_at,public_metrics",
        },
      }
    );

    return NextResponse.json({ success: true, data: response.data.data ?? [] });
  } catch (error) {
    console.error("Failed to fetch tweets:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch tweets." },
      { status: 500 }
    );
  }
}
