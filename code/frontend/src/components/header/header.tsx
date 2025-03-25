import React from 'react';
import { Logo } from './logo';
import { Actions } from './actions';

interface HeaderProps {
  onOpenSettings: () => void;
}

export function Header({ onOpenSettings }: HeaderProps) {
  return (
    <header className="flex-shrink-0 border-b border-zinc-800/50 bg-zinc-900/50 backdrop-blur-xl">
      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <Actions onOpenSettings={onOpenSettings} />
        </div>
      </div>
    </header>
  );
}