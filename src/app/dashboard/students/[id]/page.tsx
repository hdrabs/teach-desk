"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  HiOutlineArrowLeft,
  HiOutlinePencil,
  HiOutlineCalendar,
  HiOutlineCreditCard,
  HiOutlineTrash,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineClock,
  HiOutlineSparkles,
} from "react-icons/hi";
import Button from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface StudentDetail {
  id: string;
  name: string;
  phoneNumber: string;
  email: string | null;
  subject: string;
  hourlyRate: number | string;
  notes: string | null;
  createdAt: string;
  lessons: Array<{
    id: string;
    date: string;
    startTime: string;
    duration: number;
    subject: string;
    status: string;
    notes: string | null;
    payments: Array<{ id: string; amount: number | string }>;
  }>;
  payments: Array<{
    id: string;
    amount: number | string;
    paymentMethod: string;
    paymentDate: string;
    lesson: { id: string; date: string; subject: string } | null;
  }>;
}

export default function StudentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"details" | "lessons" | "payments">("details");

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const res = await fetch(`/api/students/${id}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setStudent(data);
    } catch {
      toast.error("Failed to load student");
      router.push("/dashboard/students");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this student? This will also delete all their lessons and payments."))
      return;

    try {
      const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Student deleted");
      router.push("/dashboard/students");
    } catch {
      toast.error("Failed to delete student");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded-lg" />
        <div className="h-64 bg-muted rounded-2xl" />
      </div>
    );
  }

  if (!student) return null;

  const statusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <Badge variant="success">Completed</Badge>;
      case "CANCELLED":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="warning">Scheduled</Badge>;
    }
  };

  const tabs = [
    { id: "details" as const, label: "Details" },
    { id: "lessons" as const, label: `Lessons (${student.lessons.length})` },
    { id: "payments" as const, label: `Payments (${student.payments.length})` },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/students">
            <Button variant="ghost" size="sm">
              <HiOutlineArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
              {student.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{student.name}</h1>
              <Badge>{student.subject}</Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2 ml-auto sm:ml-0">
          <Link href={`/dashboard/students/${id}/edit`}>
            <Button variant="outline" size="sm">
              <HiOutlinePencil className="h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Link href={`/dashboard/lessons/new?studentId=${id}`}>
            <Button size="sm">
              <HiOutlineCalendar className="h-4 w-4" />
              Schedule
            </Button>
          </Link>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <HiOutlineTrash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary rounded-xl p-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "details" && (
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <dt className="text-sm text-muted-foreground">Phone</dt>
                  <dd className="flex items-center gap-2 mt-1 text-foreground">
                    <HiOutlinePhone className="h-4 w-4 text-muted-foreground" />
                    {student.phoneNumber}
                  </dd>
                </div>
                {student.email && (
                  <div>
                    <dt className="text-sm text-muted-foreground">Email</dt>
                    <dd className="flex items-center gap-2 mt-1 text-foreground">
                      <HiOutlineMail className="h-4 w-4 text-muted-foreground" />
                      {student.email}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm text-muted-foreground">Subject</dt>
                  <dd className="mt-1 text-foreground">{student.subject}</dd>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <dt className="text-sm text-muted-foreground">Hourly Rate</dt>
                  <dd className="mt-1 text-foreground font-semibold text-lg">
                    {formatCurrency(student.hourlyRate)}
                    <span className="text-sm font-normal text-muted-foreground">/hr</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Member Since</dt>
                  <dd className="mt-1 text-foreground">{formatDate(student.createdAt)}</dd>
                </div>
              </div>
            </div>
            {student.notes && (
              <div className="mt-6 pt-6 border-t border-border">
                <dt className="text-sm text-muted-foreground mb-2">Notes</dt>
                <dd className="text-foreground bg-secondary/50 p-4 rounded-xl text-sm">{student.notes}</dd>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "lessons" && (
        <Card>
          <CardContent>
            {student.lessons.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <HiOutlineCalendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No lessons yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {student.lessons.map(lesson => (
                  <div key={lesson.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <HiOutlineClock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{lesson.subject}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(lesson.date)} · {formatTime(lesson.startTime)} · {lesson.duration}min
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {statusBadge(lesson.status)}
                      {lesson.payments.length > 0 && <Badge variant="success">Paid</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "payments" && (
        <Card>
          <CardContent>
            {student.payments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <HiOutlineCreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No payments yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {student.payments.map(payment => (
                  <div key={payment.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                    <div>
                      <p className="text-sm font-medium text-foreground">{formatCurrency(payment.amount)}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(payment.paymentDate)} · {payment.paymentMethod.replace("_", " ").toLowerCase()}
                      </p>
                    </div>
                    {payment.lesson && (
                      <span className="text-xs text-muted-foreground">
                        {payment.lesson.subject} · {formatDate(payment.lesson.date)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* AI Summary Placeholder */}
      <Card className="border-dashed">
        <CardContent>
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <HiOutlineSparkles className="h-5 w-5 text-amber-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">AI Student Summary</p>
              <p className="text-xs text-muted-foreground">
                Generate intelligent insights about this student&apos;s progress
              </p>
            </div>
            <Button variant="outline" size="sm" disabled>
              Generate
              <Badge variant="outline" className="ml-2">
                Coming Soon
              </Badge>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
