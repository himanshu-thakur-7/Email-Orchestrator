import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { HoverEffect } from './ui/card-hover-effect';

interface Intent {
  name: string;
  confidence: number;
  reasoning: string;
}

interface Feature {
  name: string;
  reasoning: string;
}

interface SimilarEmail {
  id: string;
  subject: string;
  similarity: number;
  category: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface EmailDetailProps {
  email: {
    id: string;
    subject: string;
    sender: string;
    content: string;
    category: string;
    timestamp: string;
  };
  onClose: () => void;
  onSelectEmail: (email: SimilarEmail) => void;
  isLoadingSimilar: boolean;
}

export function EmailDetail({ email, onClose, onSelectEmail, isLoadingSimilar }: EmailDetailProps) {
  const intents: Intent[] = [
    {
      name: 'Invoice Request',
      confidence: 0.98,
      reasoning: 'Contains specific invoice number (#1234) and mentions Q1 services, typical invoice request pattern.'
    },
    {
      name: 'Payment Follow-up',
      confidence: 0.85,
      reasoning: 'References financial terms and follows standard payment request format.'
    },
    {
      name: 'Service Update',
      confidence: 0.72,
      reasoning: 'Mentions Q1 services and includes service-related terminology.'
    }
  ];

  const features: Feature[] = [
    {
      name: 'Principal Amount',
      reasoning: 'Extracted from line item "Q1 Services - $5,000"'
    },
    {
      name: 'Due Date',
      reasoning: 'Identified from payment terms section'
    },
    {
      name: 'Invoice Number',
      reasoning: 'Directly mentioned in subject and body'
    }
  ];

  const similarEmails: SimilarEmail[] = [
    {
      id: '2',
      subject: 'Invoice #1235 for Q4 Services',
      similarity: 0.95,
      category: 'Invoice',
      sender: 'billing@company.com',
      content: `Dear Customer,

We hope this email finds you well. Please find attached Invoice #1235 for Q4 Services.

Q4 Services - $6,000
Service Period: October 1 - December 31, 2024

Payment Terms: Net 30
Due Date: December 31, 2024

Please process this payment at your earliest convenience.

Best regards,
Billing Team`,
      timestamp: '2024-03-09T15:30:00'
    },
    {
      id: '3',
      subject: 'Q2 Services Invoice #1456',
      similarity: 0.89,
      category: 'Invoice',
      sender: 'billing@company.com',
      content: `Dear Customer,

Please find attached Invoice #1456 for Q2 Services.

Q2 Services - $5,500
Service Period: April 1 - June 30, 2024

Payment Terms: Net 30
Due Date: June 30, 2024

Please process this payment at your earliest convenience.

Best regards,
Billing Team`,
      timestamp: '2024-03-08T11:45:00'
    },
    {
      id: '4',
      subject: 'Payment Request: Invoice #1789',
      similarity: 0.82,
      category: 'Invoice',
      sender: 'billing@company.com',
      content: `Dear Customer,

This is a payment request for Invoice #1789.

Monthly Services - $3,000
Service Period: March 2024

Payment Terms: Net 15
Due Date: March 20, 2024

Please process this payment at your earliest convenience.

Best regards,
Billing Team`,
      timestamp: '2024-03-07T09:15:00'
    }
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-zinc-950 p-8">
      {/* Loading Overlay */}
      {isLoadingSimilar && (
        <div 
          data-testid="loading-overlay"
          role="dialog"
          aria-label="Loading similar emails"
          className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
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
      )}

      {/* Back Button */}
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
              {/* Email Content */}
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800/50">
                <h2 className="text-xl font-semibold text-zinc-100 mb-4">{email.subject}</h2>
                <div className="text-sm text-zinc-400 mb-2">From: {email.sender}</div>
                <div className="text-sm text-zinc-400 mb-4">
                  {new Date(email.timestamp).toLocaleString()}
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-zinc-300 whitespace-pre-wrap">{email.content}</p>
                </div>
              </div>

              {/* Features */}
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
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Intents */}
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800/50">
                <h2 className="text-lg font-semibold text-zinc-100 mb-4">Top Intents</h2>
                <div className="space-y-4">
                  {intents.map((intent, index) => (
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

              {/* Similar Emails */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}