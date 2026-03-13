import { LessonStatus, PaymentMethod } from "@prisma/client";

export interface StudentWithStats {
  id: string;
  name: string;
  phoneNumber: string;
  email: string | null;
  subject: string;
  hourlyRate: number | string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  tutorId: string;
  _count?: {
    lessons: number;
  };
  totalLessons?: number;
  outstandingBalance?: number;
}

export interface LessonWithStudent {
  id: string;
  date: Date;
  startTime: string;
  duration: number;
  subject: string;
  status: LessonStatus;
  notes: string | null;
  createdAt: Date;
  studentId: string;
  tutorId: string;
  student: {
    id: string;
    name: string;
    hourlyRate: number | string;
  };
  payments?: {
    id: string;
    amount: number | string;
  }[];
  isPaid?: boolean;
}

export interface PaymentWithRelations {
  id: string;
  amount: number | string;
  paymentMethod: PaymentMethod;
  paymentDate: Date;
  createdAt: Date;
  studentId: string;
  lessonId: string | null;
  tutorId: string;
  student: {
    id: string;
    name: string;
  };
  lesson?: {
    id: string;
    date: Date;
    subject: string;
  } | null;
}

export interface DashboardData {
  upcomingLessons: LessonWithStudent[];
  totalRevenueThisMonth: number;
  outstandingPayments: number;
  totalStudents: number;
  lessonsThisWeek: number;
}
