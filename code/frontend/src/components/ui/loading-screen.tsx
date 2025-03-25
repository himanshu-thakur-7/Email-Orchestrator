import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import Lottie from 'lottie-react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-zinc-950 flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="p-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 shadow-glow">
            <Mail className="h-8 w-8 text-white" />
          </div>
        </motion.div>

        {/* Loading Animation */}
        <div className="relative w-32 h-32 mb-8">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Outer Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            {/* Middle Ring */}
            <motion.div
              className="absolute inset-4 rounded-full border-4 border-transparent border-t-brand-400"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner Ring */}
            <motion.div
              className="absolute inset-8 rounded-full border-4 border-transparent border-t-brand-300"
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
            {/* Center Dot */}
            <motion.div
              className="absolute inset-[38%] bg-brand-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-xl font-semibold text-zinc-100 mb-2">
            Loading Email Processor
          </h2>
          <p className="text-sm text-zinc-400">
            Preparing your dashboard...
          </p>
        </motion.div>
      </div>
    </div>
  );
}