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

type ErrorType = {
 message: string;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => (
 <Alert variant="destructive">
   <AlertTitle>Error</AlertTitle>
   <AlertDescription>{children}</AlertDescription>
 </Alert>
);

const GOOGLE_FORM_URL = "VOTRE_URL_GOOGLE_FORM";

export default function MemeGallery() {
 const [searchQuery, setSearchQuery] = useState('');
 const [selectedType, setSelectedType] = useState('all');
 const [memes] = useState(memesData.memes);

 const filteredMemes = memes.filter(meme => 
   meme.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
   (selectedType === 'all' || meme.type === selectedType)
 );

 const handleSubmit = () => {
   window.open(GOOGLE_FORM_URL, '_blank');
 };

 if (!memes) {
   return <ErrorBoundary>Erreur de chargement des memes</ErrorBoundary>;
 }

 return (
   <div className={"min-h-screen bg-gradient-to-r from-[#B8C6FF] to-[#CAD2FF] text-[#2A2F4F]"}>
     <header className={"p-4 border-b border-[#8E9DFF]/30"}>
       <div className={"max-w-7xl mx-auto flex items-center justify-between gap-4"}>
         <div className={"flex items-center gap-4"}>
           <img src="/starknet-logo.png" alt="Starknet" className={"h-10 w-10"} />
           <Input
             type="text"
             placeholder="Search for memes in this depot"
             className={"flex-grow bg-white/50 border-[#8E9DFF]/30 text-[#2A2F4F] placeholder-[#2A2F4F]/50 focus:border-[#8E9DFF] focus:ring-[#8E9DFF]/30"}
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
         </div>
         <a 
           href="https://x.com/derbluex" 
           target="_blank" 
           rel="noopener noreferrer"
           className={"text-[#2A2F4F] hover:text-[#8E9DFF] transition-colors"}
         >
           <Twitter size={24} />
         </a>
       </div>
       <div className={"max-w-7xl mx-auto flex gap-2 mt-4"}>
         {['all', 'image', 'gif', 'video'].map(type => (
           <Button
             key={type}
             onClick={() => setSelectedType(type)}
             className={`${selectedType === type ? 'bg-[#8E9DFF]' : 'bg-white/50'} text-[#2A2F4F] font-medium rounded-full`}
           >
             {type.charAt(0).toUpperCase() + type.slice(1)}
           </Button>
         ))}
       </div>
     </header>

     <div className={"max-w-7xl mx-auto p-4"}>
       <Card className={"bg-white/50 backdrop-blur-sm border-2 border-dashed border-[#8E9DFF]/30 hover:border-[#8E9DFF]/50 transition-colors text-center p-6"}>
         <CardContent>
           <div className={"flex flex-col items-center gap-4"}>
             <Upload className={"w-8 h-8 text-[#2A2F4F]"} />
             <h3 className={"text-xl font-bold text-[#2A2F4F] font-sans"}>Upload Memes</h3>
             <p className={"text-sm text-[#2A2F4F]/70 font-medium"}>Drag & drop your files or</p>
             <Button 
               onClick={handleSubmit}
               className={"bg-[#8E9DFF] hover:bg-[#7A8BFF] text-white transition-colors rounded-full font-medium"}
             >
               Submit a Meme
             </Button>
             <p className={"text-xs text-[#2A2F4F]/50 font-medium"}>
               Recommended Size 300x200px
               <br />
               Maximum file size 10MB
             </p>
           </div>
         </CardContent>
       </Card>
     </div>

     <div className={"max-w-7xl mx-auto p-4"}>
       <div className={"columns-2 md:columns-3 lg:columns-4 gap-4"}>
         {filteredMemes.map(meme => (
           <div key={meme.id} className={"break-inside-avoid mb-4"}>
             <Card className={"bg-white/50 backdrop-blur-sm border border-[#8E9DFF]/30 hover:border-[#8E9DFF]/50 transition-colors overflow-hidden rounded-xl"}>
               <CardContent className={"p-0 relative"}>
                 {meme.type === 'video' ? (
                   <video 
                     src={meme.url} 
                     controls 
                     className={"w-full h-auto"}
                   />
                 ) : (
                   <img
                     src={meme.url}
                     alt={meme.title || "meme"}
                     className={"w-full h-auto"}
                   />
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