import Link from "next/link";
import Typography from "@/components/Typography";
import DifficultyBadge from "@/components/DifficultyBadge";

export interface ChallengeCardProps {
  title: string;
  path: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  className?: string;
}

export default function ChallengeCard({
  title,
  path,
  description,
  difficulty,
  className = "",
}: ChallengeCardProps) {
  return (
    <Link
      href={path}
      className={`group block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${className}`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <Typography
            variant="h3"
            className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
          >
            {title}
          </Typography>
          <DifficultyBadge difficulty={difficulty} />
        </div>
        <Typography className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors">
          {description}
        </Typography>
      </div>
      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/50 border-t dark:border-gray-700">
        <Typography className="text-sm text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform inline-flex items-center">
          Try Challenge
          <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Typography>
      </div>
    </Link>
  );
}
