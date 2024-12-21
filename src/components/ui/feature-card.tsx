import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  name?: string;
  description: string;
  color: string;
  gradient: string;
  index: number;
  isLoaded: boolean;
}

export function FeatureCard({
  icon: Icon,
  title,
  name,
  description,
  gradient,
  index,
  isLoaded,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'group relative h-[280px] w-full overflow-hidden rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900',
        'opacity-0 transition-all duration-500',
        isLoaded && 'opacity-100 translate-y-0'
      )}
      style={{
        transitionDelay: `${150 * index}ms`,
      }}
    >
      {/* Gradient background effect */}
      <div
        className={cn(
          'absolute right-0 top-0 h-64 w-64 -translate-y-32 translate-x-32 transform rounded-full bg-gradient-to-br opacity-25 blur-2xl transition-all duration-500 group-hover:opacity-40',
          gradient
        )}
      />

      <div className="relative z-10 h-full flex flex-col">
        <div
          className={cn(
            'flex h-14 w-14 items-center justify-center rounded-2xl',
            'bg-gradient-to-br shadow-lg',
            gradient
          )}
        >
          <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
        </div>

        <div className="mt-6 flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          {name && (
            <span className="mt-1 font-caveat text-lg text-emerald-600 dark:text-emerald-400">
              {name}
            </span>
          )}
          <p className="mt-4 text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </div>

      <div
        className={cn(
          'absolute right-0 top-0 h-full w-full bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-[0.08]',
          gradient
        )}
      />
    </div>
  );
}