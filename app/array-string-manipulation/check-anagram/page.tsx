"use client";
import { useState } from "react";
import SectionBox from "@/components/SectionBox";
import Typography from "@/components/Typography";
import CodeBlock from "@/components/CodeBlock";
import TabsContent from "@/app/components/TabsContent";
import CodeEditor from "@/app/components/CodeEditor";
import TestRunner from "@/app/components/TestRunner";

interface SolutionContentProps {
  howItWorks: string[];
  advantages: string[];
  disadvantages: string[];
  jsCode: string;
  tsCode: string;
}

interface SolutionTab {
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
  content: React.ReactNode;
}

const SolutionContent: React.FC<SolutionContentProps> = ({
  howItWorks,
  advantages,
  disadvantages,
  jsCode,
  tsCode,
}) => (
  <div className="space-y-6">
    <div className="space-y-6">
      <CodeBlock jsCode={jsCode} tsCode={tsCode} />
      <div className="bg-indigo-900/10 dark:bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-100/20 dark:border-indigo-800/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100/20 dark:bg-indigo-800/30 rounded-lg">
            <svg
              className="w-5 h-5 text-indigo-500 dark:text-indigo-400"
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
          <Typography
            variant="h3"
            className="text-lg font-medium text-indigo-900 dark:text-indigo-100"
          >
            How it works:
          </Typography>
        </div>
        <ul className="list-disc pl-6 space-y-2 text-indigo-900 dark:text-indigo-100 marker:text-indigo-500 dark:marker:text-indigo-400">
          {howItWorks.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-900/10 dark:bg-emerald-900/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-100/20 dark:border-emerald-800/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100/20 dark:bg-emerald-800/30 rounded-lg">
              <svg
                className="w-5 h-5 text-emerald-500 dark:text-emerald-400"
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
            <Typography
              variant="h3"
              className="text-lg font-medium text-emerald-900 dark:text-emerald-100"
            >
              Advantages:
            </Typography>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-emerald-900 dark:text-emerald-100 marker:text-emerald-500 dark:marker:text-emerald-400">
            {advantages.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-rose-900/10 dark:bg-rose-900/30 backdrop-blur-sm rounded-xl p-6 border border-rose-100/20 dark:border-rose-800/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-rose-100/20 dark:bg-rose-800/30 rounded-lg">
              <svg
                className="w-5 h-5 text-rose-500 dark:text-rose-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <Typography
              variant="h3"
              className="text-lg font-medium text-rose-900 dark:text-rose-100"
            >
              Disadvantages:
            </Typography>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-rose-900 dark:text-rose-100 marker:text-rose-500 dark:marker:text-rose-400">
            {disadvantages.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

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

  const [examples] = useState([
    { input: "listen, silent", output: "true" },
    { input: "hello, world", output: "false" },
    { input: "triangle, integral", output: "true" },
    { input: "debit card, bad credit", output: "true" },
    { input: "a gentleman, elegant man", output: "true" },
  ]);

  const testCases = [
    {
      input: ["listen", "silent"] as [string, string],
      expected: true,
      description: "Basic anagram test",
    },
    {
      input: ["hello", "world"] as [string, string],
      expected: false,
      description: "Non-anagram test",
    },
    {
      input: ["debit card", "bad credit"] as [string, string],
      expected: true,
      description: "Phrase with spaces",
    },
    {
      input: ["A gentleman", "Elegant man"] as [string, string],
      expected: true,
      description: "Case-insensitive test",
    },
    {
      input: ["12345", "54321"] as [string, string],
      expected: true,
      description: "Numeric anagram",
    },
    {
      input: ["rail safety", "fairy tales"] as [string, string],
      expected: true,
      description: "Complex phrase test",
    },
  ];

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

  const solutionTabs: SolutionTab[] = [
    {
      id: "sort",
      label: "Sort and Compare",
      description: "Simple but not the most efficient for very long strings",
      complexity: {
        time: "O(n log n)",
        space: "O(n)",
      },
      howItWorks: [
        "Normalize strings by converting to lowercase and removing special characters",
        "Split each string into an array of characters",
        "Sort both character arrays",
        "Join the arrays back into strings",
        "Compare the resulting strings for equality",
      ],
      advantages: [
        "Simple and easy to understand",
        "Works with any character set",
        "Handles repeated characters automatically",
      ],
      disadvantages: [
        "Not the most efficient due to sorting operation",
        "Creates new strings/arrays in memory",
        "Sorting takes O(n log n) time",
      ],
      jsCode: `function isAnagram(str1, str2) {
  // Remove non-alphanumeric and convert to lowercase
  str1 = str1.toLowerCase().replace(/[^a-z0-9]/g, '');
  str2 = str2.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  if (str1.length !== str2.length) return false;
  
  // Sort both strings and compare
  return str1.split('').sort().join('') === str2.split('').sort().join('');
}`,
      tsCode: `function isAnagram(str1: string, str2: string): boolean {
  // Remove non-alphanumeric and convert to lowercase
  str1 = str1.toLowerCase().replace(/[^a-z0-9]/g, '');
  str2 = str2.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  if (str1.length !== str2.length) return false;
  
  // Sort both strings and compare
  return str1.split('').sort().join('') === str2.split('').sort().join('');
}`,
      content: (
        <SolutionContent
          howItWorks={[
            "Normalize strings by converting to lowercase and removing special characters",
            "Split each string into an array of characters",
            "Sort both character arrays",
            "Join the arrays back into strings",
            "Compare the resulting strings for equality",
          ]}
          advantages={[
            "Simple and easy to understand",
            "Works with any character set",
            "Handles repeated characters automatically",
          ]}
          disadvantages={[
            "Not the most efficient due to sorting operation",
            "Creates new strings/arrays in memory",
            "Sorting takes O(n log n) time",
          ]}
          jsCode={`function isAnagram(str1, str2) {
  // Remove non-alphanumeric and convert to lowercase
  str1 = str1.toLowerCase().replace(/[^a-z0-9]/g, '');
  str2 = str2.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  if (str1.length !== str2.length) return false;
  
  // Sort both strings and compare
  return str1.split('').sort().join('') === str2.split('').sort().join('');
}`}
          tsCode={`function isAnagram(str1: string, str2: string): boolean {
  // Remove non-alphanumeric and convert to lowercase
  str1 = str1.toLowerCase().replace(/[^a-z0-9]/g, '');
  str2 = str2.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  if (str1.length !== str2.length) return false;
  
  // Sort both strings and compare
  return str1.split('').sort().join('') === str2.split('').sort().join('');
}`}
        />
      ),
    },
    {
      id: "frequency",
      label: "Character Frequency",
      description:
        "More efficient than sorting, using a Map to count characters",
      complexity: {
        time: "O(n)",
        space: "O(k)",
      },
      howItWorks: [
        "Create a Map to store character frequencies",
        "Increment counters for characters from first string",
        "Decrement counters for characters from second string",
        "Check if all counters are zero at the end",
      ],
      advantages: [
        "Linear time complexity O(n)",
        "Can stop early if lengths don't match",
        "Efficient for strings with many repeated characters",
      ],
      disadvantages: [
        "Uses extra space for the hash map",
        "Space complexity depends on character set size",
      ],
      jsCode: `function isAnagram(str1, str2) {
  // Create a Map to store character frequencies
  const freq1 = new Map();
  const freq2 = new Map();
  
  // Increment counters for characters from first string
  for (let char of str1) {
    freq1.set(char, (freq1.get(char) || 0) + 1);
  }
  
  // Increment counters for characters from second string
  for (let char of str2) {
    freq2.set(char, (freq2.get(char) || 0) + 1);
  }
  
  // Check if all counters are zero at the end
  for (let [char, count] of freq1) {
    if (freq2.get(char) !== count) return false;
  }
  
  return true;
}`,
      tsCode: `function isAnagram(str1: string, str2: string): boolean {
  // Create a Map to store character frequencies
  const freq1 = new Map();
  const freq2 = new Map();
  
  // Increment counters for characters from first string
  for (let char of str1) {
    freq1.set(char, (freq1.get(char) || 0) + 1);
  }
  
  // Increment counters for characters from second string
  for (let char of str2) {
    freq2.set(char, (freq2.get(char) || 0) + 1);
  }
  
  // Check if all counters are zero at the end
  for (let [char, count] of freq1) {
    if (freq2.get(char) !== count) return false;
  }
  
  return true;
}`,
      content: (
        <SolutionContent
          howItWorks={[
            "Create a Map to store character frequencies",
            "Increment counters for characters from first string",
            "Decrement counters for characters from second string",
            "Check if all counters are zero at the end",
          ]}
          advantages={[
            "Linear time complexity O(n)",
            "Can stop early if lengths don't match",
            "Efficient for strings with many repeated characters",
          ]}
          disadvantages={[
            "Uses extra space for the hash map",
            "Space complexity depends on character set size",
          ]}
          jsCode={`function isAnagram(str1, str2) {
  // Create a Map to store character frequencies
  const freq1 = new Map();
  const freq2 = new Map();
  
  // Increment counters for characters from first string
  for (let char of str1) {
    freq1.set(char, (freq1.get(char) || 0) + 1);
  }
  
  // Increment counters for characters from second string
  for (let char of str2) {
    freq2.set(char, (freq2.get(char) || 0) + 1);
  }
  
  // Check if all counters are zero at the end
  for (let [char, count] of freq1) {
    if (freq2.get(char) !== count) return false;
  }
  
  return true;
}`}
          tsCode={`function isAnagram(str1: string, str2: string): boolean {
  // Create a Map to store character frequencies
  const freq1 = new Map();
  const freq2 = new Map();
  
  // Increment counters for characters from first string
  for (let char of str1) {
    freq1.set(char, (freq1.get(char) || 0) + 1);
  }
  
  // Increment counters for characters from second string
  for (let char of str2) {
    freq2.set(char, (freq2.get(char) || 0) + 1);
  }
  
  // Check if all counters are zero at the end
  for (let [char, count] of freq1) {
    if (freq2.get(char) !== count) return false;
  }
  
  return true;
}`}
        />
      ),
    },
    {
      id: "array",
      label: "Array Counter",
      description: "Most memory efficient for ASCII strings",
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
      howItWorks: [
        "Create a fixed array for all possible characters (36 for a-z and 0-9)",
        "Map each character to an array index",
        "Increment/decrement counters in a single pass",
        "Check if all counters are zero",
      ],
      advantages: [
        "Constant space complexity O(1)",
        "Very efficient for ASCII strings",
        "Single pass through the strings",
      ],
      disadvantages: [
        "Limited to specific character sets",
        "Less flexible than hash map approach",
        "May waste space if character set is small",
      ],
      jsCode: `function isAnagram(str1, str2) {
  // Create a fixed array for all possible characters (36 for a-z and 0-9)
  const freq1 = new Array(36).fill(0);
  const freq2 = new Array(36).fill(0);
  
  // Map each character to an array index
  for (let char of str1) {
    freq1[char.charCodeAt(0) - 48]++;
  }
  
  for (let char of str2) {
    freq2[char.charCodeAt(0) - 48]++;
  }
  
  // Increment/decrement counters in a single pass
  for (let i = 0; i < 36; i++) {
    if (freq1[i] !== freq2[i]) return false;
  }
  
  return true;
}`,
      tsCode: `function isAnagram(str1: string, str2: string): boolean {
  // Create a fixed array for all possible characters (36 for a-z and 0-9)
  const freq1 = new Array(36).fill(0);
  const freq2 = new Array(36).fill(0);
  
  // Map each character to an array index
  for (let char of str1) {
    freq1[char.charCodeAt(0) - 48]++;
  }
  
  for (let char of str2) {
    freq2[char.charCodeAt(0) - 48]++;
  }
  
  // Increment/decrement counters in a single pass
  for (let i = 0; i < 36; i++) {
    if (freq1[i] !== freq2[i]) return false;
  }
  
  return true;
}`,
      content: (
        <SolutionContent
          howItWorks={[
            "Create a fixed array for all possible characters (36 for a-z and 0-9)",
            "Map each character to an array index",
            "Increment/decrement counters in a single pass",
            "Check if all counters are zero",
          ]}
          advantages={[
            "Constant space complexity O(1)",
            "Very efficient for ASCII strings",
            "Single pass through the strings",
          ]}
          disadvantages={[
            "Limited to specific character sets",
            "Less flexible than hash map approach",
            "May waste space if character set is small",
          ]}
          jsCode={`function isAnagram(str1, str2) {
  // Create a fixed array for all possible characters (36 for a-z and 0-9)
  const freq1 = new Array(36).fill(0);
  const freq2 = new Array(36).fill(0);
  
  // Map each character to an array index
  for (let char of str1) {
    freq1[char.charCodeAt(0) - 48]++;
  }
  
  for (let char of str2) {
    freq2[char.charCodeAt(0) - 48]++;
  }
  
  // Increment/decrement counters in a single pass
  for (let i = 0; i < 36; i++) {
    if (freq1[i] !== freq2[i]) return false;
  }
  
  return true;
}`}
          tsCode={`function isAnagram(str1: string, str2: string): boolean {
  // Create a fixed array for all possible characters (36 for a-z and 0-9)
  const freq1 = new Array(36).fill(0);
  const freq2 = new Array(36).fill(0);
  
  // Map each character to an array index
  for (let char of str1) {
    freq1[char.charCodeAt(0) - 48]++;
  }
  
  for (let char of str2) {
    freq2[char.charCodeAt(0) - 48]++;
  }
  
  // Increment/decrement counters in a single pass
  for (let i = 0; i < 36; i++) {
    if (freq1[i] !== freq2[i]) return false;
  }
  
  return true;
}`}
        />
      ),
    },
    {
      id: "xor",
      label: "XOR Approach",
      description:
        "Limited use case - only works for single-word anagrams without repeated characters",
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
      howItWorks: [
        "XOR all characters from both strings",
        "If result is 0, each character appeared even number of times",
        "Works because A⊕A = 0 for any value A",
        "All characters must cancel out for anagrams",
      ],
      advantages: [
        "Extremely space efficient (O(1))",
        "Very fast single pass solution",
        "Elegant bitwise operation approach",
      ],
      disadvantages: [
        "Doesn't work with repeated characters",
        "Can give false positives",
        "Very limited use case",
        "Not suitable for most real-world applications",
      ],
      jsCode: `function isAnagram(str1, str2) {
  // XOR all characters from both strings
  let result = 0;
  for (let char of str1) {
    result ^= char.charCodeAt(0);
  }
  for (let char of str2) {
    result ^= char.charCodeAt(0);
  }
  
  // If result is 0, each character appeared even number of times
  return result === 0;
}`,
      tsCode: `function isAnagram(str1: string, str2: string): boolean {
  // XOR all characters from both strings
  let result = 0;
  for (let char of str1) {
    result ^= char.charCodeAt(0);
  }
  for (let char of str2) {
    result ^= char.charCodeAt(0);
  }
  
  // If result is 0, each character appeared even number of times
  return result === 0;
}`,
      content: (
        <SolutionContent
          howItWorks={[
            "XOR all characters from both strings",
            "If result is 0, each character appeared even number of times",
            "Works because A⊕A = 0 for any value A",
            "All characters must cancel out for anagrams",
          ]}
          advantages={[
            "Extremely space efficient (O(1))",
            "Very fast single pass solution",
            "Elegant bitwise operation approach",
          ]}
          disadvantages={[
            "Doesn't work with repeated characters",
            "Can give false positives",
            "Very limited use case",
            "Not suitable for most real-world applications",
          ]}
          jsCode={`function isAnagram(str1, str2) {
  // XOR all characters from both strings
  let result = 0;
  for (let char of str1) {
    result ^= char.charCodeAt(0);
  }
  for (let char of str2) {
    result ^= char.charCodeAt(0);
  }
  
  // If result is 0, each character appeared even number of times
  return result === 0;
}`}
          tsCode={`function isAnagram(str1: string, str2: string): boolean {
  // XOR all characters from both strings
  let result = 0;
  for (let char of str1) {
    result ^= char.charCodeAt(0);
  }
  for (let char of str2) {
    result ^= char.charCodeAt(0);
  }
  
  // If result is 0, each character appeared even number of times
  return result === 0;
}`}
        />
      ),
    },
    {
      id: "try",
      label: "Try Yourself",
      description:
        "Write your own implementation of the anagram checker function",
      complexity: {
        time: "N/A",
        space: "N/A",
      },
      howItWorks: [],
      advantages: [],
      disadvantages: [],
      jsCode: `function isAnagram(str1, str2) {
  // Write your solution here
  const normalize = str => 
    str.toLowerCase()
       .replace(/[^a-z0-9]/g, '')
       .split('')
       .sort()
       .join('');
  return normalize(str1) === normalize(str2);
}`,
      tsCode: `function isAnagram(str1: string, str2: string): boolean {
  // Write your solution here
  const normalize = str => 
    str.toLowerCase()
       .replace(/[^a-z0-9]/g, '')
       .split('')
       .sort()
       .join('');
  return normalize(str1) === normalize(str2);
}`,
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
