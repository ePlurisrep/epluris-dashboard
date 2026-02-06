import CongressionalActivities from "@/components/CongressionalActivities";
import NationalDebtTicker from "@/components/NationalDebtTicker";
import XFeed from "@/components/XFeed";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-zinc-900">
            Epluris Federal Dashboard
          </h1>
          <p className="text-base text-zinc-600">
            Live signals from fiscal, executive, and congressional sources.
          </p>
        </header>
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <NationalDebtTicker />
          <XFeed />
          <CongressionalActivities />
        </section>
      </main>
    </div>
  );
}
