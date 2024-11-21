import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}

function InputField({
  children,
  value,
  onChange,
  autoComplete = "off",
  ...props
}: InputFieldProps) {
  return (
    <label htmlFor={props.id} className="flex w-full items-center gap-2 p-4">
      <div className="flex-shrink-0">{children}</div>
      <div className="border-border h-3 border-l"></div>
      <input
        id={props.id}
        type={props.type || "text"}
        placeholder={props.placeholder}
        className="text-md w-full border-none bg-transparent outline-none"
        value={value}
        onChange={onChange}
        name={props.name}
        autoComplete={autoComplete}
        {...props}
      />
    </label>
  );
}

export { InputField };
