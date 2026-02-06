import sql from "@/lib/sql";

async function run() {
  console.log("Running seed script...");
  try {
    // Create tables if they don't exist (works with a direct Postgres connection)
    await sql`CREATE TABLE IF NOT EXISTS posts (id text PRIMARY KEY, title text, body text, author text, created_at timestamptz DEFAULT now())`;
    await sql`CREATE TABLE IF NOT EXISTS tweets (id text PRIMARY KEY, text text, created_at timestamptz)`;
    await sql`CREATE TABLE IF NOT EXISTS bills (id text PRIMARY KEY, title text, url text, introduced_at timestamptz)`;
    await sql`CREATE TABLE IF NOT EXISTS debt_records (id bigserial PRIMARY KEY, recorded_at timestamptz DEFAULT now(), debt_amount text)`;

    // Insert sample data
    await sql`INSERT INTO posts (id, title, body, author) VALUES ('post-1', 'Welcome', 'This is a seeded post', 'admin') ON CONFLICT (id) DO NOTHING`;
    await sql`INSERT INTO bills (id, title, url, introduced_at) VALUES ('bill-1', 'A Sample Bill', 'https://www.congress.gov', now()) ON CONFLICT (id) DO NOTHING`;

    console.log("Seed completed.");
  } catch (e) {
    console.error("Seed failed:", e);
    process.exit(1);
  } finally {
    await sql.end({ timeout: 5 });
  }
}

run();
