import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Loader2 } from 'lucide-react';
import { Message } from './types';
import { cn } from '@/lib/utils';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "flex",
              message.type === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className={cn(
                "rounded-lg px-4 py-2 max-w-[80%]",
                message.type === 'user'
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800"
              )}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <div className="mt-1 text-xs opacity-50">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </motion.div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-gray-500"
          >
            <Bot className="h-5 w-5" />
            <div className="flex gap-1">
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >•</motion.span>
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, delay: 0.2, repeat: Infinity }}
              >•</motion.span>
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, delay: 0.4, repeat: Infinity }}
              >•</motion.span>
            </div>
            <span>Thinking...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}