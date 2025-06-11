import React from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { usePathname } from "next/navigation";
import { SECTION_CONFIGS } from "@/shared/config/challenges";

export default function ChallengeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const section = pathSegments[0];
  const challenge = pathSegments[1];

  const sectionConfig = SECTION_CONFIGS[section] || {
    title: section
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    description: `Practice ${section.split("-").join(" ")} challenges`,
  };

  // If we're in a challenge page, use its title and description
  const pageConfig =
    challenge && sectionConfig.challenges?.[challenge]
      ? sectionConfig.challenges[challenge]
      : sectionConfig;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    {
      label: sectionConfig.title,
      href: `/${section}`,
    },
    ...(challenge
      ? [
          {
            label: pageConfig.title,
            href: undefined,
          },
        ]
      : []),
    ...pathSegments.slice(2).map((segment) => ({
      label: segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      href: undefined,
    })),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mt-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      {children}
    </div>
  );
}
