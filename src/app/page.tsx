import { NewLead as NewLeadType } from "@/server/models/newLead";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
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
    <div className="p-4">
      <h1>Dashboard</h1>
      <NewLead />

      <div className="grid grid-cols-3 gap-4 mt-5">
        {leads.map((lead) => (
          <div
            className="relative shadow card bg-base-200"
            key={`lead-${lead.id}`}
          >
            <Link className="absolute top-3 right-3" href={`/leads/${lead.id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                />
              </svg>
            </Link>
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
    </div>
  );
}
