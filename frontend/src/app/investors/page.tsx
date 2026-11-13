"use client";

import { useState } from "react";
import { useInvestors } from "@/hooks/useApi";

function formatInvestorType(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function InvestorsPage() {
  const [search, setSearch] = useState("");

  const {
    data: investors = [],
    isLoading,
    isError,
  } = useInvestors({
    search: search || undefined,
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">Capital Partners</p>

        <h2 className="mt-1 text-3xl font-semibold">
          Investors
        </h2>

        <p className="mt-2 text-slate-500">
          Venture funds, angels and other investors active in AI.
        </p>
      </div>

      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search investors..."
        className="w-full rounded-xl border bg-white px-4 py-2.5 outline-none"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isLoading && (
          <div className="rounded-2xl border bg-white p-6 text-sm text-slate-500">
            Loading investors...
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border bg-white p-6 text-sm text-red-600">
            Unable to load investors.
          </div>
        )}

        {!isLoading &&
          !isError &&
          investors.map((investor) => (
            <div
              key={investor.id}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">
                    {investor.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {[
                      investor.headquarters_city,
                      investor.headquarters_country,
                    ]
                      .filter(Boolean)
                      .join(", ") || "Location unknown"}
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs">
                  {formatInvestorType(
                    investor.investor_type,
                  )}
                </span>
              </div>

              {investor.description && (
                <p className="mt-4 line-clamp-3 text-sm text-slate-600">
                  {investor.description}
                </p>
              )}

              {investor.website && (
                <a
                  href={investor.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm font-medium hover:underline"
                >
                  Visit website →
                </a>
              )}
            </div>
          ))}
      </div>

      {!isLoading && !isError && investors.length === 0 && (
        <div className="rounded-2xl border bg-white p-6 text-sm text-slate-500">
          No investors found.
        </div>
      )}
    </div>
  );
}