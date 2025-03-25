import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SidebarProps {
  categories: Array<{
    name: string;
    icon: React.ReactNode;
    label: string;
  }>;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  className?: string;
}

export function Sidebar({ categories, selectedCategory, onSelectCategory, className }: SidebarProps) {
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Show first 4 categories by default, or all if expanded
  const visibleCategories = showAllCategories ? categories : categories.slice(0, 4);
  const hasMoreCategories = categories.length > 4;

  return (
    <div className={cn('w-80 flex-shrink-0', className)}>
      <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800/50 overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
        {/* Categories - Scrollable Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-2 space-y-1">
            <AnimatePresence initial={false}>
              {visibleCategories.map((category) => (
                <motion.button
                  key={category.name}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onClick={() => onSelectCategory(category.name)}
                  className={cn(
                    'w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200',
                    selectedCategory === category.name
                      ? 'bg-brand-500 text-white shadow-glow'
                      : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100'
                  )}
                >
                  <div className="flex items-center space-x-3">
                    {category.icon}
                    <span className="whitespace-nowrap">{category.label}</span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>

            {/* Show More/Less Button */}
            {hasMoreCategories && (
              <motion.button
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onClick={() => setShowAllCategories(!showAllCategories)}
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
                    Show More ({categories.length - 4} more)
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>

        {/* Stats Box - Fixed at Bottom */}
        <div className="flex-shrink-0 p-4 border-t border-zinc-800/50">
          <div className="bg-zinc-800/30 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <BarChart3 className="w-5 h-5 text-brand-400" />
              <span className="text-sm font-medium text-zinc-200">Processing Stats</span>
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-zinc-400 mb-1">Average Confidence</div>
                <div className="flex items-center">
                  <div className="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-brand-500"
                      initial={{ width: 0 }}
                      animate={{ width: '91.5%' }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                  <span className="ml-2 text-sm font-medium text-zinc-200">91.5%</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-zinc-400 mb-1">Processed Emails</div>
                <div className="text-sm font-medium text-zinc-200">
                  <span className="text-brand-400">1,234</span>
                  <span className="text-zinc-500 mx-1">/</span>
                  <span>1,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}