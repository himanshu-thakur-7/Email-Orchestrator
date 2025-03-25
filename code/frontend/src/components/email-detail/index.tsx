import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { EmailDetailProps } from './types';
import { LoadingOverlay } from './loading-overlay';
import { EmailContent } from './email-content';
import { FeaturesSection } from './features-section';
import { IntentsSection } from './intents-section';
import { SimilarEmailsSection } from './similar-emails-section';

// Mock data moved to a separate file
import { mockIntents, mockFeatures, mockSimilarEmails } from './mock-data';

export function EmailDetail({ email, onClose, onSelectEmail, isLoadingSimilar }: EmailDetailProps) {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-zinc-950 p-8">
      {isLoadingSimilar && <LoadingOverlay />}

      <button
        onClick={onClose}
        className="mb-6 flex items-center text-zinc-400 hover:text-zinc-100 transition-colors flex-shrink-0"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Inbox
      </button>

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <EmailContent {...email} />
              <FeaturesSection features={mockFeatures} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <IntentsSection intents={mockIntents} />
              <SimilarEmailsSection 
                similarEmails={mockSimilarEmails} 
                onSelectEmail={onSelectEmail} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}