import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { paymentSchema } from "@/validations";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payments = await prisma.payment.findMany({
      where: { tutorId: session.user.id },
      include: {
        student: { select: { id: true, name: true } },
        lesson: { select: { id: true, date: true, subject: true } },
      },
      orderBy: { paymentDate: "desc" },
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
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
    const result = paymentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { studentId, lessonId, amount, paymentMethod, paymentDate } =
      result.data;

    // Verify student belongs to this tutor
    const student = await prisma.student.findFirst({
      where: { id: studentId, tutorId: session.user.id },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    const payment = await prisma.payment.create({
      data: {
        amount,
        paymentMethod,
        paymentDate: new Date(paymentDate),
        studentId,
        lessonId: lessonId || null,
        tutorId: session.user.id,
      },
      include: {
        student: { select: { id: true, name: true } },
        lesson: { select: { id: true, date: true, subject: true } },
      },
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    );
  }
}
