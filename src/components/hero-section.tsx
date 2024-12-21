import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FloatingIcons } from './floating-icons';
import { SignInDialog } from './auth/sign-in-dialog';
import { auth } from '@/lib/firebase';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface HeroSectionProps {
  isLoaded: boolean;
  onDashboard: () => void;
}

export function HeroSection({ isLoaded, onDashboard }: HeroSectionProps) {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handleGetStarted = () => {
    if (auth.currentUser) {
      onDashboard();
    } else {
      setShowSignIn(true);
    }
  };

  return (
    <div
      className={cn(
        'opacity-0 transition-all duration-1000 ease-out',
        isLoaded && 'translate-y-0 opacity-100'
      )}
    >
      <div className="flex items-center justify-center gap-2 text-sm">
        <Badge
          variant="outline"
          className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-400"
        >
          <Sparkles className="mr-1 h-3 w-3" />
          Powered by Advanced AI
        </Badge>
      </div>

      <h1 className="mt-8 text-center text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
        <span className="dark:text-white">Eco</span>
        <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-green-400">
          Byte
        </span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
        Harnessing the power of artificial intelligence to create innovative
        solutions for environmental challenges and promote sustainable practices.
      </p>

      <div className="mt-10 flex justify-center gap-4">
        <Button
          size="lg"
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 dark:from-emerald-500 dark:to-green-500 dark:hover:from-emerald-600 dark:hover:to-green-600"
        >
          Get Started
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => setShowAbout(true)}
          className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950"
        >
          Learn More
        </Button>
      </div>

      <FloatingIcons />

      <SignInDialog
        open={showSignIn}
        onOpenChange={setShowSignIn}
        onSuccess={onDashboard}
      />

      <Dialog open={showAbout} onOpenChange={setShowAbout}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Welcome to EcoByte</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              EcoByte is a revolutionary platform that combines cutting-edge AI technology
              with environmental sustainability. We're on a mission to make environmental
              protection more accessible, data-driven, and effective.
            </p>
            <div className="space-y-2">
              <h4 className="font-medium">Our Key Features:</h4>
              <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
                <li>Nova AI Assistant - Your personal environmental guide</li>
                <li>EcoImpact Analyzer - Track and optimize your environmental impact</li>
                <li>Biochar Bin IoT - Smart waste management solution</li>
                <li>Biodiversity Tracker - Monitor and protect endangered species</li>
              </ul>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Join us in our mission to create a more sustainable future through
              innovation and technology. Get started today to access all features
              and make a real difference.
            </p>
            <div className="flex justify-end">
              <Button onClick={() => {
                setShowAbout(false);
                handleGetStarted();
              }}>
                Get Started Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}