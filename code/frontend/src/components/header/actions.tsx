import React from 'react';
import { Settings } from 'lucide-react';
import { UploadDialog } from '../upload-dialog';

interface ActionsProps {
  onOpenSettings: () => void;
}

export function Actions({ onOpenSettings }: ActionsProps) {
  return (
    <div className="flex items-center space-x-4">
      <UploadDialog />
      <button 
        className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
        onClick={onOpenSettings}
      >
        <Settings className="h-5 w-5" />
      </button>
    </div>
  );
}