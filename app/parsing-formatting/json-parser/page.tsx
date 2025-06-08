'use client';
import { useState } from 'react';

export default function JsonParser() {
  const [input, setInput] = useState<string>('{"name": "John", "age": 30, "city": "New York"}');
  const [result, setResult] = useState<string>('');
  const [explanation, setExplanation] = useState<string[]>([]);

  const myJsonParse = (jsonString: string): any => {
    const steps: string[] = [];
    steps.push('Starting JSON parser implementation');

    const parseValue = (str: string, start: number): [any, number] => {
      let i = start;
      while (i < str.length && /\s/.test(str[i])) i++; // Skip whitespace

      if (str[i] === '{') {
        return parseObject(str, i);
      } else if (str[i] === '[') {
        return parseArray(str, i);
      } else if (str[i] === '"') {
        return parseString(str, i);
      } else if (str[i] === 't' && str.slice(i, i + 4) === 'true') {
        return [true, i + 4];
      } else if (str[i] === 'f' && str.slice(i, i + 5) === 'false') {
        return [false, i + 5];
      } else if (str[i] === 'n' && str.slice(i, i + 4) === 'null') {
        return [null, i + 4];
      } else if (/[-0-9]/.test(str[i])) {
        return parseNumber(str, i);
      }
      throw new Error(`Unexpected character at position ${i}: ${str[i]}`);
    };

    const parseObject = (str: string, start: number): [object, number] => {
      const obj: { [key: string]: any } = {};
      let i = start + 1;
      steps.push('Parsing object');

      while (i < str.length) {
        while (i < str.length && /\s/.test(str[i])) i++; // Skip whitespace
        if (str[i] === '}') return [obj, i + 1];

        if (str[i] !== '"') throw new Error(`Expected " at position ${i}`);
        const [key, keyEnd] = parseString(str, i);
        i = keyEnd;

        while (i < str.length && /\s/.test(str[i])) i++; // Skip whitespace
        if (str[i] !== ':') throw new Error(`Expected : at position ${i}`);
        i++;

        const [value, valueEnd] = parseValue(str, i);
        obj[key] = value;
        i = valueEnd;

        while (i < str.length && /\s/.test(str[i])) i++; // Skip whitespace
        if (str[i] === '}') return [obj, i + 1];
        if (str[i] !== ',') throw new Error(`Expected , or } at position ${i}`);
        i++;
      }
      throw new Error('Unexpected end of input');
    };

    const parseArray = (str: string, start: number): [any[], number] => {
      const arr: any[] = [];
      let i = start + 1;
      steps.push('Parsing array');

      while (i < str.length) {
        while (i < str.length && /\s/.test(str[i])) i++; // Skip whitespace
        if (str[i] === ']') return [arr, i + 1];

        const [value, valueEnd] = parseValue(str, i);
        arr.push(value);
        i = valueEnd;

        while (i < str.length && /\s/.test(str[i])) i++; // Skip whitespace
        if (str[i] === ']') return [arr, i + 1];
        if (str[i] !== ',') throw new Error(`Expected , or ] at position ${i}`);
        i++;
      }
      throw new Error('Unexpected end of input');
    };

    const parseString = (str: string, start: number): [string, number] => {
      let result = '';
      let i = start + 1;
      steps.push('Parsing string');

      while (i < str.length) {
        if (str[i] === '"') return [result, i + 1];
        if (str[i] === '\\') {
          i++;
          if (i >= str.length) throw new Error('Unexpected end of input');
          switch (str[i]) {
            case '"': result += '"'; break;
            case '\\': result += '\\'; break;
            case '/': result += '/'; break;
            case 'b': result += '\b'; break;
            case 'f': result += '\f'; break;
            case 'n': result += '\n'; break;
            case 'r': result += '\r'; break;
            case 't': result += '\t'; break;
            default: throw new Error(`Invalid escape sequence at position ${i}`);
          }
        } else {
          result += str[i];
        }
        i++;
      }
      throw new Error('Unexpected end of input');
    };

    const parseNumber = (str: string, start: number): [number, number] => {
      let i = start;
      let numStr = '';
      steps.push('Parsing number');

      if (str[i] === '-') {
        numStr += '-';
        i++;
      }

      while (i < str.length && /[0-9]/.test(str[i])) {
        numStr += str[i];
        i++;
      }

      if (str[i] === '.') {
        numStr += '.';
        i++;
        while (i < str.length && /[0-9]/.test(str[i])) {
          numStr += str[i];
          i++;
        }
      }

      if (str[i] === 'e' || str[i] === 'E') {
        numStr += str[i];
        i++;
        if (str[i] === '+' || str[i] === '-') {
          numStr += str[i];
          i++;
        }
        while (i < str.length && /[0-9]/.test(str[i])) {
          numStr += str[i];
          i++;
        }
      }

      return [Number(numStr), i];
    };

    try {
      const [result, _] = parseValue(jsonString, 0);
      steps.push('Parsing completed successfully');
      setExplanation(steps);
      return result;
    } catch (error: any) {
      steps.push(`Error: ${error.message}`);
      setExplanation(steps);
      throw error;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult('');
    setExplanation([]);
    
    try {
      const parsed = myJsonParse(input);
      setResult(JSON.stringify(parsed, null, 2));
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Implement JSON Parser</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Implement a function that parses a JSON string into a JavaScript object. The parser should
              handle all JSON data types including objects, arrays, strings, numbers, booleans, and null.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: {'{"name": "John", "age": 30, "city": "New York"}'}</p>
              <p>Output: Parsed JavaScript object</p>
              <p className="mt-2">Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Handles all JSON types</li>
                <li>Supports nested structures</li>
                <li>Validates JSON syntax</li>
                <li>Handles escape sequences</li>
              </ul>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="input" className="block mb-2">JSON string:</label>
                <textarea
                  id="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 h-32"
                  placeholder='{"name": "John", "age": 30, "city": "New York"}'
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Parse JSON
              </button>
            </form>

            {result && (
              <div className="mt-6 space-y-6">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Result:</h3>
                  <pre className="whitespace-pre-wrap text-sm">
                    {result}
                  </pre>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Step-by-step Explanation:</h3>
                  <div className="space-y-1">
                    {explanation.map((step, index) => (
                      <p key={index} className="text-sm whitespace-pre-line">{step}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
              <code>{`function myJsonParse(jsonString) {
  const parseValue = (str, start) => {
    let i = start;
    while (i < str.length && /\\s/.test(str[i])) i++;

    if (str[i] === '{') return parseObject(str, i);
    if (str[i] === '[') return parseArray(str, i);
    if (str[i] === '"') return parseString(str, i);
    if (str[i] === 't' && str.slice(i, i + 4) === 'true') return [true, i + 4];
    if (str[i] === 'f' && str.slice(i, i + 5) === 'false') return [false, i + 5];
    if (str[i] === 'n' && str.slice(i, i + 4) === 'null') return [null, i + 4];
    if (/[-0-9]/.test(str[i])) return parseNumber(str, i);
    throw new Error('Unexpected character');
  };

  // ... (other parsing functions)

  const [result, _] = parseValue(jsonString, 0);
  return result;
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Implementation Approach:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Recursive descent parsing</li>
                    <li>Type-specific parsers</li>
                    <li>Whitespace handling</li>
                    <li>Error checking</li>
                  </ul>
                </li>
                <li>Key Features:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Full JSON support</li>
                    <li>Syntax validation</li>
                    <li>Escape sequences</li>
                    <li>Error handling</li>
                  </ul>
                </li>
                <li>Time Complexity: O(n) where n is the length of the JSON string</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 