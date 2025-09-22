import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const revealElementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const revealElements = revealElementsRef.current.filter(Boolean);
    
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealElementsRef.current.includes(el)) {
      revealElementsRef.current.push(el);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="section-full bg-dark-bg text-dark-fg z-20"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="text-left">
          <h2 
            ref={addToRefs}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter title-hover-neon-green"
          >
            Our Mission
          </h2>
          <p 
            ref={addToRefs}
            className="mt-8 text-xl md:text-2xl text-gray-300 leading-relaxed"
          >
            NEXTGENXAI is more than just a club—it's a community built for the next generation of innovators, creators, and problem solvers. We organize workshops, coding sessions, guest lectures, hackathons, and project showcases that help students bridge the gap between theory and real-world applications.
          </p>
          <p 
            ref={addToRefs}
            className="mt-6 text-lg text-gray-400 leading-relaxed"
          >
            Our members get hands-on experience in building AI-driven solutions, collaborating across disciplines, and learning the latest trends in machine learning, data science, and automation. We believe in learning by doing - from creating intelligent chatbots to designing AI tools for agriculture, healthcare, and education.
          </p>
          <p 
            ref={addToRefs}
            className="mt-6 text-lg text-gray-400 leading-relaxed"
          >
            Whether you're a beginner curious about AI or an advanced learner eager to push boundaries, NEXTGENXAI welcomes you to be part of a journey where imagination meets intelligence, and together we create the future.
          </p>
        </div>
        
        {/* Video Layout */}
        <div className="flex flex-col gap-8 items-center">
          <div 
            ref={addToRefs}
            className="w-full aspect-video bg-gradient-to-br from-ai-blue/20 to-neon-green/20 rounded-lg shadow-lg flex items-center justify-center text-gray-400"
          >
            <span>AI Innovation Video</span>
          </div>
          <div className="w-full flex gap-8">
            <div 
              ref={addToRefs}
              className="w-1/2 aspect-video bg-gradient-to-br from-neon-red/20 to-neon-yellow/20 rounded-lg shadow-lg flex items-center justify-center text-gray-400"
            >
              <span>Focus</span>
            </div>
            <div 
              ref={addToRefs}
              className="w-1/2 aspect-video bg-gradient-to-br from-purple-500/20 to-ai-blue/20 rounded-lg shadow-lg flex items-center justify-center text-gray-400"
            >
              <span>Create</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;