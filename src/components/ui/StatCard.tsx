import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  trend,
  trendUp,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-2xl border border-border p-6",
        "transition-all duration-200 hover:shadow-lg hover:border-primary/20",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">
          {title}
        </span>
        <div className="p-2 rounded-xl bg-primary/10 text-primary">{icon}</div>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium mb-1",
              trendUp ? "text-success" : "text-destructive"
            )}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
