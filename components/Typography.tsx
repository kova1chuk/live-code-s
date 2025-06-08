interface TypographyProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "body" | "code";
  className?: string;
}

export default function Typography({
  children,
  variant = "body",
  className = "",
}: TypographyProps) {
  const variants = {
    h1: "text-3xl font-bold mb-8",
    h2: "text-xl font-semibold mb-4",
    h3: "font-semibold mb-2",
    body: "text-base",
    code: "font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded",
  };

  const Component = variant.startsWith("h") ? variant : "p";

  return (
    <Component className={`${variants[variant]} ${className}`}>
      {children}
    </Component>
  );
}
