"use client";
import React, { useState, useEffect } from "react";
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
  const [showCopied, setShowCopied] = useState(false);
  const activeCode = activeTab === "js" ? jsCode : tsCode;
  const language = activeTab === "js" ? "javascript" : "typescript";

  useEffect(() => {
    if (showCopied) {
      const timer = setTimeout(() => {
        setShowCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showCopied]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(activeCode);
    setShowCopied(true);
  };

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
        <div className="relative">
          <button
            onClick={handleCopy}
            className="px-4 py-2 text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Copy
          </button>
          {showCopied && (
            <div className="absolute right-0 -bottom-8 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
              Copied!
            </div>
          )}
        </div>
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
