import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export function FeatureCard({ title, description, icon: Icon, color, bgColor }: FeatureCardProps) {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl",
      bgColor
    )}>
      <div className="relative">
        <div className={cn(
          'mb-4 inline-flex rounded-lg p-3',
          'bg-white/20 backdrop-blur-sm',
          'group-hover:scale-110 transition-transform'
        )}>
          <Icon className="h-6 w-6 text-white" />
        </div>

        <h3 className="mb-2 text-xl font-semibold text-white">
          {title}
        </h3>
        
        <p className="text-white/80">
          {description}
        </p>
      </div>
    </div>
  );
}