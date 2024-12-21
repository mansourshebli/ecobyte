import { useState } from 'react';
import { User } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
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
  CloudRain,
  Droplets,
  Wind,
  Thermometer,
  AlertTriangle,
  MapPin,
  Plus,
  RefreshCcw,
} from 'lucide-react';

import 'mapbox-gl/dist/mapbox-gl.css';

interface EcoCrisisProps {
  user: User;
}

// Use a public token for demo purposes
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZWNvYnl0ZSIsImEiOiJjbHRwOWF4Z2gwMDd5MnFxZm5sMWh2OXlsIn0.7_Y0P1AK9JKQl1gH3-YNVQ';

const riskData = [
  {
    id: 1,
    type: 'Flood Risk',
    location: { lat: 40.7128, lng: -74.0060 },
    probability: 75,
    severity: 'high',
    timeframe: '48 hours',
    description: 'Heavy rainfall expected, potential flooding in low-lying areas',
  },
  {
    id: 2,
    type: 'Air Quality',
    location: { lat: 34.0522, lng: -118.2437 },
    probability: 85,
    severity: 'severe',
    timeframe: '24 hours',
    description: 'Hazardous air quality conditions expected due to wildfires',
  },
  {
    id: 3,
    type: 'Drought',
    location: { lat: 36.7783, lng: -119.4179 },
    probability: 90,
    severity: 'critical',
    timeframe: '7 days',
    description: 'Severe drought conditions persisting, water conservation required',
  },
];

const forecastData = [
  { time: '00:00', risk: 30, temperature: 20, humidity: 65 },
  { time: '04:00', risk: 45, temperature: 19, humidity: 70 },
  { time: '08:00', risk: 60, temperature: 22, humidity: 75 },
  { time: '12:00', risk: 75, temperature: 25, humidity: 60 },
  { time: '16:00', risk: 85, temperature: 27, humidity: 55 },
  { time: '20:00', risk: 70, temperature: 23, humidity: 62 },
];

export function EcoCrisis({ user }: EcoCrisisProps) {
  const [viewState, setViewState] = useState({
    latitude: 40,
    longitude: -95,
    zoom: 3.5,
  });
  const [selectedRisk, setSelectedRisk] = useState<typeof riskData[0] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'severe':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
    }
  };

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card className="overflow-hidden">
        <div className="border-b p-4 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold dark:text-white">Risk Assessment Map</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Real-time environmental risk monitoring
              </p>
            </div>
            <Button
              variant="outline"
              onClick={refreshData}
              disabled={isLoading}
            >
              <RefreshCcw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
          </div>
        </div>
        <div className="h-[400px] w-full">
          <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            style={{ width: '100%', height: '100%' }}
          >
            <NavigationControl position="top-right" />
            
            {riskData.map((risk) => (
              <Marker
                key={risk.id}
                latitude={risk.location.lat}
                longitude={risk.location.lng}
                onClick={e => {
                  e.originalEvent.stopPropagation();
                  setSelectedRisk(risk);
                }}
              >
                <button className="rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-transform hover:scale-110 dark:bg-gray-800/90">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </button>
              </Marker>
            ))}

            {selectedRisk && (
              <Popup
                latitude={selectedRisk.location.lat}
                longitude={selectedRisk.location.lng}
                onClose={() => setSelectedRisk(null)}
                closeButton={true}
                closeOnClick={false}
                className="z-50"
                offset={15}
              >
                <div className="p-2">
                  <h4 className="font-semibold dark:text-white">{selectedRisk.type}</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {selectedRisk.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge className={getSeverityColor(selectedRisk.severity)}>
                      {selectedRisk.severity}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedRisk.timeframe}
                    </span>
                  </div>
                </div>
              </Popup>
            )}
          </Map>
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">Risk Forecast</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-800" />
                <XAxis dataKey="time" className="dark:text-gray-400" />
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
                  dataKey="risk"
                  stroke="#ef4444"
                  name="Risk Level"
                />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#f59e0b"
                  name="Temperature"
                />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#3b82f6"
                  name="Humidity"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">Active Alerts</h3>
          <div className="space-y-4">
            <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
              <div className="flex items-center gap-2">
                <CloudRain className="h-5 w-5 text-red-600 dark:text-red-400" />
                <h4 className="font-medium text-red-900 dark:text-red-100">
                  Flood Warning
                </h4>
              </div>
              <p className="mt-2 text-sm text-red-800 dark:text-red-200">
                Heavy rainfall expected in the next 48 hours. Prepare for potential flooding.
              </p>
            </div>

            <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                <h4 className="font-medium text-orange-900 dark:text-orange-100">
                  Air Quality Alert
                </h4>
              </div>
              <p className="mt-2 text-sm text-orange-800 dark:text-orange-200">
                Poor air quality conditions expected. Limit outdoor activities.
              </p>
            </div>

            <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <h4 className="font-medium text-yellow-900 dark:text-yellow-100">
                  Heat Advisory
                </h4>
              </div>
              <p className="mt-2 text-sm text-yellow-800 dark:text-yellow-200">
                High temperatures forecasted. Stay hydrated and avoid prolonged sun exposure.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">Report Issue</h3>
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Report Environmental Issue
          </Button>
        </Card>
      </div>
    </div>
  );
}