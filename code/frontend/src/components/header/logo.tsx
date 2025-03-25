import React from 'react';
import { Mail } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center space-x-3">
      <div className="p-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 shadow-glow">
        <Mail className="h-6 w-6 text-white" />
      </div>
      <h1 className="text-2xl font-semibold text-white">
        Email Processor
      </h1>
    </div>
  );
}