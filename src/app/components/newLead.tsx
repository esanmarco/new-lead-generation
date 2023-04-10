"use client";
import LeadForm from "./leadForm";

export default function NewLead() {
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

          <LeadForm />
        </div>
      </div>
    </>
  );
}
