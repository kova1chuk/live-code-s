import React from "react";

interface Example {
  input: string;
  output: string;
}

interface Solution {
  id: string;
  label: string;
  description: string;
  complexity: { time: string; space: string };
  howItWorks: string[];
  advantages: string[];
  disadvantages: string[];
  jsCode: string;
  tsCode: string;
}

interface BinaryTreeChallengeContentProps {
  title: string;
  description: string;
  examples: Example[];
  solutions: Solution[];
  TestRunner?: React.ComponentType<Record<string, unknown>>;
  [key: string]: unknown;
}

const BinaryTreeChallengeContent: React.FC<BinaryTreeChallengeContentProps> = ({
  title,
  description,
  examples,
  solutions,
  TestRunner,
  ...rest
}) => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div className="mb-4 text-lg text-gray-700 dark:text-gray-200">
        {description}
      </div>
      {/* Examples */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Examples</h2>
        <ul className="list-disc pl-6">
          {examples.map((ex, i) => (
            <li key={i} className="mb-1">
              <span className="font-mono">{ex.input}</span> →{" "}
              <span className="font-mono">{ex.output}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Solutions */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Solution</h2>
        {solutions.map((sol) => (
          <div key={sol.id} className="mb-4">
            <div className="font-semibold mb-1">{sol.label}</div>
            <div className="mb-1">{sol.description}</div>
            <div className="mb-1 text-sm text-gray-500">
              Time: {sol.complexity.time} | Space: {sol.complexity.space}
            </div>
            <div className="mb-1">
              <strong>How it works:</strong>
              <ul className="list-disc pl-6">
                {sol.howItWorks.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
            <div className="mb-1">
              <strong>Advantages:</strong> {sol.advantages.join(", ")}
            </div>
            <div className="mb-1">
              <strong>Disadvantages:</strong> {sol.disadvantages.join(", ")}
            </div>
            <div className="mb-1">
              <strong>JavaScript:</strong>
              <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-x-auto">
                <code>{sol.jsCode}</code>
              </pre>
            </div>
            <div className="mb-1">
              <strong>TypeScript:</strong>
              <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-x-auto">
                <code>{sol.tsCode}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
      {/* Test Runner */}
      {TestRunner && <TestRunner {...rest} />}
    </div>
  );
};

export default BinaryTreeChallengeContent;
