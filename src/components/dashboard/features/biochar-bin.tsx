import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

interface BiocharBinProps {
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
  temperature: Math.floor(400 + Math.random() * 200), // 400-600°C
  wasteInput: Math.floor(5 + Math.random() * 10), // 5-15kg
  biocharOutput: Math.floor(1 + Math.random() * 3), // 1-4kg
  co2Offset: Math.floor(2 + Math.random() * 4), // 2-6kg
});

export function BiocharBin({ user }: BiocharBinProps) {
  const [iotData, setIoTData] = useState(generateIoTData());
  const [loading, setLoading] = useState(false);
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newData = generateIoTData();
      setIoTData(newData);

      // Generate updates based on conditions
      const newUpdates: Update[] = [];
      
      if (newData.temperature > 550) {
        newUpdates.push({
          id: Date.now().toString(),
          message: 'Temperature exceeding optimal range. Adjusting cooling system.',
          timestamp: new Date(),
          type: 'warning',
        });
      }
      
      if (newData.wasteInput > 12) {
        newUpdates.push({
          id: (Date.now() + 1).toString(),
          message: 'Approaching maximum waste capacity. Consider processing current batch.',
          timestamp: new Date(),
          type: 'warning',
        });
      }

      if (newData.biocharOutput > 2) {
        newUpdates.push({
          id: (Date.now() + 2).toString(),
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

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setIoTData(generateIoTData());
      setLoading(false);
    }, 1000);
  };

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
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold dark:text-white">Real-time Monitoring</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Live measurements from your Biochar Bin
            </p>
          </div>
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

        <div className="grid gap-6 md:grid-cols-2">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border p-4 dark:border-gray-800"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  <span className="font-medium dark:text-white">{metric.label}</span>
                </div>
                {metric.trend === 'up' ? (
                  <ArrowUp className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500" />
                )}
              </div>
              <p className="mt-2 text-2xl font-bold dark:text-white">
                <CountUp
                  end={metric.value}
                  duration={2}
                  decimals={0}
                  separator=","
                />
                {metric.unit}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h4 className="mb-4 font-medium dark:text-white">AI Analysis</h4>
          <div className="space-y-4">
            <div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-900/20">
              <h5 className="font-medium text-emerald-900 dark:text-emerald-100">
                Optimization Tips
              </h5>
              <ul className="mt-2 space-y-2 text-sm text-emerald-800 dark:text-emerald-200">
                <li>• Maintain temperature between 450-550°C for optimal conversion</li>
                <li>• Current waste-to-biochar conversion rate: 25%</li>
                <li>• Suggested input: Garden waste and wood chips</li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <h5 className="font-medium text-blue-900 dark:text-blue-100">
                Environmental Impact
              </h5>
              <ul className="mt-2 space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li>• Carbon sequestration: 2.5kg CO₂/kg biochar</li>
                <li>• Soil improvement potential: High</li>
                <li>• Waste diverted from landfill: 15kg</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-gray-500" />
            <h4 className="font-medium dark:text-white">System Updates</h4>
          </div>
          <ScrollArea className="mt-4 h-[200px] rounded-lg border p-4 dark:border-gray-800">
            <AnimatePresence mode="popLayout">
              {updates.map((update) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`mb-4 rounded-lg p-3 text-sm ${
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

      <Card className="flex flex-col p-6">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">Interactive Model</h3>
        <div className="flex-1 rounded-lg border bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
          <iframe
            src="https://www.tinkercad.com/embed/e6FzvIJZhD2?editbtn=1"
            className="h-full w-full rounded-lg"
            frameBorder="0"
            title="Biochar Bin Model"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="dark:border-gray-800">
            Rotate: Click + Drag
          </Badge>
          <Badge variant="outline" className="dark:border-gray-800">
            Zoom: Scroll
          </Badge>
          <Badge variant="outline" className="dark:border-gray-800">
            Pan: Right Click + Drag
          </Badge>
        </div>
      </Card>
    </div>
  );
}