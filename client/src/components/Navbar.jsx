import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navItems = [
        { title: 'Home', id: 'home' },
        { title: 'About', id: 'about' },
        { title: 'Tracks', id: 'tracks' },
        { title: 'Timeline', id: 'timeline' },
        { title: 'Prizes', id: 'prizes' },
        { title: 'Contact', id: 'contact' }, // Footer ID usually
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-full z-50 px-4 py-4"
        >
            <div className="glass-panel mx-auto max-w-7xl flex justify-between items-center py-3 px-6 rounded-full border border-white/10 bg-black/30 backdrop-blur-md">
                <div className="text-2xl font-bold font-heading text-white tracking-wider cursor-pointer">
                    <span className="text-primary-color">CODE</span>STORM
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center">
                    {navItems.map((item) => (
                        <motion.a
                            key={item.title}
                            href={`/${item.id === 'home' ? '' : '#' + item.id}`}
                            whileHover={{ scale: 1.1, textShadow: "0 0 8px rgb(255, 255, 255)" }}
                            whileTap={{ scale: 0.95 }}
                            className="text-gray-300 hover:text-accent-color transition-colors cursor-pointer text-sm font-medium uppercase tracking-wide"
                        >
                            {item.title}
                        </motion.a>
                    ))}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/register"
                            className="btn-primary text-sm px-6 py-2 ripple-effect"
                        >
                            Register Now
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden text-white cursor-pointer" onClick={toggleMenu}>
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-20 left-4 right-4 glass-panel flex flex-col items-center space-y-6 py-8 md:hidden z-40 bg-black/90"
                >
                    {navItems.map((item) => (
                        <motion.a
                            key={item.title}
                            href={`/${item.id === 'home' ? '' : '#' + item.id}`}
                            whileTap={{ scale: 0.9 }}
                            className="text-white text-lg font-medium hover:text-accent-color"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.title}
                        </motion.a>
                    ))}
                    <motion.div
                        className="w-full max-w-xs"
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/register"
                            className="btn-primary block w-full text-center py-3 ripple-effect"
                            onClick={() => setIsOpen(false)}
                        >
                            Register Now
                        </Link>
                    </motion.div>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
