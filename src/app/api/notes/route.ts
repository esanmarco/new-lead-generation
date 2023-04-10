import { auth } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export interface Note {
  content: string;
  leadId: string;
}

export async function POST(request: Request) {
  await auth();
  const body: Note = await request.json();
  await prisma.notes.create({
    data: {
      ...body,
      createdAt: new Date(),
    },
  });

  return NextResponse.json({
    status: 200,
  });
}

export async function DELETE(request: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({
      status: 401,
      body: "Unauthorized",
    });
  }

  const body = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
    include: {
      leads: true,
    },
  });

  // check if the lead belongs to the user
  const lead = await prisma.lead.findUnique({
    where: {
      id: body.leadId,
    },
  });

  if (lead?.userId !== user?.id) {
    return NextResponse.json({
      status: 401,
      body: "Unauthorized",
    });
  }

  await prisma.notes.delete({
    where: {
      id: body.noteId,
    },
  });

  // return the lead
  return NextResponse.json({ status: 200 });
}
