import { Card } from '@/components/ui/card';
import { TreeDeciduous, Recycle, Scale } from 'lucide-react';

const metrics = [
  {
    icon: TreeDeciduous,
    label: 'Carbon Offset',
    value: '2,020 kg',
    trend: '↑ 15% this month',
    color: 'emerald',
  },
  {
    icon: Recycle,
    label: 'Waste Processed',
    value: '3,030 kg',
    trend: '↑ 12% this month',
    color: 'blue',
  },
  {
    icon: Scale,
    label: 'Biochar Produced',
    value: '1,010 kg',
    trend: '↑ 18% this month',
    color: 'orange',
  },
];

export function MetricsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.label} className="p-6">
          <div className="flex items-center gap-4">
            <div className={`rounded-full bg-${metric.color}-100 p-3 dark:bg-${metric.color}-900`}>
              <metric.icon className={`h-6 w-6 text-${metric.color}-600 dark:text-${metric.color}-400`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{metric.label}</p>
              <h3 className="text-2xl font-bold">{metric.value}</h3>
              <p className={`text-sm text-${metric.color}-600`}>{metric.trend}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}