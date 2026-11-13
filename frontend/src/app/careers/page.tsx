"use client";

import { useJobOpenings } from "@/hooks/useApi";

export default function CareersPage() {
  const {
    data: jobs = [],
    isLoading,
    isError,
  } = useJobOpenings({
    is_active: "true",
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">Talent</p>

        <h2 className="mt-1 text-3xl font-semibold">
          AI Careers
        </h2>

        <p className="mt-2 text-slate-500">
          Open roles from tracked AI startups.
        </p>
      </div>

      <div className="space-y-3">
        {isLoading && (
          <div className="rounded-2xl border bg-white p-6 text-sm text-slate-500">
            Loading jobs...
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border bg-white p-6 text-sm text-red-600">
            Unable to load job openings.
          </div>
        )}

        {!isLoading &&
          !isError &&
          jobs.map((job) => (
            <a
              key={job.id}
              href={job.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <h3 className="font-semibold">
                    {job.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {job.location || "Location not specified"}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <div className="text-sm font-medium">
                    {job.employment_type || "Full-time"}
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    {job.source_name}
                  </div>
                </div>
              </div>
            </a>
          ))}
      </div>

      {!isLoading && !isError && jobs.length === 0 && (
        <div className="rounded-2xl border bg-white p-6 text-sm text-slate-500">
          No active jobs found.
        </div>
      )}
    </div>
  );
}