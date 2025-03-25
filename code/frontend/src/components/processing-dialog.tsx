import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { CheckCircle2, Upload, Brain, Sparkles } from 'lucide-react';

interface ProcessingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
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
  const [currentStep, setCurrentStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setCompleted(false);
      
      // Simulate processing steps
      const timer1 = setTimeout(() => setCurrentStep(1), 2000);
      const timer2 = setTimeout(() => setCurrentStep(2), 4000);
      const timer3 = setTimeout(() => {
        setCompleted(true);
        // Close dialog after showing completion state for 1 second
        setTimeout(() => {
          onOpenChange(false);
          // Reset states after dialog closes
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
              <motion.div
                key="completed"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="flex flex-col items-center"
              >
                <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
                <p className="text-zinc-100 font-medium">Processing Complete!</p>
              </motion.div>
            ) : (
              <motion.div
                key="processing"
                className="flex flex-col items-center w-full"
              >
                <div className="relative mb-8">
                  {/* Spinner Container */}
                  <div className="relative w-12 h-12">
                    {/* Outer spinning ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-500"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Middle spinning ring */}
                    <motion.div
                      className="absolute inset-1 rounded-full border-2 border-transparent border-t-brand-400"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Inner spinning ring */}
                    <motion.div
                      className="absolute inset-2 rounded-full border-2 border-transparent border-t-brand-300"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Center dot */}
                    <motion.div
                      className="absolute inset-[14px] bg-brand-500 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-6 w-full">
                  {steps.map((step, index) => {
                    const isActive = currentStep === index;
                    const isPast = currentStep > index;

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
                            <step.icon className={`w-5 h-5 ${
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}