"use client";
import { useState } from "react";
import SectionBox from "@/components/SectionBox";
import Typography from "@/components/Typography";
import Input from "@/components/Input";
import Button from "@/components/Button";
import List, { ListItem } from "@/components/List";
import CodeBlock from "@/components/CodeBlock";
import ExampleRow from "@/components/ExampleRow";

export default function GroupAnagrams() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string[][]>([]);
  const [examples] = useState([
    {
      input: "eat, tea, tan, ate, nat, bat",
      output: '[ ["eat", "tea", "ate"], ["tan", "nat"], ["bat"] ]',
    },
    {
      input: "listen, silent, enlist, google, goolge",
      output: '[ ["listen", "silent", "enlist"], ["google", "goolge"] ]',
    },
  ]);

  const groupAnagrams = (strs: string[]) => {
    const groups = new Map<string, string[]>();
    for (const str of strs) {
      const sorted = str.split("").sort().join("");
      if (!groups.has(sorted)) {
        groups.set(sorted, []);
      }
      groups.get(sorted)!.push(str);
    }
    return Array.from(groups.values());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const words = input.split(",").map((word) => word.trim());
    setResult(groupAnagrams(words));
  };

  const handleExampleClick = (example: { input: string }) => {
    setInput(example.input);
    setResult([]);
  };

  const jsSolution = `function groupAnagrams(strs) {
  const groups = new Map();
  for (const str of strs) {
    const sorted = str.split('').sort().join('');
    if (!groups.has(sorted)) {
      groups.set(sorted, []);
    }
    groups.get(sorted).push(str);
  }
  return Array.from(groups.values());
}`;

  const tsSolution = `function groupAnagrams(strs: string[]): string[][] {
  const groups = new Map<string, string[]>();
  for (const str of strs) {
    const sorted = str.split('').sort().join('');
    if (!groups.has(sorted)) {
      groups.set(sorted, []);
    }
    groups.get(sorted)!.push(str);
  }
  return Array.from(groups.values());
}`;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Typography
        variant="h2"
        className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold"
      >
        Group Anagrams
      </Typography>
      <div className="space-y-6 sm:space-y-8">
        <SectionBox title="Problem Description">
          <div className="space-y-4">
            <Typography className="text-base sm:text-lg">
              Given an array of strings, group the anagrams together. An anagram
              is a word or phrase formed by rearranging the letters of a
              different word or phrase.
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
              <div className="max-w-xl">
                <Input
                  id="input"
                  label="Enter words (comma-separated):"
                  value={input}
                  onChange={setInput}
                  placeholder="eat, tea, tan, ate, nat, bat"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Group Anagrams
              </Button>
            </form>
            {result.length > 0 && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Result:
                </Typography>
                <div className="space-y-2">
                  {result.map((group, index) => (
                    <div
                      key={index}
                      className="p-2 bg-white dark:bg-gray-800 rounded"
                    >
                      Group {index + 1}: [
                      {group.map((word, i) => (
                        <span key={i} className="inline-block mx-1 font-mono">
                          {word}
                        </span>
                      ))}
                      ]
                    </div>
                  ))}
                </div>
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
                <ListItem>Create a Map to store groups of anagrams</ListItem>
                <ListItem>
                  For each string:
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>Sort its characters to create a key</ListItem>
                    <ListItem>
                      Add the string to the corresponding group in the Map
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Convert the Map values to an array and return
                </ListItem>
              </List>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Time & Space Complexity:
                </Typography>
                <List type="unordered" className="space-y-1">
                  <ListItem>
                    <Typography variant="code">
                      Time Complexity: O(n * k log k)
                    </Typography>{" "}
                    - n = number of words, k = max word length
                  </ListItem>
                  <ListItem>
                    <Typography variant="code">
                      Space Complexity: O(n)
                    </Typography>{" "}
                    - For storing the groups
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
