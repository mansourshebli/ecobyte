import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';
import {
  TreeDeciduous,
  Mountain,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Leaf,
  NotebookPen,
} from 'lucide-react';

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

const demos = [
  {
    id: 'nova',
    title: 'Nova AI Assistant',
    description: 'Your personalized environmental companion with voice interaction and note-taking capabilities.',
    icon: NotebookPen,
  },
  {
    id: 'eco-impact',
    title: 'EcoImpact Analyzer',
    description: 'Advanced analytics to measure and optimize your environmental impact with AI-driven insights.',
    icon: BarChart3,
  },
  {
    id: 'biochar',
    title: 'Biochar Bin IoT',
    description: 'Smart waste management system converting organic waste into biochar, with real-time monitoring.',
    icon: Leaf,
  },
  {
    id: 'biodiversity',
    title: 'Biodiversity Tracker',
    description: 'AI-powered species identification and tracking system for monitoring and protecting endangered wildlife.',
    icon: Mountain,
  }
];

export function DataInsights() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [currentDemo, setCurrentDemo] = useState(0);
  const [expanded, setExpanded] = useState(demos[0].id);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleEnded = () => {
      setCurrentDemo((current) => {
        const nextDemo = (current + 1) % demos.length;
        setExpanded(demos[nextDemo].id);
        return nextDemo;
      });
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // Start playing the video
    video.play().catch(error => {
      console.error('Video playback failed:', error);
    });

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentDemo]);

  const handleDemoClick = (index: number) => {
    if (index === currentDemo) return;
    
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(console.error);
    }
    
    setExpanded(demos[index].id);
    setCurrentDemo(index);
    setProgress(0);
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
              <div
                key={stat.id}
                className="rounded-xl bg-white p-6 shadow-lg transition-transform hover:scale-105 dark:bg-gray-900"
              >
                <stat.icon className={cn('h-12 w-12', stat.color)} />
                <div className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {stat.title}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {stat.description}
                </div>
              </div>
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
                  <div
                    key={demo.id}
                    className={cn(
                      "flex-1 cursor-pointer rounded-lg border bg-white p-4 transition-all dark:bg-gray-900",
                      expanded === demo.id && "ring-2 ring-emerald-500",
                      currentDemo === index && "border-emerald-500"
                    )}
                    onClick={() => handleDemoClick(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <demo.icon className="h-6 w-6 text-emerald-600" />
                        <h4 className="font-semibold">{demo.title}</h4>
                      </div>
                      {expanded === demo.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    {expanded === demo.id && (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {demo.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="relative h-[400px] rounded-lg bg-gray-950 p-4">
                <div className="h-[calc(100%-2rem)] w-full overflow-hidden rounded-lg bg-gray-900">
                  <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                  >
                    <source src="/src/components/myVid.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="mt-4 h-1 w-full rounded-full bg-gray-800">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  {demos[currentDemo].title}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}