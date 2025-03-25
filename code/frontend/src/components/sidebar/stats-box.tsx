import React from 'react';
import { BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export function StatsBox() {
  return (
    <div className="flex-shrink-0 p-4 border-t border-zinc-800/50">
      <div className="bg-zinc-800/30 rounded-xl p-4">
        <div className="flex items-center space-x-3 mb-3">
          <BarChart3 className="w-5 h-5 text-brand-400" />
          <span className="text-sm font-medium text-zinc-200">Processing Stats</span>
        </div>
        <div className="space-y-2">
          <div>
            <div className="text-xs text-zinc-400 mb-1">Average Confidence</div>
            <div className="flex items-center">
              <div className="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-500"
                  initial={{ width: 0 }}
                  animate={{ width: '91.5%' }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              <span className="ml-2 text-sm font-medium text-zinc-200">91.5%</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-zinc-400 mb-1">Processed Emails</div>
            <div className="text-sm font-medium text-zinc-200">
              <span className="text-brand-400">1,234</span>
              <span className="text-zinc-500 mx-1">/</span>
              <span>1,500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}