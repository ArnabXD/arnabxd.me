import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface ExtraProps {
  label: string;
  containerClassName?: string;
}
export type InputProps = InputHTMLAttributes<HTMLInputElement> & ExtraProps;
export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  ExtraProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, containerClassName = "", ...rest }, ref) => (
    <div className={containerClassName}>
      <label
        htmlFor={rest.name}
        className="inline-block text-sm sm:text-base mb-2"
      >
        {label}
      </label>
      <input
        ref={ref}
        className="w-full bg-surface border focus:ring ring-primary rounded outline-none border-transparent transition duration-100 px-3 py-2"
        {...rest}
      />
    </div>
  )
);

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, containerClassName = "", ...rest }, ref) => (
    <div className={containerClassName}>
      <label
        htmlFor={rest.name}
        className="inline-block text-sm sm:text-base mb-2"
      >
        Message*
      </label>
      <textarea
        ref={ref}
        className="w-full h-64 bg-surface border focus:ring ring-primary rounded outline-none border-transparent transition duration-100 px-3 py-2"
        {...rest}
      ></textarea>
    </div>
  )
);
