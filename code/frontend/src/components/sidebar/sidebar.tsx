import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { CategoryButton } from './category-button';
import { StatsBox } from './stats-box';
import { ShowMoreButton } from './show-more-button';

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

  const visibleCategories = showAllCategories ? categories : categories.slice(0, 4);
  const hasMoreCategories = categories.length > 4;
  const remainingCount = categories.length - 4;

  return (
    <div className={cn('w-80 flex-shrink-0', className)}>
      <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800/50 overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-2 space-y-1">
            <AnimatePresence initial={false}>
              {visibleCategories.map((category) => (
                <CategoryButton
                  key={category.name}
                  name={category.name}
                  icon={category.icon}
                  label={category.label}
                  isSelected={selectedCategory === category.name}
                  onClick={() => onSelectCategory(category.name)}
                />
              ))}
            </AnimatePresence>

            {hasMoreCategories && (
              <ShowMoreButton
                showAllCategories={showAllCategories}
                remainingCount={remainingCount}
                onClick={() => setShowAllCategories(!showAllCategories)}
              />
            )}
          </div>
        </div>

        <StatsBox />
      </div>
    </div>
  );
}