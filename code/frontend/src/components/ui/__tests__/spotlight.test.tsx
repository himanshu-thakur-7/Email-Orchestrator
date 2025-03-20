import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Spotlight } from '../spotlight';

describe('Spotlight Component', () => {
  it('renders children correctly', () => {
    render(
      <Spotlight>
        <div>Test Content</div>
      </Spotlight>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Spotlight className="custom-class">
        <div>Content</div>
      </Spotlight>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles mouse events', () => {
    const { container } = render(
      <Spotlight>
        <div>Content</div>
      </Spotlight>
    );
    
    const element = container.firstChild as HTMLElement;
    
    // Mouse enter
    fireEvent.mouseEnter(element);
    const spotlight = element.querySelector('div:nth-child(1)');
    expect(spotlight).toHaveStyle({ opacity: '1' });
    
    // Mouse leave
    fireEvent.mouseLeave(element);
    expect(spotlight).toHaveStyle({ opacity: '0' });
  });

  it('updates spotlight position on mouse move', () => {
    const { container } = render(
      <Spotlight>
        <div>Content</div>
      </Spotlight>
    );
    
    const element = container.firstChild as HTMLElement;
    
    fireEvent.mouseMove(element, {
      clientX: 100,
      clientY: 100
    });
    
    const spotlight = element.querySelector('div:nth-child(1)');
    expect(spotlight).toHaveStyle({
      background: expect.stringContaining('radial-gradient')
    });
  });
});