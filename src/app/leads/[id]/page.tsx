import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import NewMessage from "./newMessage";

const getLeadById = async (leadId: string) => {
  const prisma = new PrismaClient();
  const session = await getServerSession();
  if (!session?.user) return null;

  // get user ID from session
  const userId = await prisma.user
    .findUnique({
      where: { email: session.user.email as string },
    })
    .then((user) => user?.id);

  // pull the lead using the leadId
  const lead = await prisma.lead.findUnique({
    where: {
      id: leadId,
    },
    include: {
      notes: true,
    },
  });

  // make sure the lead belongs to the user
  if (lead?.userId !== userId) return null;

  return lead;
};

export default async function Lead({ params }: { params: { id: string } }) {
  const details = await getLeadById(params.id);

  if (!details) {
    return (
      <div className="p-4">
        <h1>Lead not found</h1>
        <Link href="/">Go Back</Link>
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
          <h2>Notes</h2>
          <NewMessage leadId={details.id} />
          <hr />
          <h3>Notes:</h3>
          {JSON.stringify(details.notes)}
        </div>
      </div>
    </div>
  );
}
