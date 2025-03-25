import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EmailDetail } from '../../email-detail';

describe('EmailDetail Component', () => {
  const mockEmail = {
    id: '1',
    subject: 'Test Email',
    sender: 'test@example.com',
    content: 'Test content',
    category: 'Invoice',
    timestamp: '2024-03-10T10:00:00',
  };

  const defaultProps = {
    email: mockEmail,
    onClose: vi.fn(),
    onSelectEmail: vi.fn(),
    isLoadingSimilar: false,
  };

  it('renders email details correctly', () => {
    render(<EmailDetail {...defaultProps} />);
    expect(screen.getByText('Test Email')).toBeInTheDocument();
    expect(screen.getByText('From: test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('shows loading overlay when isLoadingSimilar is true', () => {
    render(<EmailDetail {...defaultProps} isLoadingSimilar={true} />);
    const loadingOverlay = screen.getByTestId('loading-overlay');
    expect(loadingOverlay).toBeInTheDocument();
    expect(loadingOverlay).toHaveAttribute('role', 'dialog');
    expect(loadingOverlay).toHaveAttribute('aria-label', 'Loading similar emails');
  });

  it('calls onClose when clicking back button', () => {
    render(<EmailDetail {...defaultProps} />);
    fireEvent.click(screen.getByText('Back to Inbox'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('formats timestamp correctly', () => {
    render(<EmailDetail {...defaultProps} />);
    const date = new Date(mockEmail.timestamp);
    const formattedDate = date.toLocaleString();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it('renders similar emails section with correct data', () => {
    render(<EmailDetail {...defaultProps} />);
    expect(screen.getByText('Similar Emails')).toBeInTheDocument();
    expect(screen.getByText('Invoice #1235 for Q4 Services')).toBeInTheDocument();
    expect(screen.getByText('95.0% similar')).toBeInTheDocument();
  });

  it('calls onSelectEmail when clicking a similar email', () => {
    render(<EmailDetail {...defaultProps} />);
    const similarEmail = screen.getByRole('button', { name: /95.0% similar Invoice #1235 for Q4 Services/i });
    fireEvent.click(similarEmail);
    expect(defaultProps.onSelectEmail).toHaveBeenCalled();
  });
});