"use client";

import { useMutation } from "@tanstack/react-query";

export default function NewLead() {
  const { mutate } = useMutation(["newlead"], async () => {
    // todo - create new lead
  });

  return (
    <>
      <button className="btn btn-primary">New Lead</button>
    </>
  );
}
