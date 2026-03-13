"use client";

import { signOut, useSession } from "next-auth/react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { HiOutlineMenu, HiOutlineMoon, HiOutlineSun, HiOutlineLogout } from "react-icons/hi";
import { cn } from "@/lib/utils";

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { data: session } = useSession();
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left: Menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-secondary transition-colors"
        >
          <HiOutlineMenu className="h-5 w-5 text-foreground" />
        </button>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-xl hover:bg-secondary transition-all duration-200",
              "text-muted-foreground hover:text-foreground"
            )}
            title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
          >
            {resolvedTheme === "dark" ? (
              <HiOutlineSun className="h-5 w-5" />
            ) : (
              <HiOutlineMoon className="h-5 w-5" />
            )}
          </button>

          {/* User info + logout */}
          <div className="flex items-center gap-3 pl-3 border-l border-border">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-foreground">
                {session?.user?.name || "Tutor"}
              </p>
              <p className="text-xs text-muted-foreground">
                {session?.user?.email}
              </p>
            </div>
            <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
              {(session?.user?.name || "T").charAt(0).toUpperCase()}
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="p-2 rounded-xl hover:bg-secondary transition-colors text-muted-foreground hover:text-destructive"
              title="Sign out"
            >
              <HiOutlineLogout className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
