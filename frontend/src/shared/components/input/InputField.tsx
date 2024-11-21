import { cn } from "@/shared/misc";
import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}

const InputField = React.memo(
  ({ children, value, onChange, type = "text", ...props }: InputFieldProps) => {
    return (
      <label htmlFor={props.id} className="flex w-full items-center gap-2 p-4">
        <div className="flex-shrink-0">{children}</div>
        <div className="border-border h-3 border-l"></div>
        <input
          id={props.id}
          type={type}
          placeholder={props.placeholder}
          className={cn(
            "text-md w-full border-none bg-transparent outline-none",
            props.className,
          )}
          value={value}
          onChange={onChange}
          name={props.name}
        />
      </label>
    );
  },
);

export { InputField };
