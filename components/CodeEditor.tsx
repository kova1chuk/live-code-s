"use client";

import { useEffect, useRef, useState } from "react";
import type { OnMount, OnChange } from "@monaco-editor/react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";

interface CodeEditorProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
  language?: "javascript" | "typescript";
  height?: string;
  className?: string;
}

const defaultCode = `function isAnagram(str1, str2) {
  // Write your solution here
  
}`;

export default function CodeEditor({
  defaultValue = defaultCode,
  onChange,
  language = "javascript",
  height = "300px",
  className = "",
}: CodeEditorProps) {
  const [mounted, setMounted] = useState(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleEditorChange: OnChange = (value) => {
    if (onChange && value) {
      onChange(value);
    }
  };

  if (!mounted) {
    return (
      <div
        className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`}
        style={{ height }}
      />
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <Editor
        height={height}
        defaultLanguage={language}
        defaultValue={defaultValue}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
    </div>
  );
}
