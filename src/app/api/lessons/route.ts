import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { lessonSchema } from "@/validations";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");
    const status = searchParams.get("status");

    const where: Record<string, unknown> = { tutorId: session.user.id };
    if (studentId) where.studentId = studentId;
    if (status) where.status = status;

    const lessons = await prisma.lesson.findMany({
      where,
      include: {
        student: {
          select: { id: true, name: true, hourlyRate: true },
        },
        payments: {
          select: { id: true, amount: true },
        },
      },
      orderBy: { date: "desc" },
    });

    const lessonsWithPaymentStatus = lessons.map((lesson: any) => ({
      ...lesson,
      isPaid: lesson.payments.length > 0,
    }));

    return NextResponse.json(lessonsWithPaymentStatus);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return NextResponse.json(
      { error: "Failed to fetch lessons" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = lessonSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { studentId, date, startTime, duration, subject, notes } =
      result.data;

    // Verify student belongs to tutor
    const student = await prisma.student.findFirst({
      where: { id: studentId, tutorId: session.user.id },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    const lesson = await prisma.lesson.create({
      data: {
        date: new Date(date),
        startTime,
        duration,
        subject,
        notes: notes || null,
        studentId,
        tutorId: session.user.id,
      },
      include: {
        student: { select: { id: true, name: true, hourlyRate: true } },
      },
    });

    return NextResponse.json(lesson, { status: 201 });
  } catch (error) {
    console.error("Error creating lesson:", error);
    return NextResponse.json(
      { error: "Failed to create lesson" },
      { status: 500 }
    );
  }
}
