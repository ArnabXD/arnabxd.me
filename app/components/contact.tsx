import { useState, useEffect } from "react";
import { Mail, Send, Github, Linkedin, X, AlertTriangle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetcher } from "react-router";
import toast from "react-hot-toast";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, { message: "error: name required" }),
  email: z
    .string()
    .min(1, { message: "error: email required" })
    .email({ message: "error: invalid email format" }),
  message: z
    .string()
    .min(10, { message: "error: message too short (min 10 chars)" }),
});

const ContactMe = () => {
  // Typing effect state
  const [typingEffect, setTypingEffect] = useState({
    text: "",
    fullText: "> Establishing secure connection... Ready to communicate.",
    isComplete: false,
    charIndex: 0,
  });

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

  // Handle typing effect
  useEffect(() => {
    if (typingEffect.charIndex < typingEffect.fullText.length) {
      const timer = setTimeout(() => {
        setTypingEffect((prev) => ({
          ...prev,
          text: prev.text + prev.fullText.charAt(prev.charIndex),
          charIndex: prev.charIndex + 1,
        }));
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setTypingEffect((prev) => ({ ...prev, isComplete: true }));
    }
  }, [typingEffect.charIndex, typingEffect.fullText]);

  useEffect(() => {
    if (!data) {
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
  }, [data, reset]);

  const isSubmitting = state === "submitting";

  return (
    <div className="min-h-screen md:min-h-0 text-green-500 font-mono">
      <section className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <div className="border border-green-900 p-5 rounded-lg bg-black bg-opacity-80 h-full hover:shadow-lg hover:shadow-green-900/30">
              <div className="flex items-center mb-5">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <div className="text-xs opacity-70 ml-2">terminal_session</div>
              </div>

              <div className="mb-6">
                <p className="text-sm min-h-11">
                  {typingEffect.text}
                  {!typingEffect.isComplete && (
                    <span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-pulse"></span>
                  )}
                </p>
              </div>

              <div className="space-y-6">
                <div className="border-l-2 border-green-500 pl-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Direct Communication Channels
                  </h3>
                  <div className="space-y-2">
                    <a
                      href="mailto:arnabxd@proton.me"
                      className="flex items-center text-sm hover:text-white transition-colors duration-300 group"
                    >
                      <Mail className="w-4 h-4 mr-3 text-green-500 group-hover:text-white transition-colors duration-300" />
                      <span>arnabxd@proton.me</span>
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-green-900">
                  <a
                    href="https://github.com/ArnabXD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-green-900 hover:border-green-500 bg-black transition-all duration-300 group"
                  >
                    <Github className="w-5 h-5 text-green-500 group-hover:text-white transition-colors duration-300" />
                  </a>
                  <a
                    href="https://linkedin.com/in/arnabparyali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-green-900 hover:border-green-500 bg-black transition-all duration-300 group"
                  >
                    <Linkedin className="w-5 h-5 text-green-500 group-hover:text-white transition-colors duration-300" />
                  </a>
                  <a
                    href="https://twitter.com/ArnabXD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-green-900 hover:border-green-500 bg-black transition-all duration-300 group"
                  >
                    <X className="w-5 h-5 text-green-500 group-hover:text-white transition-colors duration-300" />
                  </a>
                </div>

                <div className="bg-gradient-to-r from-green-900/20 to-transparent p-3 rounded-lg border-l-2 border-green-500">
                  <div className="flex mb-2">
                    <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
                    <span className="text-yellow-500 text-xs">
                      SECURE_CONNECTION_NOTICE
                    </span>
                  </div>
                  <p className="text-xs opacity-80">
                    All communications are end-to-end encrypted. Your
                    information remains private and secure. Response times
                    typically within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="border border-green-900 p-5 rounded-lg hover:border-green-500 transition-all duration-500 bg-black bg-opacity-80 overflow-hidden h-full">
              {/* Animated background effect */}
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
              <div
                className="absolute -left-20 -bottom-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>

              <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <span className="inline-block w-1 h-4 bg-green-500 mr-2"></span>
                Send Message
              </h3>

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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactMe;
