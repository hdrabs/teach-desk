"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { HiOutlineHome, HiOutlineUserGroup, HiOutlineCalendar, HiOutlineCreditCard, HiOutlineX } from "react-icons/hi";
import { SiGoogleclassroom } from "react-icons/si";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: HiOutlineHome },
  { href: "/dashboard/students", label: "Students", icon: HiOutlineUserGroup },
  { href: "/dashboard/lessons", label: "Lessons", icon: HiOutlineCalendar },
  {
    href: "/dashboard/payments",
    label: "Payments",
    icon: HiOutlineCreditCard,
  },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-sidebar text-sidebar-foreground",
          "flex flex-col transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="p-1.5 bg-primary rounded-lg">
              <SiGoogleclassroom className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">TeachDesk</span>
          </Link>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors">
            <HiOutlineX className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium",
                  "transition-all duration-200",
                  isActive
                    ? "bg-sidebar-active text-white shadow-lg shadow-primary/25"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-white/5",
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="px-3 py-2 rounded-xl bg-white/5 text-xs text-sidebar-foreground/50">TeachDesk MVP v0.1</div>
        </div>
      </aside>
    </>
  );
}
