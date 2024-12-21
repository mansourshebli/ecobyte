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

const productionData = [
  { month: 'Jan', waste: 450, biochar: 150, offset: 300 },
  { month: 'Feb', waste: 420, biochar: 140, offset: 280 },
  { month: 'Mar', waste: 500, biochar: 170, offset: 340 },
  { month: 'Apr', waste: 480, biochar: 160, offset: 320 },
  { month: 'May', waste: 600, biochar: 200, offset: 400 },
  { month: 'Jun', waste: 580, biochar: 190, offset: 380 },
];

export function ProductionTrends() {
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