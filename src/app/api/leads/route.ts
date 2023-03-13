import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({
      status: 401,
      body: "Unauthorized",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });

  const body = await request.json();

  const lead = await prisma.lead.create({
    data: {
      ...body,
      userId: user!.id,
    },
  });

  // return the lead
  return NextResponse.json({ lead, status: 200 });
}
