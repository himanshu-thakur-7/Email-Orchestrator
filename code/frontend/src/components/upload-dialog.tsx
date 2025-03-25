import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from './ui/dialog';
import { ProcessingDialog } from './processing-dialog';
import { emailApi } from '../services/api';

interface FileWithPreview extends File {
  preview?: string;
}

export function UploadDialog() {
  const [files, setFiles] = React.useState<FileWithPreview[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setFiles(prev => [
        ...prev,
        ...acceptedFiles.map(file => 
          Object.assign(file, {
            preview: file.type.startsWith('image/') 
              ? URL.createObjectURL(file)
              : undefined
          })
        )
      ]);
    } catch (error) {
      console.error('Failed to handle files:', error);
      // Handle error appropriately
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'message/rfc822': ['.eml'],
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'text/*': ['.txt']
    }
  });

  const removeFile = (name: string) => {
    setFiles(files => files.filter(file => file.name !== name));
  };

  React.useEffect(() => {
    return () => files.forEach(file => {
      if (file.preview) URL.revokeObjectURL(file.preview);
    });
  }, [files]);

  const handleProcessFiles = async () => {
    try {
      setIsProcessing(true);
      console.log('Uploading files:', files);
      await emailApi.uploadEmails(files);
      // Close dialog and reset state after successful upload
      setTimeout(() => {
        setIsProcessing(false);
        setFiles([]);
        onClose();
      }, 4000);
    } catch (error) {
      console.error('Failed to process files:', error);
      // Handle error appropriately
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-zinc-900">
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </button>
        </DialogTrigger>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-zinc-100">Upload Email & Attachments</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Drop email files (.eml) and attachments here or click to browse
            </DialogDescription>
          </DialogHeader>
          
          <div
            {...getRootProps()}
            className={`mt-4 p-8 border-2 border-dashed rounded-xl transition-colors ${
              isDragActive 
                ? 'border-brand-500 bg-brand-500/10' 
                : 'border-zinc-700 hover:border-brand-500'
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center text-sm text-zinc-400">
              <Upload className="w-8 h-8 mb-4 text-zinc-500" />
              <p className="font-medium">
                {isDragActive
                  ? "Drop the files here"
                  : "Drag 'n' drop files here, or click to select files"}
              </p>
              <p className="mt-1">
                Supports .eml, .pdf, .txt, and image files
              </p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-sm text-zinc-100 mb-3">
                Selected Files ({files.length})
              </h4>
              <div className="space-y-2">
                {files.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <File className="w-4 h-4 text-zinc-400" />
                      <span className="text-sm text-zinc-300 truncate max-w-[300px]">
                        {file.name}
                      </span>
                      <span className="text-xs text-zinc-500">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      onClick={() => removeFile(file.name)}
                      className="p-1 hover:bg-zinc-700 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-zinc-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DialogFooter className="mt-6">
            <button
              onClick={handleProcessFiles}
              disabled={files.length === 0}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Process Files
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ProcessingDialog 
        isOpen={isProcessing}
        onOpenChange={setIsProcessing}
      />
    </>
  );
}