import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import {Leaf, Bot, BarChart3, Info, Moon, Sun, CircuitBoard } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { UserNav } from './user-nav';
import { User } from 'firebase/auth';
import { SignInDialog } from './auth/sign-in-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface FloatingNavbarProps {
  user: User | null;
  onDashboard?: () => void;
}

export function FloatingNavbar({ user, onDashboard }: FloatingNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFeatureClick = () => {
    if (user) {
      onDashboard?.();
    } else {
      setShowSignIn(true);
    }
  };

  const navItems = [
    { icon: Bot, label: 'Nova AI' },
    { icon: BarChart3, label: 'EcoImpact' },
    { icon: CircuitBoard, label: 'Biochar Bin IoT' },
    { icon: Leaf, label: 'ConserveAI' },
    { icon: Info, label: 'About', onClick: () => setShowAbout(true) },
  ];

  return (
    <>
      <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 transform">
        <div
          className={cn(
            'flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-sm transition-all duration-300 dark:border-gray-800/50 dark:bg-gray-950/5',
            scrolled && 'border-emerald-500/10 bg-white/60 shadow-lg backdrop-blur-md dark:border-emerald-500/20 dark:bg-gray-950/60'
          )}
        >
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              size="sm"
              onClick={item.onClick ? item.onClick : handleFeatureClick}
              className={cn(
                'rounded-full text-gray-600/90 hover:bg-emerald-50/50 hover:text-emerald-600 dark:text-gray-300/90 dark:hover:bg-emerald-900/50 dark:hover:text-emerald-400',
                'flex items-center gap-2 px-3',
                scrolled && 'hover:bg-emerald-50/60 dark:hover:bg-emerald-900/60'
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden text-sm md:inline-block">{item.label}</span>
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={cn(
              'rounded-full text-gray-600/90 hover:bg-emerald-50/50 hover:text-emerald-600 dark:text-gray-300/90 dark:hover:bg-emerald-900/50 dark:hover:text-emerald-400',
              'flex items-center gap-2 px-3',
              scrolled && 'hover:bg-emerald-50/60 dark:hover:bg-emerald-900/60'
            )}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          {user && <UserNav user={user} />}
        </div>
      </div>

      <SignInDialog
        open={showSignIn}
        onOpenChange={setShowSignIn}
        onSuccess={onDashboard || (() => {})}
      />

      <Dialog open={showAbout} onOpenChange={setShowAbout}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>About EcoByte</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              EcoByte is a cutting-edge platform that combines artificial intelligence
              with environmental sustainability. Our mission is to empower individuals
              and organizations to make data-driven decisions that benefit our planet.
            </p>
            <div className="space-y-2">
              <h4 className="font-medium">Key Features:</h4>
              <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
                <li>Nova AI Assistant - Your intelligent environmental guide</li>
                <li>EcoImpact Analyzer - Measure and optimize your environmental footprint</li>
                <li>Biochar Bin IoT - Smart waste management solution</li>
                <li>ConserveAI - Advanced conservation analysis and planning</li>
              </ul>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Join us in our mission to create a more sustainable future through
              technology and innovation.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
