import React from 'react';
import { Feature } from './types';

interface FeaturesSectionProps {
  features: Feature[];
}

export function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800/50">
      <h2 className="text-lg font-semibold text-zinc-100 mb-4">Extracted Features</h2>
      <div className="space-y-4">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50"
          >
            <div className="mb-2">
              <span className="text-zinc-100 font-medium">{feature.name}</span>
            </div>
            <p className="text-sm text-zinc-500">{feature.reasoning}</p>
          </div>
        ))}
      </div>
    </div>
  );
}