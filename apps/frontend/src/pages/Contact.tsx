import React from "react";
import { NavigationBar, Input, TextArea } from "../components";

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
            <Input label="First name*" name="first-name" />
            <Input label="Last name*" name="last-name" />
            <Input
              label="Email*"
              name="email"
              containerClassName="sm:col-span-2"
            />
            <Input
              label="Subject*"
              name="subject"
              containerClassName="sm:col-span-2"
            />
            <TextArea
              label="Message*"
              name="message"
              containerClassName="sm:col-span-2"
            />

            <div className="sm:col-span-2 flex justify-between items-center">
              <button className="inline-block bg-primary hover:scale-110 focus-visible:ring text-bg-dark text-sm md:text-base font-semibold text-center rounded-lg outline-none border-transparent transition duration-100 px-8 py-3">
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
