import { useState, useRef, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CohereClient } from 'cohere-ai';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import * as pdfjs from 'pdfjs-dist';
import {
  Send,
  Upload,
  FileText,
  Loader2,
  Bot,
  BarChart3,
  FileUp,
  Sparkles,
  ChevronRight,
  Table,
  LineChart,
  PieChart,
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';

const client = new CohereClient({
  token: "ObpUz9m8418dAqcXrtv0kKYCsN1SFm6iE6hP9h2l"
});

interface ConservAIProps {
  user: User;
}

interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  visualization?: {
    type: 'line' | 'pie' | 'table';
    data: any;
  };
}

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

export function ConservAI({ user }: ConservAIProps) {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: "Hi! I'm ConservAI. I can analyze environmental data, generate visualizations, and extract insights from PDFs. Try these:\n\n• Analyze species population trends\n• Generate sustainability metrics\n• Upload a conservation report",
    type: 'assistant',
    timestamp: new Date(),
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setSelectedFile(file);
        setIsLoading(true);
        try {
          const text = await extractTextFromPDF(file);
          setInput(`Analyze this conservation report: ${file.name}`);
          handleSend(text);
        } catch (error) {
          console.error('Error processing PDF:', error);
        }
        setIsLoading(false);
      }
    },
  });

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText;
  };

  const generateVisualization = (text: string) => {
    const hasNumbers = /\d+/.test(text);
    if (!hasNumbers) return null;

    const years = text.match(/\b(19|20)\d{2}\b/g) || [];
    const numbers = text.match(/\b\d+(?:\.\d+)?%?\b/g) || [];

    if (years.length > 0 && numbers.length > 0) {
      if (text.toLowerCase().includes('distribution') || text.toLowerCase().includes('percentage')) {
        const pieData = numbers.slice(0, 4).map((value, index) => ({
          name: `Category ${index + 1}`,
          value: parseFloat(value.replace('%', '')),
        }));
        return { type: 'pie', data: pieData };
      } else {
        const lineData = years.slice(0, 5).map((year, i) => ({
          year,
          value: parseFloat(numbers[i]?.replace('%', '') || '0'),
        }));
        return { type: 'line', data: lineData };
      }
    }

    return null;
  };

  const handleSend = async (pdfText?: string) => {
    if (!input.trim() && !pdfText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const prompt = pdfText 
        ? `Analyze this conservation data:\n\n${pdfText}\n\nProvide a concise analysis with key metrics.`
        : input;

      const response = await client.chat({
        message: `You are ConservAI, a concise environmental analyst. Keep responses focused and include data when possible.

        User query: ${prompt}

        Guidelines:
        - Use 2-3 short sentences per point
        - Include specific numbers and trends
        - Format data for visualization
        - Maximum 3-4 key points`,
        model: 'command-r',
        temperature: 0.7,
        maxTokens: 300,
      });

      const visualization = generateVisualization(response.text);

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: response.text,
        type: 'assistant',
        timestamp: new Date(),
        visualization,
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I couldn't process that request. Please try again.",
        type: 'assistant',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card className="flex flex-col">
        <div className="border-b p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="visualize" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Visualize
              </TabsTrigger>
              <TabsTrigger value="analyze" className="flex items-center gap-2">
                <FileUp className="h-4 w-4" />
                Analyze PDF
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ScrollArea className="flex-1 p-4">
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
                    {message.visualization && (
                      <div className="mt-4 h-[200px] w-full min-w-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          {message.visualization.type === 'line' ? (
                            <RechartsLineChart data={message.visualization.data}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="year" />
                              <YAxis />
                              <Tooltip />
                              <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#22c55e"
                                name="Value"
                              />
                            </RechartsLineChart>
                          ) : (
                            <RechartsPieChart>
                              <Pie
                                data={message.visualization.data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {message.visualization.data.map((entry: any, index: number) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </RechartsPieChart>
                          )}
                        </ResponsiveContainer>
                      </div>
                    )}
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
                  <span>Analyzing...</span>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder={
                activeTab === 'chat'
                  ? "Ask about conservation data..."
                  : activeTab === 'visualize'
                  ? "Describe data to visualize..."
                  : "Upload a PDF for analysis..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button
                variant="outline"
                className="shrink-0"
                disabled={isLoading}
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={() => handleSend()}
              disabled={(!input.trim() && !selectedFile) || isLoading}
              className="shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          {selectedFile && (
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <FileText className="h-4 w-4" />
              {selectedFile.name}
            </div>
          )}
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Analysis Tools</h3>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => {
                setActiveTab('visualize');
                setInput("Generate a chart showing global temperature trends from 2000 to 2023");
              }}
            >
              <LineChart className="h-5 w-5 text-emerald-600" />
              <div className="flex flex-col items-start">
                <span className="font-medium">Trend Analysis</span>
                <span className="text-xs text-gray-500">Visualize environmental patterns</span>
              </div>
              <ChevronRight className="ml-auto h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => {
                setActiveTab('visualize');
                setInput("Show the distribution of renewable energy sources in 2023");
              }}
            >
              <PieChart className="h-5 w-5 text-blue-600" />
              <div className="flex flex-col items-start">
                <span className="font-medium">Distribution Analysis</span>
                <span className="text-xs text-gray-500">Compare environmental factors</span>
              </div>
              <ChevronRight className="ml-auto h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => {
                setActiveTab('visualize');
                setInput("Create a table of endangered species status");
              }}
            >
              <Table className="h-5 w-5 text-purple-600" />
              <div className="flex flex-col items-start">
                <span className="font-medium">Data Tables</span>
                <span className="text-xs text-gray-500">Structured environmental data</span>
              </div>
              <ChevronRight className="ml-auto h-4 w-4" />
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Quick Analysis</h3>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => {
                setActiveTab('chat');
                setInput("Analyze global biodiversity trends in the last 5 years");
                handleSend();
              }}
            >
              <Sparkles className="h-5 w-5 text-emerald-600" />
              Biodiversity Trends
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => {
                setActiveTab('chat');
                setInput("Show renewable energy adoption rates by region");
                handleSend();
              }}
            >
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Energy Analysis
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => {
                setActiveTab('chat');
                setInput("Calculate carbon footprint reduction potential");
                handleSend();
              }}
            >
              <LineChart className="h-5 w-5 text-purple-600" />
              Carbon Impact
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}