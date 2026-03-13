"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineCreditCard,
  HiOutlineClock,
  HiOutlinePlus,
  HiOutlineSparkles,
} from "react-icons/hi";
import StatCard from "@/components/ui/StatCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils";
import type { DashboardData } from "@/types";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/dashboard");
      if (!res.ok) throw new Error();
      const json = await res.json();
      setData(json);
    } catch {
      toast.error("Failed to load dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-2xl" />
          ))}
        </div>
        <div className="h-64 bg-muted rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Welcome back! Here&apos;s your teaching overview.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/students/new">
            <Button size="sm" variant="outline">
              <HiOutlinePlus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Student</span>
            </Button>
          </Link>
          <Link href="/dashboard/lessons/new">
            <Button size="sm">
              <HiOutlinePlus className="h-4 w-4" />
              <span className="hidden sm:inline">Schedule Lesson</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={data?.totalStudents || 0}
          icon={<HiOutlineUserGroup className="h-5 w-5" />}
        />
        <StatCard
          title="Lessons This Week"
          value={data?.lessonsThisWeek || 0}
          icon={<HiOutlineCalendar className="h-5 w-5" />}
        />
        <StatCard
          title="Revenue This Month"
          value={formatCurrency(data?.totalRevenueThisMonth || 0)}
          icon={<HiOutlineCreditCard className="h-5 w-5" />}
        />
        <StatCard
          title="Outstanding"
          value={formatCurrency(data?.outstandingPayments || 0)}
          icon={<HiOutlineClock className="h-5 w-5" />}
        />
      </div>

      {/* Upcoming Lessons + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Lessons */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Lessons</CardTitle>
            <Link href="/dashboard/lessons">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {!data?.upcomingLessons?.length ? (
              <div className="text-center py-8 text-muted-foreground">
                <HiOutlineCalendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No upcoming lessons</p>
                <Link href="/dashboard/lessons/new" className="mt-2 inline-block">
                  <Button size="sm" variant="outline">
                    Schedule One
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {data.upcomingLessons.map(lesson => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm shrink-0">
                        {lesson.student.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{lesson.student.name}</p>
                        <p className="text-xs text-muted-foreground">{lesson.subject}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-medium text-foreground">{formatDate(lesson.date)}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatTime(lesson.startTime)} · {lesson.duration}min
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/dashboard/students/new" className="block">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <HiOutlineUserGroup className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Add Student</p>
                    <p className="text-xs text-muted-foreground">Create a new student record</p>
                  </div>
                </button>
              </Link>
              <Link href="/dashboard/lessons/new" className="block">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <HiOutlineCalendar className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Schedule Lesson</p>
                    <p className="text-xs text-muted-foreground">Book a new session</p>
                  </div>
                </button>
              </Link>
              <Link href="/dashboard/payments" className="block">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <HiOutlineCreditCard className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Record Payment</p>
                    <p className="text-xs text-muted-foreground">Log a student payment</p>
                  </div>
                </button>
              </Link>
              <button
                disabled
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/30 text-left opacity-60 cursor-not-allowed"
              >
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <HiOutlineSparkles className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">AI Summary</p>
                  <p className="text-xs text-muted-foreground">Coming soon</p>
                </div>
                <Badge variant="outline" className="ml-auto">
                  Soon
                </Badge>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
