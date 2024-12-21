import { HeroSection } from './hero-section';
import { Features } from './features';
import { ImpactOverview } from './impact-overview';
import { MeetNova } from './meet-nova';
import { FloatingNavbar } from './floating-navbar';
import { Footer } from '../footer';
import { LandingChatbot } from './chatbot';
import { User } from 'firebase/auth';

interface LandingPageProps {
  isLoaded: boolean;
  onDashboard: () => void;
  user: User | null;
}

export function LandingPage({ isLoaded, onDashboard, user }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <FloatingNavbar onDashboard={onDashboard} user={user} />
      <main>
        <HeroSection isLoaded={isLoaded} onDashboard={onDashboard} />
        <Features />
        <ImpactOverview />
        <MeetNova />
      </main>
      <Footer />
      <LandingChatbot />
    </div>
  );
}