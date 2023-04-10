"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";

export default function DeleteLead({ leadId }: { leadId: string }) {
  const { refresh } = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["deleteLead", leadId],
    mutationFn: async () => {
      const res = await (
        await fetch(`/api/leads`, {
          method: "DELETE",
          body: JSON.stringify({ leadId }),
        })
      ).json();

      return res;
    },
    onSuccess: () => refresh(),
  });

  return (
    <button onClick={() => mutate()} className="p-3">
      <MdDeleteForever size={24} />
    </button>
  );
}
