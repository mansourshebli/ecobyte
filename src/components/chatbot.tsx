import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Bot, Send, X } from 'lucide-react';
import { CohereClient } from 'cohere-ai';
import { cn } from '@/lib/utils';

const client = new CohereClient({
  token: "ObpUz9m8418dAqcXrtv0kKYCsN1SFm6iE6hP9h2l"
});

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm Nova, your AI assistant. I can help you learn about our features like Nova AI, Biochar Bin IoT, EcoImpact Analyzer, and Biodiversity Tracker. What would you like to know?",
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await client.chat({
        message: `You are Nova, the AI assistant for EcoByte. You help users understand our features:

1. Nova AI Assistant: An intelligent companion offering environmental insights and sustainable recommendations
2. EcoImpact Analyzer: Advanced analytics for measuring environmental impact
3. Biochar Bin IoT: Smart waste management system for converting organic waste to biochar
4. Biodiversity Tracker: AI-powered system for monitoring endangered species

User question: ${input}

Respond in a helpful, friendly way. Keep responses concise and focused on our features.`,
        model: 'command-r',
        temperature: 0.7,
        maxTokens: 300,
      });

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: response.text,
        sender: 'bot',
      }]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bottom-6 right-6 z-50 w-96 rounded-lg border bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950"
          >
            <div className="flex items-center justify-between border-b p-4 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                  <Bot className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold dark:text-white">Nova</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">AI Assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="h-[400px] p-4">
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className={cn(
                        "flex w-full",
                        message.sender === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.3 }}
                        className={cn(
                          "rounded-lg px-4 py-2 max-w-[80%]",
                          message.sender === 'user'
                            ? "bg-emerald-600 text-white dark:bg-emerald-500"
                            : "bg-gray-100 dark:bg-gray-800 dark:text-white"
                        )}
                      >
                        {message.content}
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-gray-500 dark:text-gray-400"
                  >
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
                    Nova is typing
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t p-4 dark:border-gray-800">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="dark:border-gray-800 dark:bg-gray-900"
                />
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            <Bot className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}