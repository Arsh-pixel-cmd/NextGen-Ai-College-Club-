import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, AuthError } from 'firebase/auth';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const revealElementsRef = useRef<(HTMLElement | null)[]>([]);
  const motivationalRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  const motivationalLines = [
    "Building the future, one line at a time.",
    "Where curiosity meets creation.",
    "The next generation of innovation starts here.",
    "Unlock your potential. Join the movement."
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const revealElements = revealElementsRef.current.filter(Boolean) as HTMLElement[];
    
    if (revealElements.length > 0 && sectionRef.current) {
      gsap.fromTo(revealElements, 
        { y: 50, autoAlpha: 0 }, 
        {
          y: 0, 
          autoAlpha: 1, 
          duration: 1, 
          stagger: 0.1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }

    // Animated motivational text
    if (motivationalRef.current) {
      const lines = motivationalRef.current.querySelectorAll('.motivational-line');
      gsap.set(lines, { y: 20, autoAlpha: 0 });
      
      const motivationalTimeline = gsap.timeline({ 
        repeat: -1, 
        defaults: { ease: 'power2.inOut', duration: 1 } 
      });
      
      lines.forEach((line) => {
        motivationalTimeline
          .to(line, { y: 0, autoAlpha: 1 })
          .to(line, { y: -20, autoAlpha: 0, delay: 3 });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealElementsRef.current.includes(el)) {
      revealElementsRef.current.push(el);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    
    try {
      if (isSigningUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert(`Welcome, ${user.email}! You are now signed up.`);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert(`Welcome back, ${user.email}!`);
      }
    } catch (error) {
      const authError = error as AuthError;
      alert(`Error: ${authError.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      alert(`Welcome, ${user.displayName}!`);
    } catch (error) {
      const authError = error as AuthError;
      alert(`Error with Google Sign-In: ${authError.message}`);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="section-full bg-dark-bg text-dark-fg z-40 relative overflow-hidden grid-animated"
    >
      <div className="w-full max-w-md text-center p-8">
        <h2 
          ref={addToRefs}
          className="text-4xl md:text-6xl font-black uppercase tracking-tighter split-title-hover"
        >
          <span className="member-span">Member</span> <span className="access-span">Access</span>
        </h2>
        <p 
          ref={(el) => revealElementsRef.current[1] = el}
          className="mt-4 text-lg text-gray-400"
        >
          {isSigningUp ? "Create an account to join the future." : "Enter the future. Sign in to continue."}
        </p>
        
        <div 
          ref={motivationalRef}
          className="h-8 mt-6 text-lg text-gray-500 relative"
        >
          {motivationalLines.map((line, index) => (
            <span 
              key={index}
              className="motivational-line absolute inset-0 w-full"
            >
              {line}
            </span>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-12 space-y-8 text-left">
          <div ref={(el) => revealElementsRef.current[2] = el}>
            <label htmlFor="email" className="block text-sm font-bold text-gray-400 uppercase">
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input w-full p-2 mt-2 text-lg" 
              placeholder="you@example.com"
              required
            />
          </div>
          <div ref={(el) => revealElementsRef.current[3] = el}>
            <label htmlFor="password" className="block text-sm font-bold text-gray-400 uppercase">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input w-full p-2 mt-2 text-lg"
              placeholder="********"
              required
            />
          </div>
          
          <div ref={(el) => revealElementsRef.current[4] = el}>
            <button 
              type="submit" 
              className="w-full px-8 py-4 bg-dark-fg text-dark-bg text-lg font-bold uppercase tracking-wider border-2 border-dark-fg hover:bg-transparent hover:text-dark-fg transition-colors duration-300"
            >
              {isSigningUp ? 'Sign Up' : 'Sign In'} with Email
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-center">
            <button 
                onClick={() => setIsSigningUp(!isSigningUp)}
                className="text-gray-400 hover:text-white underline"
            >
                {isSigningUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
        </div>

        <div ref={(el) => revealElementsRef.current[5] = el} className="relative flex items-center mt-8">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="flex-shrink mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-700"></div>
        </div>
          
        <div ref={(el) => revealElementsRef.current[6] = el} className="mt-8">
            <button 
              type="button" 
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-4 px-8 py-4 bg-transparent text-dark-fg text-lg font-bold uppercase tracking-wider border-2 border-gray-700 hover:border-dark-fg transition-colors duration-300"
            >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.244,44,30.036,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              Continue with Google
            </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
