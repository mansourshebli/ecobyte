// src/types.ts

export interface Visualization {
  type: 'line' | 'pie' | 'table'; // Example types, replace with actual ones
  data: any;
}

export interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  visualization?: Visualization;
}
