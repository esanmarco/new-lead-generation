import { auth } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";
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
