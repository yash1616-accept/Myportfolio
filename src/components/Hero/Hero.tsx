import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, Variants } from 'framer-motion';
import Navbar from './navbar';
import VideoBackground from './VideoBackground';

// 1. Import the video asset so Vite can resolve the correct URL
import heroVideo from '../../assets/hero.mp4';

gsap.registerPlugin(ScrollTrigger);
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollPromptRef = useRef<HTMLDivElement>(null);
    const textRef1 = useRef<HTMLDivElement>(null);
    const textRef2 = useRef<HTMLDivElement>(null);
    const textRef3 = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Pin the container for a duration of scrolling
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=300%', // Pin for 3 times the viewport height
                    pin: true,
                    scrub: 1, // Smooth scrubbing
                }
            });

            // Sequence of animations

            // 0. Scroll prompt fades out as soon as the user starts scrolling
            tl.to(scrollPromptRef.current, {
                opacity: 0,
                y: -50,
                duration: 0.5
            });

            // 1. Initial text fades in then out
            tl.fromTo(textRef1.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 1 }
            ).to(textRef1.current,
                { opacity: 0, y: -50, duration: 1 },
                "+=0.5" // Hold for a bit
            );

            // 2. Second text fades in then out
            tl.fromTo(textRef2.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1 }
            ).to(textRef2.current,
                { opacity: 0, y: -50, duration: 1 },
                "+=0.5"
            );

            // 3. Final text fades in and stays
            tl.fromTo(textRef3.current,
                { opacity: 0, scale: 1.2 },
                { opacity: 1, scale: 1, duration: 1 }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303] text-white"
        >
            {/* Cinematic Video Background */}
            {/* 2. Pass the imported video variable as the source */}
            <VideoBackground videoSrc={heroVideo} />

            {/* Navbar sits on top */}
            <div className="absolute top-0 left-0 w-full z-50">
                <Navbar />
            </div>

            {/* Main Content Areas for Scroll Frames */}
            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center">

                {/* 3. Initial Scroll Prompt (Visible on load before scrolling) */}
                <div ref={scrollPromptRef} className="absolute inset-x-0 bottom-24 flex flex-col items-center animate-bounce">
                    <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/70">
                        Scroll to explore
                    </span>
                    <svg className="w-6 h-6 text-white/70 mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>

                {/* Frame 1 */}
                <div ref={textRef1} className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
                    <span className="mb-4 text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-gray-400">
                        Design × Engineering
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                        Crafting Digital Luxury
                    </h1>
                </div>

                {/* Frame 2 */}
                <div ref={textRef2} className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center opacity-0">
                    <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white mb-6">
                        Seamless Interactive Experiences
                    </h2>
                    <p className="max-w-xl text-lg md:text-xl text-gray-300 font-light leading-relaxed">
                        Motion, 3D, and uncompromising performance across every pixel.
                    </p>
                </div>

                {/* Frame 3 */}
                <div ref={textRef3} className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center opacity-0">
                    <motion.div
                        variants={containerVariants} // Applied here
                        initial="hidden"
                        animate="visible"
                        className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center"
                    >
                        <motion.span
                            variants={itemVariants} // Applied here
                            className="mb-4 text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-gray-400"
                        >
                            Full Stack Developer <span className="text-blue-500 mx-1">·</span> DevOps Engineer <span className="text-blue-500 mx-1">·</span> AI Enthusiast

                        </motion.span>

                        <motion.h1
                            variants={itemVariants} // Applied here
                            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
                        >
                            Yash Gaikwad
                        </motion.h1>

                        <motion.p
                            variants={itemVariants} // Applied here
                            className="max-w-xl text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-10"
                        >
                            Crafting high-performance digital experiences with precision and cinematic design.
                        </motion.p>

                        <motion.div
                            variants={itemVariants} // Applied here
                            className="flex flex-col sm:flex-row gap-4 items-center"
                        >
                            <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform">
                                View Projects
                            </button>
                            <button className="px-8 py-4 bg-transparent border border-white/10 backdrop-blur-md text-white font-medium rounded-full hover:bg-white/5 transition-all">
                                Download Resume
                            </button>
                        </motion.div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
