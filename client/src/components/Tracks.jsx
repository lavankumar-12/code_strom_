import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaBrain, FaShieldAlt, FaHeartbeat, FaBitcoin, FaCity, FaLeaf, FaTractor, FaCar, FaLightbulb } from 'react-icons/fa';

const tracks = [
    {
        icon: FaBrain,
        title: 'Generative AI & LLM',
        desc: 'Next-gen AI applications',
        color: 'border-purple-500',
        iconColor: 'text-purple-400',
        details: 'Explore the boundaries of Large Language Models and Generative AI. Build applications that can reason, create art, or solve complex coding problems using state-of-the-art models.'
    },
    {
        icon: FaRobot,
        title: 'Robotics & Drones',
        desc: 'Autonomous systems',
        color: 'border-blue-500',
        iconColor: 'text-blue-400',
        details: 'Dive into the world of autonomous hardware. Develop software for drones, robotic arms, or self-navigating vehicles. Focus on real-time processing and hardware-software integration.'
    },
    {
        icon: FaShieldAlt,
        title: 'Cybersecurity',
        desc: 'Threat intelligence & trust',
        color: 'border-red-500',
        iconColor: 'text-red-400',
        details: 'Protect the digital frontier. Build tools for threat detection, cryptography, network security, or secure authentication systems to ensure privacy and data integrity.'
    },
    {
        icon: FaHeartbeat,
        title: 'HealthTech',
        desc: 'MedAI & Diagnostics',
        color: 'border-pink-500',
        iconColor: 'text-pink-400',
        details: 'Innovate for a healthier world. Create AI-driven diagnostic tools, remote patient monitoring systems, or healthcare management platforms that improve patient outcomes.'
    },
    {
        icon: FaBitcoin,
        title: 'FinTech',
        desc: 'Blockchain & Digital Trust',
        color: 'border-yellow-500',
        iconColor: 'text-yellow-400',
        details: 'Revolutionize finance with blockchain and smart contracts. Build decentralized finance (DeFi) apps, secure payment gateways, or transparent auditing systems.'
    },
    {
        icon: FaCity,
        title: 'Smart Cities',
        desc: 'IoT & Edge Computing',
        color: 'border-cyan-500',
        iconColor: 'text-cyan-400',
        details: 'Build the cities of tomorrow. Use IoT and edge computing to optimize traffic, waste management, energy consumption, and public safety in urban environments.'
    },
    {
        icon: FaLeaf,
        title: 'Green Tech',
        desc: 'Energy Optimization',
        color: 'border-green-500',
        iconColor: 'text-green-400',
        details: 'Solve environmental challenges. Focus on renewable energy management, carbon footprint tracking, sustainable supply chains, and environmental monitoring.'
    },
    {
        icon: FaTractor,
        title: 'Agritech',
        desc: 'Rural Innovation',
        color: 'border-lime-500',
        iconColor: 'text-lime-400',
        details: 'Empower farmers with technology. Develop solutions for precision farming, crop health monitoring, supply chain transparency, and weather-based analytics.'
    },
    {
        icon: FaCar,
        title: 'Transportation',
        desc: 'AI-Driven Logistics',
        color: 'border-indigo-500',
        iconColor: 'text-indigo-400',
        details: 'Optimize the movement of goods and people. Build AI models for traffic prediction, autonomous fleet management, or last-mile delivery optimization.'
    },
    {
        icon: FaLightbulb,
        title: 'Open Innovation',
        desc: 'Wildcard Track',
        color: 'border-white',
        iconColor: 'text-white',
        details: 'Have a disruptive idea that doesn\'t fit the tracks above? This wildcard track is for you. Show us something completely unique and revolutionary.'
    },
];

const Tracks = () => {
    const [selectedTrack, setSelectedTrack] = useState(null);

    return (
        <section id="tracks" className="py-16 md:py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-4 font-sans">
                        <span className="text-secondary-color drop-shadow-[0_0_10px_rgba(255,75,31,0.5)]">THEMES</span> & TRACKS
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Choose your battlefield. Innovate in any of these cutting-edge domains. Click on a theme to learn more.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tracks.map((track, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false, amount: 0.1 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            onClick={() => setSelectedTrack(track)}
                            className={`glass-panel p-6 flex flex-col items-center text-center group cursor-pointer border-t-2 ${track.color} hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]`}
                        >
                            <div className="p-5 rounded-full bg-white/5 mb-6 group-hover:bg-white/10 transition-colors duration-300 relative z-10 group-hover:scale-110 ease-in-out">
                                <track.icon size={32} className={`${track.iconColor} group-hover:text-white transition-colors duration-300 drop-shadow-md`} />
                            </div>
                            <h3 className="text-lg font-bold mb-2 relative z-10 text-white group-hover:text-accent-color transition-colors">{track.title}</h3>
                            <p className="text-sm text-gray-400 relative z-10">{track.desc}</p>
                            <div className="mt-4 text-xs font-bold text-accent-color opacity-0 group-hover:opacity-100 transition-opacity">CLICK TO VIEW DETAILS</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedTrack && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className={`relative w-full max-w-lg glass-panel p-8 border-t-4 ${selectedTrack.color}`}
                        >
                            <button
                                onClick={() => setSelectedTrack(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="flex flex-col items-center text-center">
                                <div className="p-6 rounded-full bg-white/5 mb-6">
                                    <selectedTrack.icon size={48} className={selectedTrack.iconColor} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-wider">{selectedTrack.title}</h3>
                                <div className="w-16 h-1 bg-accent-color mb-6 rounded-full"></div>
                                <p className="text-gray-300 leading-relaxed text-lg">
                                    {selectedTrack.details}
                                </p>

                                <button
                                    onClick={() => setSelectedTrack(null)}
                                    className="mt-8 px-8 py-3 btn-primary text-sm tracking-widest"
                                >
                                    CLOSE
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Tracks;
