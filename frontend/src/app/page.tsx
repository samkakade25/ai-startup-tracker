"use client";

import { useEffect, useState } from "react";
import { getHealth, HealthResponse } from "./lib/health";

export default function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHealth()
      .then(setHealth)
      .catch(() => {
        setError("Unable to connect to API");
      });
  }, []);

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">
          AI Startup Intelligence
        </h1>

        <p className="mt-2 text-gray-500">
          India + Global startup and funding tracker
        </p>

        <div className="mt-8 rounded-xl border p-6">
          <h2 className="text-lg font-semibold">
            System Status
          </h2>

          {health && (
            <p className="mt-3 text-green-600">
              API Connected ✓
            </p>
          )}

          {error && (
            <p className="mt-3 text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}