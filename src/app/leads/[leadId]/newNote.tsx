"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function NewNote({ leadId }: { leadId: string }) {
  const { refresh } = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["createNote"],
    mutationFn: async (note: string) => {
      await fetch(`/api/notes`, {
        method: "POST",
        body: JSON.stringify({ content: note, leadId }),
      });
      refresh();
      (document.getElementsByName("note")[0] as HTMLTextAreaElement).value = "";
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = e.currentTarget.note.value;
    if (!value.length) {
      return;
    }

    mutate(value);
  };

  return (
    <form className="flex flex-col items-end gap-2" onSubmit={handleSubmit}>
      <textarea
        name="note"
        className="w-full textarea textarea-bordered"
        placeholder="Add a new note to this lead"
      ></textarea>
      <button className={`btn w-fit ${isLoading ? "loading" : ""}`}>
        Add Note
      </button>
    </form>
  );
}
