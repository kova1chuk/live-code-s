"use client";
import { useState } from "react";
import SectionBox from "@/components/SectionBox";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import List, { ListItem } from "@/components/List";
import CodeBlock from "@/components/CodeBlock";
import ExampleRow from "@/components/ExampleRow";

export default function CheckAnagram() {
  const [str1, setStr1] = useState("");
  const [str2, setStr2] = useState("");
  const [result, setResult] = useState<boolean | null>(null);
  const [examples] = useState([
    { input: "listen, silent", output: "true" },
    { input: "hello, world", output: "false" },
    { input: "anagram, nag a ram", output: "true" },
  ]);

  const checkAnagram = (str1: string, str2: string) => {
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .split("")
        .sort()
        .join("");
    return normalize(str1) === normalize(str2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(checkAnagram(str1, str2));
  };

  const handleExampleClick = (example: { input: string; output: string }) => {
    const [exStr1, exStr2] = example.input.split(",").map((s) => s.trim());
    setStr1(exStr1);
    setStr2(exStr2);
    setResult(example.output === "true");
  };

  const jsSolution = `function checkAnagram(str1, str2) {
  const normalize = (str) => 
    str.toLowerCase()
       .replace(/[^a-z0-9]/g, '')
       .split('')
       .sort()
       .join('');
  return normalize(str1) === normalize(str2);
}`;

  const tsSolution = `function checkAnagram(str1: string, str2: string): boolean {
  const normalize = (str: string): string => 
    str.toLowerCase()
       .replace(/[^a-z0-9]/g, '')
       .split('')
       .sort()
       .join('');
  return normalize(str1) === normalize(str2);
}`;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Typography
        variant="h2"
        className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold"
      >
        Check for Anagram
      </Typography>

      <div className="space-y-6 sm:space-y-8">
        <SectionBox title="Problem Description">
          <div className="space-y-4">
            <Typography className="text-base sm:text-lg">
              Write a function that checks if two strings are anagrams of each
              other. An anagram is a word or phrase formed by rearranging the
              letters of a different word or phrase.
            </Typography>
            <div className="space-y-3">
              <Typography variant="h3" className="text-lg font-semibold">
                Examples:
              </Typography>
              <div className="flex flex-col gap-4">
                {examples.map((example, index) => (
                  <ExampleRow
                    key={index}
                    input={example.input}
                    output={example.output}
                    onClick={() => handleExampleClick(example)}
                  />
                ))}
              </div>
            </div>
          </div>
        </SectionBox>

        <SectionBox title="Try it out">
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="max-w-md">
                  <Input
                    id="str1"
                    label="First string:"
                    value={str1}
                    onChange={setStr1}
                    placeholder="Enter first string"
                  />
                </div>
                <div className="max-w-md">
                  <Input
                    id="str2"
                    label="Second string:"
                    value={str2}
                    onChange={setStr2}
                    placeholder="Enter second string"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Check Anagram
              </Button>
            </form>
            {result !== null && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Result:
                </Typography>
                <Typography className="text-base sm:text-lg">
                  {result
                    ? "The strings are anagrams!"
                    : "The strings are not anagrams."}
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
                  Create a helper function to normalize strings by:
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>Converting to lowercase</ListItem>
                    <ListItem>Removing non-alphanumeric characters</ListItem>
                    <ListItem>Sorting the characters</ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Compare the normalized versions of both strings
                </ListItem>
              </List>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Time & Space Complexity:
                </Typography>
                <List type="unordered" className="space-y-1">
                  <ListItem>
                    <Typography variant="code">
                      Time Complexity: O(n log n)
                    </Typography>{" "}
                    - Due to sorting
                  </ListItem>
                  <ListItem>
                    <Typography variant="code">
                      Space Complexity: O(n)
                    </Typography>{" "}
                    - For storing the sorted strings
                  </ListItem>
                </List>
              </div>
            </div>
          </div>
        </SectionBox>
      </div>
    </div>
  );
}
