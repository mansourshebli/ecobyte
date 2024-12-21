import { useState, useEffect } from 'react';
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
} from 'recharts';
import {
  Wind,
  Droplets,
  Thermometer,
  AlertTriangle,
  RefreshCcw,
} from 'lucide-react';

interface EcoSenseProps {
  user: User;
}

// Simulated real-time data
const generateData = () => {
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => {
    const time = new Date(now.getTime() - (23 - i) * 3600000);
    return {
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false }),
      temperature: 20 + Math.random() * 10,
      humidity: 40 + Math.random() * 30,
      airQuality: 30 + Math.random() * 50,
      co2: 350 + Math.random() * 100,
    };
  });
};

export function EcoSense({ user }: EcoSenseProps) {
  const [data, setData] = useState(generateData());
  const [loading, setLoading] = useState(false);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setData(generateData());
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(refreshData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      name: 'Temperature',
      value: data[data.length - 1].temperature.toFixed(1) + '°C',
      icon: Thermometer,
      color: 'text-orange-500',
      trend: '+2.3°C from yesterday',
    },
    {
      name: 'Humidity',
      value: data[data.length - 1].humidity.toFixed(1) + '%',
      icon: Droplets,
      color: 'text-blue-500',
      trend: '-5% from yesterday',
    },
    {
      name: 'Air Quality',
      value: 'Moderate',
      icon: Wind,
      color: 'text-yellow-500',
      trend: 'Declining trend detected',
    },
    {
      name: 'CO₂ Levels',
      value: data[data.length - 1].co2.toFixed(0) + ' ppm',
      icon: AlertTriangle,
      color: 'text-red-500',
      trend: 'Above weekly average',
    },
  ];

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.name} className="p-6">
            <div className="flex items-center gap-4">
              <div className={`rounded-full bg-gray-100 p-3 ${metric.color}`}>
                <metric.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-gray-500">{metric.name}</h3>
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm text-gray-500">{metric.trend}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Environmental Trends</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={loading}
          >
            <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="ml-2">Refresh</span>
          </Button>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#f97316"
                name="Temperature (°C)"
              />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#3b82f6"
                name="Humidity (%)"
              />
              <Line
                type="monotone"
                dataKey="airQuality"
                stroke="#eab308"
                name="Air Quality Index"
              />
              <Line
                type="monotone"
                dataKey="co2"
                stroke="#ef4444"
                name="CO₂ (ppm)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Predictions</h3>
          <div className="space-y-4">
            <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
              <h4 className="flex items-center gap-2 font-medium text-yellow-800 dark:text-yellow-200">
                <AlertTriangle className="h-5 w-5" />
                Air Quality Alert
              </h4>
              <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                Poor air quality predicted for tomorrow. Consider reducing outdoor
                activities between 12 PM - 4 PM.
              </p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <h4 className="flex items-center gap-2 font-medium text-blue-800 dark:text-blue-200">
                <Droplets className="h-5 w-5" />
                Rainfall Forecast
              </h4>
              <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                80% chance of precipitation in the next 24 hours. Consider
                harvesting rainwater for garden use.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Recommendations</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                <Wind className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="font-medium">Ventilation Optimization</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Open windows between 6 AM - 8 AM for optimal air quality and
                  energy efficiency.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                <Thermometer className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium">Temperature Management</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Adjust thermostat to 22°C for optimal comfort and energy
                  savings.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}