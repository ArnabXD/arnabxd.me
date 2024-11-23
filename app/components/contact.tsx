import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MetaFunction } from "@remix-run/cloudflare";
import { Form, useSubmit } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";

import { Input, TextArea } from "~/components/input";
import { useDebounce } from "~/hooks/debounce";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact - ArnabXD" },
    { name: "description", content: "Contact Arnab Paryali" },
  ];
};

const schema = z.object({
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

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const data = await request.formData();
//   const _json = Object.fromEntries(data);

//   const result = await schema.safeParseAsync(_json);
//   if (!result.success) {
//     return json(result);
//   }

//   return json({ success: true });
// };
export interface ContactProps {
  data?: {
    success: boolean;
  };
}

export default function Contact({ data }: ContactProps) {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const submit = useSubmit();

  const showMessage = useDebounce((message: string, success: boolean) => {
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }, 500);
  const debouncedReset = useDebounce(reset, 500);

  useEffect(() => {
    if (data) {
      const message = data.success
        ? "Message sent successfully"
        : "Failed to send message.";
      showMessage(message, data.success);
      if (data.success) {
        debouncedReset();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-8 mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
              <h2 className="mb-4 text-3xl text-primary font-bold sm:text-4xl md:text-[40px]">
                Get in touch
              </h2>
            </div>
          </div>
        </div>
        <Form
          className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto"
          action="/?index"
          onSubmit={handleSubmit((data) => submit(data, { method: "post" }))}
        >
          <Input
            label="First name*"
            {...register("firstName")}
            error={errors["firstName"]?.message as string}
          />
          <Input
            label="Last name*"
            {...register("lastName")}
            error={errors["lastName"]?.message as string}
          />
          <Input
            label="Email*"
            containerClassName="sm:col-span-2"
            {...register("email")}
            error={errors["email"]?.message as string}
          />
          <Input
            label="Subject*"
            containerClassName="sm:col-span-2"
            {...register("subject")}
            error={errors["subject"]?.message as string}
          />
          <TextArea
            label="Message*"
            containerClassName="sm:col-span-2"
            {...register("message")}
            error={errors["message"]?.message as string}
          />

          <div className="sm:col-span-2 flex justify-between items-center">
            <button
              type="submit"
              className="inline-block bg-primary hover:scale-110 focus-visible:ring text-bg-dark text-sm md:text-base font-semibold text-center rounded-lg outline-none border-transparent transition duration-100 px-8 py-3"
            >
              Send
            </button>

            <span className="text-gray-500 text-sm">*Required</span>
          </div>
        </Form>
      </div>
    </div>
  );
}
