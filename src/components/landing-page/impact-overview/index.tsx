import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Leaf, Recycle, TreeDeciduous, Factory } from 'lucide-react';
import { CounterCard } from './counter-card';

const metrics = [
  {
    icon: Recycle,
    label: 'Waste Processed',
    value: 85000,
    unit: 'kg',
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400',
  },
  {
    icon: Leaf,
    label: 'CO₂ Sequestered',
    value: 40500,
    unit: 'kg',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400',
  },
  {
    icon: TreeDeciduous,
    label: 'Trees Saved',
    value: 1250,
    unit: 'trees',
    color: 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400',
  },
  {
    icon: Factory,
    label: 'Active Installations',
    value: 700,
    unit: 'units',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400',
  },
];

export function ImpactOverview() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section
      ref={ref}
      className={cn(
        'relative overflow-hidden bg-gray-50 py-24 dark:bg-gray-900',
        'opacity-0 transition-all duration-1000 ease-out',
        inView && 'opacity-100'
      )}
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-emerald-400/10 to-blue-400/10 blur-3xl" />
        <div className="absolute right-1/4 top-3/4 h-[25rem] w-[25rem] rounded-full bg-gradient-to-br from-purple-400/10 to-pink-400/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Our goal
          </h2>
          <p className="mx-auto mt-4 font-caveat text-2xl text-emerald-600 dark:text-emerald-400">
            Our 2030 global goals for a better sustainable future
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <CounterCard
              key={metric.label}
              {...metric}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}