"use client";

import {
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  FileText,
  LayoutDashboard,
  Rocket,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
}

const navigation = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/startups",
    label: "Startups",
    icon: Rocket,
  },
  {
    href: "/funding",
    label: "Funding",
    icon: ChartNoAxesCombined,
  },
  {
    href: "/investors",
    label: "Investors",
    icon: Users,
  },
  {
    href: "/careers",
    label: "Careers",
    icon: BriefcaseBusiness,
  },
  {
    href: "/sources",
    label: "Sources",
    icon: FileText,
  },
];

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-white lg:block">
        <div className="flex h-full flex-col">
          <div className="border-b px-6 py-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                <Building2 size={20} />
              </div>

              <div>
                <div className="font-semibold">
                  AI Startup Tracker
                </div>
                <div className="text-xs text-slate-500">
                  India + Global
                </div>
              </div>
            </Link>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const Icon = item.icon;

              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t p-4 text-xs text-slate-500">
            AI Startup & Funding Intelligence
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-lg font-semibold">
                AI Startup Intelligence
              </h1>
              <p className="text-xs text-slate-500">
                Funding, startups, investors and careers
              </p>
            </div>

            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              API Connected
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}