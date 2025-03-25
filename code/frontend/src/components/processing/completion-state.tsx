import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export function CompletionState() {
  return (
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
  );
}