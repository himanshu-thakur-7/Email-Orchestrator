import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="flex-shrink-0 bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-2 border border-zinc-800/50 mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search emails..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-transparent border-none rounded-xl focus:ring-2 focus:ring-brand-500/20 text-zinc-100 placeholder:text-zinc-500"
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
      </div>
    </div>
  );
}