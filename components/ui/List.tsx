interface ListProps {
  children: React.ReactNode;
  type?: "ordered" | "unordered";
  className?: string;
}

interface ListItemProps {
  children: React.ReactNode;
  className?: string;
}

export function ListItem({ children, className = "" }: ListItemProps) {
  return <li className={`space-y-2 ${className}`}>{children}</li>;
}

export default function List({
  children,
  type = "unordered",
  className = "",
}: ListProps) {
  const listStyles = {
    ordered: "list-decimal list-inside space-y-2",
    unordered: "list-disc list-inside space-y-2",
  };

  const Component = type === "ordered" ? "ol" : "ul";

  return (
    <Component className={`${listStyles[type]} ${className}`}>
      {children}
    </Component>
  );
}
