import { User } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TreeDeciduous, Recycle, Scale } from 'lucide-react';

interface AnalyticsProps {
  user: User;
}

const productionData = [
  { month: 'Jan', waste: 450, biochar: 150, offset: 300 },
  { month: 'Feb', waste: 420, biochar: 140, offset: 280 },
  { month: 'Mar', waste: 500, biochar: 170, offset: 340 },
  { month: 'Apr', waste: 480, biochar: 160, offset: 320 },
  { month: 'May', waste: 600, biochar: 200, offset: 400 },
  { month: 'Jun', waste: 580, biochar: 190, offset: 380 },
];

const impactData = [
  { name: 'Carbon Sequestered', value: 65, color: '#22c55e' },
  { name: 'Waste Reduced', value: 25, color: '#3b82f6' },
  { name: 'Soil Enhancement', value: 10, color: '#f59e0b' },
];

export function Analytics({ }: AnalyticsProps) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900">
              <TreeDeciduous className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Carbon Offset</p>
              <h3 className="text-2xl font-bold">2,020 kg</h3>
              <p className="text-sm text-emerald-600">↑ 15% this month</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
              <Recycle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Waste Processed</p>
              <h3 className="text-2xl font-bold">3,030 kg</h3>
              <p className="text-sm text-blue-600">↑ 12% this month</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900">
              <Scale className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Biochar Produced</p>
              <h3 className="text-2xl font-bold">1,010 kg</h3>
              <p className="text-sm text-orange-600">↑ 18% this month</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
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
      </div>
    </div>
  );
}