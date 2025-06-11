import React from "react";
import CodeBlock from "@/components/ui/CodeBlock";
import InfoSection from "@/components/ui/InfoSection";
import SectionBox from "@/components/SectionBox";
import ComplexityInfo from "@/components/ComplexityInfo";
import Typography from "@/components/ui/Typography";

interface Complexity {
  time: string;
  space: string;
}

interface SolutionDetailsProps {
  title: string;
  complexity: Complexity;
  code: string;
  tsCode?: string;
  howItWorks: string[];
  advantages: string[];
  disadvantages: string[];
  className?: string;
}

export default function SolutionDetails({
  title,
  complexity,
  code,
  tsCode = "",
  howItWorks,
  advantages,
  disadvantages,
  className = "",
}: SolutionDetailsProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="space-y-6">
        <ComplexityInfo
          time={complexity.time}
          space={complexity.space}
          description={title}
        />
        <CodeBlock jsCode={code} tsCode={tsCode} />
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
