export interface Email {
  id: string;
  subject: string;
  sender: string;
  category: string;
  confidence: number;
  timestamp: string;
  processed: boolean;
  content?: string;
}