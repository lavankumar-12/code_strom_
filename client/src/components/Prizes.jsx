import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaCrown, FaWifi, FaUserMd, FaHamburger, FaTshirt, FaBed, FaChalkboardTeacher } from 'react-icons/fa';

const Prizes = () => {
    return (
        <section id="prizes" className="py-24 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[100px] animate-pulse"></div>

            <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-6 font-sans">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">PRIZE POOL</span>
                    </h2>
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
                        className="inline-block px-8 py-3 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-md cursor-pointer"
                    >
                        <span className="text-3xl md:text-5xl font-bold text-yellow-400 tracking-wider">₹ 10,00,000</span>
                    </motion.div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 items-end justify-center mb-24 max-w-5xl mx-auto">
                    {/* 2nd Place */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="order-2 md:order-1"
                    >
                        <motion.div whileHover={{ y: -10 }} className="glass-panel p-8 flex flex-col items-center border-gray-400/30 bg-gradient-to-b from-gray-400/10 to-transparent relative transform translate-y-8 hover:border-gray-400/50 transition-colors">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                                <FaMedal className="text-gray-300 text-6xl drop-shadow-[0_0_15px_rgba(200,200,200,0.5)]" />
                            </div>
                            <h4 className="text-2xl font-bold text-gray-300 mt-6 mb-2">2ND RUNNER UP</h4>
                            <p className="text-3xl font-bold text-white">₹ 2,00,000</p>
                        </motion.div>
                    </motion.div>

                    {/* Winner */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="order-1 md:order-2 z-10"
                    >
                        <motion.div whileHover={{ scale: 1.05 }} className="glass-panel p-10 flex flex-col items-center border-yellow-400/50 bg-gradient-to-b from-yellow-500/20 to-transparent relative hover:shadow-[0_0_50px_rgba(255,215,0,0.15)] transition-all">
                            <div className="absolute -top-14 left-1/2 -translate-x-1/2 animate-bounce">
                                <FaCrown className="text-yellow-400 text-8xl drop-shadow-[0_0_25px_rgba(255,215,0,0.8)]" />
                            </div>
                            <h4 className="text-4xl font-black text-yellow-400 mt-10 mb-2">WINNER</h4>
                            <p className="text-4xl font-bold text-white">₹ 5,00,000</p>
                            <div className="mt-4 px-4 py-1 bg-yellow-500/20 rounded-full border border-yellow-500/30 text-xs text-yellow-200 uppercase tracking-widest">
                                Grand Champion
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* 3rd Place / 1st Runner Up */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="order-3 md:order-3"
                    >
                        <motion.div whileHover={{ y: -10 }} className="glass-panel p-8 flex flex-col items-center border-amber-600/30 bg-gradient-to-b from-amber-600/10 to-transparent relative transform translate-y-8 hover:border-amber-600/50 transition-colors">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                                <FaTrophy className="text-amber-600 text-6xl drop-shadow-[0_0_15px_rgba(217,119,6,0.5)]" />
                            </div>
                            <h4 className="text-2xl font-bold text-amber-500 mt-6 mb-2">1ST RUNNER UP</h4>
                            <p className="text-3xl font-bold text-white">₹ 3,00,000</p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Facilities Grid */}
                <div className="max-w-4xl mx-auto">
                    <h4 className="text-xl font-bold text-gray-400 mb-8 uppercase tracking-widest">Participant Amenities</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { icon: FaWifi, label: "High-speed WiFi (Dedicated Zone)" },
                            { icon: FaUserMd, label: "24x7 On-ground Support" },
                            { icon: FaHamburger, label: "Food & Refreshments Counters" },
                            { icon: FaTshirt, label: "Swag Kits & T-Shirts" },
                            { icon: FaBed, label: "Night Stay Arrangements" },
                            { icon: FaChalkboardTeacher, label: "Mentorship Sessions" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="glass-panel p-4 flex items-center space-x-4 border border-white/5 hover:border-primary-color/50 transition-colors cursor-default"
                            >
                                <div className="p-2 rounded-full bg-white/5 text-accent-color">
                                    <item.icon />
                                </div>
                                <span className="text-gray-300 font-medium">{item.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Prizes;
