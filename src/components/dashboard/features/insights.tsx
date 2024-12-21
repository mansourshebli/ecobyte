import { User } from 'firebase/auth';
import { Card } from '@/components/ui/card';

interface InsightsProps {
  user: User;
}

export function Insights({ user }: InsightsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="flex flex-col overflow-hidden">
        <iframe
          id="audio_iframe"
          src="https://widget.synthflow.ai/widget/v2/1732355757189x964081562672625500/1732355757082x249353215320778700"
          allow="microphone"
          className="h-[calc(100vh-13rem)] w-full border-0 bg-transparent"
        />
      </Card>

      <Card className="flex flex-col overflow-hidden">
        <div className="border-b p-4">
          <h3 className="text-lg font-semibold">3D Model Visualization</h3>
          <p className="text-sm text-gray-500">Interactive Biochar Bin Model</p>
        </div>
        <div className="flex-1">
          <iframe
            src="https://www.tinkercad.com/embed/e6FzvIJZhD2?editbtn=1"
            className="h-full w-full"
            title="Biochar Bin Model"
          />
        </div>
      </Card>
    </div>
  );
}