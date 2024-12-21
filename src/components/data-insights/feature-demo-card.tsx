import { cn } from '@/lib/utils';
import { LucideIcon, ChevronUp, ChevronDown } from 'lucide-react';

interface FeatureDemoCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isExpanded: boolean;
  isActive: boolean;
  onClick: () => void;
}

export function FeatureDemoCard({
  title,
  description,
  icon: Icon,
  isExpanded,
  isActive,
  onClick,
}: FeatureDemoCardProps) {
  return (
    <div
      className={cn(
        "flex-1 cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-all hover:bg-gray-50 dark:border-gray-700/50 dark:bg-gray-800 dark:hover:bg-gray-700/50",
        isExpanded && "ring-2 ring-emerald-500",
        isActive && "border-emerald-500"
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h4>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        )}
      </div>
      {isExpanded && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      )}
    </div>
  );
}