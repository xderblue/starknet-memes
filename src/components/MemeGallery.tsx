'use client';

import React, { useState } from 'react';
import { Upload, Twitter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import memesData from '@/data/memes.json';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorType extends Error {
  message: string;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => (
  <Alert variant="destructive">
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{children}</AlertDescription>
  </Alert>
);

export default function MemeGallery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [memes] = useState(memesData.memes);

  const filteredMemes = memes.filter(meme => 
    meme.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedType === 'all' || meme.type === selectedType)
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
    }
  };

  // Dans handleSubmit
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!uploadFile || !uploadTitle) return;

  const formData = new FormData();
  formData.append('file', uploadFile);
  formData.append('title', uploadTitle);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Upload failed');
    }

    setUploadFile(null);
    setUploadTitle('');
    
    // Ajoutez un message de succès
    alert('Meme submitted for review! We will process it shortly.');
  } catch (error) {
    console.error('Upload error:', error);
    alert('Failed to upload meme. Please try again or contact support.');
  }
};
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-6 flex-1">
              <img src="/starknet-logo.png" alt="Starknet" className="h-8 w-8" />
              <Input
                type="text"
                placeholder="Search memes..."
                className="max-w-md bg-transparent border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <a 
              href="https://x.com/derbluex" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
            >
              <Twitter size={20} />
            </a>
          </div>
          <div className="flex gap-1 mt-3">
            {['all', 'image', 'gif', 'video'].map(type => (
              <Button
                key={type}
                onClick={() => setSelectedType(type)}
                variant="ghost"
                className={`
                  text-sm px-4 rounded-full transition-colors
                  ${selectedType === type 
                    ? 'bg-black text-white hover:bg-black/90' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </header>

      {/* Upload Section */}
      <div className="max-w-7xl mx-auto p-4">
        <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors bg-white/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-full">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium">Submit a Meme</h3>
              <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <input
                    type="file"
                    accept="image/*,video/*,.gif"
                    onChange={handleFileUpload}
                    className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                  />
                </div>
                <Input
                  type="text"
                  placeholder="Give your meme a title"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="bg-white"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-black hover:bg-black/90 text-white rounded-full h-11"
                  disabled={!uploadFile || !uploadTitle}
                >
                  Submit Meme
                </Button>
              </form>
              <p className="text-sm text-gray-500">
                Recommended Size 300x200px • Maximum file size 10MB
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Memes Grid */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-6">
          {filteredMemes.map(meme => (
            <div key={meme.id} className="break-inside-avoid mb-6">
              <Card className="bg-white hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-0 relative group">
                  {meme.type === 'video' ? (
                    <video 
                      src={meme.url} 
                      controls 
                      className="w-full h-auto"
                    />
                  ) : (
                    <div className="relative">
                      <img
                        src={meme.url}
                        alt={meme.title || "meme"}
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                        <div className="p-4 text-white w-full">
                          <p className="text-sm font-medium truncate">
                            {meme.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}