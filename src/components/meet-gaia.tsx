import { Bot, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

export function MeetGaia() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section
      ref={ref}
      className={cn(
        'bg-white/50 opacity-0 transition-all duration-1000 ease-out dark:bg-gray-900/50',
        inView && 'translate-y-0 opacity-100'
      )}
    >
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Meet Gaia – Your AI Voice Assistant
          </h2>
          
          <div className="mt-4 font-caveat text-xl text-emerald-600 dark:text-emerald-400">
            Your personal guide to sustainability
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-emerald-200/50 blur-3xl dark:bg-emerald-700/30"></div>
                <div className="relative h-64 w-64 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 p-8 dark:from-emerald-600 dark:to-green-700">
                  <Bot className="h-full w-full text-white" />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Ask Gaia anything about sustainability, environmental conservation,
                or eco-friendly practices. Powered by advanced AI, Gaia provides
                personalized answers and actionable insights.
              </p>
              <Button
                className="group mt-8 w-fit bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                Try Gaia Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}