"use client";

import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";

interface IMessageInputComponentProps {
  id: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  placeholder?: string;
}

const MessageInputComponent: React.FC<IMessageInputComponentProps> = ({
  id,
  type,
  register,
  errors,
  required,
  placeholder,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="text-black
        font-light
        py-2
        px-4
        bg-neutral-100
        w-full
        rounded-full
        focus:outline-none"
      />
    </div>
  );
};

export default MessageInputComponent;
