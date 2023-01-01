import React from "react";
import NavigationBar from "../components/NavigationBar";

export const Contact = () => {
  return (
    <div>
      <NavigationBar />
      <div className="py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <div className="mb-10 md:mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
              Get in touch
            </h2>
          </div>
          <form className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto">
            <div>
              <label
                htmlFor="first-name"
                className="inline-block text-sm sm:text-base mb-2"
              >
                First name*
              </label>
              <input
                name="first-name"
                className="w-full bg-surface border focus:ring ring-primary rounded outline-none transition duration-100 px-3 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="last-name"
                className="inline-block text-sm sm:text-base mb-2"
              >
                Last name*
              </label>
              <input
                name="last-name"
                className="w-full bg-surface border focus:ring ring-primary rounded outline-none transition duration-100 px-3 py-2"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="inline-block text-sm sm:text-base mb-2"
              >
                Company
              </label>
              <input
                name="company"
                className="w-full bg-surface border focus:ring ring-primary rounded outline-none transition duration-100 px-3 py-2"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="inline-block text-sm sm:text-base mb-2"
              >
                Email*
              </label>
              <input
                name="email"
                className="w-full bg-surface border focus:ring ring-primary rounded outline-none transition duration-100 px-3 py-2"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="subject"
                className="inline-block text-sm sm:text-base mb-2"
              >
                Subject*
              </label>
              <input
                name="subject"
                className="w-full bg-surface border focus:ring ring-primary rounded outline-none transition duration-100 px-3 py-2"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="inline-block text-sm sm:text-base mb-2"
              >
                Message*
              </label>
              <textarea
                name="message"
                className="w-full h-64 bg-surface border focus:ring ring-primary rounded outline-none transition duration-100 px-3 py-2"
              ></textarea>
            </div>

            <div className="sm:col-span-2 flex justify-between items-center">
              <button className="inline-block bg-primary hover:scale-110 focus-visible:ring text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                Send
              </button>

              <span className="text-gray-500 text-sm">*Required</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
