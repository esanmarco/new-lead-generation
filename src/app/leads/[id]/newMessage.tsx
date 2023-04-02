"use client";

import { Note } from "@/app/api/notes/route";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function NewMessage({ leadId }: { leadId: string }) {
  const { refresh } = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["newMessage"],
    mutationFn: async (newNote: Note) => {
      const res = await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify(newNote),
      });
      return res.json();
    },
    onSuccess: () => {
      refresh();
      (document.getElementsByName("note")[0] as HTMLTextAreaElement).value = "";
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = event.currentTarget.note.value;

    if (!value.length) {
      console.log("not long enough");
    }
    mutate({ content: value, leadId });
  };

  return (
    <form className="flex flex-col items-end gap-2" onSubmit={handleSubmit}>
      <textarea
        className="w-full textarea textarea-bordered"
        placeholder="Add a note for this lead"
        name="note"
      ></textarea>
      <button className={`btn w-fit ${isLoading ? "loading" : ""}`}>
        Add Note
      </button>
    </form>
  );
}
