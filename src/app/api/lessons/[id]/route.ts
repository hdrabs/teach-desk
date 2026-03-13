import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { lessonUpdateSchema } from "@/validations";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const lesson = await prisma.lesson.findFirst({
      where: { id, tutorId: session.user.id },
      include: {
        student: { select: { id: true, name: true, hourlyRate: true } },
        payments: true,
      },
    });

    if (!lesson) {
      return NextResponse.json(
        { error: "Lesson not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return NextResponse.json(
      { error: "Failed to fetch lesson" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const result = lessonUpdateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const existing = await prisma.lesson.findFirst({
      where: { id, tutorId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Lesson not found" },
        { status: 404 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (result.data.status) updateData.status = result.data.status;
    if (result.data.notes !== undefined) updateData.notes = result.data.notes;
    if (result.data.date) updateData.date = new Date(result.data.date);
    if (result.data.startTime) updateData.startTime = result.data.startTime;
    if (result.data.duration) updateData.duration = result.data.duration;
    if (result.data.subject) updateData.subject = result.data.subject;

    const lesson = await prisma.lesson.update({
      where: { id },
      data: updateData,
      include: {
        student: { select: { id: true, name: true, hourlyRate: true } },
      },
    });

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("Error updating lesson:", error);
    return NextResponse.json(
      { error: "Failed to update lesson" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.lesson.findFirst({
      where: { id, tutorId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Lesson not found" },
        { status: 404 }
      );
    }

    await prisma.lesson.delete({ where: { id } });

    return NextResponse.json({ message: "Lesson deleted" });
  } catch (error) {
    console.error("Error deleting lesson:", error);
    return NextResponse.json(
      { error: "Failed to delete lesson" },
      { status: 500 }
    );
  }
}
