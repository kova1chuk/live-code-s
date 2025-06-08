"use client";
import { useState } from "react";
import SectionBox from "@/components/SectionBox";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import List, { ListItem } from "@/components/List";
import CodeBlock from "@/components/CodeBlock";
import ExampleRow from "@/components/ExampleRow";

export default function ReverseString() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [examples] = useState([
    { input: "hello", output: "olleh" },
    { input: "JavaScript", output: "tpircSavaJ" },
    { input: "12345", output: "54321" },
  ]);

  const reverseString = (str: string) => {
    return str.split("").reverse().join("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(reverseString(input));
  };

  const handleExampleClick = (example: { input: string; output: string }) => {
    setInput(example.input);
    setResult(example.output);
  };

  const jsSolution = `// Method 1: Using built-in methods
function reverseString(str) {
  return str.split('').reverse().join('');
}

// Method 2: Using a for loop
function reverseString(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

// Method 3: Using reduce
function reverseString(str) {
  return str.split('').reduce((rev, char) => char + rev, '');
}

// Method 4: Using recursion
function reverseString(str) {
  if (str.length <= 1) return str;
  return reverseString(str.slice(1)) + str[0];
}`;

  const tsSolution = `// Method 1: Using built-in methods
function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

// Method 2: Using a for loop
function reverseString(str: string): string {
  let reversed: string = '';
  for (let i: number = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

// Method 3: Using reduce
function reverseString(str: string): string {
  return str.split('').reduce((rev: string, char: string) => char + rev, '');
}

// Method 4: Using recursion
function reverseString(str: string): string {
  if (str.length <= 1) return str;
  return reverseString(str.slice(1)) + str[0];
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
              string with its characters reversed. The function should maintain
              the order of characters but reverse their sequence.
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
                  Method 1 (Built-in methods):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>
                      Split the string into an array using{" "}
                      <Typography variant="code">
                        split(&apos;&apos;)
                      </Typography>
                    </ListItem>
                    <ListItem>
                      Reverse the array using{" "}
                      <Typography variant="code">reverse()</Typography>
                    </ListItem>
                    <ListItem>
                      Join back into a string using{" "}
                      <Typography variant="code">join(&apos;&apos;)</Typography>
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Method 2 (For loop):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>
                      Iterate through the string from end to start
                    </ListItem>
                    <ListItem>
                      Build new string by appending each character
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Method 3 (Reduce):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>Split string into array of characters</ListItem>
                    <ListItem>
                      Use reduce to prepend each character to result
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Method 4 (Recursion):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>Base case: string of length 0 or 1</ListItem>
                    <ListItem>
                      Recursive case: reverse rest of string + first character
                    </ListItem>
                  </List>
                </ListItem>
              </List>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Time & Space Complexity:
                </Typography>
                <List type="unordered" className="space-y-1">
                  <ListItem>
                    Method 1 (Built-in methods):
                    <List type="unordered" className="ml-4">
                      <ListItem>
                        <Typography variant="code">
                          Time Complexity: O(n)
                        </Typography>{" "}
                        - Need to process each character
                      </ListItem>
                      <ListItem>
                        <Typography variant="code">
                          Space Complexity: O(n)
                        </Typography>{" "}
                        - For creating the array
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    Method 2 (For loop):
                    <List type="unordered" className="ml-4">
                      <ListItem>
                        <Typography variant="code">
                          Time Complexity: O(n)
                        </Typography>{" "}
                        - Single pass through string
                      </ListItem>
                      <ListItem>
                        <Typography variant="code">
                          Space Complexity: O(n)
                        </Typography>{" "}
                        - For the new string
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    Method 3 (Reduce) and Method 4 (Recursion):
                    <List type="unordered" className="ml-4">
                      <ListItem>
                        <Typography variant="code">
                          Time Complexity: O(n)
                        </Typography>{" "}
                        - Process each character once
                      </ListItem>
                      <ListItem>
                        <Typography variant="code">
                          Space Complexity: O(n)
                        </Typography>{" "}
                        - For recursion stack/new string
                      </ListItem>
                    </List>
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
