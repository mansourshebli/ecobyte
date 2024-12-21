import { useState } from 'react';
import { User } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import {
  Building2,
  Trees,
  Car,
  Wind,
  Zap,
  Plus,
  Search,
  MapPin,
  AlertTriangle,
} from 'lucide-react';

import 'mapbox-gl/dist/mapbox-gl.css';

interface UrbanEcoProps {
  user: User;
}

// Use a public token for demo purposes
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZWNvYnl0ZSIsImEiOiJjbHRwOWF4Z2gwMDd5MnFxZm5sMWh2OXlsIn0.7_Y0P1AK9JKQl1gH3-YNVQ';

const urbanProjects = [
  {
    id: 1,
    name: 'Green Corridor Development',
    location: { lat: 40.7128, lng: -74.0060 },
    type: 'Green Space',
    status: 'In Progress',
    impact: {
      co2Reduction: '250 tons/year',
      energySavings: '120 MWh/year',
      greenSpace: '15,000 sq m',
    },
  },
  {
    id: 2,
    name: 'Smart Traffic Management',
    location: { lat: 34.0522, lng: -118.2437 },
    type: 'Infrastructure',
    status: 'Planning',
    impact: {
      co2Reduction: '500 tons/year',
      congestionReduction: '35%',
      fuelSavings: '25,000 L/year',
    },
  },
  {
    id: 3,
    name: 'Solar-Powered District',
    location: { lat: 51.5074, lng: -0.1278 },
    type: 'Energy',
    status: 'Completed',
    impact: {
      renewableEnergy: '2.5 GWh/year',
      co2Reduction: '1,200 tons/year',
      homes: '500 households',
    },
  },
];

export function UrbanEco({ user }: UrbanEcoProps) {
  const [viewState, setViewState] = useState({
    latitude: 40,
    longitude: -95,
    zoom: 3,
  });
  const [selectedProject, setSelectedProject] = useState<typeof urbanProjects[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'in progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'green space':
        return Trees;
      case 'infrastructure':
        return Car;
      case 'energy':
        return Zap;
      default:
        return Building2;
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card className="overflow-hidden">
        <div className="border-b p-4">
          <h3 className="text-lg font-semibold">Urban Development Projects</h3>
        </div>
        <div className="h-[600px] w-full">
          <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            style={{ width: '100%', height: '100%' }}
          >
            <NavigationControl position="top-right" />
            
            {urbanProjects.map((project) => (
              <Marker
                key={project.id}
                latitude={project.location.lat}
                longitude={project.location.lng}
                onClick={e => {
                  e.originalEvent.stopPropagation();
                  setSelectedProject(project);
                }}
              >
                <button className="rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-transform hover:scale-110">
                  {getTypeIcon(project.type)({ className: 'h-6 w-6 text-emerald-600' })}
                </button>
              </Marker>
            ))}

            {selectedProject && (
              <Popup
                latitude={selectedProject.location.lat}
                longitude={selectedProject.location.lng}
                onClose={() => setSelectedProject(null)}
                closeButton={true}
                closeOnClick={false}
                className="z-50"
                offset={15}
              >
                <div className="p-2">
                  <h4 className="font-semibold">{selectedProject.name}</h4>
                  <p className="text-sm text-gray-600">{selectedProject.type}</p>
                  <Badge className={getStatusColor(selectedProject.status)}>
                    {selectedProject.status}
                  </Badge>
                  <div className="mt-2 space-y-1 text-sm">
                    {Object.entries(selectedProject.impact).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between gap-2">
                        <span className="text-gray-500">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Popup>
            )}
          </Map>
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Project List</h3>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>

          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="mt-6 space-y-4">
            {urbanProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
                onClick={() => {
                  setSelectedProject(project);
                  setViewState({
                    latitude: project.location.lat,
                    longitude: project.location.lng,
                    zoom: 12,
                  });
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                    {getTypeIcon(project.type)({
                      className: 'h-5 w-5 text-emerald-600 dark:text-emerald-400',
                    })}
                  </div>
                  <div>
                    <h4 className="font-medium">{project.name}</h4>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="secondary">{project.type}</Badge>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Environmental Impact</h3>
          <div className="space-y-4">
            <div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-900/20">
              <h4 className="flex items-center gap-2 font-medium text-emerald-800 dark:text-emerald-200">
                <Trees className="h-5 w-5" />
                Green Space Added
              </h4>
              <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                25,000 m²
              </p>
              <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
                ↑ 15% from last quarter
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <h4 className="flex items-center gap-2 font-medium text-blue-800 dark:text-blue-200">
                <Zap className="h-5 w-5" />
                Energy Savings
              </h4>
              <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
                2.8 GWh
              </p>
              <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                ↑ 22% from last quarter
              </p>
            </div>

            <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
              <h4 className="flex items-center gap-2 font-medium text-orange-800 dark:text-orange-200">
                <AlertTriangle className="h-5 w-5" />
                CO₂ Reduction
              </h4>
              <p className="mt-2 text-2xl font-bold text-orange-600 dark:text-orange-400">
                1,950 tons
              </p>
              <p className="mt-1 text-sm text-orange-700 dark:text-orange-300">
                ↑ 18% from last quarter
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}