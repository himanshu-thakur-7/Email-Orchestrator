import React from 'react';
import { motion } from 'framer-motion';

interface EmailStatusProps {
  processed: boolean;
  confidence: number;
  timestamp: string;
}

export function EmailStatus({ processed, confidence, timestamp }: EmailStatusProps) {
  return (
    <div className="text-right">
      <p className="text-sm text-zinc-300">
        {new Date(timestamp).toLocaleTimeString()}
      </p>
      <div className="flex items-center gap-1.5 mt-1">
        {processed ? (
          <div className="h-2 w-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50 animate-pulse" />
        ) : (
          <div className="relative w-3 h-3">
            <motion.div
              className="absolute inset-0 rounded-full border border-transparent border-t-yellow-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}
        <p className="text-sm text-zinc-400">
          {(confidence * 100).toFixed(1)}% confident
        </p>
      </div>
    </div>
  );
}