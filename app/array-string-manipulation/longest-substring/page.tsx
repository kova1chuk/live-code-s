"use client";
import { useState } from "react";
import SectionBox from "@/components/SectionBox";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import List, { ListItem } from "@/components/List";
import CodeBlock from "@/components/CodeBlock";
import ExampleRow from "@/components/ExampleRow";

export default function LongestSubstring() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    length: number;
    substring: string;
  } | null>(null);
  const [examples] = useState([
    { input: "abcabcbb", output: "Length: 3, Substring: 'abc'" },
    { input: "pwwkew", output: "Length: 3, Substring: 'wke'" },
    { input: "bbbbb", output: "Length: 1, Substring: 'b'" },
    { input: "dvdf", output: "Length: 3, Substring: 'vdf'" },
  ]);

  const findLongestSubstring = (str: string) => {
    let maxLength = 0;
    let start = 0;
    let maxStart = 0;
    const charMap = new Map<string, number>();

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (charMap.has(char) && charMap.get(char)! >= start) {
        start = charMap.get(char)! + 1;
      }
      charMap.set(char, i);

      const currentLength = i - start + 1;
      if (currentLength > maxLength) {
        maxLength = currentLength;
        maxStart = start;
      }
    }

    return {
      length: maxLength,
      substring: str.slice(maxStart, maxStart + maxLength),
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(findLongestSubstring(input));
  };

  const handleExampleClick = (example: { input: string; output: string }) => {
    setInput(example.input);
    setResult(findLongestSubstring(example.input));
  };

  const jsSolution = `// Method 1: Using Sliding Window with Map
function findLongestSubstring(str) {
  let maxLength = 0;
  let start = 0;
  let maxStart = 0;
  const charMap = new Map();

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (charMap.has(char) && charMap.get(char) >= start) {
      start = charMap.get(char) + 1;
    }
    charMap.set(char, i);
    
    const currentLength = i - start + 1;
    if (currentLength > maxLength) {
      maxLength = currentLength;
      maxStart = start;
    }
  }

  return {
    length: maxLength,
    substring: str.slice(maxStart, maxStart + maxLength)
  };
}

// Method 2: Using Set (simpler but only returns length)
function lengthOfLongestSubstring(str) {
  const chars = new Set();
  let maxLength = 0;
  let left = 0;
  
  for (let right = 0; right < str.length; right++) {
    while (chars.has(str[right])) {
      chars.delete(str[left]);
      left++;
    }
    chars.add(str[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}

// Method 3: Using Object (alternative to Map)
function findLongestSubstring(str) {
  let maxLength = 0;
  let start = 0;
  let maxStart = 0;
  const charIndex = {};

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char in charIndex && charIndex[char] >= start) {
      start = charIndex[char] + 1;
    }
    charIndex[char] = i;
    
    const currentLength = i - start + 1;
    if (currentLength > maxLength) {
      maxLength = currentLength;
      maxStart = start;
    }
  }

  return {
    length: maxLength,
    substring: str.slice(maxStart, maxStart + maxLength)
  };
}`;

  const tsSolution = `// Method 1: Using Sliding Window with Map
function findLongestSubstring(str: string): { length: number; substring: string } {
  let maxLength = 0;
  let start = 0;
  let maxStart = 0;
  const charMap = new Map<string, number>();

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (charMap.has(char) && charMap.get(char)! >= start) {
      start = charMap.get(char)! + 1;
    }
    charMap.set(char, i);
    
    const currentLength = i - start + 1;
    if (currentLength > maxLength) {
      maxLength = currentLength;
      maxStart = start;
    }
  }

  return {
    length: maxLength,
    substring: str.slice(maxStart, maxStart + maxLength)
  };
}

// Method 2: Using Set (simpler but only returns length)
function lengthOfLongestSubstring(str: string): number {
  const chars = new Set<string>();
  let maxLength = 0;
  let left = 0;
  
  for (let right = 0; right < str.length; right++) {
    while (chars.has(str[right])) {
      chars.delete(str[left]);
      left++;
    }
    chars.add(str[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}

// Method 3: Using Object (alternative to Map)
function findLongestSubstring(str: string): { length: number; substring: string } {
  let maxLength = 0;
  let start = 0;
  let maxStart = 0;
  const charIndex: { [key: string]: number } = {};

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char in charIndex && charIndex[char] >= start) {
      start = charIndex[char] + 1;
    }
    charIndex[char] = i;
    
    const currentLength = i - start + 1;
    if (currentLength > maxLength) {
      maxLength = currentLength;
      maxStart = start;
    }
  }

  return {
    length: maxLength,
    substring: str.slice(maxStart, maxStart + maxLength)
  };
}`;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Typography
        variant="h2"
        className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold"
      >
        Longest Substring Without Repeating Characters
      </Typography>

      <div className="space-y-6 sm:space-y-8">
        <SectionBox title="Problem Description">
          <div className="space-y-4">
            <Typography className="text-base sm:text-lg">
              Given a string, write a function that finds the length of the
              longest substring without repeating characters. The function
              should return both the length of the substring and the substring
              itself. A substring is a contiguous sequence of characters within
              the string.
            </Typography>
            <div className="space-y-2">
              <Typography className="text-base sm:text-lg">
                Key points to consider:
              </Typography>
              <List type="unordered" className="ml-4">
                <ListItem>
                  Characters can be any valid string character (letters,
                  numbers, symbols)
                </ListItem>
                <ListItem>
                  The substring must be continuous (no skipping characters)
                </ListItem>
                <ListItem>
                  Case sensitivity matters (&apos;a&apos; and &apos;A&apos; are
                  different characters)
                </ListItem>
                <ListItem>
                  If multiple substrings have the same maximum length, return
                  the first one found
                </ListItem>
              </List>
            </div>
            <div className="space-y-3">
              <Typography variant="h3" className="text-lg font-semibold">
                Examples with Explanation:
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
                  placeholder="abcabcbb"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Find Longest Substring
              </Button>
            </form>
            {result && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Result:
                </Typography>
                <Typography className="text-base sm:text-lg">
                  Length: {result.length}
                </Typography>
                <Typography className="text-base sm:text-lg break-all">
                  Substring: &quot;{result.substring}&quot;
                </Typography>
              </div>
            )}
          </div>
        </SectionBox>

        <SectionBox title="Solution">
          <div className="space-y-6">
            <div className="space-y-4">
              <Typography className="text-base sm:text-lg">
                This problem can be solved using several approaches, each with
                its own advantages. The key technique used is the &quot;Sliding
                Window&quot; pattern, which maintains a window of valid
                characters that expands and contracts as we process the string.
              </Typography>
              <CodeBlock jsCode={jsSolution} tsCode={tsSolution} />
            </div>
            <div className="space-y-4">
              <Typography variant="h3" className="text-lg font-semibold">
                Detailed Explanation:
              </Typography>
              <List type="ordered" className="space-y-4">
                <ListItem>
                  Method 1 (Sliding Window with Map):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>
                      Uses a sliding window defined by two pointers:
                    </ListItem>
                    <ListItem className="ml-4">
                      start: beginning of current valid substring
                    </ListItem>
                    <ListItem className="ml-4">
                      i: current character being processed
                    </ListItem>
                    <ListItem>
                      The Map stores character → last position mapping
                    </ListItem>
                    <ListItem>When we find a repeating character:</ListItem>
                    <ListItem className="ml-4">
                      1. Check if its last position is within current window
                    </ListItem>
                    <ListItem className="ml-4">
                      2. If yes, move start pointer to position after last
                      occurrence
                    </ListItem>
                    <ListItem className="ml-4">
                      3. Update character&apos;s position in Map
                    </ListItem>
                    <ListItem>Example with &quot;abcabcbb&quot;:</ListItem>
                    <ListItem className="ml-4">
                      1. [a]bc → Map: {`{a→0}`}
                    </ListItem>
                    <ListItem className="ml-4">
                      2. [ab]c → Map: {`{a→0, b→1}`}
                    </ListItem>
                    <ListItem className="ml-4">
                      3. [abc] → Map: {`{a→0, b→1, c→2}`}
                    </ListItem>
                    <ListItem className="ml-4">
                      4. Found &apos;a&apos; again → start new window after
                      previous &apos;a&apos;
                    </ListItem>
                    <ListItem className="ml-4">
                      5. b[ca] → Map: {`{a→3, b→4, c→5}`}
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Method 2 (Using Set):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>
                      Simpler approach using a Set to track unique characters
                    </ListItem>
                    <ListItem>
                      Two pointers: left and right define the window
                    </ListItem>
                    <ListItem>When we find a duplicate:</ListItem>
                    <ListItem className="ml-4">
                      1. Remove characters from left until duplicate is gone
                    </ListItem>
                    <ListItem className="ml-4">
                      2. Add new character to Set
                    </ListItem>
                    <ListItem>Advantages:</ListItem>
                    <ListItem className="ml-4">
                      - Simpler code, easier to understand
                    </ListItem>
                    <ListItem className="ml-4">
                      - Constant time lookups with Set
                    </ListItem>
                    <ListItem>Disadvantages:</ListItem>
                    <ListItem className="ml-4">
                      - Only returns length, not the substring
                    </ListItem>
                    <ListItem className="ml-4">
                      - May need to remove multiple characters
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Method 3 (Using Object):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>
                      Similar to Method 1 but uses a plain object
                    </ListItem>
                    <ListItem>Benefits for ASCII strings:</ListItem>
                    <ListItem className="ml-4">
                      - Faster property access than Map
                    </ListItem>
                    <ListItem className="ml-4">- Less memory overhead</ListItem>
                    <ListItem>When to use:</ListItem>
                    <ListItem className="ml-4">
                      - Known character set (e.g., only letters)
                    </ListItem>
                    <ListItem className="ml-4">
                      - Performance is critical
                    </ListItem>
                    <ListItem className="ml-4">
                      - Memory constraints exist
                    </ListItem>
                  </List>
                </ListItem>
              </List>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Time & Space Complexity Analysis:
                </Typography>
                <List type="unordered" className="space-y-2">
                  <ListItem>
                    Time Complexity Analysis:
                    <List type="unordered" className="ml-4">
                      <ListItem>
                        <Typography variant="code">O(n)</Typography> for all
                        methods:
                        <List type="unordered" className="ml-4">
                          <ListItem>
                            Each character is processed exactly once
                          </ListItem>
                          <ListItem>Map/Set operations are O(1)</ListItem>
                          <ListItem>
                            Window sliding operations are amortized O(1)
                          </ListItem>
                        </List>
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    Space Complexity Analysis:
                    <List type="unordered" className="ml-4">
                      <ListItem>
                        <Typography variant="code">O(min(m, n))</Typography>{" "}
                        where:
                        <List type="unordered" className="ml-4">
                          <ListItem>m = size of character set</ListItem>
                          <ListItem>n = length of input string</ListItem>
                        </List>
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    Special Cases:
                    <List type="unordered" className="ml-4">
                      <ListItem>
                        ASCII strings (128 characters): O(1) space
                      </ListItem>
                      <ListItem>
                        Extended ASCII (256 characters): O(1) space
                      </ListItem>
                      <ListItem>Unicode strings: up to O(n) space</ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    Performance Tips:
                    <List type="unordered" className="ml-4">
                      <ListItem>
                        Use Method 1 (Map) for general purpose/Unicode
                      </ListItem>
                      <ListItem>
                        Use Method 2 (Set) when only length is needed
                      </ListItem>
                      <ListItem>
                        Use Method 3 (Object) for ASCII/small character sets
                      </ListItem>
                    </List>
                  </ListItem>
                </List>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Common Edge Cases:
                </Typography>
                <List type="unordered" className="space-y-1">
                  <ListItem>
                    Empty string: returns {`{ length: 0, substring: "" }`}
                  </ListItem>
                  <ListItem>
                    Single character: returns {`{ length: 1, substring: "x" }`}
                  </ListItem>
                  <ListItem>
                    All same characters: returns first character
                  </ListItem>
                  <ListItem>
                    No repeating characters: returns entire string
                  </ListItem>
                  <ListItem>
                    Special characters/spaces: treat as normal characters
                  </ListItem>
                  <ListItem>
                    Unicode characters: ensure proper character handling
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
