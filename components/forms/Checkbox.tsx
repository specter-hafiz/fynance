import React from "react";

interface CheckboxProps {
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  children: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  checked,
  onChange,
  error,
  children,
}) => {
  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 accent-green mt-0.5"
        />
        <span className="text-xs text-lightgray/80">{children}</span>
      </label>
      {error && <p className="text-red-500 text-xs mt-1 ml-7">{error}</p>}
    </div>
  );
};
