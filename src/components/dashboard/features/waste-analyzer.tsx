import { User } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera } from 'lucide-react';

interface WasteAnalyzerProps {
  user: User;
}

export function WasteAnalyzer({ user }: WasteAnalyzerProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="flex flex-col items-center justify-center p-12">
        <div className="rounded-full bg-emerald-100 p-4 dark:bg-emerald-900">
          <Camera className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">Upload Waste Image</h3>
        <p className="mt-2 text-center text-sm text-gray-500">
          Take or upload a photo of waste items for AI analysis
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline">
            <Camera className="mr-2 h-4 w-4" />
            Take Photo
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold">Recent Analysis</h3>
        <div className="mt-4 space-y-4">
          <div className="text-center text-sm text-gray-500">
            No recent analyses. Upload an image to get started.
          </div>
        </div>
      </Card>
    </div>
  );
}