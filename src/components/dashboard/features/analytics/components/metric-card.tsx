import { Card } from '@/components/ui/card';
import { MetricData } from '../types';

interface MetricCardProps {
  metric: MetricData;
}

export function MetricCard({ metric }: MetricCardProps) {
  const { icon: Icon, label, value, trend, color } = metric;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className={`rounded-full bg-${color}-100 p-3 dark:bg-${color}-900`}>
          <Icon className={`h-6 w-6 text-${color}-600 dark:text-${color}-400`} />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className={`text-sm text-${color}-600`}>{trend}</p>
        </div>
      </div>
    </Card>
  );
}