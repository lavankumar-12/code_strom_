import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaTrophy, FaLayerGroup, FaUsers } from 'react-icons/fa';

const stats = [
    { icon: FaClock, label: 'Non-Stop Action', value: '36 Hours', color: 'text-accent-color' },
    { icon: FaTrophy, label: 'Prize Pool', value: '₹ 10L+', color: 'text-yellow-400' },
    { icon: FaLayerGroup, label: 'Themes', value: '10+', color: 'text-primary-color' },
    { icon: FaUsers, label: 'Participants', value: '500+', color: 'text-secondary-color' },
];

const About = () => {
    return (
        <section id="about" className="py-16 md:py-24 relative z-10 overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary-color/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.1 }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black font-heading mb-8">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">ABOUT THE</span> <br />
                            <span className="text-secondary-color drop-shadow-[0_0_15px_rgba(255,75,31,0.5)]">EVENT</span>
                        </h2>

                        <p className="text-lg text-gray-300 leading-relaxed mb-6 border-l-4 border-accent-color pl-6">
                            CodeStorm 2026 is not just a hackathon; it's a <span className="text-white font-bold">revolution</span>. A high-energy 36-hour endurance test designed to unleash creativity, innovation, and real-world problem-solving capabilities.
                        </p>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            Organized by Narsimha Reddy Engineering College, this event brings together the brightest minds to build the future. Whether you are into AI, Blockchain, or Green Tech, this is your arena to compete with the best.
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-6 relative">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                                whileHover={{ scale: 1.05, translateY: -5 }}
                                className="glass-panel p-6 md:p-8 flex flex-col items-center justify-center text-center group border border-white/5 hover:border-white/20 transition-all duration-300"
                            >
                                <div className={`p-4 rounded-full bg-white/5 mb-4 group-hover:bg-white/10 transition-colors ${stat.color} shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
                                    <stat.icon size={32} />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 font-heading">{stat.value}</h3>
                                <p className="text-sm text-gray-400 uppercase tracking-wider font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
