import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { HoverEffect } from '../card-hover-effect';
import { Mail, BarChart3, AlertTriangle } from 'lucide-react';

describe('HoverEffect Component', () => {
  const mockItems = [
    {
      icon: <BarChart3 data-testid="chart-icon" />,
      title: "First Item",
      description: "First description"
    },
    {
      icon: <Mail data-testid="mail-icon" />,
      title: "Second Item",
      description: "Second description"
    },
    {
      icon: <AlertTriangle data-testid="alert-icon" />,
      title: "Third Item",
      description: "Third description"
    }
  ];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('renders the first item by default', () => {
    render(<HoverEffect items={mockItems} />);
    expect(screen.getByText('First Item')).toBeInTheDocument();
    expect(screen.getByText('First description')).toBeInTheDocument();
  });

  it('shows correct number of navigation dots', () => {
    render(<HoverEffect items={mockItems} />);
    const dots = screen.getAllByRole('button');
    expect(dots).toHaveLength(mockItems.length);
  });

  it('changes slide when clicking navigation dots', () => {
    render(<HoverEffect items={mockItems} />);
    const dots = screen.getAllByRole('button');
    
    fireEvent.click(dots[1]);
    expect(screen.getByText('Second Item')).toBeInTheDocument();
    
    fireEvent.click(dots[2]);
    expect(screen.getByText('Third Item')).toBeInTheDocument();
  });

  it('auto-advances slides every 5 seconds', () => {
    render(<HoverEffect items={mockItems} />);
    
    expect(screen.getByText('First Item')).toBeInTheDocument();
    
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText('Second Item')).toBeInTheDocument();
    
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText('Third Item')).toBeInTheDocument();
  });

  it('handles touch swipe gestures', () => {
    render(<HoverEffect items={mockItems} />);
    const container = screen.getByText('First Item').parentElement!;

    // Simulate swipe left
    fireEvent.touchStart(container, { touches: [{ clientX: 200 }] });
    fireEvent.touchMove(container, { touches: [{ clientX: 50 }] });
    fireEvent.touchEnd(container);

    expect(screen.getByText('Second Item')).toBeInTheDocument();

    // Simulate swipe right
    fireEvent.touchStart(container, { touches: [{ clientX: 50 }] });
    fireEvent.touchMove(container, { touches: [{ clientX: 200 }] });
    fireEvent.touchEnd(container);

    expect(screen.getByText('First Item')).toBeInTheDocument();
  });
});