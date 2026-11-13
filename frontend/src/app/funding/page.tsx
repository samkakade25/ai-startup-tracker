"use client";

import { useState } from "react";
import { useFundingRounds } from "@/hooks/useApi";

function formatCurrency(
  value: string | null,
  currency: string,
) {
  const amount = Number(value ?? 0);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatRoundType(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function FundingPage() {
  const [search, setSearch] = useState("");
  const [roundType, setRoundType] = useState("");

  const {
    data: rounds = [],
    isLoading,
    isError,
  } = useFundingRounds({
    search: search || undefined,
    round_type: roundType || undefined,
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">Capital</p>

        <h2 className="mt-1 text-3xl font-semibold">
          Funding Rounds
        </h2>

        <p className="mt-2 text-slate-500">
          Track fundraising activity across AI startups.
        </p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search startup..."
          className="flex-1 rounded-xl border bg-white px-4 py-2.5 outline-none"
        />

        <select
          value={roundType}
          onChange={(event) => setRoundType(event.target.value)}
          className="rounded-xl border bg-white px-4 py-2.5 outline-none"
        >
          <option value="">All rounds</option>
          <option value="pre_seed">Pre-seed</option>
          <option value="seed">Seed</option>
          <option value="series_a">Series A</option>
          <option value="series_b">Series B</option>
          <option value="series_c">Series C</option>
          <option value="series_d">Series D</option>
          <option value="series_e_plus">Series E+</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {isLoading && (
          <div className="p-6 text-sm text-slate-500">
            Loading funding rounds...
          </div>
        )}

        {isError && (
          <div className="p-6 text-sm text-red-600">
            Unable to load funding data.
          </div>
        )}

        {!isLoading && !isError && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Startup</th>
                  <th className="px-5 py-3">Round</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Investors</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {rounds.map((round) => (
                  <tr
                    key={round.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 font-medium">
                      {round.startup}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs">
                        {formatRoundType(
                          round.round_type,
                        )}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-semibold">
                      {formatCurrency(
                        round.amount_usd ?? round.amount,
                        round.currency,
                      )}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {round.announced_date}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {round.investments.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && !isError && rounds.length === 0 && (
          <div className="border-t p-6 text-sm text-slate-500">
            No funding rounds found.
          </div>
        )}
      </div>
    </div>
  );
}