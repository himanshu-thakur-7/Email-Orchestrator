import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../../App';
import { emailApi } from '../../../services/api';

// Mock the email API
vi.mock('../../../services/api', () => ({
  emailApi: {
    fetchEmails: vi.fn(),
    fetchCategories: vi.fn(),
    getEmailDetails: vi.fn(),
  },
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Mock successful API responses with empty arrays
    (emailApi.fetchEmails as any).mockResolvedValue([]);
    (emailApi.fetchCategories as any).mockResolvedValue([]);
  });

  it('renders loading screen initially', async () => {
    render(<App />);
    expect(screen.getByText('Loading Email Processor')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByText('Loading Email Processor')).not.toBeInTheDocument();
    });
  });

  it('shows fallback data when API fails', async () => {
    // Mock API failures
    (emailApi.fetchEmails as any).mockRejectedValue(new Error('API Error'));
    (emailApi.fetchCategories as any).mockRejectedValue(new Error('API Error'));

    render(<App />);

    // Wait for loading to complete and fallback data to be shown
    await waitFor(() => {
      expect(screen.getByText('Invoice #1234 for Q1 Services')).toBeInTheDocument();
      expect(screen.getByText('All Emails')).toBeInTheDocument();
    });

    // Verify fallback categories are shown
    expect(screen.getByText('Invoices')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Spam')).toBeInTheDocument();
  });

  it('filters emails based on search query', async () => {
    const mockEmails = [
      { 
        id: '1',
        subject: 'Test Email',
        sender: 'test@example.com',
        category: 'Invoice',
        confidence: 0.9,
        timestamp: '2024-03-10T10:00:00',
        processed: true
      },
      {
        id: '2',
        subject: 'Another Email',
        sender: 'other@example.com',
        category: 'Support',
        confidence: 0.8,
        timestamp: '2024-03-10T10:00:00',
        processed: false
      }
    ];

    (emailApi.fetchEmails as any).mockResolvedValue(mockEmails);

    render(<App />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading Email Processor')).not.toBeInTheDocument();
    });

    // Verify search functionality
    const searchInput = screen.getByPlaceholderText('Search emails...');
    fireEvent.change(searchInput, { target: { value: 'Test' } });

    await waitFor(() => {
      expect(screen.getByText('Test Email')).toBeInTheDocument();
      expect(screen.queryByText('Another Email')).not.toBeInTheDocument();
    });
  });

  it('renders footer with copyright text', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('© 2025 Double Dragon')).toBeInTheDocument();
    });
  });
});