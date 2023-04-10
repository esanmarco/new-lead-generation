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

  if (body?.leadId) {
    const { leadId, ...data } = body;
    await prisma.lead.update({
      where: {
        id: body.leadId,
      },
      data: {
        ...data,
      },
    });
  } else {
    await prisma.lead.create({
      data: {
        ...body,
        userId: user!.id,
      },
    });
  }

  // return the lead
  return NextResponse.json({ status: 200 });
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
