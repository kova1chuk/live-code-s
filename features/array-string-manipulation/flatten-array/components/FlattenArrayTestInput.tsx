"use client";

import React, { useState } from "react";
import CustomTestInput from "@/components/CustomTestInput";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface FlattenArrayTestInputProps {
  inputLabel?: string;
  inputPlaceholder?: string;
  submitButtonText?: string;
  inputValue?: string;
  setInputValue?: (value: string) => void;
  onSubmit?: (input: string) => void;
  result?: string | null;
}

export default function FlattenArrayTestInput({
  inputLabel,
  inputPlaceholder,
  submitButtonText,
  inputValue,
  setInputValue,
  onSubmit,
  result,
}: FlattenArrayTestInputProps) {
  const [internalInput, setInternalInput] = useState("");
  const [internalResult, setInternalResult] = useState<string | null>(null);

  const input = inputValue !== undefined ? inputValue : internalInput;
  const setInput = setInputValue || setInternalInput;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!input.trim()) {
        throw new Error("Please enter a nested array");
      }
      // Validate input is a valid array
      const parsed = JSON.parse(input);
      if (!Array.isArray(parsed)) {
        throw new Error("Input must be a valid array");
      }
      if (onSubmit) {
        onSubmit(input);
      } else {
        setInternalResult(JSON.stringify(flattenArray(parsed)));
      }
    } catch (error) {
      if (onSubmit) {
        onSubmit("Invalid input. Please enter a valid array.");
      } else {
        setInternalResult("Invalid input. Please enter a valid array.");
      }
    }
  };

  // Simple flatten function for fallback
  function flattenArray(arr: any[]): any[] {
    return arr.reduce<any[]>((flat, item) => {
      return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
    }, []);
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
            placeholder={inputPlaceholder || "e.g. [1, [2, 3], [4, [5, 6]]]"}
          />
        </div>
      </div>
      <Button type="submit" className="min-w-[120px] mx-auto">
        {submitButtonText || "Flatten Array"}
      </Button>
    </form>
  );

  return <CustomTestInput form={form} result={result ?? internalResult} />;
}
