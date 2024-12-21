import { User } from 'firebase/auth';
import { MetricsGrid } from './components/metrics-grid';
import { ProductionChart } from './components/production-chart';
import { ImpactChart } from './components/impact-chart';

interface AnalyticsProps {
  user: User;
}

export function Analytics({ }: AnalyticsProps) {
  return (
    <div className="grid gap-6">
      <MetricsGrid />
      <div className="grid gap-6 lg:grid-cols-2">
        <ProductionChart />
        <ImpactChart />
      </div>
    </div>
  );
}