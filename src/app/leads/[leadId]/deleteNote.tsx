"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";

export default function DeleteNote({
  noteId,
  leadId,
}: {
  noteId: string;
  leadId: string;
}) {
  const { refresh } = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["deleteNote", noteId],
    mutationFn: async () => {
      const res = await fetch(`/api/leads`, {
        method: "DELETE",
        body: JSON.stringify({ noteId, leadId }),
      });
      if (!res.ok) {
        throw new Error("Failed to delete note");
      }
    },
    onSuccess: () => refresh(),
  });

  return (
    <button onClick={() => mutate()}>
      <MdDeleteForever />
    </button>
  );
}
