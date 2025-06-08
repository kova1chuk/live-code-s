'use client';
import { useState } from 'react';

export default function Currying() {
  const [input, setInput] = useState<string>('2,3,4');
  const [result, setResult] = useState<string>('');
  const [explanation, setExplanation] = useState<string[]>([]);

  const curry = (fn: Function): Function => {
    const steps: string[] = [];
    steps.push('Starting currying implementation');

    const arity = fn.length;
    steps.push(`Function arity: ${arity}`);

    const curried = (...args: any[]): any => {
      steps.push(`Received arguments: ${args.join(', ')}`);
      
      if (args.length >= arity) {
        steps.push('All arguments received, executing function');
        return fn(...args);
      }

      steps.push('Partial application, returning new function');
      return (...moreArgs: any[]) => curried(...args, ...moreArgs);
    };

    return curried;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult('');
    setExplanation([]);
    
    try {
      const numbers = input.split(',').map(n => Number(n.trim()));
      if (numbers.some(isNaN)) {
        throw new Error('Please enter valid numbers separated by commas');
      }

      // Example function to curry
      const add = (a: number, b: number, c: number) => a + b + c;
      const curriedAdd = curry(add);

      // Demonstrate different ways of calling the curried function
      const results = {
        'All at once': curriedAdd(numbers[0], numbers[1], numbers[2]),
        'Partial application 1': curriedAdd(numbers[0])(numbers[1], numbers[2]),
        'Partial application 2': curriedAdd(numbers[0], numbers[1])(numbers[2]),
        'Fully curried': curriedAdd(numbers[0])(numbers[1])(numbers[2])
      };

      setResult(JSON.stringify({
        input: numbers,
        results,
        steps: explanation
      }, null, 2));
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Implement Function Currying</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Implement a function that converts a function with multiple arguments into a sequence
              of functions that each take a single argument. This allows for partial application
              of the function.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Function: (a, b, c) ={'>'} a + b + c</p>
              <p>Input: 2, 3, 4</p>
              <p>Output: 9 (can be called as curried(2)(3)(4) or curried(2,3)(4) etc.)</p>
              <p className="mt-2">Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Partial application</li>
                <li>Flexible argument passing</li>
                <li>Function arity preservation</li>
                <li>Step-by-step tracking</li>
              </ul>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="input" className="block mb-2">Input Numbers (comma-separated):</label>
                <input
                  type="text"
                  id="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="2,3,4"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Curry Function
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
                      <p key={`step-${index}`} className="text-sm whitespace-pre-line">{step}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
              <code>{`function curry(fn: Function): Function {
  const arity = fn.length;
  
  const curried = (...args: any[]): any => {
    if (args.length >= arity) {
      return fn(...args);
    }
    return (...moreArgs: any[]) => curried(...args, ...moreArgs);
  };

  return curried;
}

// Example usage:
const add = (a: number, b: number, c: number) => a + b + c;
const curriedAdd = curry(add);

// Different ways to call the curried function:
curriedAdd(2, 3, 4);     // 9
curriedAdd(2)(3, 4);     // 9
curriedAdd(2, 3)(4);     // 9
curriedAdd(2)(3)(4);     // 9`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Implementation Approach:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Function arity detection</li>
                    <li>Argument accumulation</li>
                    <li>Recursive currying</li>
                    <li>Flexible application</li>
                  </ul>
                </li>
                <li>Key Features:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Partial application</li>
                    <li>Multiple argument support</li>
                    <li>Function composition</li>
                    <li>Type safety</li>
                  </ul>
                </li>
                <li>Time Complexity: O(1) for each function call</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 