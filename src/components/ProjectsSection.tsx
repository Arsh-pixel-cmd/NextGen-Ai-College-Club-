import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const revealElementsRef = useRef<HTMLElement[]>([]);

  const projects = [
    {
      title: "Project Alpha",
      subtitle: "Machine Learning Model",
      description: "Advanced neural networks for predictive analytics"
    },
    {
      title: "Robo-Advisor",
      subtitle: "Fintech AI Solution",
      description: "Intelligent financial advisory system"
    },
    {
      title: "Vision AI",
      subtitle: "Computer Vision Application",
      description: "Real-time object detection and analysis"
    }
  ];

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
          stagger: 0.15, 
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
      id="projects" 
      className="section-full bg-background text-foreground z-30"
    >
      <div className="w-full max-w-7xl text-center">
        <h2 
          ref={addToRefs}
          className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
        >
          Featured Work
        </h2>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="bg-dark-bg text-dark-fg p-8 aspect-square flex flex-col justify-end transition-transform duration-300 hover:scale-105 rounded-lg shadow-lg"
            >
              <h3 className="text-3xl font-bold">{project.title}</h3>
              <p className="text-gray-400 mt-2">{project.subtitle}</p>
              <p className="text-gray-500 mt-4 text-sm">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;