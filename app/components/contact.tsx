import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useSubmit } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Input, TextArea } from "~/components/input";
import { useDebounce } from "~/hooks/debounce";
import { contactSchema } from "~/services/telegram";

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const data = await request.formData();
//   const _json = Object.fromEntries(data);

//   const result = await contactSchema.safeParseAsync(_json);
//   if (!result.success) {
//     return json(result);
//   }

//   return json({ success: true });
// };
interface ContactProps {
  data?: {
    success: boolean;
  };
  headerRef?: React.RefObject<HTMLDivElement>;
}

export default function Contact({ data, headerRef }: ContactProps) {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(contactSchema),
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

  const isSubmitting = data?.success === false ? false : isSubmitSuccessful;

  return (
    <div className="py-6 sm:py-8 lg:py-12" ref={headerRef}>
      <div className="max-w-screen-2xl mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-10 max-w-[510px] text-center lg:mb-20">
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
              className={"primary-btn"}
              disabled={isSubmitting}
            >
              {isSubmitting ? "..." : "Send"}
            </button>
            <span className="text-gray-500 text-sm">*Required</span>
          </div>
        </Form>
      </div>
    </div>
  );
}
