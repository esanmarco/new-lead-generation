import { NewLead } from "@/server/models/newLead";
import { create } from "zustand";

export const defaultStore = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
};

export const useNewLeadStore = create<NewLead>()(() => ({
  ...defaultStore,
}));
