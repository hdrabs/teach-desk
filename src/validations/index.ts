import { z } from "zod/v4";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: z.string().min(5, "Phone number is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  subject: z.string().min(1, "Subject is required"),
  hourlyRate: z.coerce.number().positive("Hourly rate must be positive"),
  notes: z.string().optional(),
});

export const lessonSchema = z.object({
  studentId: z.string().min(1, "Student is required"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  duration: z.coerce.number().int().positive("Duration must be positive"),
  subject: z.string().min(1, "Subject is required"),
  notes: z.string().optional(),
});

export const lessonUpdateSchema = z.object({
  status: z.enum(["SCHEDULED", "COMPLETED", "CANCELLED"]).optional(),
  notes: z.string().optional(),
  date: z.string().optional(),
  startTime: z.string().optional(),
  duration: z.coerce.number().int().positive().optional(),
  subject: z.string().optional(),
});

export const paymentSchema = z.object({
  studentId: z.string().min(1, "Student is required"),
  lessonId: z.string().optional().or(z.literal("")),
  amount: z.coerce.number().positive("Amount must be positive"),
  paymentMethod: z.enum(["CASH", "BANK_TRANSFER", "MOBILE_PAYMENT"]),
  paymentDate: z.string().min(1, "Payment date is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type StudentInput = z.infer<typeof studentSchema>;
export type LessonInput = z.infer<typeof lessonSchema>;
export type LessonUpdateInput = z.infer<typeof lessonUpdateSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;
