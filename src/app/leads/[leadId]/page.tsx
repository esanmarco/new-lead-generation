import { getLeadDetailsById } from "@/server/leads";
import Link from "next/link";
import NewNote from "./newNote";

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
    <div className="flex flex-row items-stretch w-full h-full">
      <div className="flex flex-col w-2/3 p-8 overflow-y-auto lg:w-3/4">
        <div className="max-w-lg p-4 mx-auto shadow card bg-base-200 w-fit">
          <h2>{details.name}</h2>
          <p className="text-break">Email: {details.email}</p>
          <p>Phone: {details.phone}</p>
          <p>Company: {details.companyName}</p>
        </div>
      </div>
      <div className="w-1/3 p-4 overflow-y-auto border-l lg:w-1/4 border-base-200">
        <h3>Lead Notes</h3>
        <NewNote leadId={details.id} />
        <hr className="my-5" />
        {JSON.stringify(details.notes)}
      </div>
    </div>
  );
}
