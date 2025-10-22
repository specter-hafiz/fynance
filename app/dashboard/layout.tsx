"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Receipt,
  FolderOpen,
  Wallet,
  Calendar,
  TrendingUp,
  CreditCard,
  PiggyBank,
  Settings,
  Menu,
  X,
} from "lucide-react";
import Logo from "@/components/ui/Logo";

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },

  { href: "/dashboard/wallets", icon: Wallet, label: "Wallets" },
  { href: "/dashboard/calendar", icon: Calendar, label: "Calendar" },
  { href: "/dashboard/budget", icon: PiggyBank, label: "Budget" },
  { href: "/dashboard/reports", icon: TrendingUp, label: "Reports" },
  { href: "/dashboard/debts", icon: CreditCard, label: "Debts" },
  { href: "/dashboard/categories", icon: FolderOpen, label: "Categories" },
  { href: "/dashboard/transactions", icon: Receipt, label: "Transactions" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

// Sidebar Component
const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full w-full bg-lightblue/3">
      {/* Logo Section */}
      <div className="p-6 hidden lg:flex">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "text-green border border-green rounded-lg"
                  : "text-lightgray/80 hover:bg-lightblue/10 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
    </div>
  );
};

// Dashboard Layout
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-lightblue/3 border-b border-lightblue/10">
        <div className="flex items-center justify-between px-4 py-3">
          <Logo />
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white hover:text-green transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden pt-14 lg:pt-0 bg-lightblue/3">
        {/* Desktop Sidebar - Always Visible */}
        <aside className="hidden lg:flex w-64 flex-shrink-0 bg-lightblue/3 border-r border-lightblue/10">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar - Drawer */}
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
            />

            {/* Drawer */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 bg-background z-40 lg:hidden border-r border-lightblue/10 transform transition-transform">
              <div className="p-4 border-b border-lightblue/10 flex items-center justify-between">
                <Logo />
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-white hover:text-green transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </aside>
          </>
        )}

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto bg-background">{children}</main>
      </div>
    </div>
  );
}
