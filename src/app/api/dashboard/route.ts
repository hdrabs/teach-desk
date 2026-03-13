import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);

    // Upcoming lessons (next 5 scheduled)
    const upcomingLessons = await prisma.lesson.findMany({
      where: {
        tutorId: session.user.id,
        status: "SCHEDULED",
        date: { gte: now },
      },
      include: {
        student: { select: { id: true, name: true, hourlyRate: true } },
        payments: { select: { id: true, amount: true } },
      },
      orderBy: { date: "asc" },
      take: 5,
    });

    // Total revenue this month
    const monthlyPayments = await prisma.payment.aggregate({
      where: {
        tutorId: session.user.id,
        paymentDate: { gte: monthStart, lte: monthEnd },
      },
      _sum: { amount: true },
    });

    // Outstanding: total earned from completed lessons - total paid
    const completedLessons = await prisma.lesson.findMany({
      where: {
        tutorId: session.user.id,
        status: "COMPLETED",
      },
      include: {
        student: { select: { hourlyRate: true } },
        payments: { select: { amount: true } },
      },
    });

    let totalEarned = 0;
    let totalPaid = 0;
    for (const lesson of completedLessons) {
      totalEarned += (lesson.duration / 60) * Number(lesson.student.hourlyRate);
      totalPaid += lesson.payments.reduce((sum: number, p: any) => sum + Number(p.amount), 0);
    }
    const outstandingPayments = Math.max(0, totalEarned - totalPaid);

    // Total students
    const totalStudents = await prisma.student.count({ where: { tutorId: session.user.id } });

    // Lessons this week
    const lessonsThisWeek = await prisma.lesson.count({
      where: { tutorId: session.user.id, date: { gte: weekStart, lte: weekEnd } },
    });

    return NextResponse.json({
      upcomingLessons: upcomingLessons.map((l: any) => ({
        ...l,
        isPaid: l.payments.length > 0,
      })),
      totalRevenueThisMonth: Number(monthlyPayments._sum.amount || 0),
      outstandingPayments,
      totalStudents,
      lessonsThisWeek,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
