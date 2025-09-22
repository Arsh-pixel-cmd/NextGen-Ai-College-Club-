import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import MediaCluster from './MediaCluster';

const HomeSection = () => {
  const subHeadlineRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const revealElementsRef = useRef<HTMLElement[]>([]);

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
    const revealElements = revealElementsRef.current.filter(Boolean);
    if (revealElements.length > 0) {
      gsap.fromTo(
        revealElements, 
        { y: 30, autoAlpha: 0 }, 
        { y: 0, autoAlpha: 1, duration: 1, delay: 1, stagger: 0.2, ease: 'power3.out' }
      );
    }

    return () => {
      typeTimeline.kill();
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealElementsRef.current.includes(el)) {
      revealElementsRef.current.push(el);
    }
  };

  return (
    <section 
      id="home" 
      className="section-full h-screen bg-background text-foreground text-center relative overflow-hidden z-10"
    >
      <MediaCluster />

      {/* Text content container */}
      <div className="w-full max-w-7xl relative z-20">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none whitespace-nowrap horizontal-marquee">
          <span>Ai is not a robot apocalypse; it's a tool for a better future •&nbsp;</span>
          <span>The Spark For All Things AI •&nbsp;</span>
        </h1>
        <p className="font-audiowide text-xl md:text-2xl lg:text-3xl mt-4 text-gray-700 min-h-[1.5em]">
          <span ref={subHeadlineRef} id="sub-headline"></span>
          <span ref={cursorRef} id="cursor" className="cursor-blink inline-block">_</span>
        </p>
      </div>

      <div className="absolute bottom-10 left-0 right-0 w-full flex items-center justify-center gap-8 px-4 z-20">
        <a 
          ref={addToRefs}
          href="#projects" 
          className="gsap-reveal inline-block px-8 py-3 bg-primary text-primary-foreground text-lg font-bold uppercase tracking-wider rounded-full border-2 border-primary hover:bg-background hover:text-foreground transition-colors duration-300"
        >
          Projects
        </a>
        <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
        <a 
          ref={addToRefs}
          href="#contact" 
          className="gsap-reveal inline-block px-8 py-3 border-2 border-primary text-foreground text-lg font-bold uppercase tracking-wider rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
        >
          Join Us
        </a>
      </div>
    </section>
  );
};

export default HomeSection;