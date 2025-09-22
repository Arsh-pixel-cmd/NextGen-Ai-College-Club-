import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import aiImage1 from '@/assets/ai-image-1.jpg';
import aiImage2 from '@/assets/ai-image-2.jpg';
import aiImage3 from '@/assets/ai-image-3.jpg';
import aiImage4 from '@/assets/ai-image-4.jpg';
import aiImage5 from '@/assets/ai-image-5.jpg';
import aiImage6 from '@/assets/ai-image-6.jpg';

const MediaCluster = () => {
  const clusterRef = useRef<HTMLDivElement>(null);
  const mediaElements = useRef<(HTMLImageElement | HTMLVideoElement)[]>([]);

  // Media data with positions and parallax strengths
  const mediaData = [
    { src: aiImage1, type: 'image', alt: 'AI Neural Networks' },
    { src: aiImage2, type: 'image', alt: 'AI Robot Face' },
    { src: aiImage3, type: 'image', alt: 'Digital Brain' },
    { src: aiImage4, type: 'image', alt: 'Futuristic City' },
    { src: aiImage5, type: 'image', alt: 'Machine Learning' },
    { src: aiImage6, type: 'image', alt: 'AI Lab Students' },
    { src: aiImage1, type: 'image', alt: 'AI Concept 7' },
    { src: aiImage2, type: 'image', alt: 'AI Concept 8' },
    { src: aiImage3, type: 'image', alt: 'AI Concept 9' },
    { src: aiImage4, type: 'image', alt: 'AI Concept 10' },
    { src: aiImage5, type: 'image', alt: 'AI Concept 11' },
    { src: aiImage6, type: 'image', alt: 'AI Concept 12' },
  ];

  const restPositions = [
    { x: "-150%", y: "-60%", rotation: -20 }, { x: "150%", y: "-70%", rotation: 15 },
    { x: "-100%", y: "80%", rotation: 25 }, { x: "110%", y: "70%", rotation: -10 },
    { x: "0%", y: "-130%", rotation: 5 }, { x: "40%", y: "-140%", rotation: -15 },
    { x: "-180%", y: "40%", rotation: -30 }, { x: "170%", y: "10%", rotation: 30 },
    { x: "-200%", y: "-100%", rotation: 40 }, { x: "200%", y: "-110%", rotation: -35 },
    { x: "-220%", y: "100%", rotation: -20 }, { x: "210%", y: "90%", rotation: 10 },
  ];

  const parallaxStrengths = [
    { x: 50, y: -35, r: 5 }, { x: -40, y: 55, r: -8 }, { x: 30, y: -60, r: 10 },
    { x: -50, y: 40, r: -5 }, { x: 35, y: 45, r: 12 }, { x: -25, y: -30, r: -10 },
    { x: 55, y: 30, r: 8 }, { x: -30, y: -40, r: -6 },
    { x: 60, y: -40, r: 10 }, { x: -60, y: 50, r: -12 }, { x: 45, y: -65, r: 15 },
    { x: -55, y: 45, r: -8 },
  ];

  useEffect(() => {
    const allMedia = mediaElements.current;
    const homeSection = clusterRef.current?.closest('#home');

    if (!homeSection || allMedia.length === 0) return;

    // Initialize media positions
    gsap.set(allMedia, { 
      xPercent: -50, 
      yPercent: -50, 
      scale: 0, 
      opacity: 0, 
      x: 0, 
      y: 0, 
      rotation: 0 
    });

    const handleMouseEnter = () => {
      allMedia.forEach((media, i) => {
        if (restPositions[i]) {
          gsap.to(media, { 
            ...restPositions[i], 
            scale: 1, 
            opacity: 0.8, 
            duration: 0.8, 
            delay: i * 0.05, 
            ease: "power3.out" 
          });
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const mouseX = (clientX - centerX) / centerX;
      const mouseY = (clientY - centerY) / centerY;

      allMedia.forEach((media, i) => {
        const rest = restPositions[i];
        const strength = parallaxStrengths[i];
        if (rest && strength) {
          const targetX = parseFloat(rest.x) + (strength.x * mouseX);
          const targetY = parseFloat(rest.y) + (strength.y * mouseY);
          const targetR = rest.rotation + (strength.r * mouseX);
          gsap.to(media, { 
            x: `${targetX}%`, 
            y: `${targetY}%`, 
            rotation: targetR, 
            duration: 1, 
            ease: "power2.out", 
            overwrite: "auto" 
          });
        }
      });
    };

    const handleMouseLeave = () => {
      gsap.to(allMedia, { 
        x: 0, 
        y: 0, 
        scale: 0, 
        opacity: 0, 
        rotation: 0, 
        duration: 0.6, 
        stagger: 0.03, 
        ease: "power3.in", 
        overwrite: true 
      });
    };

    homeSection.addEventListener('mouseenter', handleMouseEnter);
    homeSection.addEventListener('mousemove', handleMouseMove);
    homeSection.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      homeSection.removeEventListener('mouseenter', handleMouseEnter);
      homeSection.removeEventListener('mousemove', handleMouseMove);
      homeSection.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={clusterRef}
      id="image-cluster" 
      className="absolute inset-0 w-full h-full z-0"
    >
      <div className="relative w-full h-full">
        {mediaData.map((media, index) => (
          <img
            key={index}
            ref={(el) => {
              if (el) mediaElements.current[index] = el;
            }}
            src={media.src}
            alt={media.alt}
            className="cluster-media"
          />
        ))}
      </div>
    </div>
  );
};

export default MediaCluster;