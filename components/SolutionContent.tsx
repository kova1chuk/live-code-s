import React from "react";
import CodeBlock from "@/components/ui/CodeBlock";
import InfoSection from "@/components/ui/InfoSection";

interface SolutionContentProps {
  howItWorks: string[];
  advantages: string[];
  disadvantages: string[];
  jsCode: string;
  tsCode: string;
}

export default function SolutionContent({
  howItWorks,
  advantages,
  disadvantages,
  jsCode,
  tsCode,
}: SolutionContentProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <CodeBlock jsCode={jsCode} tsCode={tsCode} />
        <InfoSection title="How it works:" items={howItWorks} variant="info" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoSection
            title="Advantages:"
            items={advantages}
            variant="success"
          />
          <InfoSection
            title="Disadvantages:"
            items={disadvantages}
            variant="warning"
          />
        </div>
      </div>
    </div>
  );
}
