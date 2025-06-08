import ExampleBox from "./ExampleBox";
import Button from "./Button";

interface ExampleRowProps {
  input: string;
  output: string;
  buttonLabel?: string;
  onClick?: () => void;
}

export default function ExampleRow({
  input,
  output,
  buttonLabel = "Try this",
  onClick,
}: ExampleRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <div className="flex-1">
        <ExampleBox input={input} output={output} />
      </div>
      <Button onClick={onClick} className="text-sm px-4 py-2 w-full sm:w-auto">
        {buttonLabel}
      </Button>
    </div>
  );
}
