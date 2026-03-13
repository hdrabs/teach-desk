"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { HiOutlinePlus, HiOutlineSearch, HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import type { StudentWithStats } from "@/types";

export default function StudentsPage() {
  const [students, setStudents] = useState<StudentWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch("/api/students");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setStudents(data);
    } catch {
      toast.error("Failed to load students");
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = students.filter(
    s => s.name.toLowerCase().includes(search.toLowerCase()) || s.subject.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-muted rounded-2xl" />
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
          <h1 className="text-2xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {students.length} student{students.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link href="/dashboard/students/new">
          <Button>
            <HiOutlinePlus className="h-4 w-4" />
            Add Student
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search students by name or subject..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
        />
      </div>

      {/* Students Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">{search ? "No students match your search" : "No students yet"}</p>
          {!search && (
            <Link href="/dashboard/students/new">
              <Button>
                <HiOutlinePlus className="h-4 w-4" />
                Add Your First Student
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(student => (
            <Link key={student.id} href={`/dashboard/students/${student.id}`}>
              <Card hover className="h-full">
                <div className="flex items-start gap-3 mb-4">
                  <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-semibold text-base shrink-0">
                    {student.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground truncate">{student.name}</h3>
                    <Badge variant="default" className="mt-1">
                      {student.subject}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <HiOutlinePhone className="h-4 w-4 shrink-0" />
                    <span className="truncate">{student.phoneNumber}</span>
                  </div>
                  {student.email && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <HiOutlineMail className="h-4 w-4 shrink-0" />
                      <span className="truncate">{student.email}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border text-sm">
                  <div>
                    <span className="text-muted-foreground">Rate: </span>
                    <span className="font-medium text-foreground">{formatCurrency(student.hourlyRate)}/hr</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Lessons: </span>
                    <span className="font-medium text-foreground">{student.totalLessons || 0}</span>
                  </div>
                </div>

                {(student.outstandingBalance ?? 0) > 0 && (
                  <div className="mt-3 p-2 rounded-lg bg-warning/10">
                    <span className="text-xs font-medium text-warning">
                      Outstanding: {formatCurrency(student.outstandingBalance ?? 0)}
                    </span>
                  </div>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
