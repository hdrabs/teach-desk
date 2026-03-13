"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Link from "next/link";

export default function NewStudentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    subject: "",
    hourlyRate: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          hourlyRate: parseFloat(form.hourlyRate),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Failed to create student");
        return;
      }

      toast.success("Student added successfully!");
      router.push("/dashboard/students");
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
        <Link href="/dashboard/students">
          <Button variant="ghost" size="sm">
            <HiOutlineArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Add Student</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Create a new student record
          </p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="name"
              label="Full Name"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
            <Input
              id="phoneNumber"
              label="Phone Number"
              placeholder="+1 234 567 8900"
              value={form.phoneNumber}
              onChange={(e) => updateField("phoneNumber", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="email"
              label="Email (optional)"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
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
          <Input
            id="hourlyRate"
            label="Hourly Rate ($)"
            type="number"
            step="0.01"
            min="0"
            placeholder="25.00"
            value={form.hourlyRate}
            onChange={(e) => updateField("hourlyRate", e.target.value)}
            required
          />
          <Textarea
            id="notes"
            label="Notes (optional)"
            placeholder="Any additional notes about this student..."
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
          />
          <div className="flex gap-3 pt-2">
            <Button type="submit" isLoading={isLoading}>
              Add Student
            </Button>
            <Link href="/dashboard/students">
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
