import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaBrain, FaShieldAlt, FaHeartbeat, FaBitcoin, FaCity, FaLeaf, FaTractor, FaCar, FaLightbulb } from 'react-icons/fa';

const tracks = [
    { icon: FaBrain, title: 'Generative AI & LLM', desc: 'Next-gen AI applications', color: 'border-purple-500', iconColor: 'text-purple-400' },
    { icon: FaRobot, title: 'Robotics & Drones', desc: 'Autonomous systems', color: 'border-blue-500', iconColor: 'text-blue-400' },
    { icon: FaShieldAlt, title: 'Cybersecurity', desc: 'Threat intelligence & trust', color: 'border-red-500', iconColor: 'text-red-400' },
    { icon: FaHeartbeat, title: 'HealthTech', desc: 'MedAI & Diagnostics', color: 'border-pink-500', iconColor: 'text-pink-400' },
    { icon: FaBitcoin, title: 'FinTech', desc: 'Blockchain & Digital Trust', color: 'border-yellow-500', iconColor: 'text-yellow-400' },
    { icon: FaCity, title: 'Smart Cities', desc: 'IoT & Edge Computing', color: 'border-cyan-500', iconColor: 'text-cyan-400' },
    { icon: FaLeaf, title: 'Green Tech', desc: 'Energy Optimization', color: 'border-green-500', iconColor: 'text-green-400' },
    { icon: FaTractor, title: 'Agritech', desc: 'Rural Innovation', color: 'border-lime-500', iconColor: 'text-lime-400' },
    { icon: FaCar, title: 'Transportation', desc: 'AI-Driven Logistics', color: 'border-indigo-500', iconColor: 'text-indigo-400' },
    { icon: FaLightbulb, title: 'Open Innovation', desc: 'Wildcard Track', color: 'border-white', iconColor: 'text-white' },
];

const Tracks = () => {
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
                    <p className="text-gray-400 max-w-2xl mx-auto">Choose your battlefield. Innovate in any of these cutting-edge domains.</p>
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
                            className={`glass-panel p-6 flex flex-col items-center text-center group cursor-pointer border-t-2 ${track.color} hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]`}
                        >
                            <div className="p-5 rounded-full bg-white/5 mb-6 group-hover:bg-white/10 transition-colors duration-300 relative z-10 group-hover:scale-110 ease-in-out">
                                <track.icon size={32} className={`${track.iconColor} group-hover:text-white transition-colors duration-300 drop-shadow-md`} />
                            </div>
                            <h3 className="text-lg font-bold mb-2 relative z-10 text-white group-hover:text-accent-color transition-colors">{track.title}</h3>
                            <p className="text-sm text-gray-400 relative z-10">{track.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tracks;
