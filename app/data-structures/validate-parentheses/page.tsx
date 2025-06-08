'use client';
import { useState } from 'react';

export default function ValidateParentheses() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ isValid: boolean; explanation: string } | null>(null);

  const validateParentheses = (str: string) => {
    const stack: string[] = [];
    const pairs: { [key: string]: string } = {
      ')': '(',
      '}': '{',
      ']': '['
    };

    for (let char of str) {
      if (char === '(' || char === '{' || char === '[') {
        stack.push(char);
      } else if (char === ')' || char === '}' || char === ']') {
        if (stack.length === 0 || stack.pop() !== pairs[char]) {
          return {
            isValid: false,
            explanation: `Invalid: Closing '${char}' without matching opening bracket`
          };
        }
      }
    }

    if (stack.length > 0) {
      return {
        isValid: false,
        explanation: `Invalid: Unclosed '${stack[stack.length - 1]}'`
      };
    }

    return {
      isValid: true,
      explanation: 'Valid: All parentheses are properly closed'
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(validateParentheses(input));
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Validate Parentheses</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Rules:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Open brackets must be closed by the same type of brackets</li>
                <li>Open brackets must be closed in the correct order</li>
                <li>Every closing bracket has a corresponding opening bracket of the same type</li>
              </ul>
              <h3 className="font-semibold mt-4 mb-2">Examples:</h3>
              <p>Input: "()"</p>
              <p>Output: true</p>
              <p>Input: "()[]{}"</p>
              <p>Output: true</p>
              <p>Input: "(]"</p>
              <p>Output: false</p>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="input" className="block mb-2">Enter a string of parentheses:</label>
                <input
                  type="text"
                  id="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="()[]{}"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Validate
              </button>
            </form>
            {result && (
              <div className={`mt-4 p-4 rounded ${result.isValid ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                <p className="font-semibold">Result:</p>
                <p>{result.explanation}</p>
              </div>
            )}
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
              <code>{`function validateParentheses(str) {
  const stack = [];
  const pairs = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (let char of str) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else if (char === ')' || char === '}' || char === ']') {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Using a Stack:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Push opening brackets onto the stack</li>
                    <li>When encountering a closing bracket, check if it matches the top of the stack</li>
                    <li>If it matches, pop the opening bracket from the stack</li>
                    <li>If it doesn't match or stack is empty, the string is invalid</li>
                  </ul>
                </li>
                <li>Time Complexity: O(n) where n is the length of the string</li>
                <li>Space Complexity: O(n) in worst case when all characters are opening brackets</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 