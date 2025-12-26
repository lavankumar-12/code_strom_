import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaCalendarAlt, FaClock } from 'react-icons/fa';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-20">

            {/* Glowing Orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-color opacity-20 blur-[100px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-color opacity-10 blur-[120px] rounded-full animate-pulse"></div>

            <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto flex flex-col items-center">

                <div className="mb-8">
                    <div className="text-accent-color tracking-[0.3em] text-sm md:text-lg uppercase font-bold mb-4 border border-accent-color/30 inline-block px-4 py-2 rounded-full backdrop-blur-md hover:bg-accent-color/10 transition-colors cursor-default">
                        Narsimha Reddy Engineering College
                    </div>
                </div>

                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-2 leading-tight font-sans">
                    <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">CODE</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-secondary-color drop-shadow-[0_0_25px_rgba(255,65,108,0.8)]">STORM</span>
                </h1>

                <div className="text-4xl md:text-6xl font-bold text-white/90 mb-8 tracking-widest">
                    2026
                </div>

                <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
                    The Ultimate <span className="text-accent-color font-bold">36-Hour</span> Hackathon Challenge. <br />
                    <span className="italic text-white/50">Build The Future. Break The Limits.</span>
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12 w-full">
                    <motion.div whileHover={{ scale: 1.1 }} className="glass-panel px-8 py-6 text-center border-t-4 border-t-primary-color min-w-[160px] cursor-pointer hover-glow-primary">
                        <div className="text-gray-400 text-xs uppercase tracking-widest mb-1">Prize Pool</div>
                        <div className="text-3xl font-bold text-yellow-500">₹ 10L</div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.1 }} className="glass-panel px-8 py-6 text-center border-t-4 border-t-accent-color min-w-[160px] cursor-pointer hover-glow-accent">
                        <div className="text-gray-400 text-xs uppercase tracking-widest mb-1 flex items-center justify-center gap-2"><FaCalendarAlt /> Date</div>
                        <div className="text-2xl font-bold text-white">31 JAN</div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.1 }} className="glass-panel px-8 py-6 text-center border-t-4 border-t-secondary-color min-w-[160px] cursor-pointer hover-glow-primary">
                        <div className="text-gray-400 text-xs uppercase tracking-widest mb-1 flex items-center justify-center gap-2"><FaClock /> Duration</div>
                        <div className="text-3xl font-bold text-white">36 H</div>
                    </motion.div>
                </div>

                <div>
                    <motion.a
                        href="https://forms.gle/rXXfSuyR2YDoKw696"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileTap={{ scale: 0.95 }}
                        className="relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-primary-color font-sans uppercase tracking-wider rounded-full hover:bg-secondary-color hover:scale-105 shadow-[0_0_20px_rgba(255,65,108,0.5)] hover:shadow-[0_0_40px_rgba(255,65,108,0.8)] ripple-effect overflow-hidden"
                    >
                        <FaRocket className="mr-3" />
                        Register Your Team
                        {/* Ripple Effect Container handled by CSS or generic interaction */}
                    </motion.a>
                </div>

            </div>
        </section>
    );
};

export default Hero;
