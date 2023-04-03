import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import NewNote from "./newNote";

const getLeadDetailsById = async (leadId: string) => {
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

export default async function LeadPage({
  params,
}: {
  params: { leadId: string };
}) {
  const details = await getLeadDetailsById(params.leadId);

  if (!details) {
    return (
      <div className="p-4">
        <h1>Lead Not Found</h1>
        <Link href="/">Go back to home</Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1>Lead Details</h1>
      <div className="flex flex-row justify-between h-full mt-10">
        <div className="flex flex-col p-4 mt-5 border-r grow">
          <h2>{details.name}</h2>
          <p className="text-break">Email: {details.email}</p>
          <p>Phone: {details.phone}</p>
          <p>Company: {details.companyName}</p>
        </div>
        <div className="flex flex-col w-2/3 p-4 grow">
          <h2>Create New Note</h2>
          <NewNote leadId={details.id} />
          <hr />
          <h3>Notes:</h3>
          {JSON.stringify(details.notes)}
        </div>
      </div>
    </div>
  );
}
