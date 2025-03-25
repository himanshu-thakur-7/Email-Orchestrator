import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from '../sidebar';
import { Mail, Inbox, AlertTriangle, FileText, HelpCircle } from 'lucide-react';

describe('Sidebar Component', () => {
  const mockCategories = [
    { name: 'all', icon: <Inbox data-testid="inbox-icon" />, label: 'All Emails' },
    { name: 'invoice', icon: <FileText data-testid="file-icon" />, label: 'Invoices' },
    { name: 'support', icon: <HelpCircle data-testid="help-icon" />, label: 'Support' },
    { name: 'spam', icon: <AlertTriangle data-testid="alert-icon" />, label: 'Spam' },
    { name: 'inquiry', icon: <Mail data-testid="mail-icon" />, label: 'Inquiries' },
    { name: 'archive', icon: <Mail data-testid="archive-icon" />, label: 'Archive' },
  ];

  const defaultProps = {
    categories: mockCategories,
    selectedCategory: 'all',
    onSelectCategory: vi.fn(),
    className: 'test-class',
  };

  it('renders first 4 categories by default', () => {
    render(<Sidebar {...defaultProps} />);
    expect(screen.getByText('All Emails')).toBeInTheDocument();
    expect(screen.getByText('Invoices')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Spam')).toBeInTheDocument();
    expect(screen.queryByText('Inquiries')).not.toBeInTheDocument();
  });

  it('shows "Show More" button when there are more than 4 categories', () => {
    render(<Sidebar {...defaultProps} />);
    expect(screen.getByText('Show More (2 more)')).toBeInTheDocument();
  });

  it('expands to show all categories when clicking "Show More"', () => {
    render(<Sidebar {...defaultProps} />);
    fireEvent.click(screen.getByText('Show More (2 more)'));
    expect(screen.getByText('Inquiries')).toBeInTheDocument();
    expect(screen.getByText('Archive')).toBeInTheDocument();
    expect(screen.getByText('Show Less')).toBeInTheDocument();
  });

  it('collapses categories when clicking "Show Less"', () => {
    render(<Sidebar {...defaultProps} />);
    fireEvent.click(screen.getByText('Show More (2 more)'));
    fireEvent.click(screen.getByText('Show Less'));
    expect(screen.queryByText('Inquiries')).not.toBeInTheDocument();
    expect(screen.queryByText('Archive')).not.toBeInTheDocument();
  });

  it('calls onSelectCategory when clicking a category', () => {
    render(<Sidebar {...defaultProps} />);
    fireEvent.click(screen.getByText('Invoices'));
    expect(defaultProps.onSelectCategory).toHaveBeenCalledWith('invoice');
  });

  it('applies selected styles to active category', () => {
    render(<Sidebar {...defaultProps} selectedCategory="invoice" />);
    const invoiceButton = screen.getByText('Invoices').closest('button');
    expect(invoiceButton).toHaveClass('bg-brand-500');
  });

  it('renders stats box with processing information', () => {
    render(<Sidebar {...defaultProps} />);
    expect(screen.getByText('Processing Stats')).toBeInTheDocument();
    expect(screen.getByText('Average Confidence')).toBeInTheDocument();
    expect(screen.getByText('91.5%')).toBeInTheDocument();
    expect(screen.getByText('Processed Emails')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });
});