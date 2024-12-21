import { useState, useRef, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CohereClient } from 'cohere-ai';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import * as pdfjs from 'pdfjs-dist';
import {
  Send,
  Upload,
  FileText,
  Loader2,
  ChevronRight,
  BarChart3,
  MapPin,
  FileUp,
  CheckCircle2,
  AlertTriangle,
  Bot,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const client = new CohereClient({
  token: "ObpUz9m8418dAqcXrtv0kKYCsN1SFm6iE6hP9h2l"
});

interface BiodiversityTrackerProps {
  user: User;
}

interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  data?: {
    type: 'chart' | 'map' | 'text';
    values?: any[];
  };
}

const sampleChartData = [
  { year: '2019', population: 1200 },
  { year: '2020', population: 1100 },
  { year: '2021', population: 950 },
  { year: '2022', population: 850 },
  { year: '2023', population: 800 },
];

export function BiodiversityTracker({ user }: BiodiversityTrackerProps) {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: "Welcome to ConservAI! I can help you analyze conservation data, understand species patterns, and develop protection strategies. Try asking about specific species, ecosystems, or upload a PDF for analysis.",
    type: 'assistant',
    timestamp: new Date(),
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showChart, setShowChart] = useState(false);
  const [pdfText, setPdfText] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setSelectedFile(file);
        try {
          const text = await extractTextFromPDF(file);
          setPdfText(text);
          setInput(`Please analyze this conservation report: ${file.name}`);
        } catch (error) {
          console.error('Error extracting PDF text:', error);
        }
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

  const handleSend = async () => {
    if (!input.trim() && !selectedFile) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input || `Analyzing file: ${selectedFile?.name}`,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let prompt = input;
      if (selectedFile && pdfText) {
        prompt = `Analyzing conservation data from PDF:\n\n${pdfText}\n\nUser query: ${input}`;
      }

      const response = await client.chat({
        message: `You are ConservAI, an expert in conservation and environmental analysis. 
        Your role is to analyze conservation data, understand species patterns, 
        and develop protection strategies.

        User query: ${prompt}

        Provide a detailed, scientific response focusing on conservation aspects.
        If the query involves data analysis, include relevant statistics and trends.`,
        model: 'command-r',
        temperature: 0.7,
        maxTokens: 500,
      });

      // Simulate chart data generation for certain keywords
      const shouldShowChart = prompt.toLowerCase().includes('population') || 
                            prompt.toLowerCase().includes('trend') ||
                            prompt.toLowerCase().includes('statistics');

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: response.text,
        type: 'assistant',
        timestamp: new Date(),
        data: shouldShowChart ? {
          type: 'chart',
          values: sampleChartData,
        } : undefined,
      }]);

      if (shouldShowChart) {
        setShowChart(true);
      }
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble processing your request. Please try again.",
        type: 'assistant',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
      setPdfText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card className="flex flex-col">
        <div className="border-b p-4">
          <h3 className="text-lg font-semibold">ConservAI Assistant</h3>
          <p className="text-sm text-gray-500">
            Analyze conservation data and develop protection strategies
          </p>
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
                  transition={{ type: "spring", duration: 0.5 }}
                  className={`flex ${
                    message.type === 'user' ? "justify-end" : "justify-start"
                  }`}
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.3 }}
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.type === 'user'
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.data?.type === 'chart' && (
                      <div className="mt-4 h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={message.data.values}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="population"
                              stroke="#10b981"
                              name="Population"
                            />
                          </LineChart>
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
              placeholder="Ask about conservation data or upload a PDF..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
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
              onClick={handleSend}
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
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-emerald-600" />
                <h4 className="font-medium">Data Visualization</h4>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Upload conservation data for AI-powered analysis and visualization
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium">Geographic Mapping</h4>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                View species distribution and migration patterns
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <FileUp className="h-5 w-5 text-purple-600" />
                <h4 className="font-medium">PDF Analysis</h4>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Extract insights from conservation reports and research papers
              </p>
            </div>
          </div>
        </Card>

        {showChart && (
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Population Trends</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="population"
                    stroke="#10b981"
                    name="Population"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}