import { User } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import { useState } from 'react';
import {
  AlertTriangle,
  Droplets,
  Thermometer,
  Wind,
} from 'lucide-react';

import 'mapbox-gl/dist/mapbox-gl.css';

interface RiskMapperProps {
  user: User;
}

// Use a public token for demo purposes
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZWNvYnl0ZSIsImEiOiJjbHRwOWF4Z2gwMDd5MnFxZm5sMWh2OXlsIn0.7_Y0P1AK9JKQl1gH3-YNVQ';

const riskPoints = [
  {
    id: 1,
    latitude: 40.7128,
    longitude: -74.0060,
    type: 'Flood Risk',
    level: 'High',
    icon: Droplets,
    color: 'text-red-500',
    description: 'Coastal flooding risk in New York City',
  },
  {
    id: 2,
    latitude: 34.0522,
    longitude: -118.2437,
    type: 'Heat Wave',
    level: 'Moderate',
    icon: Thermometer,
    color: 'text-orange-500',
    description: 'Urban heat island effect in Los Angeles',
  },
  {
    id: 3,
    latitude: 25.7617,
    longitude: -80.1918,
    type: 'Wind Damage',
    level: 'High',
    icon: Wind,
    color: 'text-yellow-500',
    description: 'Hurricane risk zone in Miami',
  },
];

export function RiskMapper({ user }: RiskMapperProps) {
  const [viewState, setViewState] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3.5,
  });
  const [selectedRisk, setSelectedRisk] = useState<typeof riskPoints[0] | null>(null);

  const risks = [
    {
      type: 'Flood Risk',
      level: 'High',
      icon: Droplets,
      color: 'text-red-500',
      areas: ['Coastal Regions', 'River Basins'],
    },
    {
      type: 'Heat Waves',
      level: 'Moderate',
      icon: Thermometer,
      color: 'text-orange-500',
      areas: ['Urban Centers', 'Industrial Zones'],
    },
    {
      type: 'Wind Damage',
      level: 'Low',
      icon: Wind,
      color: 'text-green-500',
      areas: ['Open Plains', 'Coastal Areas'],
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2 overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Risk Assessment Map</h3>
        </div>
        <div className="h-[600px] w-full">
          <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
            mapboxAccessToken={MAPBOX_TOKEN}
            style={{ width: '100%', height: '100%' }}
            reuseMaps
            attributionControl={false}
          >
            <NavigationControl position="top-right" />
            
            {riskPoints.map((point) => (
              <Marker
                key={point.id}
                latitude={point.latitude}
                longitude={point.longitude}
                onClick={e => {
                  e.originalEvent.stopPropagation();
                  setSelectedRisk(point);
                }}
              >
                <button className="rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-transform hover:scale-110">
                  <point.icon className={`h-6 w-6 ${point.color}`} />
                </button>
              </Marker>
            ))}

            {selectedRisk && (
              <Popup
                latitude={selectedRisk.latitude}
                longitude={selectedRisk.longitude}
                onClose={() => setSelectedRisk(null)}
                closeButton={true}
                closeOnClick={false}
                className="z-50"
                offset={15}
              >
                <div className="p-2">
                  <h4 className="font-semibold">{selectedRisk.type}</h4>
                  <p className="text-sm text-gray-600">{selectedRisk.description}</p>
                  <p className={`mt-1 text-sm font-medium ${selectedRisk.color}`}>
                    Risk Level: {selectedRisk.level}
                  </p>
                </div>
              </Popup>
            )}
          </Map>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Risk Alerts
        </h3>
        <div className="mt-4 space-y-4">
          {risks.map((risk) => (
            <div
              key={risk.type}
              className="rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
            >
              <div className="flex items-center gap-2">
                <risk.icon className={`h-5 w-5 ${risk.color}`} />
                <div>
                  <h4 className="font-medium">{risk.type}</h4>
                  <p className="text-sm text-gray-500">Level: {risk.level}</p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {risk.areas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-4 w-full">View Detailed Report</Button>
      </Card>
    </div>
  );
}