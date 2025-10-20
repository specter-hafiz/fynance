"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  name: string;
  id: string;
  showPasswordToggle?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  name,
  id,
  type = "text",
  className = "",
  showPasswordToggle = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Determine the actual input type
  const inputType =
    showPasswordToggle && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm mb-2 text-white">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={inputType}
          className={`border-b ${
            error ? "border-red-500" : "border-lightblue/10"
          } bg-transparent py-3 px-3 text-sm text-white placeholder-lightgray/60 focus:outline-none focus:border-green transition-all w-full ${
            showPasswordToggle ? "pr-10" : ""
          } ${className}`}
          {...props}
        />

        {/* Password Toggle Button */}
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-lightgray/60 hover:text-white transition-colors focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
