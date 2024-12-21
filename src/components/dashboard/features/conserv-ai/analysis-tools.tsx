import { Card } from '@/components/ui/card';
import { BarChart3, FileUp } from 'lucide-react';

export function AnalysisTools() {
  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold">Analysis Tools</h3>
      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-600" />
            <h4 className="font-medium">Data Visualization</h4>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Upload conservation data for AI-powered analysis and visualization
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <FileUp className="h-5 w-5 text-purple-600" />
            <h4 className="font-medium">PDF Analysis</h4>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Extract insights from conservation reports and research papers
          </p>
        </div>
      </div>
    </Card>
  );
}