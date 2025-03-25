import { ReactNode } from 'react';

export interface ProcessingStep {
  icon: typeof import('lucide-react').Icon;
  title: string;
  description: string;
}

export interface ProcessingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}