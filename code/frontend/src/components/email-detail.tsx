import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { HoverEffect } from './ui/card-hover-effect';
import { EmailResponse } from '@/services/api';

interface SimilarEmail {
  subject: string;
  similarity: number;
  content: string;
}

interface EmailDetailProps {
  email: EmailResponse;
  onClose: () => void;
  onSelectEmail: (email: SimilarEmail) => void;
  isLoadingSimilar: boolean;
}

export function EmailDetail({ email, onClose, onSelectEmail, isLoadingSimilar }: EmailDetailProps) {
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

              {/* Similar Emails */}
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800/50">
                <h2 className="text-lg font-semibold text-zinc-100 mb-4">Similar Emails</h2>
                <div className="relative">
                  <HoverEffect
                    items={email.similar_emails.map((email) => ({
                      icon: (
                        <div className="flex items-center justify-between w-full">
                          <span className="text-brand-400">
                            {(email.similarity * 100).toFixed(1)}% similar
                          </span>
                        </div>
                      ),
                      title: email.subject,
                      description: email.content,
                      onClick: () => onSelectEmail(email)
                    }))}
                    className="w-full"
                  />
                </div>
              </div>


            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Intents */}
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800/50">
                <h2 className="text-lg font-semibold text-zinc-100 mb-4">Top Request Types</h2>
                <div className="space-y-4">
                  {email.request_types.map((intent) => (
                    <div
                      key={intent.intent}
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

              {/* Features */}
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800/50">
                <h2 className="text-lg font-semibold text-zinc-100 mb-4">Sub Request Types</h2>
                <div className="space-y-4">
                  {email.sub_request_types.map((feature) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}