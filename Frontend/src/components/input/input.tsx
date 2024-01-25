import React from "react";
import { useFormContext } from "react-hook-form";
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  className?: string;
  placeholder?: string;
  name: string;
  defaultValue?: string;
}

const Input: React.FC<TextInputProps> = ({
  name,
  type,
  label,
  placeholder,
  defaultValue,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700 text-sm mb-2">{label}</label>
      )}
      <input
        className={`border border-gray-300 py-2 px-4 rounded-lg w-full`}
        type={type ? type : "text"}
        placeholder={placeholder}
        {...rest}
        {...register(name)}
      />
      {errors?.[name]?.message ? (
        <p className="text-red-400 mt-1">{errors?.[name]?.message as string}</p>
      ) : null}
    </div>
  );
};
export default Input;
