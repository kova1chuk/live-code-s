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
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <Typography variant="h1">Reverse a String</Typography>

        <div className="space-y-8">
          <SectionBox title="Problem Description">
            <Typography className="mb-4">
              Write a function that takes a string as input and returns the
              string reversed.
            </Typography>
            <ExampleBox input="hello" output="olleh" />
          </SectionBox>

          <SectionBox title="Try it out">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="input"
                label="Enter a string:"
                value={input}
                onChange={setInput}
                placeholder="Enter a string to reverse"
              />
              <Button type="submit">Reverse</Button>
            </form>
            {result && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <Typography variant="h3">Result:</Typography>
                <Typography>{result}</Typography>
              </div>
            )}
          </SectionBox>

          <SectionBox title="Solution">
            <div className="space-y-4">
              <CodeBlock jsCode={jsSolution} tsCode={tsSolution} />
            </div>
            <div className="mt-4">
              <Typography variant="h3">Explanation:</Typography>
              <List type="ordered">
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
          </SectionBox>
        </div>
      </main>
    </div>
  );
}
