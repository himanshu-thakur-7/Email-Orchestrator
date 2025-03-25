import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HoverEffect } from '../card-hover-effect';
import { BarChart3 } from 'lucide-react';

describe('HoverEffect Component', () => {
  const mockItems = [
    {
      icon: <BarChart3 data-testid="chart-icon" />,
      title: "First Item",
      description: "First description",
      onClick: vi.fn()
    },
    {
      icon: <BarChart3 data-testid="chart-icon" />,
      title: "Second Item",
      description: "Second description",
      onClick: vi.fn()
    }
  ];

  it('renders the first item', () => {
    render(<HoverEffect items={mockItems} />);
    expect(screen.getByText('First Item')).toBeInTheDocument();
    expect(screen.getByText('First description')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    render(<HoverEffect items={mockItems} />);
    const firstSlide = screen.getByRole('button', { name: /First Item/i });
    fireEvent.click(firstSlide);
    expect(mockItems[0].onClick).toHaveBeenCalled();
  });

  it('shows navigation dots', () => {
    render(<HoverEffect items={mockItems} />);
    const navigationDots = screen.getAllByRole('button', { name: /Go to slide/i });
    expect(navigationDots).toHaveLength(mockItems.length);
  });

  it('changes slide on dot click', async () => {
    render(<HoverEffect items={mockItems} />);
    const secondDot = screen.getByRole('button', { name: 'Go to slide 2' });
    fireEvent.click(secondDot);

    await waitFor(() => {
      expect(screen.getByText('Second Item')).toBeInTheDocument();
    });
  });
});