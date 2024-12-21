export interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  visualization?: {
    type: 'line' | 'pie' | 'table';
    data: any;
  };
}

export interface ConservAIProps {
  user: User;
}