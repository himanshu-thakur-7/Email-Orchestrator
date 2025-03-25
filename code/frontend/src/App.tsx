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
        const fetchedCategories = await emailApi.fetchCategories();
        if (fetchedCategories.length > 0) {
          const iconMap: { [key: string]: React.ReactNode } = {
            'Inbox': <Inbox className="h-4 w-4" />,
            'FileText': <FileText className="h-4 w-4" />,
            'AlertTriangle': <AlertTriangle className="h-4 w-4" />,
            'HelpCircle': <HelpCircle className="h-4 w-4" />,
            'Mail': <Mail className="h-4 w-4" />
          };
          
          const mappedCategories = [
            { name: 'all', icon: <Inbox className="h-4 w-4" />, label: 'All Emails' },
            ...fetchedCategories.map(cat => ({
              name: cat.name.toLowerCase(),
              icon: iconMap[cat.icon] || <Mail className="h-4 w-4" />,
              label: cat.label
            }))
          ];
          setCategories(mappedCategories);
        }
        
        setIsLoading(false);

        // Then fetch emails
        const fetchedEmails = await emailApi.fetchEmails();
        setEmails(fetchedEmails.length > 0 ? fetchedEmails : fallbackEmails);
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

  const getCategoryColor = (category: string) => {
    const colors = {
      'Invoice': 'bg-blue-900/30 text-blue-300 border border-blue-800/50',
      'Support': 'bg-red-900/30 text-red-300 border border-red-800/50',
      'Spam': 'bg-yellow-900/30 text-yellow-300 border border-yellow-800/50',
      'Inquiry': 'bg-green-900/30 text-green-300 border border-green-800/50'
    };
    return colors[category] || 'bg-zinc-900/30 text-zinc-300 border border-zinc-800/50';
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