import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Upload, Brain, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '../ui/dialog';
import { ProcessingDialogProps, ProcessingStep } from './types';
import { ProcessingSpinner } from './processing-spinner';
import { ProcessingSteps } from './processing-steps';
import { CompletionState } from './completion-state';

const steps: ProcessingStep[] = [
  {
    icon: Upload,
    title: 'Uploading files',
    description: 'Securely transferring your files...'
  },
  {
    icon: Brain,
    title: 'AI Processing',
    description: 'Analyzing content and extracting information...'
  },
  {
    icon: Sparkles,
    title: 'Almost there',
    description: 'Finalizing and organizing results...'
  }
];

export function ProcessingDialog({ isOpen, onOpenChange }: ProcessingDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setCompleted(false);
      
      const timer1 = setTimeout(() => setCurrentStep(1), 2000);
      const timer2 = setTimeout(() => setCurrentStep(2), 4000);
      const timer3 = setTimeout(() => {
        setCompleted(true);
        setTimeout(() => {
          onOpenChange(false);
          setCompleted(false);
          setCurrentStep(0);
        }, 1000);
      }, 6000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isOpen, onOpenChange]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 max-w-sm">
        <DialogTitle className="sr-only">Processing Files</DialogTitle>
        <div className="flex flex-col items-center justify-center py-6">
          <AnimatePresence mode="wait">
            {completed ? (
              <CompletionState />
            ) : (
              <motion.div
                key="processing"
                className="flex flex-col items-center w-full"
              >
                <div className="relative mb-8">
                  <ProcessingSpinner />
                </div>
                <ProcessingSteps steps={steps} currentStep={currentStep} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}