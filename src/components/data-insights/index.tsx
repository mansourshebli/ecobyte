import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { stats, demos } from './constants';
import { StatsCard } from './stats-card';
import { FeatureDemoCard } from './feature-demo-card';
import { VideoPlayer } from './video-player';

export function DataInsights() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [currentDemo, setCurrentDemo] = useState(0);
  const [expanded, setExpanded] = useState(demos[0].id);

  const handleDemoClick = (index: number) => {
    if (index === currentDemo) return;
    setExpanded(demos[index].id);
    setCurrentDemo(index);
  };

  const handleVideoEnded = () => {
    setCurrentDemo((current) => {
      const nextDemo = (current + 1) % demos.length;
      setExpanded(demos[nextDemo].id);
      return nextDemo;
    });
  };

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
              <StatsCard key={stat.id} {...stat} />
            ))}
          </div>

          <div className="mt-48">
            <h2 className="text-center text-4xl font-bold text-gray-900 dark:text-white">
              Feature Demos
            </h2>
            <div className="mt-4 text-center font-caveat text-xl text-emerald-600 dark:text-emerald-400">
              Experience the future of environmental technology
            </div>
            
            <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.5fr]">
              <div className="flex h-[400px] flex-col gap-4">
                {demos.map((demo, index) => (
                  <FeatureDemoCard
                    key={demo.id}
                    {...demo}
                    isExpanded={expanded === demo.id}
                    isActive={currentDemo === index}
                    onClick={() => handleDemoClick(index)}
                  />
                ))}
              </div>

              <VideoPlayer
                title={demos[currentDemo].title}
                onEnded={handleVideoEnded}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}