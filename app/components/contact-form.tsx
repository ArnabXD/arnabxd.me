import { useEffect } from "react";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetcher } from "react-router";
import toast from "react-hot-toast";
import { type ContactForm, formSchema } from "../utils/contact-schema";
import { useIsClient } from "../hooks/use-client";

export const ContactFormComponent = () => {
  const isClient = useIsClient();

  // Form validation with react-hook-form and zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(formSchema),
  });

  const { submit, state, data } = useFetcher<{ success: boolean }>();

  useEffect(() => {
    if (!isClient || !data) {
      return;
    }
    if (data?.success) {
      toast.success("Message sent successfully", {
        style: {
          border: "1px solid green",
          background: "black",
          color: "green",
        },
        iconTheme: {
          primary: "green",
          secondary: "black",
        },
      });
      reset();
    } else {
      toast.error("Failed to send message", {
        style: {
          border: "1px solid red",
          background: "black",
          color: "red",
        },
        iconTheme: {
          primary: "red",
          secondary: "black",
        },
      });
    }
  }, [data, reset, isClient]);

  const isSubmitting = state === "submitting";

  return (
    <form
      onSubmit={handleSubmit((data) =>
        submit(
          { ...data },
          {
            action: "/?index",
            method: "POST",
            encType: "application/json",
          }
        )
      )}
      className="space-y-6"
    >
      <div className="space-y-1">
        <div className="flex justify-between">
          <label htmlFor="name" className="text-xs opacity-70">
            Name:
          </label>
          {errors.name && (
            <span className="text-xs text-red-500">
              {errors.name.message}
            </span>
          )}
        </div>
        <div
          className={`flex items-center border bg-black bg-opacity-70 rounded overflow-hidden transition-all duration-300 ${
            errors.name
              ? "border-red-500"
              : "border-green-900 focus-within:border-green-500"
          }`}
        >
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className="w-full px-4 py-3 bg-transparent text-white focus:outline-none text-sm"
            {...register("name")}
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <label htmlFor="email" className="text-xs opacity-70">
            Email:
          </label>
          {errors.email && (
            <span className="text-xs text-red-500">
              {errors.email.message}
            </span>
          )}
        </div>
        <div
          className={`flex items-center border bg-black bg-opacity-70 rounded overflow-hidden transition-all duration-300 ${
            errors.email
              ? "border-red-500"
              : "border-green-900 focus-within:border-green-500"
          }`}
        >
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-transparent text-white focus:outline-none text-sm"
            {...register("email")}
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <label htmlFor="message" className="text-xs opacity-70">
            Message:
          </label>
          {errors.message && (
            <span className="text-xs text-red-500">
              {errors.message.message}
            </span>
          )}
        </div>
        <div
          className={`flex items-start border bg-black bg-opacity-70 rounded overflow-hidden transition-all duration-300 ${
            errors.message
              ? "border-red-500"
              : "border-green-900 focus-within:border-green-500"
          }`}
        >
          <textarea
            id="message"
            placeholder="Enter your message"
            rows={6}
            className="w-full px-4 py-3 bg-transparent text-white focus:outline-none text-sm resize-none"
            {...register("message")}
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 rounded flex items-center justify-center transition-all duration-300 ${
          isSubmitting
            ? "bg-green-800 cursor-not-allowed"
            : "bg-green-700 hover:bg-green-600"
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          <span className="flex items-center font-medium text-white">
            <Send className="mr-2 w-4 h-4" />
            SEND_MESSAGE
          </span>
        )}
      </button>
    </form>
  );
};