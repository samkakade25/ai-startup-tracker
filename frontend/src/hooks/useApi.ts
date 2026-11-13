"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  FundingRound,
  Investor,
  JobOpening,
  SourceArticle,
  Startup,
} from "@/types/api";

function normalizeList<T>(data: unknown): T[] {
  if (Array.isArray(data)) {
    return data as T[];
  }

  if (
    typeof data === "object" &&
    data !== null &&
    "results" in data &&
    Array.isArray((data as { results: unknown }).results)
  ) {
    return (data as { results: T[] }).results;
  }

  return [];
}

async function fetchList<T>(
  endpoint: string,
  params?: Record<string, string | undefined>,
): Promise<T[]> {
  const response = await api.get(endpoint, {
    params,
  });

  return normalizeList<T>(response.data);
}

export function useStartups(params?: {
  search?: string;
  stage?: string;
  headquarters_country?: string;
}) {
  return useQuery({
    queryKey: ["startups", params],
    queryFn: () => fetchList<Startup>("/startups/", params),
  });
}

export function useInvestors(params?: {
  search?: string;
  investor_type?: string;
  headquarters_country?: string;
}) {
  return useQuery({
    queryKey: ["investors", params],
    queryFn: () => fetchList<Investor>("/investors/", params),
  });
}

export function useFundingRounds(params?: {
  search?: string;
  round_type?: string;
}) {
  return useQuery({
    queryKey: ["funding-rounds", params],
    queryFn: () => fetchList<FundingRound>("/funding-rounds/", params),
  });
}

export function useJobOpenings(params?: {
  search?: string;
  is_active?: string;
}) {
  return useQuery({
    queryKey: ["job-openings", params],
    queryFn: () => fetchList<JobOpening>("/job-openings/", params),
  });
}

export function useSourceArticles(params?: {
  search?: string;
  processing_status?: string;
}) {
  return useQuery({
    queryKey: ["source-articles", params],
    queryFn: () => fetchList<SourceArticle>("/source-articles/", params),
  });
}