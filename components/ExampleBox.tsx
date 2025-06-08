interface ExampleBoxProps {
  input: string;
  output: string;
}

export default function ExampleBox({ input, output }: ExampleBoxProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
      <h3 className="font-semibold mb-2">Example:</h3>
      <p>Input: {input}</p>
      <p>Output: {output}</p>
    </div>
  );
}
