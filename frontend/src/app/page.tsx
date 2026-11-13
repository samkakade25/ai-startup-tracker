"use client";

import {
  ChartNoAxesCombined,
  CircleDollarSign,
  Rocket,
  Users,
} from "lucide-react";
import Link from "next/link";

import StatCard from "@/components/ui/StatCrad";


import {
  useFundingRounds,
  useInvestors,
  useStartups,
} from "@/hooks/useApi";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatRoundType(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function DashboardPage() {
  const startupsQuery = useStartups();
  const investorsQuery = useInvestors();
  const fundingQuery = useFundingRounds();

  const startups = startupsQuery.data ?? [];
  const investors = investorsQuery.data ?? [];
  const fundingRounds = fundingQuery.data ?? [];

  const totalFunding = fundingRounds.reduce((total, round) => {
    const amount = Number(
      round.amount_usd ?? round.amount ?? 0,
    );

    return total + (Number.isNaN(amount) ? 0 : amount);
  }, 0);

  const recentFunding = fundingRounds.slice(0, 5);
  const recentStartups = startups.slice(0, 5);

  const isLoading =
    startupsQuery.isLoading ||
    investorsQuery.isLoading ||
    fundingQuery.isLoading;

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-500">
            Overview
          </p>

          <h2 className="mt-1 text-3xl font-semibold tracking-tight">
            AI Startup & Funding Dashboard
          </h2>

          <p className="mt-2 text-slate-500">
            A live view of the startups, investors and funding data
            stored in your platform.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Startups"
            value={isLoading ? "—" : startups.length}
            subtitle="Tracked AI companies"
            icon={Rocket}
          />

          <StatCard
            title="Funding Rounds"
            value={isLoading ? "—" : fundingRounds.length}
            subtitle="Tracked rounds"
            icon={ChartNoAxesCombined}
          />

          <StatCard
            title="Investors"
            value={isLoading ? "—" : investors.length}
            subtitle="Tracked investors"
            icon={Users}
          />

          <StatCard
            title="Funding Tracked"
            value={
              isLoading
                ? "—"
                : formatCurrency(totalFunding)
            }
            subtitle="USD equivalent"
            icon={CircleDollarSign}
          />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div>
              <h3 className="font-semibold">Recent Funding</h3>
              <p className="text-xs text-slate-500">
                Latest funding rounds
              </p>
            </div>

            <Link
              href="/funding"
              className="text-sm font-medium text-slate-900 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="divide-y">
            {fundingQuery.isLoading && (
              <div className="p-5 text-sm text-slate-500">
                Loading funding...
              </div>
            )}

            {!fundingQuery.isLoading &&
              recentFunding.length === 0 && (
                <div className="p-5 text-sm text-slate-500">
                  No funding rounds yet.
                </div>
              )}

            {recentFunding.map((round) => (
              <div
                key={round.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div>
                  <div className="font-medium">
                    {round.startup}
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    {formatRoundType(round.round_type)}
                    {" · "}
                    {round.announced_date}
                  </div>
                </div>

                <div className="font-semibold">
                  {formatCurrency(
                    Number(
                      round.amount_usd ?? round.amount ?? 0,
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div>
              <h3 className="font-semibold">Latest Startups</h3>
              <p className="text-xs text-slate-500">
                Recently added companies
              </p>
            </div>

            <Link
              href="/startups"
              className="text-sm font-medium text-slate-900 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="divide-y">
            {startupsQuery.isLoading && (
              <div className="p-5 text-sm text-slate-500">
                Loading startups...
              </div>
            )}

            {!startupsQuery.isLoading &&
              recentStartups.length === 0 && (
                <div className="p-5 text-sm text-slate-500">
                  No startups yet.
                </div>
              )}

            {recentStartups.map((startup) => (
              <div
                key={startup.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div>
                  <div className="font-medium">
                    {startup.name}
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    {startup.sector || "AI"}
                    {" · "}
                    {startup.headquarters_country || "Unknown"}
                  </div>
                </div>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium">
                  {formatRoundType(startup.stage)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}