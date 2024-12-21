import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Location {
  id: number;
  coordinates: [number, number];
  label: string;
  installations: number;
}

const locations: Location[] = [
  { id: 1, coordinates: [30, 20], label: "Europe", installations: 120 },
  { id: 2, coordinates: [70, 25], label: "Asia", installations: 150 },
  { id: 3, coordinates: [-100, 40], label: "North America", installations: 130 },
  { id: 4, coordinates: [-60, -20], label: "South America", installations: 80 },
  { id: 5, coordinates: [20, -30], label: "Africa", installations: 70 },
  { id: 6, coordinates: [135, -25], label: "Australia", installations: 50 }
];

export function WorldMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Convert longitude/latitude to SVG coordinates
  const projectCoordinates = (lon: number, lat: number): [number, number] => {
    const x = (lon + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return [x, y];
  };

  return (
    <div className="relative h-[500px] overflow-hidden rounded-2xl bg-gray-900">
      <svg
        viewBox="0 0 800 400"
        className="h-full w-full"
        style={{ background: 'radial-gradient(circle at center, #1a365d 0%, #0f172a 100%)' }}
      >
        {/* Grid lines */}
        {Array.from({ length: 18 }, (_, i) => (
          <line
            key={`vertical-${i}`}
            x1={i * (800 / 18)}
            y1={0}
            x2={i * (800 / 18)}
            y2={400}
            stroke="#2d3748"
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={`horizontal-${i}`}
            x1={0}
            y1={i * (400 / 9)}
            x2={800}
            y2={i * (400 / 9)}
            stroke="#2d3748"
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}

        {/* Location markers */}
        {locations.map((location) => {
          const [x, y] = projectCoordinates(...location.coordinates);
          return (
            <g key={location.id}>
              <motion.circle
                cx={x}
                cy={y}
                r="20"
                fill="#10b981"
                opacity="0.2"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: location.id * 0.2,
                }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r="4"
                fill="#10b981"
                cursor="pointer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setSelectedLocation(location)}
              />
            </g>
          );
        })}

        {/* Connection lines */}
        {locations.map((location, i) => {
          const [x1, y1] = projectCoordinates(...location.coordinates);
          const nextLocation = locations[(i + 1) % locations.length];
          const [x2, y2] = projectCoordinates(...nextLocation.coordinates);
          return (
            <motion.path
              key={`connection-${i}`}
              d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${Math.min(y1, y2) - 50} ${x2} ${y2}`}
              stroke="#10b981"
              strokeWidth="1"
              fill="none"
              opacity="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.5 }}
            />
          );
        })}
      </svg>

      {/* Popup */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-xl dark:bg-gray-800"
          >
            <button
              onClick={() => setSelectedLocation(null)}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ×
            </button>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {selectedLocation.label}
            </h4>
            <p className="mt-1 text-sm">
              <span className="text-emerald-600 dark:text-emerald-400">
                {selectedLocation.installations} installations
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}