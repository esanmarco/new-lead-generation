"use client";

import { isFormValid } from "@/server/models/newLead";
import { defaultStore, useNewLeadStore } from "@/stores/newLeadStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const fields = [
  { label: "Name", name: "name", type: "text", placeholder: "Full Name" },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Email Address",
  },
  { label: "Phone", name: "phone", type: "tel", placeholder: "Phone Number" },
  {
    label: "Company",
    name: "companyName",
    type: "text",
    placeholder: "Company Name",
  },
];

export default function NewLead() {
  const newLead = useNewLeadStore();
  const { refresh } = useRouter();

  const { mutate, isLoading } = useMutation(["newlead"], async () => {
    const res = await (
      await fetch(`/api/leads`, {
        method: "POST",
        body: JSON.stringify(newLead),
      })
    ).json();

    useNewLeadStore.setState(defaultStore);
    refresh();
    (document.getElementById("new-lead") as HTMLInputElement).checked = false;

    return res;
  });

  const handleInputUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    useNewLeadStore.setState({ [name]: value });
  };

  const fieldValue = (name: string) => {
    return (
      Object.entries(newLead).find(([key, _value]) => key === name)?.[1] || ""
    );
  };

  return (
    <>
      <label htmlFor="new-lead" className="btn btn-primary">
        New Lead
      </label>

      <input type="checkbox" id="new-lead" className="modal-toggle" />

      <div className="modal">
        <div className="relative modal-box">
          <label
            htmlFor="new-lead"
            className="absolute btn btn-sm btn-circle right-2 top-2"
          >
            ✕
          </label>

          {fields.map((field) => (
            <div className="w-full mb-2" key={field.name}>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="w-full input input-bordered"
                onChange={handleInputUpdate}
                value={fieldValue(field.name)}
              />
            </div>
          ))}

          <button
            onClick={() => mutate()}
            disabled={!isFormValid(newLead)}
            className={`mt-2 btn btn-primary ${isLoading ? "loading" : ""}`}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
