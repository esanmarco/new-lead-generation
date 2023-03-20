import { NewLead as NewLeadType } from "@/server/models/newLead";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import NewLead from "./components/newLead";

const prisma = new PrismaClient();

const getLeads = async (): Promise<NewLeadType[]> => {
  const session = await getServerSession();
  const res = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? "" },
    include: { leads: true },
  });
  return res?.leads ?? [];
};

export default async function Home() {
  const leads = await getLeads();

  return (
    <>
      <h1>Dashboard</h1>
      <NewLead />

      <div className="grid grid-cols-3 gap-4 mt-5">
        {leads.map((lead) => (
          <div className="shadow card bg-base-200" key={`lead-${lead.id}`}>
            <div className="card-body">
              <h2 className="m-0 card-title">{lead.name}</h2>
              <p className="m-0 card-subtitle">{lead.companyName}</p>
              <ul className="m-0">
                <li>
                  <a href={`mailto:${lead.email}`} className="text-accent">
                    {lead.email}
                  </a>
                </li>
                <li>{lead.phone}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
