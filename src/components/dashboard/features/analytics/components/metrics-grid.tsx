import { metrics } from '../data';
import { MetricCard } from './metric-card';

export function MetricsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {metrics.map((metric) => (
        <MetricCard key={metric.label} metric={metric} />
      ))}
    </div>
  );
}