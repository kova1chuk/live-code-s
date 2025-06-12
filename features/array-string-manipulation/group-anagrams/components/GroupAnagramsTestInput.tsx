"use client";

import React, { useState } from "react";
import CustomTestInput from "@/components/CustomTestInput";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface GroupAnagramsTestInputProps {
  inputLabel?: string;
  inputPlaceholder?: string;
  submitButtonText?: string;
  inputValue?: string;
  setInputValue?: (value: string) => void;
  onSubmit?: (input: string) => void;
  result?: string | null;
}

export default function GroupAnagramsTestInput({
  inputLabel,
  inputPlaceholder,
  submitButtonText,
  inputValue,
  setInputValue,
  onSubmit,
  result,
}: GroupAnagramsTestInputProps) {
  const [internalInput, setInternalInput] = useState("");
  const [internalResult, setInternalResult] = useState<string | null>(null);

  const input = inputValue !== undefined ? inputValue : internalInput;
  const setInput = setInputValue || setInternalInput;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!input.trim()) {
        throw new Error("Please enter comma-separated words");
      }
      const words = input.split(",").map((w) => w.trim());
      if (onSubmit) {
        onSubmit(input);
      } else {
        setInternalResult(JSON.stringify(groupAnagrams(words)));
      }
    } catch {
      if (onSubmit) {
        onSubmit("Invalid input. Please enter comma-separated words.");
      } else {
        setInternalResult("Invalid input. Please enter comma-separated words.");
      }
    }
  };

  function groupAnagrams(strs: string[]): string[][] {
    const groups = new Map<string, string[]>();
    for (const str of strs) {
      const sorted = str.split("").sort().join("");
      if (!groups.has(sorted)) {
        groups.set(sorted, []);
      }
      groups.get(sorted)!.push(str);
    }
    return Array.from(groups.values());
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
            placeholder={
              inputPlaceholder || "e.g. eat, tea, tan, ate, nat, bat"
            }
          />
        </div>
      </div>
      <Button type="submit" className="min-w-[120px] mx-auto">
        {submitButtonText || "Group Anagrams"}
      </Button>
    </form>
  );

  return <CustomTestInput form={form} result={result ?? internalResult} />;
}
