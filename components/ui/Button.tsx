import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md";
  const variantStyles = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 active:scale-95",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 active:scale-95",
    outline:
      "border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/50 active:scale-95",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}
