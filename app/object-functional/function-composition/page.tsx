'use client';
import { useState } from 'react';

export default function FunctionComposition() {
  const [input, setInput] = useState<string>('5');
  const [result, setResult] = useState<string>('');
  const [explanation, setExplanation] = useState<string[]>([]);

  const compose = (...functions: Function[]): Function => {
    const steps: string[] = [];
    steps.push('Starting function composition implementation');

    return (initialValue: any) => {
      steps.push(`Initial value: ${initialValue}`);
      return functions.reduceRight((value, func, index) => {
        const result = func(value);
        steps.push(`Function ${index + 1} result: ${result}`);
        return result;
      }, initialValue);
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult('');
    setExplanation([]);
    
    try {
      const num = Number(input);
      if (isNaN(num)) {
        throw new Error('Please enter a valid number');
      }

      // Example functions
      const addOne = (x: number) => x + 1;
      const double = (x: number) => x * 2;
      const square = (x: number) => x * x;
      const subtractThree = (x: number) => x - 3;

      // Create composed function
      const composedFunction = compose(
        subtractThree,
        square,
        double,
        addOne
      );

      const finalResult = composedFunction(num);
      setResult(JSON.stringify({
        input: num,
        functions: ['addOne', 'double', 'square', 'subtractThree'],
        result: finalResult,
        stepByStep: explanation
      }, null, 2));
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Implement Function Composition</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Implement a function that composes multiple functions into a single function.
              The composed function should execute the functions from right to left,
              passing the result of each function as the argument to the next function.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Functions: addOne, double, square, subtractThree</p>
              <p>Input: 5</p>
              <p>Output: subtractThree(square(double(addOne(5))))</p>
              <p className="mt-2">Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Right-to-left execution</li>
                <li>Arbitrary number of functions</li>
                <li>Type safety</li>
                <li>Step-by-step tracking</li>
              </ul>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="input" className="block mb-2">Input Number:</label>
                <input
                  type="number"
                  id="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="5"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Compose Functions
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
              <code>{`function compose(...functions: Function[]): Function {
  return (initialValue: any) => {
    return functions.reduceRight((value, func) => {
      return func(value);
    }, initialValue);
  };
}

// Example usage:
const addOne = (x: number) => x + 1;
const double = (x: number) => x * 2;
const square = (x: number) => x * x;
const subtractThree = (x: number) => x - 3;

const composedFunction = compose(
  subtractThree,
  square,
  double,
  addOne
);

// For input 5:
// addOne(5) = 6
// double(6) = 12
// square(12) = 144
// subtractThree(144) = 141`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Implementation Approach:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Rest parameters</li>
                    <li>Reduce right</li>
                    <li>Function chaining</li>
                    <li>Value passing</li>
                  </ul>
                </li>
                <li>Key Features:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Right-to-left execution</li>
                    <li>Flexible composition</li>
                    <li>Type safety</li>
                    <li>Pure functions</li>
                  </ul>
                </li>
                <li>Time Complexity: O(n) where n is the number of functions to compose</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 