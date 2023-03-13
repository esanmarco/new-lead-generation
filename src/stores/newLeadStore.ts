import { NewLead } from "@/server/models/newLead";
import { create } from "zustand";

export const useNewLeadStore = create<NewLead>(() => ({
  name: "",
  email: "",
  phone: "",
  companyName: "",
}));
