import React from 'react';
import { motion } from 'framer-motion';

const events = [
    { date: '15 JAN 2026', title: 'Idea Submission', desc: 'Submit your problem pitch.' },
    { date: '20 JAN 2026', title: 'Acceptance', desc: 'Shortlisted teams announcement.' },
    { date: '31 JAN 2026', time: '10:00 AM', title: 'Hackathon Start', desc: 'The 36-hour challenge begins.' },
    { date: '01 FEB 2026', time: '07:00 PM', title: 'Demo & Pitch', desc: 'Grand finale and winners.' },
];

const Timeline = () => {
    return (
        <section id="timeline" className="py-16 md:py-24 relative">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-black font-heading mb-4">
                        EVENT <span className="text-accent-color">TIMELINE</span>
                    </h2>
                </motion.div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary-color to-transparent"></div>

                    <div className="space-y-12">
                        {events.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`relative flex items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Spacer for desktop alignment */}
                                <div className="hidden md:block w-5/12"></div>

                                {/* Node */}
                                <div className="absolute left-4 md:left-1/2 -translate-x-[4.5px] w-4 h-4 rounded-full bg-black border-4 border-accent-color shadow-[0_0_15px_var(--color-accent-color)] z-10"></div>

                                {/* Content Card */}
                                <div className="ml-12 md:ml-0 md:w-5/12">
                                    <div className="glass-panel p-6 border-l-4 border-l-accent-color hover:bg-white/5 transition-colors group">
                                        <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-black bg-accent-color rounded-full group-hover:scale-105 transition-transform">
                                            {event.date} {event.time && `• ${event.time}`}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mb-2 font-heading">{event.title}</h3>
                                        <p className="text-gray-400 text-sm">{event.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
