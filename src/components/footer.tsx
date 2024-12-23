import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import {
  Bot,
  ActivitySquare,
  BarChart3,
  Sparkles,
  Github,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react';

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub', color: 'hover:bg-gray-800 hover:text-white' },
  { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-blue-500 hover:text-white' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700 hover:text-white' },
  { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600 hover:text-white' },
];

const features = [
  { icon: Bot, label: 'Nova AI Assistant' },
  { icon: ActivitySquare, label: 'Live Bin Monitoring' },
  { icon: BarChart3, label: 'Analytics & Insights' },
  { icon: Sparkles, label: 'AI Updates' },
];

export function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <footer
      ref={ref}
      className={cn(
        'relative overflow-hidden border-t border-gray-200 bg-white opacity-0 transition-all duration-1000 ease-out dark:border-gray-800 dark:bg-gray-950',
        inView && 'translate-y-0 opacity-100'
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 h-64 w-64 rounded-full bg-emerald-400/5 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-96 w-96 rounded-full bg-emerald-400/5 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Eco<span className="text-emerald-600 dark:text-emerald-400">Byte</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
            Transforming waste management through IoT technology and AI-driven analytics to optimize 
            biochar production and enhance carbon capture.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all dark:bg-gray-800 dark:text-gray-400",
                    social.color
                  )}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Features</h4>
            <ul className="mt-6 space-y-4">
              {features.map((feature) => (
                <li key={feature.label} className="flex items-center gap-2">
                  <feature.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-gray-600 dark:text-gray-300">{feature.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}