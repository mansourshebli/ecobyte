import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Insights } from './features/insights';
import { Monitoring } from './features/monitoring';
import { Analytics } from './features/analytics';
import { AIUpdates } from './features/ai-updates';
import {
  Bot,
  ActivitySquare,
  BarChart3,
  Sparkles,
} from 'lucide-react';

const features = [
  {
    id: 'insights',
    name: 'Insights',
    icon: Bot,
    component: Insights,
    description: 'AI-powered insights and 3D visualization',
  },
  {
    id: 'monitoring',
    name: 'Monitoring',
    icon: ActivitySquare,
    component: Monitoring,
    description: 'Real-time biochar production monitoring',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: BarChart3,
    component: Analytics,
    description: 'Production analytics and carbon offset',
  },
  {
    id: 'ai-updates',
    name: 'AI Updates',
    icon: Sparkles,
    component: AIUpdates,
    description: 'AI-powered waste classification and predictions',
  },
];

export function DashboardLayout() {
  const [activeTab, setActiveTab] = useState('insights');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container mx-auto p-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Biochar<span className="text-emerald-600">Bin</span>
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Smart Waste Management & Carbon Sequestration
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="sticky top-0 z-10 bg-gray-50/80 pb-4 pt-4 backdrop-blur-sm dark:bg-gray-900/80">
            <TabsList className="grid w-full grid-cols-4">
              {features.map((feature) => (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-emerald-600 dark:data-[state=active]:bg-gray-800"
                >
                  <feature.icon className="h-4 w-4" />
                  <span>{feature.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="space-y-4">
              <feature.component />
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}