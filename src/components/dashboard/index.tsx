import { User } from 'firebase/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Insights } from './features/insights';
import { Monitoring } from './features/monitoring';
import { Analytics } from './features/analytics';
import { AIUpdates } from './features/ai-updates';
import { UserNav } from '@/components/user-nav';
import {
  Bot,
  ActivitySquare,
  BarChart3,
  Sparkles,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    id: 'nova',
    name: 'Nova AI',
    icon: Bot,
    component: Insights,
    description: 'AI-powered insights and voice interaction',
  },
  {
    id: 'monitoring',
    name: 'Monitoring',
    icon: ActivitySquare,
    component: Monitoring,
    description: '3D model visualization and live status',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: BarChart3,
    component: Analytics,
    description: 'Monthly updates and AI insights',
  },
  {
    id: 'ai-updates',
    name: 'AI Updates',
    icon: Sparkles,
    component: AIUpdates,
    description: 'AI-based bin measurement analysis',
  },
];

interface DashboardProps {
  user: User | null;
}

export function Dashboard({ user }: DashboardProps) {
  const handleHomeClick = () => {
    window.location.hash = ''; // Clear the #dashboard hash
    window.location.reload(); // Reload to trigger App.tsx logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto p-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleHomeClick}
              className="rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/50"
            >
              <Home className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Eco<span className="text-emerald-600 dark:text-emerald-400">Byte</span>
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Smart Waste Management & Carbon Sequestration
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.displayName || 'User'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
            {user && <UserNav user={user} />}
          </div>
        </div>

        <Tabs defaultValue="nova" className="space-y-8">
          <div className="sticky top-0 z-10 rounded-xl bg-white/80 p-2 shadow-lg backdrop-blur-lg dark:bg-gray-900/80">
            <TabsList className="grid w-full grid-cols-4">
              {features.map((feature) => (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="flex items-center gap-2 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-600 dark:data-[state=active]:bg-emerald-900/50 dark:data-[state=active]:text-emerald-400"
                >
                  <feature.icon className="h-4 w-4" />
                  <span>{feature.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="space-y-4">
              {user ? (
                <feature.component user={user} />
              ) : (
                <div className="text-center text-gray-600 dark:text-gray-300">
                  <p>Please sign in to access this feature.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
