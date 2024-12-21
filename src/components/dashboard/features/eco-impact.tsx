import { useState } from 'react';
import { User } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CohereClient } from "cohere-ai";
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
  TreeDeciduous,
  Droplets,
  Wind,
  Leaf,
  ArrowRight,
  Plus,
  Search,
  BarChart3,
  Loader2,
} from 'lucide-react';

const client = new CohereClient({ 
  token: "ObpUz9m8418dAqcXrtv0kKYCsN1SFm6iE6hP9h2l"
});

interface EcoImpactProps {
  user: User;
}

interface ImpactData {
  month: string;
  carbon: number;
  water: number;
  energy: number;
}

interface PieData {
  name: string;
  value: number;
  color: string;
}

interface Metrics {
  carbon: number;
  water: number;
  energy: number;
}

const historicalData: ImpactData[] = [
  { month: 'Jan', carbon: 100, water: 80, energy: 90 },
  { month: 'Feb', carbon: 85, water: 75, energy: 85 },
  { month: 'Mar', carbon: 70, water: 70, energy: 80 },
  { month: 'Apr', carbon: 55, water: 65, energy: 75 },
  { month: 'May', carbon: 40, water: 60, energy: 70 },
  { month: 'Jun', carbon: 25, water: 55, energy: 65 },
];

export function EcoImpact({ user }: EcoImpactProps) {
  const [action, setAction] = useState('');
  const [details, setDetails] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [impactData, setImpactData] = useState<ImpactData[]>(historicalData);
  const [pieData, setPieData] = useState<PieData[]>([
    { name: 'Carbon Reduction', value: 45, color: '#22c55e' },
    { name: 'Water Savings', value: 30, color: '#3b82f6' },
    { name: 'Energy Efficiency', value: 25, color: '#f59e0b' },
  ]);
  const [metrics, setMetrics] = useState<Metrics>({
    carbon: 45,
    water: 30,
    energy: 25,
  });

  const handleAnalyze = async () => {
    if (!action.trim()) return;

    setIsAnalyzing(true);
    try {
      const historicalContext = historicalData
        .map(data => 
          `${data.month}: Carbon=${data.carbon}, Water=${data.water}, Energy=${data.energy}`
        )
        .join('\n');

      const prompt = `Given this environmental action: "${action}" with details: "${details}".
      Historical data:\n${historicalContext}\n
      Analyze the potential environmental impact and provide projections.
      Consider factors like carbon emissions reduction, water conservation, and energy efficiency.
      Format your response exactly as a JSON object with these fields:
      {
        "monthlyProjections": [
          {
            "month": "Current",
            "carbon": 85,
            "water": 90,
            "energy": 88
          },
          // 5 more months of projections
        ],
        "distribution": {
          "carbonReduction": 45,
          "waterSavings": 30,
          "energyEfficiency": 25
        },
        "metrics": {
          "carbon": 45,
          "water": 30,
          "energy": 25
        }
      }
      All numbers should be percentages between 0-100, where higher numbers indicate better environmental performance.`;

      const response = await client.chat({
        message: prompt,
        model: "command-r-08-2024",
        temperature: 0.7,
        maxTokens: 1000,
      });

      const jsonMatch = response.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }

      const analysis = JSON.parse(jsonMatch[0]);

      setImpactData(analysis.monthlyProjections);
      setPieData([
        { name: 'Carbon Reduction', value: analysis.distribution.carbonReduction, color: '#22c55e' },
        { name: 'Water Savings', value: analysis.distribution.waterSavings, color: '#3b82f6' },
        { name: 'Energy Efficiency', value: analysis.distribution.energyEfficiency, color: '#f59e0b' },
      ]);
      setMetrics(analysis.metrics);

    } catch (error) {
      console.error('Error analyzing impact:', error);
      const defaultProjections = Array(6).fill(null).map((_, i) => ({
        month: i === 0 ? 'Current' : `Month ${i}`,
        carbon: Math.max(0, 100 - (i * 10 + Math.random() * 5)),
        water: Math.max(0, 100 - (i * 8 + Math.random() * 5)),
        energy: Math.max(0, 100 - (i * 12 + Math.random() * 5)),
      }));

      setImpactData(defaultProjections);
      setPieData([
        { name: 'Carbon Reduction', value: 40, color: '#22c55e' },
        { name: 'Water Savings', value: 35, color: '#3b82f6' },
        { name: 'Energy Efficiency', value: 25, color: '#f59e0b' },
      ]);
      setMetrics({
        carbon: 40,
        water: 35,
        energy: 25,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Impact Analysis</h3>
            <p className="text-sm text-gray-500">
              Predict environmental impact of your actions
            </p>
          </div>
          <Button onClick={handleAnalyze} disabled={isAnalyzing}>
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <BarChart3 className="mr-2 h-4 w-4" />
                Analyze Impact
              </>
            )}
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Input
              placeholder="Enter your action (e.g., 'switching to electric vehicles')"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="dark:border-gray-800 dark:bg-gray-950"
            />
          </div>
          <div>
            <Textarea
              placeholder="Provide additional details..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="min-h-[100px] dark:border-gray-800 dark:bg-gray-950"
            />
          </div>
        </div>

        <div className="mt-6 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={impactData}>
              <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-800" />
              <XAxis dataKey="month" className="dark:text-gray-400" />
              <YAxis className="dark:text-gray-400" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="carbon"
                stroke="#22c55e"
                name="Carbon Emissions"
              />
              <Line
                type="monotone"
                dataKey="water"
                stroke="#3b82f6"
                name="Water Usage"
              />
              <Line
                type="monotone"
                dataKey="energy"
                stroke="#f59e0b"
                name="Energy Consumption"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Impact Distribution</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--background)',
                    borderColor: 'var(--border)',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {pieData.map((item) => (
              <div key={item.name} className="text-center">
                <div
                  className="mx-auto h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <p className="mt-1 text-xs text-gray-500">
                  {item.name}
                </p>
                <p className="font-medium">{item.value}%</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Key Metrics</h3>
          <div className="space-y-4">
            <div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-900/20">
              <div className="flex items-center gap-2">
                <TreeDeciduous className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <h4 className="font-medium text-emerald-900 dark:text-emerald-100">
                  Carbon Reduction
                </h4>
              </div>
              <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {metrics.carbon}%
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-medium text-blue-900 dark:text-blue-100">
                  Water Conservation
                </h4>
              </div>
              <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
                {metrics.water}%
              </p>
            </div>

            <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h4 className="font-medium text-amber-900 dark:text-amber-100">
                  Energy Efficiency
                </h4>
              </div>
              <p className="mt-2 text-2xl font-bold text-amber-600 dark:text-amber-400">
                {metrics.energy}%
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}