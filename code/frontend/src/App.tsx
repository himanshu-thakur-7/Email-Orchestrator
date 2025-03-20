import React, { useState } from 'react';
import { Mail, Inbox, AlertTriangle, FileText, HelpCircle, BarChart3, Settings, Search, Bell, Loader2 } from 'lucide-react';
import { AnimatedBackground } from './components/ui/animated-background';
import { Spotlight } from './components/ui/spotlight';
import { HoverEffect } from './components/ui/card-hover-effect';
import { motion } from 'framer-motion';

interface Email {
  id: string;
  subject: string;
  sender: string;
  category: 'Invoice' | 'Support' | 'Spam' | 'Inquiry';
  confidence: number;
  timestamp: string;
  processed: boolean;
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const emails: Email[] = [
    {
      id: '1',
      subject: 'Invoice #1234 for Q1 Services',
      sender: 'billing@company.com',
      category: 'Invoice',
      confidence: 0.98,
      timestamp: '2024-03-10T10:30:00',
      processed: true
    },
    {
      id: '2',
      subject: 'Urgent: System Access Issue',
      sender: 'john@client.com',
      category: 'Support',
      confidence: 0.95,
      timestamp: '2024-03-10T09:15:00',
      processed: false
    },
    {
      id: '3',
      subject: 'Product Inquiry',
      sender: 'potential@customer.com',
      category: 'Inquiry',
      confidence: 0.92,
      timestamp: '2024-03-10T08:45:00',
      processed: true
    }
  ];

  const categories = [
    { name: 'all', icon: Inbox, label: 'All Emails' },
    { name: 'invoice', icon: FileText, label: 'Invoices' },
    { name: 'support', icon: HelpCircle, label: 'Support' },
    { name: 'spam', icon: AlertTriangle, label: 'Spam' },
    { name: 'inquiry', icon: Mail, label: 'Inquiries' }
  ];

  const filteredEmails = emails
    .filter(email => {
      // First apply category filter
      const categoryMatch = selectedCategory === 'all' || 
        email.category.toLowerCase() === selectedCategory;
      
      // Then apply search filter
      const searchMatch = searchQuery === '' || 
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.sender.toLowerCase().includes(searchQuery.toLowerCase());
      
      return categoryMatch && searchMatch;
    });

  const getCategoryColor = (category: string) => {
    const colors = {
      'Invoice': 'bg-blue-900/30 text-blue-300 border border-blue-800/50',
      'Support': 'bg-red-900/30 text-red-300 border border-red-800/50',
      'Spam': 'bg-yellow-900/30 text-yellow-300 border border-yellow-800/50',
      'Inquiry': 'bg-green-900/30 text-green-300 border border-green-800/50'
    };
    return colors[category] || 'bg-zinc-900/30 text-zinc-300 border border-zinc-800/50';
  };

  const stats = [
    {
      icon: <BarChart3 className="h-6 w-6 text-indigo-400" />,
      title: "Processed Today",
      description: "1,234 emails have been automatically processed and categorized by our AI system today."
    },
    {
      icon: <Mail className="h-6 w-6 text-indigo-400" />,
      title: "Average Confidence",
      description: "95.8% confidence score across all processed emails, ensuring high accuracy in categorization."
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-indigo-400" />,
      title: "Spam Detection",
      description: "Successfully identified and filtered 127 spam emails in the last 24 hours."
    }
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-900/50 backdrop-blur-xl">
        <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-glow"
              >
                <Mail className="h-6 w-6 text-white" />
              </motion.div>
              <h1 className="text-2xl font-semibold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Email Processor
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <Bell className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <Settings className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0 space-y-6">
            <Spotlight className="p-2 space-y-1">
              {categories.map((category) => (
                <motion.button
                  key={category.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    selectedCategory === category.name
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-glow'
                      : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100'
                  }`}
                >
                  <category.icon className="mr-3 h-5 w-5" />
                  {category.label}
                </motion.button>
              ))}
            </Spotlight>

            {/* Analytics Cards */}
            <HoverEffect items={stats} className="grid-cols-1" />
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Search */}
            <Spotlight className="p-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search emails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent border-0 focus:ring-0 text-zinc-100 placeholder:text-zinc-500 text-lg"
                />
                <Search className="absolute left-3 top-4 h-5 w-5 text-zinc-500" />
              </div>
            </Spotlight>

            {/* Email List */}
            <Spotlight className="divide-y divide-zinc-800/50">
              {filteredEmails.length === 0 ? (
                <div className="p-8 text-center text-zinc-400">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No emails found</p>
                  <p className="text-sm mt-2">Try adjusting your search or filters</p>
                </div>
              ) : (
                filteredEmails.map((email) => (
                  <motion.div
                    key={email.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 hover:bg-zinc-800/20 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(email.category)}`}>
                            {email.category}
                          </span>
                          <p className="text-base font-medium text-zinc-100 truncate">
                            {email.subject}
                          </p>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-zinc-400 truncate">
                            From: {email.sender}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="text-sm text-zinc-300">
                            {new Date(email.timestamp).toLocaleTimeString()}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            {email.processed ? (
                              <div className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-lg shadow-green-500/50 animate-pulse" />
                            ) : (
                              <Loader2 className="h-4 w-4 text-yellow-500 animate-spin" />
                            )}
                            <p className="text-sm text-zinc-400">
                              {(email.confidence * 100).toFixed(1)}% confident
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </Spotlight>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;