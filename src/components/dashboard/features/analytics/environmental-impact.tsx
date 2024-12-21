import { Card } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const impactData = [
  { name: 'Carbon Sequestered', value: 65, color: '#22c55e' },
  { name: 'Waste Reduced', value: 25, color: '#3b82f6' },
  { name: 'Soil Enhancement', value: 10, color: '#f59e0b' },
];

export function EnvironmentalImpact() {
  return (
    <Card className="p-6">
      <h3 className="mb-6 text-lg font-semibold">Environmental Impact</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={impactData}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={140}
              paddingAngle={5}
              dataKey="value"
            >
              {impactData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-center gap-8">
        {impactData.map((item) => (
          <div key={item.name} className="text-center">
            <div
              className="mx-auto h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <p className="mt-1 text-sm text-gray-500">{item.name}</p>
            <p className="font-medium">{item.value}%</p>
          </div>
        ))}
      </div>
    </Card>
  );
}