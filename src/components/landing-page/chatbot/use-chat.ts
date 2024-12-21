import { useState } from 'react';
import { Message } from './types';

const INITIAL_MESSAGE: Message = {
  id: '1',
  content: "Hi! I'm Nova, your AI assistant. I can help you learn about our features like Nova AI, Biochar Bin IoT, EcoImpact Analyzer, and Biodiversity Tracker. What would you like to know?",
  type: 'assistant',
  timestamp: new Date(),
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(),
        type: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 1000);
  };

  return { messages, isLoading, sendMessage };
}

function getAIResponse(): string {
  const responses = [
    "I'd be happy to tell you more about our environmental solutions. What specific aspect interests you?",
    "That's a great question about sustainability. Let me explain how our technology helps...",
    "Our AI-powered systems can help with that exact challenge. Here's how...",
    "We've seen great results in that area. For example...",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}
