import { auth } from '@/lib/firebase';
import { signOut, User } from 'firebase/auth';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // The onAuthStateChanged listener in Index.tsx will handle the UI update
    } catch (error) {
      console.error("Error signing out: ", error);
      alert("Error signing out. Please try again.");
    }
  };

  return (
    <section 
      id="dashboard" 
      className="section-full bg-dark-bg text-dark-fg z-40 relative"
    >
      <div className="w-full max-w-md text-center p-8">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
          Welcome
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          {user ? user.email : 'Member'}
        </p>
        
        <div className="mt-12">
          <button 
            onClick={handleSignOut}
            className="w-full px-8 py-4 bg-neon-red text-dark-bg text-lg font-bold uppercase tracking-wider border-2 border-neon-red hover:bg-transparent hover:text-neon-red transition-colors duration-300"
          >
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
