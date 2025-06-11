import React from "react";
import CustomTestInput from "@/components/CustomTestInput";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface ReverseStringTestInputProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onInputSubmit: (e: React.FormEvent) => void;
  result: string | null;
  inputLabel?: string;
  inputPlaceholder?: string;
  submitButtonText?: string;
}

export default function ReverseStringTestInput(
  props: ReverseStringTestInputProps
) {
  const form = (
    <form onSubmit={props.onInputSubmit} className="space-y-6">
      <div className="max-w-2xl space-y-4">
        <div className="space-y-2">
          <Input
            id="input"
            label={props.inputLabel || "Input"}
            type="text"
            value={props.inputValue}
            onChange={props.onInputChange}
            placeholder={props.inputPlaceholder}
          />
        </div>
      </div>
      <Button type="submit" className="min-w-[120px] mx-auto">
        {props.submitButtonText || "Submit"}
      </Button>
    </form>
  );

  return <CustomTestInput form={form} result={props.result} />;
}
