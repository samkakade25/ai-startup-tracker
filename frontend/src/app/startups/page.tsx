"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useStartups } from "@/hooks/useApi";

function formatStage(stage: string) {
  return stage
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function StartupsPage() {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("");

  const { data: startups = [], isLoading, isError } =
    useStartups({
      search: search || undefined,
      stage: stage || undefined,
    });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">Companies</p>

        <h2 className="mt-1 text-3xl font-semibold">
          Startups
        </h2>

        <p className="mt-2 text-slate-500">
          Explore the AI startups tracked by the platform.
        </p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search startups..."
            className="w-full rounded-xl border bg-white py-2.5 pl-10 pr-4 outline-none focus:border-slate-400"
          />
        </div>

        <select
          value={stage}
          onChange={(event) => setStage(event.target.value)}
          className="rounded-xl border bg-white px-4 py-2.5 outline-none"
        >
          <option value="">All stages</option>
          <option value="pre_seed">Pre-seed</option>
          <option value="seed">Seed</option>
          <option value="series_a">Series A</option>
          <option value="series_b">Series B</option>
          <option value="series_c_plus">Series C+</option>
          <option value="growth">Growth</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {isLoading && (
          <div className="p-6 text-sm text-slate-500">
            Loading startups...
          </div>
        )}

        {isError && (
          <div className="p-6 text-sm text-red-600">
            Unable to load startups. Make sure Django is running.
          </div>
        )}

        {!isLoading && !isError && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Startup</th>
                  <th className="px-5 py-3">Location</th>
                  <th className="px-5 py-3">Sector</th>
                  <th className="px-5 py-3">Stage</th>
                  <th className="px-5 py-3">Founded</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {startups.map((startup) => (
                  <tr
                    key={startup.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="font-medium">
                        {startup.name}
                      </div>

                      {startup.website && (
                        <a
                          href={startup.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-slate-500 hover:underline"
                        >
                          Website
                        </a>
                      )}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {[startup.headquarters_city,
                        startup.headquarters_country]
                        .filter(Boolean)
                        .join(", ") || "—"}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {startup.sector || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs">
                        {formatStage(startup.stage)}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {startup.founded_year ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && !isError && startups.length === 0 && (
          <div className="border-t p-6 text-sm text-slate-500">
            No startups found.
          </div>
        )}
      </div>
    </div>
  );
}