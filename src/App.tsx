import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Dashboard } from '@/components/dashboard';
import { LandingPage } from '@/components/landing-page';
import { LoadingScreen } from '@/components/loading-screen';
import { auth } from '@/lib/firebase';
import { User } from 'firebase/auth';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for 2 seconds
    const loadingTimer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      // Only show dashboard if user explicitly navigates there
      if (user && window.location.hash === '#dashboard') {
        setShowDashboard(true);
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(loadingTimer);
    };
  }, []);

  if (initialLoading) {
    return <LoadingScreen />;
  }

  if (loading) {
    return null;
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="biochar-theme">
      {showDashboard ? (
        <Dashboard user={user} />
      ) : (
        <LandingPage 
          isLoaded={!loading} 
          onDashboard={() => setShowDashboard(true)}
          user={user}
        />
      )}
    </ThemeProvider>
  );
}