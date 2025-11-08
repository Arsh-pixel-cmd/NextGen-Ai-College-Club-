'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import MediaCluster from './MediaCluster';
import { User } from 'firebase/auth';

interface HomeSectionProps {
  user: User | null;
}

const HomeSection = ({ user }: HomeSectionProps) => {
  const subHeadlineRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const revealElementsRef = useRef<(HTMLElement | null)[]>([]);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);

    // Typing animation
    const subText = "Putting the power of Intelligence in your hands";
    const typeTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
      defaults: { ease: "none" }
    });

    if (subHeadlineRef.current && cursorRef.current) {
      typeTimeline
        .to(subHeadlineRef.current, { duration: subText.length * 0.07, text: subText }, "+=0.5")
        .to(cursorRef.current, { autoAlpha: 0, duration: 0.5, repeat: 4, yoyo: true }, "+=1")
        .to(subHeadlineRef.current, { duration: subText.length * 0.03, text: "" }, "+=1");
    }

    // Reveal animations
    const revealElements = revealElementsRef.current.filter(Boolean) as HTMLElement[];
    if (revealElements.length > 0) {
      gsap.fromTo(
        revealElements, 
        { y: 30, autoAlpha: 0 }, 
        { y: 0, autoAlpha: 1, duration: 1, delay: 1, stagger: 0.2, ease: 'power3.out' }
      );
    }

    // Video reveal animation
    if (bgVideoRef.current) {
      gsap.fromTo(
        bgVideoRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 0.25, duration: 2.5, ease: "power3.out", delay: 0.8 }
      );
    }

    return () => {
      typeTimeline.kill();
    };
  }, []);

  return (
    <section 
      id="home" 
      className="relative h-screen w-full overflow-hidden bg-background text-foreground text-center z-10 flex flex-col items-center justify-center"
    >
      {/* Subtle Video Layer */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <video
          ref={bgVideoRef}
          className="
            w-[85vw] sm:w-[70vw] md:w-[55vw] lg:w-[50vw]
            aspect-video rounded-3xl
            opacity-25 object-cover mix-blend-screen
            transition-all duration-500
          "
          src="src/videos/homepage.mp4"  
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Floating Particles or MediaCluster */}
      <MediaCluster />

      {/* Text content */}
      <div className="relative z-20 max-w-7xl px-4">
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none whitespace-nowrap">
          <span>AI is not a robot apocalypse; it's a tool for a better future •&nbsp;</span>
          <span>The Spark For All Things AI •&nbsp;</span>
        </h1>
        <p className="font-audiowide text-lg md:text-2xl lg:text-3xl mt-4 text-gray-700 min-h-[1.5em]">
          <span ref={subHeadlineRef} id="sub-headline"></span>
          <span ref={cursorRef} id="cursor" className="cursor-blink inline-block">_</span>
        </p>
      </div>

      {/* Buttons */}
      <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-4 md:gap-8 px-4 z-20">
        <a 
          ref={el => { if (el) revealElementsRef.current[0] = el; }}
          href="#projects" 
          className="inline-block px-6 py-2.5 md:px-8 md:py-3 bg-primary text-primary-foreground text-sm md:text-lg font-bold uppercase tracking-wider rounded-full border-2 border-primary hover:bg-background hover:text-foreground transition-colors duration-300"
        >
          Projects
        </a>
        <svg className="w-8 h-8 animate-bounce hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
        <a 
          ref={el => { if (el) revealElementsRef.current[1] = el; }}
          href={user ? "#contact" : "#member-access"}
          className="inline-block px-6 py-2.5 md:px-8 md:py-3 border-2 border-primary text-foreground text-sm md:text-lg font-bold uppercase tracking-wider rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
        >
          {user ? 'Contact Us' : 'Join Us'}
        </a>
      </div>
    </section>
  );
};

export default HomeSection;
