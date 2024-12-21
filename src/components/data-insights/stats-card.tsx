import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  id: string;
  title: string;
  value: string;
  icon: LucideIcon;
  description: string;
  color: string;
}

export function StatsCard({ title, value, icon: Icon, description, color }: StatsCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-lg transition-transform hover:scale-105 dark:bg-gray-800/50 dark:backdrop-blur-sm">
      <Icon className={cn('h-12 w-12', color)} />
      <div className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
        {value}
      </div>
      <div className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </div>
      <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
        {description}
      </div>
    </div>
  );
}