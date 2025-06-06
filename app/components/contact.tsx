import { useState, useEffect } from "react";
import { Mail, Github, Linkedin, X, AlertTriangle } from "lucide-react";

import { useIsClient } from "../hooks/use-client";
import { useIntersectionObserver } from "../hooks/use-intersection-observer";
import { ClientOnly } from "../utils/client-only";
import { ContactFormComponent } from "./contact-form";

const ContactMe = () => {
  const { ref, inView } = useIntersectionObserver();
  const isClient = useIsClient();

  // Typing effect state
  const [typingEffect, setTypingEffect] = useState({
    text: "",
    fullText: "> Establishing secure connection... Ready to communicate.",
    isComplete: false,
    charIndex: 0,
  });


  // Handle typing effect
  useEffect(() => {
    if (!isClient || !inView) return;
    if (typingEffect.charIndex < typingEffect.fullText.length) {
      const timer = setTimeout(() => {
        setTypingEffect((prev) => ({
          ...prev,
          text: prev.text + prev.fullText.charAt(prev.charIndex),
          charIndex: prev.charIndex + 1,
        }));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setTypingEffect((prev) => ({ ...prev, isComplete: true }));
    }
  }, [typingEffect.charIndex, typingEffect.fullText, inView, isClient]);

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
                <p ref={ref} className="text-sm min-h-11">
                  {isClient && inView ? (
                    <>
                      {typingEffect.text}
                      {!typingEffect.isComplete && (
                        <span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-pulse"></span>
                      )}
                    </>
                  ) : null}
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
                    href="https://twitter.com/Arnab431"
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

          <div className="w-full md:w-1/2 overflow-hidden">
            <div className="border border-green-900 p-5 rounded-lg hover:border-green-500 transition-all duration-500 bg-black bg-opacity-80 overflow-hidden h-full">
              {/* Animated background effect */}
              <div
                className="absolute -left-20 -bottom-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>

              <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <span className="inline-block w-1 h-4 bg-green-500 mr-2"></span>
                Send Message
              </h3>

              <ClientOnly
                fallback={
                  <div className="space-y-6">
                    <div className="text-center text-green-500 opacity-50">
                      Loading form...
                    </div>
                  </div>
                }
              >
                <ContactFormComponent />
              </ClientOnly>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactMe;
