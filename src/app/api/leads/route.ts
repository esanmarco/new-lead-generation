import { PrismaClient } from "@prisma/client";
import { getServerSession, Session } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function auth(): Promise<Session | NextResponse> {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({
      status: 401,
      body: "Unauthorized",
    });
  }
  return session;
}

export async function POST(request: Request) {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      email: (session as Session)?.user?.email as string,
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
  return NextResponse.json(lead);
}
