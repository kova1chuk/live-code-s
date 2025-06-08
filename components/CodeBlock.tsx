import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  jsCode: string;
  tsCode: string;
  className?: string;
}

export default function CodeBlock({
  jsCode,
  tsCode,
  className = "",
}: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState<"js" | "ts">("js");
  const activeCode = activeTab === "js" ? jsCode : tsCode;
  const language = activeTab === "js" ? "javascript" : "typescript";

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex border-b border-gray-200 dark:border-gray-600">
        <button
          onClick={() => setActiveTab("js")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "js"
              ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          JavaScript
        </button>
        <button
          onClick={() => setActiveTab("ts")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "ts"
              ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          TypeScript
        </button>
        <div className="flex-1" />
        <button
          onClick={() => navigator.clipboard.writeText(activeCode)}
          className="px-4 py-2 text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Copy
        </button>
      </div>
      <div className="rounded-b overflow-hidden">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: "0 0 0.375rem 0.375rem",
            background: "rgb(30, 30, 30)",
          }}
        >
          {activeCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
