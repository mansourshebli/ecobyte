import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import {
  Thermometer,
  Recycle,
  Scale,
  Leaf,
  RefreshCcw,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  MessageSquare,
} from 'lucide-react';

interface MonitoringProps {
  user: User;
}

interface Update {
  id: string;
  message: string;
  timestamp: Date;
  type: 'info' | 'warning' | 'success';
}

// Simulated IoT data
const generateIoTData = () => ({
  temperature: Math.floor(400 + Math.random() * 200),
  wasteInput: Math.floor(5 + Math.random() * 10),
  biocharOutput: Math.floor(1 + Math.random() * 3),
  co2Offset: Math.floor(2 + Math.random() * 4),
});

export function Monitoring({}: MonitoringProps) {
  const [iotData, setIoTData] = useState(generateIoTData());
  const [loading, setLoading] = useState(false);
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateIoTData();
      setIoTData(newData);

      const newUpdates: Update[] = [];
      
      if (newData.temperature > 550) {
        newUpdates.push({
          id: Date.now().toString(),
          message: 'Temperature exceeding optimal range. Adjusting cooling system.',
          timestamp: new Date(),
          type: 'warning',
        });
      }
      
      if (newData.biocharOutput > 2) {
        newUpdates.push({
          id: (Date.now() + 1).toString(),
          message: `Biochar production optimal. ${newData.biocharOutput}kg produced in this batch.`,
          timestamp: new Date(),
          type: 'success',
        });
      }

      if (newUpdates.length > 0) {
        setUpdates(prev => [...newUpdates, ...prev].slice(0, 50));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      label: 'Temperature',
      value: iotData.temperature,
      unit: '°C',
      icon: Thermometer,
      trend: iotData.temperature > 500 ? 'up' : 'down',
      color: 'text-orange-500',
    },
    {
      label: 'Waste Input',
      value: iotData.wasteInput,
      unit: 'kg',
      icon: Recycle,
      trend: 'up',
      color: 'text-blue-500',
    },
    {
      label: 'Biochar Output',
      value: iotData.biocharOutput,
      unit: 'kg',
      icon: Scale,
      trend: 'up',
      color: 'text-emerald-500',
    },
    {
      label: 'CO₂ Offset',
      value: iotData.co2Offset,
      unit: 'kg',
      icon: Leaf,
      trend: 'up',
      color: 'text-green-500',
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Real-time Monitoring</h3>
            <p className="text-sm text-gray-500">Live measurements from your Biochar Bin</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLoading(true)}
            disabled={loading}
          >
            <RefreshCcw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border p-4 dark:border-gray-800"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  <span className="font-medium">{metric.label}</span>
                </div>
                {metric.trend === 'up' ? (
                  <ArrowUp className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500" />
                )}
              </div>
              <p className="mt-2 text-2xl font-bold">
                <CountUp end={metric.value} duration={2} decimals={0} separator="," />
                {metric.unit}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-gray-500" />
            <h4 className="font-medium">System Updates</h4>
          </div>
          <ScrollArea className="mt-4 h-[200px] rounded-lg border p-4">
            <AnimatePresence mode="popLayout">
              {updates.map((update) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className={`mb-4 rounded-lg p-3 ${
                    update.type === 'warning'
                      ? 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200'
                      : update.type === 'success'
                      ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                      : 'bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4" />
                    <div>
                      <p>{update.message}</p>
                      <p className="mt-1 text-xs opacity-80">
                        {update.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
        </div>
      </Card>

      <Card className="flex flex-col overflow-hidden">
        <div className="border-b p-4">
          <h3 className="text-lg font-semibold">Interactive Model</h3>
          <p className="text-sm text-gray-500">Biochar Bin 3D Visualization</p>
        </div>
        <div className="flex-1">
          <iframe
            src="https://www.tinkercad.com/embed/e6FzvIJZhD2?editbtn=1"
            className="h-full w-full"
            title="Biochar Bin Model"
          />
        </div>
      </Card>
    </div>
  );
}
