import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { studentSchema } from "@/validations";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const students = await prisma.student.findMany({
      where: { tutorId: session.user.id },
      include: {
        _count: { select: { lessons: true } },
        lessons: {
          select: {
            duration: true,
            status: true,
            student: { select: { hourlyRate: true } },
          },
        },
        payments: {
          select: { amount: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const studentsWithStats = students.map((student: any) => {
      const completedLessons = student.lessons.filter(
        (l: any) => l.status === "COMPLETED"
      );
      const totalEarned = completedLessons.reduce(
        (sum: number, l: any) => sum + (l.duration / 60) * Number(student.hourlyRate),
        0
      );
      const totalPaid = student.payments.reduce(
        (sum: number, p: any) => sum + Number(p.amount),
        0
      );

      return {
        id: student.id,
        name: student.name,
        phoneNumber: student.phoneNumber,
        email: student.email,
        subject: student.subject,
        hourlyRate: Number(student.hourlyRate),
        notes: student.notes,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
        tutorId: student.tutorId,
        totalLessons: student._count.lessons,
        outstandingBalance: Math.max(0, totalEarned - totalPaid),
      };
    });

    return NextResponse.json(studentsWithStats);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
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
    const result = studentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const student = await prisma.student.create({
      data: {
        ...result.data,
        email: result.data.email || null,
        tutorId: session.user.id,
      },
    });

    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );
  }
}
