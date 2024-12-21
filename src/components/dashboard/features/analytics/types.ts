export interface MetricData {
  label: string;
  value: string;
  trend: string;
  color: 'emerald' | 'blue' | 'orange';
  icon: any;
}

export interface ChartData {
  month: string;
  waste: number;
  biochar: number;
  offset: number;
}

export interface ImpactData {
  name: string;
  value: number;
  color: string;
}