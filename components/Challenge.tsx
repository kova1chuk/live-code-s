"use client";

import React from "react";
import Typography from "@/components/ui/Typography";
import SectionBox from "@/components/SectionBox";
import TabsContent, { Tab } from "@/components/TabsContent";
import CodeEditor from "@/components/ui/CodeEditor";
import ExampleCard from "@/components/ExampleCard";
import SolutionDetails from "@/components/SolutionDetails";
import type { Example, Solution, TestCase } from "@/types/challenge";

interface BaseTestRunnerProps {
  testCases: TestCase[];
  code: string;
  onRunTests: () => void;
}

interface ChallengeProps<
  TestRunnerProps extends BaseTestRunnerProps = BaseTestRunnerProps
> {
  title: string;
  description: string;
  examples: Example[];
  testCases: TestCase[];
  solutions: Solution[];
  initialCode: string;
  onCodeChange?: (code: string) => void;
  TestRunner?: React.ComponentType<TestRunnerProps>;
  onExampleClick?: (example: Example) => void;
  customTestComponent?: React.ReactNode;
}

export default function Challenge<
  TestRunnerProps extends BaseTestRunnerProps = BaseTestRunnerProps
>({
  title,
  description,
  examples,
  testCases,
  solutions,
  initialCode,
  onCodeChange,
  TestRunner,
  onExampleClick,
  customTestComponent,
}: ChallengeProps<TestRunnerProps>) {
  const solutionTabs: Tab[] = [
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
    ...(onCodeChange && TestRunner
      ? [
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
                {TestRunner && (
                  <TestRunner
                    {...({
                      testCases,
                      code: initialCode,
                      onRunTests: () => {},
                    } as TestRunnerProps)}
                  />
                )}
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
      <Typography
        variant="h2"
        className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-center"
      >
        {title}
      </Typography>

      <div className="p-8 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
        <Typography className="text-slate-800 dark:text-slate-200 text-lg sm:text-xl leading-relaxed">
          {description}
        </Typography>
      </div>

      <SectionBox title="Examples">
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex flex-col gap-4">
              {examples.map((example, index) => (
                <ExampleCard
                  key={index}
                  index={index}
                  input={example.input}
                  output={example.output}
                  onTryClick={() => onExampleClick?.(example)}
                />
              ))}
            </div>
            {customTestComponent}
          </div>
        </div>
      </SectionBox>

      <SectionBox title="Solution">
        <TabsContent tabs={solutionTabs} />
      </SectionBox>
    </div>
  );
}
