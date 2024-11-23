import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import cx from "classix";

interface ExtraProps {
  label: string;
  containerClassName?: string;
  error?: string;
}
export type InputProps = InputHTMLAttributes<HTMLInputElement> & ExtraProps;
export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  ExtraProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, containerClassName = "", error, ...rest }, ref) => (
    <div className={containerClassName}>
      <label
        htmlFor={rest.name}
        className="inline-block text-sm sm:text-base mb-2"
      >
        {label}
      </label>
      <input
        ref={ref}
        className={cx(
          "w-full surface border focus:ring rounded outline-none border-transparent transition duration-100 px-3 py-2",
          error ? "ring-red-500" : "ring-primary"
        )}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
);

Input.displayName = "Input";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, containerClassName = "", error, ...rest }, ref) => (
    <div className={containerClassName}>
      <label
        htmlFor={rest.name}
        className="inline-block text-sm sm:text-base mb-2"
      >
        {label}
      </label>
      <textarea
        ref={ref}
        className={cx(
          "w-full h-64 surface border focus:ring rounded outline-none border-transparent transition duration-100 px-3 py-2",
          error ? "ring-red-500" : "ring-primary"
        )}
        {...rest}
      ></textarea>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
);

TextArea.displayName = "TextArea";
