import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { productionData } from '../data';

export function ProductionChart() {
  return (
    <Card className="p-6">
      <h3 className="mb-6 text-lg font-semibold">Production Trends</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={productionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="waste"
              stroke="#3b82f6"
              name="Waste Input"
            />
            <Line
              type="monotone"
              dataKey="biochar"
              stroke="#22c55e"
              name="Biochar Output"
            />
            <Line
              type="monotone"
              dataKey="offset"
              stroke="#f59e0b"
              name="Carbon Offset"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}