"use client";
import { useState } from "react";
import SectionBox from "@/components/SectionBox";
import ExampleBox from "@/components/ExampleBox";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import List, { ListItem } from "@/components/List";
import CodeBlock from "@/components/CodeBlock";

export default function ReverseString() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const reverseString = (str: string) => {
    return str.split("").reverse().join("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(reverseString(input));
  };

  const jsSolution = `function reverseString(str) {
  return str.split('').reverse().join('');
}`;

  const tsSolution = `function reverseString(str: string): string {
  return str.split('').reverse().join('');
}`;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Typography
        variant="h2"
        className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold"
      >
        Reverse a String
      </Typography>

      <div className="space-y-6 sm:space-y-8">
        <SectionBox title="Problem Description">
          <div className="space-y-4">
            <Typography className="text-base sm:text-lg">
              Write a function that takes a string as input and returns the
              string reversed.
            </Typography>
            <ExampleBox input="hello" output="olleh" />
          </div>
        </SectionBox>

        <SectionBox title="Try it out">
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="max-w-md">
                <Input
                  id="input"
                  label="Enter a string:"
                  value={input}
                  onChange={setInput}
                  placeholder="Enter a string to reverse"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Reverse
              </Button>
            </form>
            {result && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Result:
                </Typography>
                <Typography className="text-base sm:text-lg break-all">
                  {result}
                </Typography>
              </div>
            )}
          </div>
        </SectionBox>

        <SectionBox title="Solution">
          <div className="space-y-6">
            <div className="space-y-4">
              <CodeBlock jsCode={jsSolution} tsCode={tsSolution} />
            </div>
            <div className="space-y-4">
              <Typography variant="h3" className="text-lg font-semibold">
                Explanation:
              </Typography>
              <List type="ordered" className="space-y-2">
                <ListItem>
                  Split the string into an array of characters using{" "}
                  <Typography variant="code">split(&apos;&apos;)</Typography>
                </ListItem>
                <ListItem>
                  Reverse the array using{" "}
                  <Typography variant="code">reverse()</Typography>
                </ListItem>
                <ListItem>
                  Join the array back into a string using{" "}
                  <Typography variant="code">join(&apos;&apos;)</Typography>
                </ListItem>
              </List>
            </div>
          </div>
        </SectionBox>
      </div>
    </div>
  );
}
