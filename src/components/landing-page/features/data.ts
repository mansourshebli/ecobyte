import { Bot, ActivitySquare, BarChart3, Sparkles } from 'lucide-react';

export const features = [
  {
    id: 'insights',
    title: 'Nova AI',
    description: 'AI-powered insights and 3D visualization for environmental monitoring and decision making',
    icon: Bot,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-600 dark:bg-emerald-500',
  },
  {
    id: 'monitoring',
    title: 'Real-time Monitoring',
    description: 'Live biochar production monitoring with IoT sensors and 3D model visualization',
    icon: ActivitySquare,
    color: 'text-blue-500',
    bgColor: 'bg-blue-600 dark:bg-blue-500',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Production analytics and carbon offset tracking with detailed insights',
    icon: BarChart3,
    color: 'text-purple-500',
    bgColor: 'bg-purple-600 dark:bg-purple-500',
  },
  {
    id: 'ai-updates',
    title: 'AI Updates',
    description: 'AI-powered waste classification and predictive analytics for optimization',
    icon: Sparkles,
    color: 'text-green-500',
    bgColor: 'bg-green-600 dark:bg-green-500',
  },
];