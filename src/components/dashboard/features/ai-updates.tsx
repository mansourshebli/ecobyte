import { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Loader2,
  Bot,
  Recycle,
  Leaf,
  ArrowRight,
  BarChart3,
  AlertTriangle,
} from 'lucide-react';
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

interface AIUpdatesProps {
  user: User;
}

const COLORS = ['#22c55e', '#3b82f6', '#ef4444'];

export function AIUpdates({}: AIUpdatesProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [classificationResult, setClassificationResult] = useState<any>(null);
  const [predictionData, setPredictionData] = useState<any[]>([]);
  const [wasteComposition, setWasteComposition] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update prediction data
      setPredictionData(prev => {
        const newData = [...prev];
        const lastPoint = newData[newData.length - 1] || { predicted: 300, actual: 290 };
        return [
          ...newData,
          {
            timestamp: new Date().toLocaleTimeString(),
            predicted: lastPoint.predicted + (Math.random() * 20 - 10),
            actual: lastPoint.actual + (Math.random() * 15 - 7.5),
          },
        ].slice(-10);
      });

      // Update waste composition
      setWasteComposition([
        { name: 'Recyclable', value: 35 + Math.random() * 20 },
        { name: 'Compostable', value: 25 + Math.random() * 20 },
        { name: 'Landfill', value: 15 + Math.random() * 10 },
      ]);

      // Add random alerts
      if (Math.random() > 0.7) {
        setAlerts(prev => [
          `Alert: ${new Date().toLocaleTimeString()} - ${
            [
              'High recyclable content detected',
              'Optimal processing conditions',
              'Consider batch processing',
              'Efficiency improvement opportunity',
            ][Math.floor(Math.random() * 4)]
          }`,
          ...prev,
        ].slice(0, 5));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const analyzeImage = useCallback(async (file: File) => {
    setIsAnalyzing(true);
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      // Simulate AI processing with realistic delay
      setTimeout(() => {
        const materials = [
          'PET Plastic',
          'Cardboard',
          'Organic Matter',
          'Metal',
          'Glass',
        ];
        const randomMaterials = materials
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        
        setClassificationResult({
          category: ['Recyclable', 'Compostable', 'Mixed Waste'][
            Math.floor(Math.random() * 3)
          ],
          confidence: 0.85 + Math.random() * 0.1,
          materials: randomMaterials,
          recommendations: [
            'Separate materials by type',
            'Remove any contamination',
            'Process within optimal temperature range',
          ],
          composition: wasteComposition,
        });
        setIsAnalyzing(false);
      }, 2000);
    };

    reader.readAsDataURL(file);
  }, [wasteComposition]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Real-time Waste Analysis</h3>
          <p className="text-sm text-gray-500">
            Upload waste images for instant AI classification
          </p>
        </div>

        <div className="mb-6">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && analyzeImage(e.target.files[0])}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex cursor-pointer flex-col items-center gap-4 rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors hover:border-emerald-500 dark:border-gray-700"
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Waste sample"
                className="max-h-48 rounded-lg object-cover"
              />
            ) : (
              <>
                <Camera className="h-12 w-12 text-gray-400" />
                <p className="text-sm text-gray-500">
                  Click or drag image to analyze
                </p>
              </>
            )}
          </label>
        </div>

        {isAnalyzing ? (
          <div className="flex items-center justify-center gap-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
            <span>Processing image with AI...</span>
          </div>
        ) : classificationResult && (
          <div className="space-y-4">
            <div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-900/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Recycle className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium">Classification Result</span>
                </div>
                <span className="text-sm">
                  {(classificationResult.confidence * 100).toFixed(1)}% confidence
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {classificationResult.category}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <h4 className="mb-2 font-medium">Detected Materials</h4>
              <div className="flex flex-wrap gap-2">
                {classificationResult.materials.map((material: string) => (
                  <span
                    key={material}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <h4 className="mb-2 font-medium">AI Recommendations</h4>
              <ul className="space-y-2">
                {classificationResult.recommendations.map((rec: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <ArrowRight className="h-4 w-4 text-emerald-500" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="mt-6">
          <h4 className="mb-4 flex items-center gap-2 font-medium">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            Live Alerts
          </h4>
          <ScrollArea className="h-[100px] rounded-lg border p-2">
            <AnimatePresence mode="popLayout">
              {alerts.map((alert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  {alert}
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">AI Predictive Analytics</h3>
          <p className="text-sm text-gray-500">
            Real-time predictions and composition analysis
          </p>
        </div>

        <div className="mb-6 space-y-6">
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <h4 className="mb-4 font-medium">Carbon Sequestration Forecast</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#22c55e"
                    name="Actual"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#3b82f6"
                    name="Predicted"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <h4 className="mb-4 font-medium">Live Waste Composition</h4>
            <div className="h-[200px]">
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
                    {wasteComposition.map((index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-8">
              {wasteComposition.map((category, index) => (
                <div key={category.name} className="text-center">
                  <div
                    className="mx-auto h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <p className="mt-1 text-sm text-gray-500">{category.name}</p>
                  <p className="font-medium">{category.value.toFixed(1)}%</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <h4 className="font-medium">AI Insights</h4>
            </div>
            <div className="mt-3 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                Efficiency trending upward: +15% this week
              </p>
              <p className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-blue-600" />
                Optimal processing conditions detected
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}