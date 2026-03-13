"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { HiOutlinePlus, HiOutlineCheck, HiOutlineX, HiOutlinePencil, HiOutlineCalendar } from "react-icons/hi";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import Textarea from "@/components/ui/Textarea";
import { formatCurrency, formatDate, formatTime, cn } from "@/lib/utils";
import type { LessonWithStudent } from "@/types";

export default function LessonsPage() {
  const [lessons, setLessons] = useState<LessonWithStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [notesModal, setNotesModal] = useState<{
    isOpen: boolean;
    lessonId: string;
    notes: string;
  }>({ isOpen: false, lessonId: "", notes: "" });

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const res = await fetch("/api/lessons");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLessons(data);
    } catch {
      toast.error("Failed to load lessons");
    } finally {
      setIsLoading(false);
    }
  };

  const updateLesson = async (id: string, data: { status?: string; notes?: string }) => {
    try {
      const res = await fetch(`/api/lessons/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success(data.status ? `Lesson marked as ${data.status.toLowerCase()}` : "Notes updated");
      fetchLessons();
    } catch {
      toast.error("Failed to update lesson");
    }
  };

  const handleSaveNotes = () => {
    updateLesson(notesModal.lessonId, { notes: notesModal.notes });
    setNotesModal({ isOpen: false, lessonId: "", notes: "" });
  };

  const filtered = filter === "all" ? lessons : lessons.filter(l => l.status === filter);

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

  const filters = [
    { value: "all", label: "All" },
    { value: "SCHEDULED", label: "Scheduled" },
    { value: "COMPLETED", label: "Completed" },
    { value: "CANCELLED", label: "Cancelled" },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded-lg" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-muted rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lessons</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {lessons.length} lesson{lessons.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link href="/dashboard/lessons/new">
          <Button>
            <HiOutlinePlus className="h-4 w-4" />
            Schedule Lesson
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-1 bg-secondary rounded-xl p-1 overflow-x-auto">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
              filter === f.value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Lessons List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <HiOutlineCalendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>{filter === "all" ? "No lessons yet" : `No ${filter.toLowerCase()} lessons`}</p>
          {filter === "all" && (
            <Link href="/dashboard/lessons/new" className="mt-4 inline-block">
              <Button>
                <HiOutlinePlus className="h-4 w-4" />
                Schedule Your First Lesson
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(lesson => (
            <Card key={lesson.id} hover>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm shrink-0">
                    {lesson.student.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={`/dashboard/students/${lesson.studentId}`}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {lesson.student.name}
                      </Link>
                      {statusBadge(lesson.status)}
                      {lesson.isPaid && <Badge variant="success">Paid</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {lesson.subject} · {formatDate(lesson.date)} · {formatTime(lesson.startTime)} · {lesson.duration}
                      min · {formatCurrency((lesson.duration / 60) * Number(lesson.student.hourlyRate))}
                    </p>
                    {lesson.notes && (
                      <p className="text-xs text-muted-foreground mt-1 italic truncate max-w-md">
                        &ldquo;{lesson.notes}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-1.5 shrink-0">
                  {lesson.status === "SCHEDULED" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateLesson(lesson.id, { status: "COMPLETED" })}
                        title="Mark Complete"
                      >
                        <HiOutlineCheck className="h-4 w-4 text-success" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateLesson(lesson.id, { status: "CANCELLED" })}
                        title="Cancel"
                      >
                        <HiOutlineX className="h-4 w-4 text-destructive" />
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setNotesModal({
                        isOpen: true,
                        lessonId: lesson.id,
                        notes: lesson.notes || "",
                      })
                    }
                    title="Add Notes"
                  >
                    <HiOutlinePencil className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Notes Modal */}
      <Modal
        isOpen={notesModal.isOpen}
        onClose={() => setNotesModal({ isOpen: false, lessonId: "", notes: "" })}
        title="Lesson Notes"
      >
        <div className="space-y-4">
          <Textarea
            id="lesson-notes"
            placeholder="Covered fractions and assigned homework page 21..."
            value={notesModal.notes}
            onChange={e => setNotesModal(prev => ({ ...prev, notes: e.target.value }))}
            rows={4}
          />
          <div className="flex gap-3">
            <Button onClick={handleSaveNotes}>Save Notes</Button>
            <Button variant="outline" onClick={() => setNotesModal({ isOpen: false, lessonId: "", notes: "" })}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
