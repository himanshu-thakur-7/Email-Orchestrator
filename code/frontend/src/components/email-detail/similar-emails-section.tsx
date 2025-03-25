import React from 'react';
import { HoverEffect } from '../ui/card-hover-effect';
import { SimilarEmail } from './types';

interface SimilarEmailsSectionProps {
  similarEmails: SimilarEmail[];
  onSelectEmail: (email: SimilarEmail) => void;
}

export function SimilarEmailsSection({ similarEmails, onSelectEmail }: SimilarEmailsSectionProps) {
  return (
    <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800/50">
      <h2 className="text-lg font-semibold text-zinc-100 mb-4">Similar Emails</h2>
      <div className="relative">
        <HoverEffect
          items={similarEmails.map((email) => ({
            icon: (
              <div className="flex items-center justify-between w-full">
                <span className="text-brand-400">
                  {(email.similarity * 100).toFixed(1)}% similar
                </span>
              </div>
            ),
            title: email.subject,
            description: `Category: ${email.category}`,
            onClick: () => onSelectEmail(email)
          }))}
          className="w-full"
        />
      </div>
    </div>
  );
}