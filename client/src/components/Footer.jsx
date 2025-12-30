import React from 'react';
import { FaMapMarkerAlt, FaGlobe, FaInstagram, FaLinkedin, FaTwitter, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer id="contact" className="relative pt-24 pb-12 overflow-hidden border-t border-white/10 bg-[#0a0a16]">

            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="text-3xl font-black font-heading text-white tracking-wider">
                            <span className="text-primary-color">CODE</span>STORM
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            "Build The Future. Break The Limits." <br />
                            The biggest hackathon of 2026 waits for you.
                        </p>
                        <div className="flex space-x-4">
                            {[FaInstagram, FaLinkedin, FaTwitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-color hover:scale-110 transition-all text-white">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white font-heading uppercase tracking-widest text-primary-color">Faculty Heads</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex items-start space-x-3 group">
                                <FaEnvelope className="mt-1 group-hover:text-primary-color transition-colors" />
                                <div>
                                    <span className="block text-white font-medium">Mrs. D. Nikhitha Reddy</span>
                                    <span className="text-gray-500">8125207382</span>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3 group">
                                <FaEnvelope className="mt-1 group-hover:text-primary-color transition-colors" />
                                <div>
                                    <span className="block text-white font-medium">Mr. G. Praveen Kumar</span>
                                    <span className="text-gray-500">9959732146</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white font-heading uppercase tracking-widest text-secondary-color">Student Leads</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="group">
                                <span className="block text-white font-medium group-hover:text-secondary-color transition-colors">Ms. Manepally Archana</span>
                                <span className="text-gray-500">8309734530</span>
                            </li>
                            <li className="group">
                                <span className="block text-white font-medium group-hover:text-secondary-color transition-colors">Mr. Tulasitilak</span>
                                <span className="text-gray-500">7780554004</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white font-heading uppercase tracking-widest text-accent-color">Venue</h4>
                        <div className="flex items-start space-x-3 text-gray-400 text-sm mb-4 group">
                            <FaMapMarkerAlt className="mt-1 text-accent-color flex-shrink-0 group-hover:animate-bounce" />
                            <p className="group-hover:text-white transition-colors">Narsimha Reddy Engineering College,<br /> Maisammaguda (V), Kompally - 500100, Hyderabad.</p>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-400 text-sm group cursor-pointer">
                            <FaGlobe className="text-accent-color group-hover:rotate-180 transition-transform duration-500" />
                            <a href="https://nrcmec.org" target="_blank" rel="noreferrer" className="group-hover:text-accent-color transition-colors">www.nrcmec.org</a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-[10px] uppercase tracking-widest">
                    <p>&copy; 2026 CodeStorm. All rights reserved.</p>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <Link to="/login" className="flex items-center gap-1.5 hover:text-primary-color transition-colors">
                            <FaLock size={10} /> Admin Login
                        </Link>
                        <p>Design by Lavan Kumar</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
