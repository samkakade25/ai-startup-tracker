"use client";

import { useSourceArticles } from "@/hooks/useApi";

export default function SourcesPage() {
  const {
    data: articles = [],
    isLoading,
    isError,
  } = useSourceArticles();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">Intelligence Sources</p>

        <h2 className="mt-1 text-3xl font-semibold">
          Source Articles
        </h2>

        <p className="mt-2 text-slate-500">
          News and evidence flowing through the ingestion pipeline.
        </p>
      </div>

      <div className="space-y-3">
        {isLoading && (
          <div className="rounded-2xl border bg-white p-6 text-sm text-slate-500">
            Loading source articles...
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border bg-white p-6 text-sm text-red-600">
            Unable to load source articles.
          </div>
        )}

        {!isLoading &&
          !isError &&
          articles.map((article) => (
            <article
              key={article.id}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold hover:underline"
                  >
                    {article.title}
                  </a>

                  <p className="mt-1 text-sm text-slate-500">
                    {article.source_name}
                    {article.published_at
                      ? ` · ${new Date(
                          article.published_at,
                        ).toLocaleDateString()}`
                      : ""}
                  </p>
                </div>

                <span className="w-fit rounded-full bg-slate-100 px-2.5 py-1 text-xs">
                  {article.processing_status}
                </span>
              </div>

              {article.summary && (
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {article.summary}
                </p>
              )}
            </article>
          ))}
      </div>

      {!isLoading && !isError && articles.length === 0 && (
        <div className="rounded-2xl border bg-white p-6 text-sm text-slate-500">
          No source articles found.
        </div>
      )}
    </div>
  );
}