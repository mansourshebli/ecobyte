import { useState } from 'react';
import { User } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeftRight,
  Search,
  Plus,
  Factory,
  Recycle,
  Package,
  ArrowRight,
  Building,
  Users,
} from 'lucide-react';

interface EcoMatchProps {
  user: User;
}

interface Material {
  id: string;
  type: string;
  quantity: string;
  location: string;
  status: 'available' | 'matched' | 'processing';
  provider: {
    name: string;
    type: 'business' | 'individual';
  };
  matches?: {
    name: string;
    distance: string;
    rating: number;
  }[];
}

const materials: Material[] = [
  {
    id: '1',
    type: 'Plastic (PET)',
    quantity: '500 kg',
    location: 'San Francisco, CA',
    status: 'available',
    provider: {
      name: 'EcoTech Industries',
      type: 'business',
    },
    matches: [
      { name: 'RecycleTech', distance: '5.2 miles', rating: 4.8 },
      { name: 'GreenCycle', distance: '7.8 miles', rating: 4.6 },
    ],
  },
  {
    id: '2',
    type: 'Wood Pallets',
    quantity: '50 units',
    location: 'Oakland, CA',
    status: 'matched',
    provider: {
      name: 'Sarah Chen',
      type: 'individual',
    },
    matches: [
      { name: 'Upcycle Crafts', distance: '3.1 miles', rating: 4.9 },
    ],
  },
  {
    id: '3',
    type: 'E-waste',
    quantity: '200 kg',
    location: 'San Jose, CA',
    status: 'processing',
    provider: {
      name: 'TechCorp Solutions',
      type: 'business',
    },
    matches: [
      { name: 'E-Cycle Pro', distance: '12.4 miles', rating: 4.7 },
      { name: 'Tech Recyclers', distance: '15.6 miles', rating: 4.5 },
    ],
  },
];

export function EcoMatch({ user }: EcoMatchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  const getStatusColor = (status: Material['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'matched':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Available Materials</h3>
            <p className="text-sm text-gray-500">
              Connect waste materials with recycling opportunities
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            List Material
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="space-y-4">
          {materials.map((material) => (
            <div
              key={material.id}
              className="rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
              onClick={() => setSelectedMaterial(material)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                    <Package className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">{material.type}</h4>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <span>{material.quantity}</span>
                      <span>•</span>
                      <span>{material.location}</span>
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(material.status)}>
                  {material.status}
                </Badge>
              </div>

              {material.matches && (
                <div className="mt-4 border-t pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Recycle className="h-4 w-4" />
                    <span>{material.matches.length} potential matches</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Quick Stats</h3>
          <div className="grid gap-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-emerald-600" />
                <span className="text-sm text-gray-500">Listed Materials</span>
              </div>
              <p className="mt-2 text-2xl font-bold">1,234</p>
              <p className="text-sm text-emerald-600">↑ 12% this month</p>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-500">Successful Matches</span>
              </div>
              <p className="mt-2 text-2xl font-bold">856</p>
              <p className="text-sm text-blue-600">↑ 8% this month</p>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-gray-500">Active Businesses</span>
              </div>
              <p className="mt-2 text-2xl font-bold">342</p>
              <p className="text-sm text-purple-600">↑ 15% this month</p>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-600" />
                <span className="text-sm text-gray-500">Community Members</span>
              </div>
              <p className="mt-2 text-2xl font-bold">2,567</p>
              <p className="text-sm text-orange-600">↑ 20% this month</p>
            </div>
          </div>
        </Card>

        {selectedMaterial && (
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Potential Matches</h3>
            <div className="space-y-4">
              {selectedMaterial.matches?.map((match) => (
                <div
                  key={match.name}
                  className="rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{match.name}</h4>
                      <p className="text-sm text-gray-500">
                        {match.distance} away • Rating: {match.rating}/5
                      </p>
                    </div>
                    <Button size="sm">
                      Connect
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}