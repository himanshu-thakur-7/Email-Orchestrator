import React from 'react';
import { Email } from '../../types/email';
import { EmailStatus } from './email-status';
import { EmailCategory } from './email-category';

interface EmailListItemProps {
  email: Email;
  onClick: () => void;
  getCategoryColor: (category: string) => string;
}

export function EmailListItem({ email, onClick, getCategoryColor }: EmailListItemProps) {
  return (
    <div 
      className="p-4 hover:bg-zinc-800/30 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3">
            <EmailCategory 
              category={email.category}
              colorClass={getCategoryColor(email.category)}
            />
            <p className="text-sm font-medium text-zinc-100 truncate">
              {email.subject}
            </p>
          </div>
          <div className="mt-1">
            <p className="text-sm text-zinc-400 truncate">
              From: {email.sender}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <EmailStatus 
            processed={email.processed}
            confidence={email.confidence}
            timestamp={email.timestamp}
          />
        </div>
      </div>
    </div>
  );
}