"use client";

import React, { useState } from "react";
import CustomTestInput from "@/components/CustomTestInput";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface CheckAnagramTestInputProps {
  inputLabel?: string;
  inputPlaceholder?: string;
  submitButtonText?: string;
  inputValue?: string;
  setInputValue?: (value: string) => void;
}

export default function CheckAnagramTestInput({
  inputLabel,
  inputPlaceholder,
  submitButtonText,
  inputValue,
  setInputValue,
}: CheckAnagramTestInputProps) {
  const [internalInput, setInternalInput] = useState("");
  const [result, setResultState] = useState<string | null>(null);

  const input = inputValue !== undefined ? inputValue : internalInput;
  const setInput = setInputValue || setInternalInput;

  const checkAnagram = (s1: string, s2: string) => {
    if (s1.length !== s2.length) return false;

    const charCount = new Map<string, number>();

    // Count characters in first string
    for (const char of s1.toLowerCase()) {
      charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    // Decrement counts for second string
    for (const char of s2.toLowerCase()) {
      const count = charCount.get(char);
      if (!count) return false;
      charCount.set(char, count - 1);
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!input.trim()) {
        throw new Error("Please enter two strings to check");
      }

      const [str1, str2] = input.split(",").map((s) => s.trim());
      if (!str1 || !str2) {
        throw new Error("Please enter two strings separated by a comma");
      }

      const isAnagram = checkAnagram(str1, str2);
      setResultState(
        isAnagram ? "The strings are anagrams" : "The strings are not anagrams"
      );
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    setResultState(null);
  };

  const form = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="max-w-2xl space-y-4">
        <div className="space-y-2">
          <Input
            id="input"
            label={inputLabel || "Input"}
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder={
              inputPlaceholder ||
              "Enter two strings separated by a comma (e.g., 'listen, silent')"
            }
          />
        </div>
      </div>
      <Button type="submit" className="min-w-[120px] mx-auto">
        {submitButtonText || "Submit"}
      </Button>
    </form>
  );

  return <CustomTestInput form={form} result={result} />;
}
