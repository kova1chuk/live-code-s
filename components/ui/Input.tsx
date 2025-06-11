import React from "react";

interface InputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

export default function Input({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-slate-700 dark:text-slate-200 font-medium"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-4 py-2.5
          rounded-xl border
          border-slate-300 dark:border-slate-600
          bg-white dark:bg-slate-800
          text-slate-900 dark:text-slate-100
          placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          shadow-sm
          transition-all duration-200
        `}
        placeholder={placeholder}
      />
    </div>
  );
}
