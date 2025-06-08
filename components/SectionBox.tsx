import { ReactNode } from "react";

interface SectionBoxProps {
  title: string;
  children: ReactNode;
}

export default function SectionBox({ title, children }: SectionBoxProps) {
  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
}
