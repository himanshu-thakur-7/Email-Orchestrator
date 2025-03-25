import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { ProcessingStep } from './types';

interface ProcessingStepsProps {
  steps: ProcessingStep[];
  currentStep: number;
}

export function ProcessingSteps({ steps, currentStep }: ProcessingStepsProps) {
  return (
    <div className="space-y-6 w-full">
      {steps.map((step, index) => {
        const isActive = currentStep === index;
        const isPast = currentStep > index;
        const StepIcon = step.icon;

        return (
          <motion.div
            key={step.title}
            className={`flex items-center space-x-4 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-zinc-800/50' : ''
            }`}
            animate={{
              opacity: isPast ? 0.5 : 1,
            }}
          >
            <div className="flex-shrink-0">
              {isPast ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <StepIcon className={`w-5 h-5 ${
                  isActive ? 'text-brand-500' : 'text-zinc-600'
                }`} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${
                isActive ? 'text-zinc-100' : 'text-zinc-400'
              }`}>
                {step.title}
              </p>
              {isActive && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-zinc-500 mt-1"
                >
                  {step.description}
                </motion.p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}