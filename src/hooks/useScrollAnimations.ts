import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useScrollAnimations = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Section pinning animations
    const allSections = gsap.utils.toArray('main section');
    
    allSections.forEach((section, i) => {
      if (i < allSections.length - 1) {
        ScrollTrigger.create({
          trigger: allSections[i + 1] as Element,
          start: 'top bottom',
          end: 'top top',
          scrub: 1,
          pin: section as Element,
          pinSpacing: false,
        });
      }
    });

    // Flying video transition (simplified without actual videos)
    const videoTransitionTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "top top",
        scrub: 1.5,
      }
    });

    videoTransitionTL.to('#image-cluster', { autoAlpha: 0, duration: 0.3 }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};