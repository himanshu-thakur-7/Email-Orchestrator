import React from 'react';
import { Intent } from './types';

interface IntentsSectionProps {
  intents: Intent[];
}

export function IntentsSection({ intents }: IntentsSectionProps) {
  return (
    <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800/50">
      <h2 className="text-lg font-semibold text-zinc-100 mb-4">Top Intents</h2>
      <div className="space-y-4">
        {intents.map((intent) => (
          <div
            key={intent.name}
            className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-100 font-medium">{intent.name}</span>
              <span className="text-brand-400">
                {(intent.confidence * 100).toFixed(1)}% confident
              </span>
            </div>
            <p className="text-sm text-zinc-400">{intent.reasoning}</p>
          </div>
        ))}
      </div>
    </div>
  );
}