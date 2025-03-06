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
  name: z.string().min(1, { message: "error: name required" }),
  email: z
    .string()
    .min(1, { message: "error: email required" })
    .email({ message: "error: invalid email format" }),
  message: z
    .string()
    .min(10, { message: "error: message too short (min 10 chars)" }),
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
