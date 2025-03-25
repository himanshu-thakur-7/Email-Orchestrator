import React from 'react';

interface EmailCategoryProps {
  category: string;
  colorClass: string;
}

export function EmailCategory({ category, colorClass }: EmailCategoryProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {category}
    </span>
  );
}