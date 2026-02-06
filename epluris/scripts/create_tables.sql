-- Run this SQL in your Supabase SQL editor or psql to create the required tables

CREATE TABLE IF NOT EXISTS posts (
  id text PRIMARY KEY,
  title text,
  body text,
  author text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tweets (
  id text PRIMARY KEY,
  text text,
  created_at timestamptz
);

CREATE TABLE IF NOT EXISTS bills (
  id text PRIMARY KEY,
  title text,
  url text,
  introduced_at timestamptz
);

CREATE TABLE IF NOT EXISTS debt_records (
  id bigserial PRIMARY KEY,
  recorded_at timestamptz DEFAULT now(),
  debt_amount text
);

CREATE TABLE IF NOT EXISTS cached_data (
  key text PRIMARY KEY,
  data jsonb,
  expires_at timestamptz
);
