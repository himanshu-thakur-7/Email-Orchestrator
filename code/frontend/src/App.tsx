import React, { useState, useEffect } from 'react';
import { Mail, Inbox, AlertTriangle, FileText, HelpCircle } from 'lucide-react';
import { AnimatedBackground } from './components/ui/animated-background';
import { LoadingScreen } from './components/ui/loading-screen';
import { EmailDetail } from './components/email-detail';
import { SettingsDialog } from './components/settings-dialog';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { EmailList } from './components/email-list/email-list';
import { Footer } from './components/footer/footer';
import { emailApi } from './services/api';
import type { Email } from './types/email';

const fallbackCategories = [
  { name: 'all', icon: <Inbox className="h-4 w-4" />, label: 'All Emails' },
  { name: 'invoice', icon: <FileText className="h-4 w-4" />, label: 'Invoices' },
  { name: 'support', icon: <HelpCircle className="h-4 w-4" />, label: 'Support' },
  { name: 'spam', icon: <AlertTriangle className="h-4 w-4" />, label: 'Spam' },
  { name: 'inquiry', icon: <Mail className="h-4 w-4" />, label: 'Inquiries' }
];

const fallbackEmails = [
  {
    id: '1',
    subject: 'Invoice #1234 for Q1 Services',
    sender: 'billing@company.com',
    category: 'Invoice',
    confidence: 0.98,
    timestamp: '2024-03-10T10:00:00',
    processed: true,
    content: `Dear Customer,

Please find attached Invoice #1234 for Q1 Services.

Q1 Services - $5,000
Service Period: January 1 - March 31, 2024

Payment Terms: Net 30
Due Date: March 31, 2024

Please process this payment at your earliest convenience.

Best regards,
Billing Team`
  },
  {
    id: '2',
    subject: 'Technical Support Required',
    sender: 'support@company.com',
    category: 'Support',
    confidence: 0.85,
    timestamp: '2024-03-10T09:30:00',
    processed: true
  },
  {
    id: '3',
    subject: 'Special Offer - Limited Time!',
    sender: 'marketing@spam.com',
    category: 'Spam',
    confidence: 0.95,
    timestamp: '2024-03-10T09:00:00',
    processed: true
  },
  {
    id: '4',
    subject: 'Product Inquiry',
    sender: 'potential.customer@email.com',
    category: 'Inquiry',
    confidence: 0.88,
    timestamp: '2024-03-10T08:30:00',
    processed: false
  }
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEmails, setIsLoadingEmails] = useState(true);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(false);
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [categories, setCategories] = useState(fallbackCategories);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        setIsLoadingEmails(true);

        // Fetch categories first
        // const fetchedCategories = await emailApi.fetchCategories();
        // if (fetchedCategories.length > 0) {
        //   const iconMap: { [key: string]: React.ReactNode } = {
        //     'Inbox': <Inbox className="h-4 w-4" />,
        //     'FileText': <FileText className="h-4 w-4" />,
        //     'AlertTriangle': <AlertTriangle className="h-4 w-4" />,
        //     'HelpCircle': <HelpCircle className="h-4 w-4" />,
        //     'Mail': <Mail className="h-4 w-4" />
        //   };

        //   const mappedCategories = [
        //     { name: 'all', icon: <Inbox className="h-4 w-4" />, label: 'All Emails' },
        //     ...fetchedCategories.map(cat => ({
        //       name: cat.name.toLowerCase(),
        //       icon: iconMap[cat.icon] || <Mail className="h-4 w-4" />,
        //       label: cat.label
        //     }))
        //   ];
        //   setCategories(mappedCategories);
        // }


        // Then fetch emails
        const fetchedEmails = await emailApi.fetchEmails();
        setEmails(fetchedEmails.length > 0 ? fetchedEmails : fallbackEmails);

        const cats = fetchedEmails.map(email => email.category);
        const uniqueCats = [...new Set(cats)];
        const mappedCategories = [
          { name: 'all', icon: <Inbox className="h-4 w-4" />, label: 'All Emails' },
          ...uniqueCats.map(cat => ({
            name: cat.toLowerCase(),
            icon: <Mail className="h-4 w-4" />,
            label: cat
          }))
        ];
        setCategories(mappedCategories);

        setIsLoading(false);
        setIsLoadingEmails(false);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
        setEmails(fallbackEmails);
        setCategories(fallbackCategories);
        setIsLoading(false);
        setIsLoadingEmails(false);
      }
    };

    fetchInitialData();
  }, []);

  const filteredEmails = emails.filter(email => {
    const categoryMatch = selectedCategory === 'all' ||
      email.category.toLowerCase() === selectedCategory;

    const searchMatch = searchQuery === '' ||
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const categoryMap: { [key: string]: number } = {};

  const getCategoryColor = (category: string) => {
    const colors = [
      'bg-blue-900/30 text-blue-300 border border-blue-800/50',
      'bg-red-900/30 text-red-300 border border-red-800/50',
      'bg-yellow-900/30 text-yellow-300 border border-yellow-800/50',
      'bg-green-900/30 text-green-300 border border-green-800/50',
      'bg-purple-900/30 text-purple-300 border border-purple-800/50',
      'bg-pink-900/30 text-pink-300 border border-pink-800/50',
      'bg-indigo-900/30 text-indigo-300 border border-indigo-800/50',
      'bg-cyan-900/30 text-cyan-300 border border-cyan-800/50',
      'bg-orange-900/30 text-orange-300 border border-orange-800/50',
      'bg-teal-900/30 text-teal-300 border border-teal-800/50',
      'bg-lime-900/30 text-lime-300 border border-lime-800/50',
      'bg-violet-900/30 text-violet-300 border border-violet-800/50',
      'bg-amber-900/30 text-amber-300 border border-amber-800/50',
      'bg-emerald-900/30 text-emerald-300 border border-emerald-800/50',
      'bg-crimson-900/30 text-crimson-300 border border-crimson-800/50',
      'bg-rose-900/30 text-rose-300 border border-rose-800/50',
      'bg-sky-900/30 text-sky-300 border border-sky-800/50',
      'bg-azure-900/30 text-azure-300 border border-azure-800/50',
      'bg-lavender-900/30 text-lavender-300 border border-lavender-800/50',
      'bg-orchid-900/30 text-orchid-300 border border-orchid-800/50',
      'bg-olive-900/30 text-olive-300 border border-olive-800/50',
    ];

    // Check if the category already has a color assigned
    if (categoryMap[category] !== undefined) {
      return colors[categoryMap[category]];
    }

    // Find the next free color
    const usedIndices = new Set(Object.values(categoryMap));
    let freeIndex = colors.findIndex((_, index) => !usedIndices.has(index));

    // If no free color is available, assign any (fallback to hash-based index)
    if (freeIndex === -1) {
      const hash = (s: string) => {
        return s.split('').reduce((a, b) => {
          a = ((a << 5) - a) + b.charCodeAt(0);
          return a & a;
        }, 0);
      };
      freeIndex = Math.abs(hash(category)) % colors.length;
    }

    // Assign the color to the category and return it
    categoryMap[category] = freeIndex;
    return colors[freeIndex];
  };

  const handleSelectSimilarEmail = async (similarEmail: any) => {
    try {
      setIsLoadingSimilar(true);
      const result = await emailApi.getEmailDetails(similarEmail.id);
      setSelectedEmail({
        ...similarEmail,
        processed: true,
        confidence: similarEmail.similarity,
        intents: result.intents,
        features: result.features,
        similarEmails: result.similarEmails,
      });
    } catch (error) {
      console.error('Failed to fetch email details:', error);
    } finally {
      setIsLoadingSimilar(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (selectedEmail) {
    return (
      <EmailDetail
        email={selectedEmail}
        onClose={() => setSelectedEmail(null)}
        onSelectEmail={handleSelectSimilarEmail}
        isLoadingSimilar={isLoadingSimilar}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-zinc-950">
      <AnimatedBackground />
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />

      <div className="flex-1 overflow-hidden">
        <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
          <div className="flex gap-8 h-full">
            <Sidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              className="w-80 flex-shrink-0"
            />

            <EmailList
              emails={filteredEmails}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSelectEmail={setSelectedEmail}
              getCategoryColor={getCategoryColor}
              isLoading={isLoadingEmails}
            />
          </div>
        </div>
      </div>

      <Footer />

      <SettingsDialog
        isOpen={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
      />
    </div>
  );
}

export default App;