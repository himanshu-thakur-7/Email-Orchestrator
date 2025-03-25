import React from 'react';

interface EmailContentProps {
  subject: string;
  sender: string;
  timestamp: string;
  content: string;
}

export function EmailContent({ subject, sender, timestamp, content }: EmailContentProps) {
  return (
    <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800/50">
      <h2 className="text-xl font-semibold text-zinc-100 mb-4">{subject}</h2>
      <div className="text-sm text-zinc-400 mb-2">From: {sender}</div>
      <div className="text-sm text-zinc-400 mb-4">
        {new Date(timestamp).toLocaleString()}
      </div>
      <div className="prose prose-invert max-w-none">
        <p className="text-zinc-300 whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}