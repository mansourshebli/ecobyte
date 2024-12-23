import { useState } from 'react';
import { CohereClient } from 'cohere-ai';

const client = new CohereClient({
  token: "ObpUz9m8418dAqcXrtv0kKYCsN1SFm6iE6hP9h2l"
});

const INITIAL_MESSAGE = {
  id: '1',
  content: "Hi! I'm Nova, your AI assistant. I can help you learn about our features like Nova AI, Real-time Monitoring, Analytics, and AI Updates. What would you like to know?",
  type: 'assistant',
  timestamp: new Date(),
};

export function useChat() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    const userMessage = {
      id: Date.now().toString(),
      content,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await client.chat({
        message: `You are Nova, the AI assistant for EcoByte. You help users understand our features:
the idea is a project (IoT powered bin) that converts organic waste or biomass into biochar. The goal of this project is to reduce carbon emissions effectively. The project is in the development phase and the team is working on the following features:
1. Nova AI: AI-powered insights and 3D visualization for environmental monitoring and decision making
2. Real-time Monitoring: Live biochar production monitoring with IoT sensors and 3D model visualization
3. Analytics: Production analytics and carbon offset tracking with detailed insights
4. AI Updates: AI-powered waste classification and predictive analytics for optimization

additional info (if needed):
website name: EcoByte
website URL: https://ecobyteai.vercel.app
website creator/developer: EcoByte Team
website purpose: To showcase the project idea and features

User question: ${content}

Respond in a helpful, friendly way. Keep responses very short and concise.`,
        model: 'command-r',
        temperature: 0.7,
        maxTokens: 150,
      });

      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: response.text,
        type: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting right now. Please try again later.",
        type: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage };
}