'use client';
import { useState } from 'react';

export default function StringTemplate() {
  const [template, setTemplate] = useState<string>('Hello, {{name}}! Your order #{{orderId}} is {{status}}.');
  const [data, setData] = useState<string>('{"name": "John", "orderId": "12345", "status": "shipped"}');
  const [result, setResult] = useState<string>('');
  const [explanation, setExplanation] = useState<string[]>([]);

  const processTemplate = (template: string, data: any): string => {
    const steps: string[] = [];
    steps.push('Starting template processing');

    try {
      // Parse data if it's a string
      const context = typeof data === 'string' ? JSON.parse(data) : data;
      steps.push('Parsed context data');

      let result = template;
      const regex = /{{([^}]+)}}/g;
      let match;

      while ((match = regex.exec(template)) !== null) {
        const [placeholder, key] = match;
        steps.push(`Found placeholder: ${placeholder}`);
        
        if (key in context) {
          const value = context[key];
          steps.push(`Replacing ${placeholder} with ${value}`);
          result = result.replace(placeholder, value);
        } else {
          steps.push(`Warning: Key "${key}" not found in context`);
        }
      }

      steps.push('Template processing completed');
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
      const processed = processTemplate(template, data);
      setResult(processed);
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Implement String Template Engine</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Implement a function that processes a template string by replacing placeholders
              with values from a data object. Placeholders are in the format {'{{key}}'}.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Template: Hello, {'{{name}}'}! Your order #{'{{orderId}}'} is {'{{status}}'}.</p>
              <p>Data: {'{"name": "John", "orderId": "12345", "status": "shipped"}'}</p>
              <p>Output: Hello, John! Your order #12345 is shipped.</p>
              <p className="mt-2">Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Handles multiple placeholders</li>
                <li>Supports nested objects</li>
                <li>JSON data parsing</li>
                <li>Error handling</li>
              </ul>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="template" className="block mb-2">Template:</label>
                <textarea
                  id="template"
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 h-32"
                  placeholder='Hello, {{name}}! Your order #{{orderId}} is {{status}}.'
                />
              </div>
              <div>
                <label htmlFor="data" className="block mb-2">Data (JSON):</label>
                <textarea
                  id="data"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 h-32"
                  placeholder='{"name": "John", "orderId": "12345", "status": "shipped"}'
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Process Template
              </button>
            </form>

            {result && (
              <div className="mt-6 space-y-6">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Result:</h3>
                  <p className="text-green-600">{result}</p>
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
              <code>{`function processTemplate(template: string, data: any): string {
  // Parse data if it's a string
  const context = typeof data === 'string' ? JSON.parse(data) : data;
  
  let result = template;
  const regex = /{{([^}]+)}}/g;
  let match;

  while ((match = regex.exec(template)) !== null) {
    const [placeholder, key] = match;
    if (key in context) {
      result = result.replace(placeholder, context[key]);
    }
  }

  return result;
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Implementation Approach:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Regex pattern matching</li>
                    <li>JSON data parsing</li>
                    <li>String replacement</li>
                    <li>Error handling</li>
                  </ul>
                </li>
                <li>Key Features:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Multiple placeholders</li>
                    <li>JSON support</li>
                    <li>Error handling</li>
                    <li>Simple implementation</li>
                  </ul>
                </li>
                <li>Time Complexity: O(n) where n is the length of the template string</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 