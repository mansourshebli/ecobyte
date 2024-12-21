import { TreeDeciduous, Mountain, TrendingUp, Bot, BarChart3, Leaf } from 'lucide-react';

export const stats = [
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

export const demos = [
  {
    id: 'nova',
    title: 'Nova AI Assistant',
    description: 'Your intelligent companion for environmental insights, offering real-time guidance and sustainable recommendations.',
    icon: Bot,
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
  },
];