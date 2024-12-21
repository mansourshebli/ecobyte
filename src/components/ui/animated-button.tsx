import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface AnimatedButtonProps {
  text: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function AnimatedButton({ text, variant = 'primary', onClick }: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'group flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors',
        variant === 'primary' 
          ? 'bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600'
          : 'bg-white text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:text-white dark:ring-gray-800 dark:hover:bg-gray-800'
      )}
    >
      {text}
      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
    </motion.button>
  );
}