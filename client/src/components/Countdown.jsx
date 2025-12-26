import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2026-01-31T10:00:00") - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timeUnits = [
        { label: 'DAYS', value: timeLeft.days },
        { label: 'HOURS', value: timeLeft.hours },
        { label: 'MINUTES', value: timeLeft.minutes },
        { label: 'SECONDS', value: timeLeft.seconds },
    ];

    return (
        <div className="w-full max-w-4xl mx-auto mt-12 mb-12">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {timeUnits.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: index * 0.1, type: "spring" }}
                        className="flex flex-col items-center"
                    >
                        <div className="relative glass-panel w-20 h-20 md:w-28 md:h-28 flex items-center justify-center border border-accent-color/30 bg-black/40 backdrop-blur-xl shadow-[0_0_20px_rgba(0,242,255,0.1)] rounded-xl overflow-hidden group">
                            {/* Scanline effect */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-accent-color/50 shadow-[0_0_10px_var(--color-accent-color)] animate-[scan_2s_linear_infinite] opacity-50"></div>

                            <span className="text-3xl md:text-5xl font-black font-heading text-white group-hover:text-accent-color transition-colors">
                                {String(item.value || '00').padStart(2, '0')}
                            </span>
                        </div>
                        <span className="mt-2 text-xs md:text-sm font-bold text-gray-500 tracking-widest">{item.label}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Countdown;
