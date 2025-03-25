import React from "react";
import { motion } from "framer-motion";

export const AnimatedBackground = () => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);
  
  return (
    <div className="fixed inset-0 -z-50 opacity-50">
      <div className="absolute inset-0 bg-zinc-950" />
      {rows.map((_, i) => (
        <motion.div
          key={`row-${i}`}
          initial={{
            opacity: 0,
            y: Math.random() * 10 - 5,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [Math.random() * 10 - 5, Math.random() * 10 - 5],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          className="absolute h-px w-full bg-gradient-to-r from-transparent via-zinc-800/50 to-transparent"
          style={{ top: `${(i / rows.length) * 100}%` }}
        />
      ))}
      {cols.map((_, i) => (
        <motion.div
          key={`col-${i}`}
          initial={{
            opacity: 0,
            x: Math.random() * 10 - 5,
          }}
          animate={{
            opacity: [0, 1, 0],
            x: [Math.random() * 10 - 5, Math.random() * 10 - 5],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          className="absolute w-px h-full bg-gradient-to-b from-transparent via-zinc-800/50 to-transparent"
          style={{ left: `${(i / cols.length) * 100}%` }}
        />
      ))}
    </div>
  );
};