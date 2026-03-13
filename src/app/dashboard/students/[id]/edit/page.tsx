"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface StudentData {
  name: string;
  phoneNumber: string;
  email: string;
  subject: string;
  hourlyRate: string;
  notes: string;
}

export default function EditStudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [form, setForm] = useState<StudentData>({
    name: "",
    phoneNumber: "",
    email: "",
    subject: "",
    hourlyRate: "",
    notes: "",
  });

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const res = await fetch(`/api/students/${id}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setForm({
        name: data.name,
        phoneNumber: data.phoneNumber,
        email: data.email || "",
        subject: data.subject,
        hourlyRate: String(data.hourlyRate),
        notes: data.notes || "",
      });
    } catch {
      toast.error("Failed to load student");
      router.push("/dashboard/students");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          hourlyRate: parseFloat(form.hourlyRate),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Failed to update student");
        return;
      }

      toast.success("Student updated!");
      router.push(`/dashboard/students/${id}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (isFetching) {
    return (
      <div className="max-w-2xl mx-auto animate-pulse space-y-6">
        <div className="h-8 w-48 bg-muted rounded-lg" />
        <div className="h-96 bg-muted rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/dashboard/students/${id}`}>
          <Button variant="ghost" size="sm">
            <HiOutlineArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Edit Student</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Update {form.name}&apos;s information
          </p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="name"
              label="Full Name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
            <Input
              id="phoneNumber"
              label="Phone Number"
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
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
            <Input
              id="subject"
              label="Subject"
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
            value={form.hourlyRate}
            onChange={(e) => updateField("hourlyRate", e.target.value)}
            required
          />
          <Textarea
            id="notes"
            label="Notes (optional)"
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
          />
          <div className="flex gap-3 pt-2">
            <Button type="submit" isLoading={isLoading}>
              Save Changes
            </Button>
            <Link href={`/dashboard/students/${id}`}>
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
