type DifficultyLevel = "Easy" | "Medium" | "Hard";

interface DifficultyBadgeProps {
  difficulty: DifficultyLevel;
  className?: string;
}

const difficultyStyles = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Medium:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default function DifficultyBadge({
  difficulty,
  className = "",
}: DifficultyBadgeProps) {
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded ${difficultyStyles[difficulty]} ${className}`}
    >
      {difficulty}
    </span>
  );
}
