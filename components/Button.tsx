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
    "px-4 py-2 rounded-md font-medium transition-all duration-200";
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 disabled:bg-gray-300",
    outline:
      "border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/50 disabled:border-gray-300 disabled:text-gray-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${
        disabled ? "cursor-not-allowed opacity-60" : ""
      }`}
    >
      {children}
    </button>
  );
}
