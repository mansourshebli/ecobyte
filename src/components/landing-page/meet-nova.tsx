import { Bot, Mic, NotebookPen, MessageSquare } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Mic,
    title: 'Voice Interaction',
    description: 'Natural voice commands for seamless environmental guidance',
  },
  {
    icon: NotebookPen,
    title: 'Smart Note-Taking',
    description: 'Capture and organize environmental insights effortlessly',
  },
  {
    icon: MessageSquare,
    title: 'Personalized Assistance',
    description: 'Tailored environmental recommendations and reminders',
  },
];

export function MeetNova() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section
      ref={ref}
      className={cn(
        'relative overflow-hidden bg-gradient-to-b from-white to-emerald-50 opacity-0 transition-all duration-1000 ease-out dark:from-gray-900 dark:to-emerald-950',
        inView && 'translate-y-0 opacity-100'
      )}
    >
      <div className="container relative mx-auto px-4 py-32">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-emerald-200/50 blur-3xl dark:bg-emerald-700/30"></div>
              <div className="relative h-64 w-64 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 p-8 dark:from-emerald-600 dark:to-green-700">
                <Bot className="h-full w-full text-white" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Meet Nova
            </h2>
            <div className="mt-4 font-caveat text-2xl text-emerald-600 dark:text-emerald-400">
              Your voice-enabled environmental companion
            </div>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              Experience a new way of environmental interaction with Nova, your personal voice assistant
              that helps you track, understand, and improve your environmental impact through natural
              conversations and intelligent note-taking.
            </p>

            <div className="mt-12 grid gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group flex items-start gap-4 rounded-xl bg-white/50 p-6 transition-all hover:bg-white/80 dark:bg-gray-900/50 dark:hover:bg-gray-900/80"
                >
                  <div className="rounded-lg bg-emerald-100 p-3 transition-transform group-hover:scale-110 dark:bg-emerald-900">
                    <feature.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}