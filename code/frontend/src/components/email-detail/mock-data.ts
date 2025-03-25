import { Intent, Feature, SimilarEmail } from './types';

export const mockIntents: Intent[] = [
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

export const mockFeatures: Feature[] = [
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

export const mockSimilarEmails: SimilarEmail[] = [
  {
    id: '2',
    subject: 'Invoice #1235 for Q4 Services',
    similarity: 0.95,
    category: 'Invoice',
    sender: 'billing@company.com',
    content: `Dear Customer,\n\nWe hope this email finds you well. Please find attached Invoice #1235 for Q4 Services.\n\nQ4 Services - $6,000\nService Period: October 1 - December 31, 2024\n\nPayment Terms: Net 30\nDue Date: December 31, 2024\n\nPlease process this payment at your earliest convenience.\n\nBest regards,\nBilling Team`,
    timestamp: '2024-03-09T15:30:00'
  },
  {
    id: '3',
    subject: 'Q2 Services Invoice #1456',
    similarity: 0.89,
    category: 'Invoice',
    sender: 'billing@company.com',
    content: `Dear Customer,\n\nPlease find attached Invoice #1456 for Q2 Services.\n\nQ2 Services - $5,500\nService Period: April 1 - June 30, 2024\n\nPayment Terms: Net 30\nDue Date: June 30, 2024\n\nPlease process this payment at your earliest convenience.\n\nBest regards,\nBilling Team`,
    timestamp: '2024-03-08T11:45:00'
  },
  {
    id: '4',
    subject: 'Payment Request: Invoice #1789',
    similarity: 0.82,
    category: 'Invoice',
    sender: 'billing@company.com',
    content: `Dear Customer,\n\nThis is a payment request for Invoice #1789.\n\nMonthly Services - $3,000\nService Period: March 2024\n\nPayment Terms: Net 15\nDue Date: March 20, 2024\n\nPlease process this payment at your earliest convenience.\n\nBest regards,\nBilling Team`,
    timestamp: '2024-03-07T09:15:00'
  }
];