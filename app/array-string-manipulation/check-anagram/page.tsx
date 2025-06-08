"use client";
import { useState } from "react";
import SectionBox from "@/components/SectionBox";
import Typography from "@/components/Typography";
import TabsContent from "@/components/TabsContent";
import CodeEditor from "@/components/CodeEditor";
import TestRunner from "@/components/TestRunner";
import SolutionContent from "@/components/SolutionContent";
import data from "@/features/array-string-manipulation/check-anagram/data.json";

export default function CheckAnagram() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState<string>("");
  const [code, setCode] = useState<string>(`function isAnagram(str1, str2) {
  // Write your solution here
  const normalize = str => 
    str.toLowerCase()
       .replace(/[^a-z0-9]/g, '')
       .split('')
       .sort()
       .join('');
  return normalize(str1) === normalize(str2);
}`);

  const [examples] = useState(data.examples);
  const testCases = data.testCases.map((test) => ({
    ...test,
    input: test.input as [string, string],
  }));

  const isAnagram = (str1: string, str2: string) => {
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .split("")
        .sort()
        .join("");
    return normalize(str1) === normalize(str2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(isAnagram(input1, input2).toString());
  };

  const handleExampleClick = (example: { input: string; output: string }) => {
    const [str1, str2] = example.input.split(",").map((s) => s.trim());
    setInput1(str1);
    setInput2(str2);
    setResult(example.output);
  };

  const solutionTabs = [
    ...data.solutions.map((solution) => ({
      ...solution,
      content: (
        <SolutionContent
          howItWorks={solution.howItWorks}
          advantages={solution.advantages}
          disadvantages={solution.disadvantages}
          jsCode={solution.jsCode}
          tsCode={solution.tsCode}
        />
      ),
    })),
    {
      id: "try",
      label: "Try Yourself",
      description:
        "Write your own implementation of the anagram checker function",
      complexity: {
        time: "N/A",
        space: "N/A",
      },
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <Typography className="text-base sm:text-lg">
              Write your own implementation of the anagram checker function:
            </Typography>
            <CodeEditor defaultValue={code} onChange={setCode} height="400px" />
          </div>
          <TestRunner testCases={testCases} code={code} onRunTests={() => {}} />
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
        Check for Anagram
      </Typography>

      <div className="space-y-6 sm:space-y-8">
        <SectionBox title="Problem Description">
          <div className="space-y-4">
            <Typography className="text-base sm:text-lg">
              Write a function that determines if two strings are anagrams of
              each other. An anagram is a word or phrase formed by rearranging
              the letters of another. The function should be case-insensitive
              and ignore spaces and punctuation.
            </Typography>
            <div className="space-y-3">
              <Typography variant="h3" className="text-lg font-semibold">
                Examples:
              </Typography>
              <div className="flex flex-col gap-4">
                {examples.map((example, index) => (
                  <div
                    key={index}
                    className="group bg-slate-50/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                            <svg
                              className="w-4 h-4 text-slate-600 dark:text-slate-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            Example {index + 1}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                              Input:
                            </span>
                            <code className="px-2 py-1 bg-white dark:bg-slate-800 rounded-md text-sm font-mono text-slate-800 dark:text-slate-200">
                              {example.input}
                            </code>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                              Output:
                            </span>
                            <code
                              className={`px-2 py-1 rounded-md text-sm font-mono ${
                                example.output === "true"
                                  ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                                  : "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300"
                              }`}
                            >
                              {example.output}
                            </code>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleExampleClick(example)}
                        className="ml-4 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors duration-200"
                      >
                        Try this
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-lg p-6">
                <Typography
                  variant="h3"
                  className="text-xl font-medium text-slate-100 mb-6"
                >
                  Test with your own input:
                </Typography>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="max-w-2xl space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="input1"
                        className="block text-sm font-medium text-slate-300"
                      >
                        Enter first string:
                      </label>
                      <div className="relative group">
                        <input
                          id="input1"
                          type="text"
                          value={input1}
                          onChange={(e) => setInput1(e.target.value)}
                          placeholder="Enter first string"
                          className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-600/50 focus:border-blue-500/50 rounded-lg shadow-sm text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="input2"
                        className="block text-sm font-medium text-slate-300"
                      >
                        Enter second string:
                      </label>
                      <div className="relative group">
                        <input
                          id="input2"
                          type="text"
                          value={input2}
                          onChange={(e) => setInput2(e.target.value)}
                          placeholder="Enter second string"
                          className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-600/50 focus:border-blue-500/50 rounded-lg shadow-sm text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 group"
                  >
                    <svg
                      className="w-5 h-5 mr-2 transform group-hover:scale-110 transition-transform duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Check Anagram
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
