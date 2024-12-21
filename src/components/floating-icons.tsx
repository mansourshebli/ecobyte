import { 
  Flower,
  Flower2,
  Leaf,
  TreeDeciduous,
  Shell,
  MountainSnow,
  Trees,
  Waves,
  Fish,
  Cloud,
  Sun,
  Droplets,
  Wind,
  Umbrella,
  Globe,
  Recycle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const icons = [
  { Icon: Flower, color: 'text-pink-500' },
  { Icon: Flower2, color: 'text-rose-500' },
  { Icon: Leaf, color: 'text-green-500' },
  { Icon: TreeDeciduous, color: 'text-emerald-600' },
  { Icon: Shell, color: 'text-amber-500' },
  { Icon: MountainSnow, color: 'text-blue-400' },
  { Icon: Trees, color: 'text-green-700' },
  { Icon: Waves, color: 'text-blue-500' },
  { Icon: Fish, color: 'text-cyan-500' },
  { Icon: Cloud, color: 'text-gray-400' },
  { Icon: Sun, color: 'text-amber-500' },
  { Icon: Droplets, color: 'text-blue-400' },
  { Icon: Wind, color: 'text-cyan-500' },
  { Icon: Umbrella, color: 'text-indigo-500' },
  { Icon: Globe, color: 'text-blue-600' },
  { Icon: Recycle, color: 'text-green-500' }
];

export function FloatingIcons() {
  const allIcons = [...icons, ...icons, ...icons, ...icons];
  
  return (
    <div className="relative mx-auto mt-8 h-12 max-w-2xl overflow-hidden rounded-lg border border-gray-200 bg-white/50 shadow-inner dark:border-gray-800 dark:bg-gray-900/50">
      <div className="flex animate-slide gap-8 py-3">
        {allIcons.map((item, index) => {
          const { Icon, color } = item;
          return (
            <div
              key={index}
              className={cn('shrink-0', color)}
            >
              <Icon
                size={20}
                className="transition-transform duration-300 hover:scale-125"
                strokeWidth={1.5}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}