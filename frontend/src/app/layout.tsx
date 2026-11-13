import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import QueryProvider from "@/components/providers/QueryProvider";

export const metadata: Metadata = {
  title: "AI Startup Tracker",
  description:
    "AI startup, funding, investor and career intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AppShell>{children}</AppShell>
        </QueryProvider>
      </body>
    </html>
  );
}