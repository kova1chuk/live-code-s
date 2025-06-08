"use client";

import React from "react";
import Typography from "@/components/Typography";
import Breadcrumb from "@/components/Breadcrumb";
import { usePathname } from "next/navigation";

export default function ArrayStringManipulationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    {
      label: "Array & String Manipulation",
      href: "/array-string-manipulation",
    },
    ...pathSegments.slice(1).map((segment) => ({
      label: segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      href: undefined,
    })),
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mb-8 mt-4">
          <Typography
            variant="h1"
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            Array & String Manipulation
          </Typography>
          <Typography className="mt-2 text-gray-600 dark:text-gray-300">
            Learn and practice common array and string manipulation techniques
          </Typography>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
