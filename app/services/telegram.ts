import { z } from "zod";

export interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
}

export interface SendMessageOptions {
  name: string;
  email: string;
  message: string;
}

export const contactSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(2, "First name must be at least 2 characters long"),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(2, "Last name must be at least 2 characters long"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email address"),
  subject: z
    .string({ required_error: "Subject is required" })
    .min(10, "Subject must be at least 10 characters long"),
  message: z
    .string({ required_error: "Message is required" })
    .min(20, "Message must be at least 20 characters long")
    .max(1000, "Message must be at most 1000 characters long"),
});

export const sendMessage = async (env: Env, args: SendMessageOptions) => {
  const response = await fetch(
    `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text:
          `<b>Name : </b>${args.name}\n` +
          `<b>Email : </b>${args.email}\n` +
          `<b>Message : </b><code>${args.message}</code>`,
        parse_mode: "HTML",
      }),
    }
  );
  if (response.ok) {
    return true;
  }
  return false;
};
