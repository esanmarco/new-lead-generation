"use client";

import { isFormValid } from "@/server/models/newLead";
import { useNewLeadStore } from "@/stores/newLeadStore";
import { useMutation } from "@tanstack/react-query";

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

  const { mutate, isLoading } = useMutation(["newlead"], async () => {
    return await (
      await fetch(`/api/leads`, {
        method: "POST",
        body: JSON.stringify(newLead),
      })
    ).json();
  });

  const handleInputUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    useNewLeadStore.setState({ [name]: value });
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
