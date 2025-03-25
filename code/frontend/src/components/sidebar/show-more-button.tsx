import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShowMoreButtonProps {
  showAllCategories: boolean;
  remainingCount: number;
  onClick: () => void;
}

export function ShowMoreButton({ showAllCategories, remainingCount, onClick }: ShowMoreButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      onClick={onClick}
      className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-xl transition-colors"
    >
      {showAllCategories ? (
        <>
          <ChevronUp className="w-4 h-4 mr-2" />
          Show Less
        </>
      ) : (
        <>
          <ChevronDown className="w-4 h-4 mr-2" />
          Show More ({remainingCount} more)
        </>
      )}
    </motion.button>
  );
}