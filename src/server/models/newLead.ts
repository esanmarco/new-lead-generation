import { z } from "zod";

export const newLeadSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().nonempty(),
  companyName: z.string().nonempty(),
});

export type NewLead = z.infer<typeof newLeadSchema>;

export const isFormValid = (data: NewLead) => {
  return newLeadSchema.safeParse(data).success;
};
