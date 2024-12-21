import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { AnimatedButton } from '@/components/ui/animated-button';
import { SignInDialog } from '@/components/auth/sign-in-dialog';
import { auth } from '@/lib/firebase';
import { Sparkles } from 'lucide-react';
import { FloatingIcons } from '../floating-icons';
import { fadeInVariants } from '@/hooks/use-scroll-animation';
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
    <div className="pt-24">
      <motion.div 
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={fadeInVariants}
      >
        <div className="flex items-center justify-center gap-2 text-sm">
          <Badge
            variant="outline"
            className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-400"
          >
            <Sparkles className="mr-1 h-3 w-3" />
            Smart Waste Management
          </Badge>
        </div>

        <h1 className="mt-8 text-center text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
          Eco<span className="text-emerald-600 dark:text-emerald-400">Byte</span>
        </h1>
        
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
          Revolutionizing waste management with IoT technology and AI-powered insights
          for efficient biochar production and carbon sequestration.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <AnimatedButton
            text="Get Started"
            variant="primary"
            onClick={handleGetStarted}
          />
          <AnimatedButton
            text="Learn More"
            variant="secondary"
            onClick={() => setShowAbout(true)}
          />
        </div>

        <FloatingIcons />
      </motion.div>

      <SignInDialog
        open={showSignIn}
        onOpenChange={setShowSignIn}
        onSuccess={onDashboard}
      />

      <Dialog open={showAbout} onOpenChange={setShowAbout}>
        <DialogContent className="bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">About EcoByte</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              EcoByte is an innovative smart waste management system that converts organic
              waste into biochar, contributing to carbon sequestration and sustainable
              waste management practices.
            </p>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Key Features:</h4>
              <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
                <li>Real-time monitoring of biochar production</li>
                <li>AI-powered waste analysis and optimization</li>
                <li>Environmental impact tracking</li>
                <li>Carbon offset calculations</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}