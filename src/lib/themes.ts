export const themes = {
  default: {
    name: 'Light',
    background: 'bg-white',
    overlay: 'bg-white',
    accent: 'emerald',
  },
  midnight: {
    name: 'Midnight',
    background: 'bg-gradient-to-br from-gray-900 via-black to-gray-900',
    overlay: 'bg-transparent',
    accent: 'purple',
  },
  ocean: {
    name: 'Ocean',
    background: 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900',
    overlay: 'bg-transparent',
    accent: 'blue',
  },
  forest: {
    name: 'Forest',
    background: 'bg-gradient-to-br from-green-900 via-green-800 to-green-900',
    overlay: 'bg-transparent',
    accent: 'green',
  },
  sunset: {
    name: 'Sunset',
    background: 'bg-gradient-to-br from-orange-600 via-pink-600 to-purple-700',
    overlay: 'bg-transparent',
    accent: 'orange',
  },
} as const;

export type ThemeKey = keyof typeof themes;