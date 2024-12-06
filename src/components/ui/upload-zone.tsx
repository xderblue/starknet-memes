import { Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function UploadZone() {
  return (
    <Card className="bg-[#151926] border-2 border-dashed border-[#29296E] hover:border-[#9D8CFF] transition-colors text-center p-6">
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <Upload className="w-8 h-8 text-[#9D8CFF]" />
          <h3 className="text-lg font-semibold text-[#9D8CFF]">Upload Memes</h3>
          <p className="text-sm text-[#6E6EA3]">Drag & drop your files or</p>
          <Button className="bg-[#29296E] hover:bg-[#393996] text-white transition-colors">
            Paste Image or URL
          </Button>
          <p className="text-xs text-[#6E6EA3]">
            Recommended Size 300x200px
            <br />
            Maximum file size 10MB
          </p>
        </div>
      </CardContent>
    </Card>
  );
}