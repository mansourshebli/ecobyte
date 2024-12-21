import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import CountUp from 'react-countup';

interface CounterCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  unit: string;
  color: string;
  delay?: number;
}

export function CounterCard({ icon: Icon, label, value, unit, color, delay = 0 }: CounterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800"
    >
      <div className="relative z-10">
        <div className={`mb-4 inline-flex rounded-xl p-3 ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          <CountUp end={value} duration={2.5} separator="," />
          <span className="ml-1 text-lg font-normal text-gray-500">{unit}</span>
        </h3>
        
        <p className="mt-2 text-gray-600 dark:text-gray-400">{label}</p>
      </div>

      <div className="absolute inset-0 -z-10 translate-x-full bg-gradient-to-r from-transparent via-emerald-50/50 to-transparent opacity-0 transition-all group-hover:translate-x-[-100%] group-hover:opacity-100 dark:via-emerald-900/20" />
    </motion.div>
  );
}