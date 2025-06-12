"use client";

import React, { useState } from "react";
import CustomTestInput from "@/components/CustomTestInput";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface LongestSubstringTestInputProps {
  inputLabel?: string;
  inputPlaceholder?: string;
  submitButtonText?: string;
  inputValue?: string;
  setInputValue?: (value: string) => void;
  onSubmit?: (input: string) => void;
  result?: string | null;
}

export default function LongestSubstringTestInput({
  inputLabel,
  inputPlaceholder,
  submitButtonText,
  inputValue,
  setInputValue,
  onSubmit,
  result,
}: LongestSubstringTestInputProps) {
  const [internalInput, setInternalInput] = useState("");
  const [internalResult, setInternalResult] = useState<string | null>(null);

  const input = inputValue !== undefined ? inputValue : internalInput;
  const setInput = setInputValue || setInternalInput;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!input.trim()) {
        throw new Error("Please enter a string");
      }
      if (onSubmit) {
        onSubmit(input);
      } else {
        const res = findLongestSubstring(input);
        setInternalResult(
          `Length: ${res.length}, Substring: '${res.substring}'`
        );
      }
    } catch {
      if (onSubmit) {
        onSubmit("Invalid input. Please enter a string.");
      } else {
        setInternalResult("Invalid input. Please enter a string.");
      }
    }
  };

  function findLongestSubstring(str: string): {
    length: number;
    substring: string;
  } {
    let maxLength = 0;
    let start = 0;
    let maxStart = 0;
    const charMap = new Map<string, number>();

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (charMap.has(char) && charMap.get(char)! >= start) {
        start = charMap.get(char)! + 1;
      }
      charMap.set(char, i);

      const currentLength = i - start + 1;
      if (currentLength > maxLength) {
        maxLength = currentLength;
        maxStart = start;
      }
    }

    return {
      length: maxLength,
      substring: str.slice(maxStart, maxStart + maxLength),
    };
  }

  const form = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="max-w-2xl space-y-4">
        <div className="space-y-2">
          <Input
            id="input"
            label={inputLabel || "Input"}
            type="text"
            value={input}
            onChange={setInput}
            placeholder={inputPlaceholder || "e.g. abcabcbb"}
          />
        </div>
      </div>
      <Button type="submit" className="min-w-[120px] mx-auto">
        {submitButtonText || "Find Longest Substring"}
      </Button>
    </form>
  );

  return <CustomTestInput form={form} result={result ?? internalResult} />;
}
