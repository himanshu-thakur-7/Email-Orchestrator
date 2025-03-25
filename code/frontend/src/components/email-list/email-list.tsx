import React from 'react';
import { SearchBar } from './search-bar';
import { EmailListItem } from './email-list-item';
import { Email } from '../../types/email';
import { motion } from 'framer-motion';

interface EmailListProps {
  emails: Email[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectEmail: (email: Email) => void;
  getCategoryColor: (category: string) => string;
  isLoading: boolean;
}

export function EmailList({ 
  emails, 
  searchQuery, 
  onSearchChange, 
  onSelectEmail,
  getCategoryColor,
  isLoading
}: EmailListProps) {
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <SearchBar 
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      <div className="flex-1 overflow-hidden bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800/50">
        <div className="h-full overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="relative w-16 h-16">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border-2 border-transparent border-t-brand-400"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-4 rounded-full border-2 border-transparent border-t-brand-300"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-[22px] bg-brand-500 rounded-full"
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
              </div>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800/50">
              {emails.map((email) => (
                <EmailListItem
                  key={email.id}
                  email={email}
                  onClick={() => onSelectEmail(email)}
                  getCategoryColor={getCategoryColor}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}