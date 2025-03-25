import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

interface CategoryButtonProps {
  name: string;
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function CategoryButton({ name, icon, label, isSelected, onClick }: CategoryButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      onClick={onClick}
      className={cn(
        'w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200',
        isSelected
          ? 'bg-brand-500 text-white shadow-glow'
          : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100'
      )}
    >
      <div className="flex items-center space-x-3">
        {icon}
        <span className="whitespace-nowrap">{label}</span>
      </div>
    </motion.button>
  );
}