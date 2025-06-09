import React from "react";
import Typography from "@/components/Typography";
import SectionBox from "@/components/SectionBox";
import TabsContent from "@/components/TabsContent";
import CodeEditor from "@/components/CodeEditor";
import ExampleCard from "@/components/ExampleCard";
import SolutionDetails from "@/components/SolutionDetails";

interface Example {
  input: string;
  output: string;
}

interface RemoveDuplicatesTestCase {
  input: number[];
  expected: {
    array: number[];
    length: number;
  };
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

interface RemoveDuplicatesChallengeContentProps {
  title: string;
  description: string;
  examples: Example[];
  testCases: RemoveDuplicatesTestCase[];
  solutions: Solution[];
  initialCode: string;
  onCodeChange: (code: string) => void;
  TestRunner: React.ComponentType<{
    testCases: RemoveDuplicatesTestCase[];
    code: string;
    onRunTests: () => void;
  }>;
  inputValue: string;
  onInputChange: (value: string) => void;
  onInputSubmit: (e: React.FormEvent) => void;
  result: { array: number[]; length: number } | null;
  onExampleClick: (example: Example) => void;
  inputLabel?: string;
  inputPlaceholder?: string;
  submitButtonText?: string;
}

export default function RemoveDuplicatesChallengeContent({
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
  inputLabel = "Enter sorted numbers (comma-separated):",
  inputPlaceholder = "e.g. 1,1,2",
  submitButtonText = "Remove Duplicates",
}: RemoveDuplicatesChallengeContentProps) {
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
              <div className="mt-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-lg p-6">
                <Typography
                  variant="h3"
                  className="text-xl font-medium text-slate-100 mb-6"
                >
                  Test with your own input:
                </Typography>
                <form onSubmit={onInputSubmit} className="space-y-6">
                  <div className="max-w-2xl space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="input"
                        className="block text-sm font-medium text-slate-300"
                      >
                        {inputLabel}
                      </label>
                      <div className="relative group">
                        <input
                          id="input"
                          type="text"
                          value={inputValue}
                          onChange={(e) => onInputChange(e.target.value)}
                          placeholder={inputPlaceholder}
                          className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-600/50 focus:border-blue-500/50 rounded-lg shadow-sm text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 group"
                  >
                    {submitButtonText}
                  </button>
                </form>
                {result !== null && (
                  <div className="mt-6 p-4 bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-600/50">
                    <div className="flex items-center gap-3">
                      <Typography className="text-lg font-medium text-slate-200">
                        Result: Array: [{result.array.join(", ")}], Length:{" "}
                        {result.length}
                      </Typography>
                    </div>
                  </div>
                )}
              </div>
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
