import { motion, AnimatePresence } from 'framer-motion';
import { ChartDisplay } from './chart-display';

export interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  data?: {
    type: 'chart';
    data: Array<{ year: string; value: number }>;
  } | null;
}

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex ${
              message.type === 'user' ? "justify-end" : "justify-start"
            }`}
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
              {message.data?.type === 'chart' && (
                <div className="mt-4">
                  <ChartDisplay data={message.data.data} />
                </div>
              )}
              <div className="mt-1 text-xs opacity-50">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}