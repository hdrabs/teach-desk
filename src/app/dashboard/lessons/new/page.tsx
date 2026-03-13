"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface StudentOption {
  id: string;
  name: string;
  subject: string;
}

function NewLessonForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedStudentId = searchParams.get("studentId") || "";

  const [students, setStudents] = useState<StudentOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    studentId: preselectedStudentId,
    date: "",
    startTime: "",
    duration: "60",
    subject: "",
    notes: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    // Auto-fill subject from selected student
    if (form.studentId && students.length > 0) {
      const student = students.find((s) => s.id === form.studentId);
      if (student && !form.subject) {
        setForm((prev) => ({ ...prev, subject: student.subject }));
      }
    }
  }, [form.studentId, students]);

  const fetchStudents = async () => {
    try {
      const res = await fetch("/api/students");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setStudents(data);
    } catch {
      toast.error("Failed to load students");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          duration: parseInt(form.duration),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Failed to schedule lesson");
        return;
      }

      toast.success("Lesson scheduled!");
      router.push("/dashboard/lessons");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/lessons">
          <Button variant="ghost" size="sm">
            <HiOutlineArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Schedule Lesson
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Book a new session with a student
          </p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            id="studentId"
            label="Student"
            value={form.studentId}
            onChange={(e) => updateField("studentId", e.target.value)}
            options={students.map((s) => ({
              value: s.id,
              label: `${s.name} — ${s.subject}`,
            }))}
            placeholder="Select a student"
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="date"
              label="Date"
              type="date"
              value={form.date}
              onChange={(e) => updateField("date", e.target.value)}
              required
            />
            <Input
              id="startTime"
              label="Start Time"
              type="time"
              value={form.startTime}
              onChange={(e) => updateField("startTime", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              id="duration"
              label="Duration"
              value={form.duration}
              onChange={(e) => updateField("duration", e.target.value)}
              options={[
                { value: "30", label: "30 minutes" },
                { value: "45", label: "45 minutes" },
                { value: "60", label: "1 hour" },
                { value: "90", label: "1.5 hours" },
                { value: "120", label: "2 hours" },
              ]}
            />
            <Input
              id="subject"
              label="Subject"
              placeholder="Mathematics"
              value={form.subject}
              onChange={(e) => updateField("subject", e.target.value)}
              required
            />
          </div>
          <Textarea
            id="notes"
            label="Notes (optional)"
            placeholder="Topics to cover, homework assignments..."
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
          />
          <div className="flex gap-3 pt-2">
            <Button type="submit" isLoading={isLoading}>
              Schedule Lesson
            </Button>
            <Link href="/dashboard/lessons">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default function NewLessonPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto animate-pulse space-y-6">
          <div className="h-8 w-48 bg-muted rounded-lg" />
          <div className="h-96 bg-muted rounded-2xl" />
        </div>
      }
    >
      <NewLessonForm />
    </Suspense>
  );
}
