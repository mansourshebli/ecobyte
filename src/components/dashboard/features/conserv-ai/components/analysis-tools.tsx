import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LineChart, PieChart, Table, ChevronRight, Sparkles, BarChart3 } from 'lucide-react';

interface AnalysisToolsProps {
  onToolSelect: (tool: string, input: string) => void;
  onQuickAnalysis: (input: string) => void;
}

export function AnalysisTools({ onToolSelect, onQuickAnalysis }: AnalysisToolsProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Analysis Tools</h3>
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => onToolSelect('visualize', "Generate a chart showing global temperature trends from 2000 to 2023")}
          >
            <LineChart className="h-5 w-5 text-emerald-600" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Trend Analysis</span>
              <span className="text-xs text-gray-500">Visualize environmental patterns</span>
            </div>
            <ChevronRight className="ml-auto h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => onToolSelect('visualize', "Show the distribution of renewable energy sources in 2023")}
          >
            <PieChart className="h-5 w-5 text-blue-600" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Distribution Analysis</span>
              <span className="text-xs text-gray-500">Compare environmental factors</span>
            </div>
            <ChevronRight className="ml-auto h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => onToolSelect('visualize', "Create a table of endangered species status")}
          >
            <Table className="h-5 w-5 text-purple-600" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Data Tables</span>
              <span className="text-xs text-gray-500">Structured environmental data</span>
            </div>
            <ChevronRight className="ml-auto h-4 w-4" />
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Quick Analysis</h3>
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => onQuickAnalysis("Analyze global biodiversity trends in the last 5 years")}
          >
            <Sparkles className="h-5 w-5 text-emerald-600" />
            Biodiversity Trends
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => onQuickAnalysis("Show renewable energy adoption rates by region")}
          >
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Energy Analysis
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => onQuickAnalysis("Calculate carbon footprint reduction potential")}
          >
            <LineChart className="h-5 w-5 text-purple-600" />
            Carbon Impact
          </Button>
        </div>
      </Card>
    </div>
  );
}