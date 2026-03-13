import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VideoBackgroundProps {
  videoSrc: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoSrc }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;

    // Optional: add a scroll effect to the video itself
    // e.g., scale or opacity changes based on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    tl.to(videoRef.current, {
      scale: 1.2,
      opacity: 0.3,
      ease: 'none',
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none"
    >
      <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark overlay for better text readability */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="object-cover w-full h-full transform origin-center"
      />
    </div>
  );
};

export default VideoBackground;
