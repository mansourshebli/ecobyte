import { TreeDeciduous, Recycle, Scale } from 'lucide-react';
import { MetricData, ChartData, ImpactData } from './types';

export const metrics: MetricData[] = [
  {
    label: 'Carbon Offset',
    value: '2,020 kg',
    trend: '↑ 15% this month',
    color: 'emerald',
    icon: TreeDeciduous,
  },
  {
    label: 'Waste Processed',
    value: '3,030 kg',
    trend: '↑ 12% this month',
    color: 'blue',
    icon: Recycle,
  },
  {
    label: 'Biochar Produced',
    value: '1,010 kg',
    trend: '↑ 18% this month',
    color: 'orange',
    icon: Scale,
  },
];

export const productionData: ChartData[] = [
  { month: 'Jan', waste: 450, biochar: 150, offset: 300 },
  { month: 'Feb', waste: 420, biochar: 140, offset: 280 },
  { month: 'Mar', waste: 500, biochar: 170, offset: 340 },
  { month: 'Apr', waste: 480, biochar: 160, offset: 320 },
  { month: 'May', waste: 600, biochar: 200, offset: 400 },
  { month: 'Jun', waste: 580, biochar: 190, offset: 380 },
];

export const impactData: ImpactData[] = [
  { name: 'Carbon Sequestered', value: 65, color: '#22c55e' },
  { name: 'Waste Reduced', value: 25, color: '#3b82f6' },
  { name: 'Soil Enhancement', value: 10, color: '#f59e0b' },
];