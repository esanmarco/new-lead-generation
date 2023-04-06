import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

export const getLeadDetailsById = async (leadId: string) => {
  const prisma = new PrismaClient();
  const session = await getServerSession();
  if (!session?.user) {
    return null;
  }

  const userId = await prisma.user
    .findUnique({
      where: { email: session?.user?.email ?? "" },
    })
    .then((user) => user?.id);

  if (!userId) {
    return null;
  }

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: { notes: true },
  });

  if (userId !== lead?.userId) {
    return null;
  }

  return lead;
};
