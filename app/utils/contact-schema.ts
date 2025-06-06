import { z } from "zod";

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export const formSchema = z.object({
  name: z.string().min(1, { message: "error: name required" }),
  email: z
    .string()
    .min(1, { message: "error: email required" })
    .email({ message: "error: invalid email format" }),
  message: z
    .string()
    .min(10, { message: "error: message too short (min 10 chars)" }),
});