import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { TreeDeciduous, Mountain, TrendingUp } from 'lucide-react';

const stats = [
  {
    id: 'trees',
    title: 'Trees Planted',
    value: '1.2M+',
    icon: TreeDeciduous,
    description: 'Through our reforestation initiatives',
    color: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'co2',
    title: 'CO₂ Reduced',
    value: '50K+',
    icon: TrendingUp,
    description: 'Metric tons of CO₂ emissions saved',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 'biodiversity',
    title: 'Species Protected',
    value: '2.5K+',
    icon: Mountain,
    description: 'Endangered species in protected areas',
    color: 'text-orange-600 dark:text-orange-400',
  },
];

export function DataInsights() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section
      ref={ref}
      className={cn(
        'opacity-0 transition-all duration-1000 ease-out dark:bg-transparent',
        inView && 'translate-y-0 opacity-100'
      )}
    >
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-center text-4xl font-bold text-gray-900 dark:text-white">
          Visual Data Insights
        </h2>
        
        <div className="mt-4 text-center font-caveat text-xl text-emerald-600 dark:text-emerald-400">
          Making an impact, one data point at a time
        </div>

        <div className="mt-16">
          <div className="grid gap-8 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="rounded-xl bg-white p-6 shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
              >
                <stat.icon className={cn('h-12 w-12', stat.color)} />
                <div className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {stat.title}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}