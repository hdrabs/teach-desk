"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HiOutlinePlus, HiOutlineCreditCard, HiOutlineCalendar } from "react-icons/hi";
import Button from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import StatCard from "@/components/ui/StatCard";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { PaymentWithRelations } from "@/types";

interface StudentOption {
  id: string;
  name: string;
}

interface LessonOption {
  id: string;
  date: string;
  subject: string;
  status: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentWithRelations[]>([]);
  const [students, setStudents] = useState<StudentOption[]>([]);
  const [studentLessons, setStudentLessons] = useState<LessonOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    studentId: "",
    lessonId: "",
    amount: "",
    paymentMethod: "CASH",
    paymentDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [paymentsRes, studentsRes] = await Promise.all([fetch("/api/payments"), fetch("/api/students")]);
      if (!paymentsRes.ok || !studentsRes.ok) throw new Error();
      const [paymentsData, studentsData] = await Promise.all([paymentsRes.json(), studentsRes.json()]);
      setPayments(paymentsData);
      setStudents(studentsData);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLessonsForStudent = async (studentId: string) => {
    try {
      const res = await fetch(`/api/lessons?studentId=${studentId}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setStudentLessons(data.filter((l: LessonOption) => l.status === "COMPLETED"));
    } catch {
      setStudentLessons([]);
    }
  };

  const handleStudentChange = (studentId: string) => {
    setForm(prev => ({ ...prev, studentId, lessonId: "" }));
    if (studentId) {
      fetchLessonsForStudent(studentId);
    } else {
      setStudentLessons([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: parseFloat(form.amount),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Failed to record payment");
        return;
      }

      toast.success("Payment recorded!");
      setIsModalOpen(false);
      setForm({
        studentId: "",
        lessonId: "",
        amount: "",
        paymentMethod: "CASH",
        paymentDate: new Date().toISOString().split("T")[0],
      });
      fetchData();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalEarnings = payments.reduce((sum: number, p: PaymentWithRelations) => sum + Number(p.amount), 0);

  const thisMonthEarnings = payments
    .filter((p: PaymentWithRelations) => {
      const d = new Date(p.paymentDate);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum: number, p: PaymentWithRelations) => sum + Number(p.amount), 0);

  const methodLabel = (method: string) => {
    switch (method) {
      case "CASH":
        return "Cash";
      case "BANK_TRANSFER":
        return "Bank Transfer";
      case "MOBILE_PAYMENT":
        return "Mobile Payment";
      default:
        return method;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-32 bg-muted rounded-2xl" />
          <div className="h-32 bg-muted rounded-2xl" />
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
          <h1 className="text-2xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {payments.length} payment{payments.length !== 1 ? "s" : ""} recorded
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <HiOutlinePlus className="h-4 w-4" />
          Record Payment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Total Earnings"
          value={formatCurrency(totalEarnings)}
          icon={<HiOutlineCreditCard className="h-5 w-5" />}
        />
        <StatCard
          title="This Month"
          value={formatCurrency(thisMonthEarnings)}
          icon={<HiOutlineCalendar className="h-5 w-5" />}
        />
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <HiOutlineCreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No payments recorded yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {payments.map((payment: PaymentWithRelations) => (
                <div
                  key={payment.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-secondary/50 gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-success/10 text-success flex items-center justify-center font-semibold text-sm shrink-0">
                      {payment.student.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{payment.student.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(payment.paymentDate)}
                        {payment.lesson && ` · ${payment.lesson.subject}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-auto">
                    <Badge variant="outline">{methodLabel(payment.paymentMethod)}</Badge>
                    <span className="text-sm font-semibold text-success">+{formatCurrency(payment.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Record Payment Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record Payment">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            id="pay-studentId"
            label="Student"
            value={form.studentId}
            onChange={e => handleStudentChange(e.target.value)}
            options={students.map((s: StudentOption) => ({
              value: s.id,
              label: s.name,
            }))}
            placeholder="Select a student"
            required
          />
          {studentLessons.length > 0 && (
            <Select
              id="pay-lessonId"
              label="Link to Lesson (optional)"
              value={form.lessonId}
              onChange={e => setForm(prev => ({ ...prev, lessonId: e.target.value }))}
              options={[
                { value: "", label: "No specific lesson" },
                ...studentLessons.map((l: LessonOption) => ({
                  value: l.id,
                  label: `${l.subject} — ${formatDate(l.date)}`,
                })),
              ]}
            />
          )}
          <Input
            id="pay-amount"
            label="Amount ($)"
            type="number"
            step="0.01"
            min="0"
            placeholder="50.00"
            value={form.amount}
            onChange={e => setForm(prev => ({ ...prev, amount: e.target.value }))}
            required
          />
          <Select
            id="pay-method"
            label="Payment Method"
            value={form.paymentMethod}
            onChange={e =>
              setForm(prev => ({
                ...prev,
                paymentMethod: e.target.value,
              }))
            }
            options={[
              { value: "CASH", label: "Cash" },
              { value: "BANK_TRANSFER", label: "Bank Transfer" },
              { value: "MOBILE_PAYMENT", label: "Mobile Payment" },
            ]}
          />
          <Input
            id="pay-date"
            label="Payment Date"
            type="date"
            value={form.paymentDate}
            onChange={e => setForm(prev => ({ ...prev, paymentDate: e.target.value }))}
            required
          />
          <div className="flex gap-3 pt-2">
            <Button type="submit" isLoading={isSubmitting}>
              Record Payment
            </Button>
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
