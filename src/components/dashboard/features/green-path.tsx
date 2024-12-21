import { useState } from 'react';
import { User } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Truck,
  Package,
  Factory,
  BarChart3,
  Leaf,
  Plus,
  Search,
  ArrowRight,
  Trash2,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface GreenPathProps {
  user: User;
}

interface Supplier {
  id: string;
  name: string;
  location: string;
  sustainabilityScore: number;
  carbonFootprint: number;
  materials: string[];
}

interface Route {
  id: string;
  origin: string;
  destination: string;
  distance: number;
  emissions: number;
  optimizationStatus: 'optimized' | 'pending' | 'needs-review';
}

export function GreenPath({ user }: GreenPathProps) {
  const [activeTab, setActiveTab] = useState<'suppliers' | 'routes'>('suppliers');
  const [searchTerm, setSearchTerm] = useState('');

  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'EcoMaterials Inc.',
      location: 'Portland, OR',
      sustainabilityScore: 92,
      carbonFootprint: 45.2,
      materials: ['recycled-plastic', 'bamboo', 'organic-cotton'],
    },
    {
      id: '2',
      name: 'GreenTech Solutions',
      location: 'Austin, TX',
      sustainabilityScore: 88,
      carbonFootprint: 52.8,
      materials: ['solar-panels', 'batteries', 'electronics'],
    },
    {
      id: '3',
      name: 'Sustainable Woods Co.',
      location: 'Seattle, WA',
      sustainabilityScore: 95,
      carbonFootprint: 38.6,
      materials: ['fsc-wood', 'bamboo', 'cork'],
    },
  ];

  const routes: Route[] = [
    {
      id: '1',
      origin: 'Portland, OR',
      destination: 'San Francisco, CA',
      distance: 635,
      emissions: 425.5,
      optimizationStatus: 'optimized',
    },
    {
      id: '2',
      origin: 'Seattle, WA',
      destination: 'Los Angeles, CA',
      distance: 1137,
      emissions: 892.3,
      optimizationStatus: 'needs-review',
    },
    {
      id: '3',
      origin: 'Austin, TX',
      destination: 'Chicago, IL',
      distance: 1208,
      emissions: 968.4,
      optimizationStatus: 'pending',
    },
  ];

  const getStatusColor = (status: Route['optimizationStatus']) => {
    switch (status) {
      case 'optimized':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'needs-review':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Supply Chain Optimization</h2>
          <p className="text-sm text-gray-500">
            Monitor and optimize your supply chain for sustainability
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setActiveTab('suppliers')}>
            <Factory className={`mr-2 h-4 w-4 ${activeTab === 'suppliers' ? 'text-emerald-600' : ''}`} />
            Suppliers
          </Button>
          <Button variant="outline" onClick={() => setActiveTab('routes')}>
            <Truck className={`mr-2 h-4 w-4 ${activeTab === 'routes' ? 'text-emerald-600' : ''}`} />
            Routes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {activeTab === 'suppliers' ? 'Sustainable Suppliers' : 'Optimized Routes'}
            </h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </div>
          </div>

          {activeTab === 'suppliers' ? (
            <div className="space-y-4">
              {suppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                      <Factory className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">{supplier.name}</h4>
                      <p className="text-sm text-gray-500">{supplier.location}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {supplier.materials.map((material) => (
                          <Badge key={material} variant="secondary">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      Score: {supplier.sustainabilityScore}%
                    </div>
                    <div className="text-sm text-gray-500">
                      {supplier.carbonFootprint} CO₂e/year
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {routes.map((route) => (
                <div
                  key={route.id}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                      <Truck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{route.origin}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{route.destination}</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {route.distance} miles | {route.emissions} kg CO₂e
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(route.optimizationStatus)}>
                    {route.optimizationStatus}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="mb-6 text-lg font-semibold">Analytics</h3>
          <div className="space-y-6">
            <div className="rounded-lg border p-4">
              <h4 className="flex items-center gap-2 font-medium">
                <BarChart3 className="h-5 w-5 text-emerald-600" />
                Carbon Footprint
              </h4>
              <p className="mt-2 text-2xl font-bold">
                1,523.4
                <span className="ml-1 text-sm font-normal text-gray-500">
                  tons CO₂e/year
                </span>
              </p>
              <p className="mt-1 text-sm text-emerald-600">
                ↓ 12.3% from last month
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="flex items-center gap-2 font-medium">
                <Leaf className="h-5 w-5 text-emerald-600" />
                Sustainability Score
              </h4>
              <p className="mt-2 text-2xl font-bold">
                87
                <span className="ml-1 text-sm font-normal text-gray-500">
                  /100
                </span>
              </p>
              <p className="mt-1 text-sm text-emerald-600">
                ↑ 5.2% from last month
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="flex items-center gap-2 font-medium">
                <Package className="h-5 w-5 text-emerald-600" />
                Optimized Shipments
              </h4>
              <p className="mt-2 text-2xl font-bold">
                89
                <span className="ml-1 text-sm font-normal text-gray-500">%</span>
              </p>
              <p className="mt-1 text-sm text-emerald-600">
                ↑ 3.7% from last month
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}