import { useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AnimatePresence } from 'framer-motion';
import { Send, Upload, FileText, Loader2, Bot } from 'lucide-react';
import { Message } from '../types';
import { ChatMessage } from './chat-message';
import { useDropzone } from 'react-dropzone';

interface ChatInterfaceProps {
  messages: Message[];
  input: string;
  isLoading: boolean;
  selectedFile: File | null;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onFileDrop: (files: File[]) => void;
}

export function ChatInterface({
  messages,
  input,
  isLoading,
  selectedFile,
  onInputChange,
  onSend,
  onFileDrop,
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    onDrop: onFileDrop,
  });

  return (
    <>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-500">
                <Bot className="h-5 w-5" />
                <div className="flex gap-1">
                  <span className="animate-bounce">•</span>
                  <span className="animate-bounce delay-100">•</span>
                  <span className="animate-bounce delay-200">•</span>
                </div>
                <span>Analyzing...</span>
              </div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about conservation data..."
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSend()}
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
            onClick={onSend}
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
    </>
  );
}