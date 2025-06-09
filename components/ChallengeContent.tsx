import React from "react";
import Typography from "@/components/Typography";
import SectionBox from "@/components/SectionBox";
import TabsContent from "@/components/TabsContent";
import CodeEditor from "@/components/CodeEditor";
import ExampleCard from "@/components/ExampleCard";
import InputForm from "@/components/InputForm";
import SolutionDetails from "@/components/SolutionDetails";

interface Example {
  input: string;
  output: string;
}

interface TestCase {
  input: string;
  expected: string;
  description?: string;
}

interface Solution {
  id: string;
  label: string;
  description: string;
  complexity: {
    time: string;
    space: string;
  };
  howItWorks: string[];
  advantages: string[];
  disadvantages: string[];
  jsCode: string;
  tsCode: string;
}

interface ChallengeContentProps {
  title: string;
  description: string;
  examples: Example[];
  testCases: TestCase[];
  solutions: Solution[];
  initialCode: string;
  onCodeChange: (code: string) => void;
  TestRunner: React.ComponentType<{
    testCases: TestCase[];
    code: string;
    onRunTests: () => void;
  }>;
  inputValue: string;
  onInputChange: (value: string) => void;
  onInputSubmit: (e: React.FormEvent) => void;
  result: string;
  onExampleClick: (example: Example) => void;
  inputLabel?: string;
  inputPlaceholder?: string;
  submitButtonText?: string;
}

export default function ChallengeContent({
  title,
  description,
  examples,
  testCases,
  solutions,
  initialCode,
  onCodeChange,
  TestRunner,
  inputValue,
  onInputChange,
  onInputSubmit,
  result,
  onExampleClick,
  inputLabel = "Enter input:",
  inputPlaceholder = "Enter your input",
  submitButtonText = "Submit",
}: ChallengeContentProps) {
  const solutionTabs = [
    ...solutions.map((solution) => ({
      id: solution.id,
      label: solution.label,
      content: (
        <SolutionDetails
          title={solution.description}
          complexity={solution.complexity}
          code={solution.jsCode}
          tsCode={solution.tsCode}
          howItWorks={solution.howItWorks}
          advantages={solution.advantages}
          disadvantages={solution.disadvantages}
        />
      ),
    })),
    {
      id: "try",
      label: "Try Yourself",
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <Typography className="text-base sm:text-lg">
              Write your own implementation:
            </Typography>
            <CodeEditor
              defaultValue={initialCode}
              onChange={onCodeChange}
              height="400px"
            />
          </div>
          <TestRunner
            testCases={testCases}
            code={initialCode}
            onRunTests={() => {}}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Typography
        variant="h2"
        className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold"
      >
        {title}
      </Typography>

      <div className="space-y-6 sm:space-y-8">
        <SectionBox title="Problem Description">
          <div className="space-y-4">
            <Typography className="text-base sm:text-lg">
              {description}
            </Typography>
            <div className="space-y-3">
              <Typography variant="h3" className="text-lg font-semibold">
                Examples:
              </Typography>
              <div className="flex flex-col gap-4">
                {examples.map((example, index) => (
                  <ExampleCard
                    key={index}
                    index={index}
                    input={example.input}
                    output={example.output}
                    onTryClick={() => onExampleClick(example)}
                  />
                ))}
              </div>
              <InputForm
                value={inputValue}
                onChange={onInputChange}
                onSubmit={onInputSubmit}
                result={result}
                title="Test with your own input:"
                inputLabel={inputLabel}
                inputPlaceholder={inputPlaceholder}
                submitButtonText={submitButtonText}
                className="mt-8"
              />
            </div>
          </div>
        </SectionBox>

        <SectionBox title="Solution">
          <TabsContent tabs={solutionTabs} />
        </SectionBox>
      </div>
    </div>
  );
}
