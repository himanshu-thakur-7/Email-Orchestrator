import { ReactNode } from 'react';

export interface Intent {
  name: string;
  confidence: number;
  reasoning: string;
}

export interface Feature {
  name: string;
  reasoning: string;
}

export interface SimilarEmail {
  id: string;
  subject: string;
  similarity: number;
  category: string;
  sender: string;
  content: string;
  timestamp: string;
}

export interface EmailDetailProps {
  email: {
    id: string;
    subject: string;
    sender: string;
    content: string;
    category: string;
    timestamp: string;
  };
  onClose: () => void;
  onSelectEmail: (email: SimilarEmail) => void;
  isLoadingSimilar: boolean;
}