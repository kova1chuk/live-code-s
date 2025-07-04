import React, { useState } from "react";
import CustomTestInput from "@/components/CustomTestInput";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface ReverseStringTestInputProps {
  inputLabel?: string;
  inputPlaceholder?: string;
  submitButtonText?: string;
  inputValue?: string;
  setInputValue?: (value: string) => void;
}

export default function ReverseStringTestInput({
  inputLabel,
  inputPlaceholder,
  submitButtonText,
  inputValue,
  setInputValue,
}: ReverseStringTestInputProps) {
  const [internalInput, setInternalInput] = useState("");
  const [result, setResultState] = useState<string | null>(null);

  const input = inputValue !== undefined ? inputValue : internalInput;
  const setInput = setInputValue || setInternalInput;

  const reverseString = (s: string) => {
    const chars = s.split("");
    let left = 0;
    let right = chars.length - 1;

    while (left < right) {
      // Swap characters
      [chars[left], chars[right]] = [chars[right], chars[left]];
      left++;
      right--;
    }

    return chars.join("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!input.trim()) {
        throw new Error("Please enter a string to reverse");
      }
      const reversed = reverseString(input);
      setResultState(reversed);
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
            placeholder={inputPlaceholder}
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
