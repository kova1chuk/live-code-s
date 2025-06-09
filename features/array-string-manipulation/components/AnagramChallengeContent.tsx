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

interface AnagramTestCase {
  input: [string, string];
  expected: boolean;
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

interface AnagramChallengeContentProps {
  title: string;
  description: string;
  examples: Example[];
  testCases: AnagramTestCase[];
  solutions: Solution[];
  initialCode: string;
  onCodeChange: (code: string) => void;
  TestRunner: React.ComponentType<{
    testCases: AnagramTestCase[];
    code: string;
    onRunTests: () => void;
  }>;
  input1Value: string;
  input2Value: string;
  onInput1Change: (value: string) => void;
  onInput2Change: (value: string) => void;
  onInputSubmit: (e: React.FormEvent) => void;
  result: string;
  onExampleClick: (example: Example) => void;
  input1Label?: string;
  input2Label?: string;
  input1Placeholder?: string;
  input2Placeholder?: string;
  submitButtonText?: string;
}

export default function AnagramChallengeContent({
  title,
  description,
  examples,
  testCases,
  solutions,
  initialCode,
  onCodeChange,
  TestRunner,
  input1Value,
  input2Value,
  onInput1Change,
  onInput2Change,
  onInputSubmit,
  result,
  onExampleClick,
  input1Label = "Enter first string:",
  input2Label = "Enter second string:",
  input1Placeholder = "Enter first string",
  input2Placeholder = "Enter second string",
  submitButtonText = "Check Anagram",
}: AnagramChallengeContentProps) {
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
                        htmlFor="input1"
                        className="block text-sm font-medium text-slate-300"
                      >
                        {input1Label}
                      </label>
                      <div className="relative group">
                        <input
                          id="input1"
                          type="text"
                          value={input1Value}
                          onChange={(e) => onInput1Change(e.target.value)}
                          placeholder={input1Placeholder}
                          className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-600/50 focus:border-blue-500/50 rounded-lg shadow-sm text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="input2"
                        className="block text-sm font-medium text-slate-300"
                      >
                        {input2Label}
                      </label>
                      <div className="relative group">
                        <input
                          id="input2"
                          type="text"
                          value={input2Value}
                          onChange={(e) => onInput2Change(e.target.value)}
                          placeholder={input2Placeholder}
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
                {result && (
                  <div className="mt-6 p-4 bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-600/50">
                    <div className="flex items-center gap-3">
                      {result === "true" ? (
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                          <svg
                            className="w-5 h-5 text-emerald-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="p-2 bg-rose-500/10 rounded-lg">
                          <svg
                            className="w-5 h-5 text-rose-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      )}
                      <Typography className="text-lg font-medium text-slate-200">
                        {result === "true"
                          ? "Yes, they are anagrams!"
                          : "No, they are not anagrams."}
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
