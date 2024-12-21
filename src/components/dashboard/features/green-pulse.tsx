import { useState } from 'react';
import { User } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import {
  Trash2,
  Recycle,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Package,
  Building2,
  RefreshCcw,
} from 'lucide-react';

interface GreenPulseProps {
  user: User;
}

const wasteData = [
  { name: 'Jan', organic: 450, recyclable: 300, landfill: 250 },
  { name: 'Feb', organic: 420, recyclable: 320, landfill: 230 },
  { name: 'Mar', organic: 400, recyclable: 350, landfill: 220 },
  { name: 'Apr', organic: 380, recyclable: 370, landfill: 200 },
  { name: 'May', organic: 350, recyclable: 390, landfill: 180 },
  { name: 'Jun', organic: 330, recyclable: 410, landfill: 160 },
];

const wasteComposition = [
  { name: 'Organic', value: 35, color: '#22c55e' },
  { name: 'Recyclable', value: 40, color: '#3b82f6' },
  { name: 'Landfill', value: 25, color: '#ef4444' },
];

const insights = [
  {
    title: 'High Recyclable Content',
    description: 'Your recyclable waste has increased by 15%. Consider implementing better sorting practices.',
    type: 'warning',
  },
  {
    title: 'Organic Waste Reduction',
    description: 'Great job! Organic waste reduced by 20% through composting initiatives.',
    type: 'success',
  },
  {
    title: 'Peak Waste Hours',
    description: 'Waste generation peaks between 2-4 PM. Schedule additional collections during these hours.',
    type: 'info',
  },
];

export function GreenPulse({ user }: GreenPulseProps) {
  const [loading, setLoading] = useState(false);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-900">
              <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Waste</p>
              <h3 className="text-2xl font-bold">2,450 kg</h3>
              <p className="flex items-center text-sm text-red-600">
                <ArrowUp className="mr-1 h-4 w-4" />
                8% vs last month
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
              <Recycle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Recycling Rate</p>
              <h3 className="text-2xl font-bold">68%</h3>
              <p className="flex items-center text-sm text-green-600">
                <ArrowUp className="mr-1 h-4 w-4" />
                12% vs last month
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900">
              <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Waste Alerts</p>
              <h3 className="text-2xl font-bold">5</h3>
              <p className="flex items-center text-sm text-orange-600">
                <ArrowDown className="mr-1 h-4 w-4" />
                3 resolved
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Waste Trends</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshData}
              disabled={loading}
            >
              <RefreshCcw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wasteData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="organic"
                  stroke="#22c55e"
                  name="Organic"
                />
                <Line
                  type="monotone"
                  dataKey="recyclable"
                  stroke="#3b82f6"
                  name="Recyclable"
                />
                <Line
                  type="monotone"
                  dataKey="landfill"
                  stroke="#ef4444"
                  name="Landfill"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-6 text-lg font-semibold">Waste Composition</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteComposition}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {wasteComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center gap-4">
            {wasteComposition.map((item) => (
              <div key={item.name} className="text-center">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <p className="mt-1 text-sm text-gray-500">{item.name}</p>
                <p className="font-medium">{item.value}%</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">AI Insights</h3>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`rounded-lg p-4 ${
                  insight.type === 'warning'
                    ? 'bg-yellow-50 dark:bg-yellow-900/20'
                    : insight.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : 'bg-blue-50 dark:bg-blue-900/20'
                }`}
              >
                <h4 className="font-medium">{insight.title}</h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Recommendations</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                <Package className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="font-medium">Optimize Packaging</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Switch to recyclable packaging materials to reduce landfill waste
                  by up to 30%.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                <Building2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium">Facility Optimization</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Implement smart bins in high-traffic areas to improve waste
                  sorting efficiency.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}