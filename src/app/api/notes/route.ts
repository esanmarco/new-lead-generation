import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "../leads/route";

const prisma = new PrismaClient();

export interface Note {
  content: string;
  leadId: string;
}

export async function POST(request: Request) {
  await auth();
  const body: Note = await request.json();
  await prisma.note.create({
    data: {
      ...body,
      createdAt: new Date(),
    },
  });

  return NextResponse.json({ status: 200 });
}
