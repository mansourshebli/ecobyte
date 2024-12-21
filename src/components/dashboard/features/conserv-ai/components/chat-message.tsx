import { motion } from 'framer-motion';
import { Message } from '../types';
import { VisualizationChart } from './visualization-chart';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex ${message.type === 'user' ? "justify-end" : "justify-start"}`}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className={`rounded-lg px-4 py-2 max-w-[80%] ${
          message.type === 'user'
            ? "bg-emerald-600 text-white"
            : "bg-gray-100 dark:bg-gray-800"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {message.visualization && (
          <VisualizationChart visualization={message.visualization} />
        )}
        <div className="mt-1 text-xs opacity-50">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </motion.div>
    </motion.div>
  );
}