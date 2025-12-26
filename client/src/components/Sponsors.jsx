import React from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaMicrosoft, FaAmazon, FaIntel, FaGithub, FaAws, FaMicrochip, FaCar } from 'react-icons/fa';

const sponsors = [
    { icon: FaGoogle, name: 'Google' },
    { icon: FaMicrosoft, name: 'Microsoft' },
    { icon: FaMicrochip, name: 'NVIDIA' },
    { icon: FaAmazon, name: 'Amazon' },
    { icon: FaCar, name: 'Tesla' },
    { icon: FaIntel, name: 'Intel' },
    { icon: FaGithub, name: 'GitHub' },
    { icon: FaMicrochip, name: 'OpenAI' },
    { icon: FaAws, name: 'AWS' },
];

const Sponsors = () => {
    return (
        <section className="py-20 overflow-hidden relative border-y border-white/5 bg-black/20">
            <div className="text-center mb-10">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.3em]">Powered By</p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                {/* Marquee Container */}
                <div className="animate-[marquee_20s_linear_infinite] flex space-x-16 items-center whitespace-nowrap">
                    {/* Double the list for seamless loop */}
                    {[...sponsors, ...sponsors].map((sponsor, index) => (
                        <div key={index} className="flex items-center space-x-3 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
                            <sponsor.icon size={40} className="text-white" />
                            <span className="text-xl font-bold font-heading text-white hidden md:inline-block">{sponsor.name}</span>
                        </div>
                    ))}
                </div>

                {/* Second layer for perfect loop (already handled by double mapping above but let's ensure width) */}
                <div className="absolute top-0 animate-[marquee2_20s_linear_infinite] flex space-x-16 items-center whitespace-nowrap ml-[100%]">
                    {[...sponsors, ...sponsors].map((sponsor, index) => (
                        <div key={index} className="flex items-center space-x-3 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
                            <sponsor.icon size={40} className="text-white" />
                            <span className="text-xl font-bold font-heading text-white hidden md:inline-block">{sponsor.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Sponsors;
