import { useState, useEffect } from 'react';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import Header from '@/components/Header';
import MenuOverlay from '@/components/MenuOverlay';
import HomeSection from '@/components/HomeSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import ChatBot from '@/components/ChatBot';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useScrollAnimations();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-dark-bg">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden bg-dark-bg font-inter">
      <Header onMenuToggle={handleMenuToggle} />
      <MenuOverlay isOpen={isMenuOpen} onClose={handleMenuClose} />
      
      <main id="smooth-wrapper">
        <div id="smooth-content">
          <HomeSection />
          <AboutSection />
          <ProjectsSection />
          {user ? <Dashboard /> : <ContactSection />}
        </div>
      </main>

      <ChatBot />
    </div>
  );
};

export default Index;
