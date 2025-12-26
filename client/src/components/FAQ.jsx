import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqs = [
    { question: 'Who can participate?', answer: 'The hackathon is open to all engineering students, regardless of their year or branch. Cross-college teams are also allowed.' },
    { question: 'Is there a registration fee?', answer: 'Yes, there is a nominal fee of ₹600 per student. This covers food, accommodation, swag kits, and participation.' },
    { question: 'Can I participate individually?', answer: 'No, this is a team-based hackathon. You must form a team of 4-6 members.' },
    { question: 'What is the selection process?', answer: 'Teams must submit their idea/pitch by Jan 15th. Shortlisted teams will be notified by Jan 20th.' },
    { question: 'Will food and accommodation be provided?', answer: 'Yes! We provide 4 meals, snacks, and hydration counters throughout the 36 hours. Dedicated rest zones are also available.' },
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-24 relative">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black font-heading mb-4">
                        <span className="text-white">F.A.Q</span>
                    </h2>
                    <p className="text-gray-400">Everything you need to know.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="glass-panel border-l-4 border-l-transparent hover:border-l-accent-color transition-colors overflow-hidden">
                            <button
                                className="w-full text-left py-4 px-6 flex justify-between items-center bg-transparent focus:outline-none"
                                onClick={() => toggle(index)}
                            >
                                <span className={`text-lg font-bold font-heading ${activeIndex === index ? 'text-accent-color' : 'text-gray-200'}`}>
                                    {faq.question}
                                </span>
                                {activeIndex === index ? <FaMinus className="text-accent-color" /> : <FaPlus className="text-gray-500" />}
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
