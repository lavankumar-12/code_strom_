import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Registration = () => {
    const [formData, setFormData] = useState({
        teamName: '',
        leaderName: '',
        email: '',
        phone: '',
        college: '',
        track: 'Generative AI & LLM', // Default
        teamSize: 4
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ teamName: '', leaderName: '', email: '', phone: '', college: '', track: 'Generative AI & LLM', teamSize: 4 });
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <section id="register" className="py-20 relative">
            <div className="max-w-3xl mx-auto px-6">
                <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-color/10 rounded-full blur-[80px]"></div>

                    <h2 className="text-3xl font-bold mb-8 text-center">Register Your Team</h2>

                    {status === 'success' ? (
                        <div className="text-center py-12">
                            <h3 className="text-2xl font-bold text-green-400 mb-4">Registration Successful!</h3>
                            <p>Get ready for the CodeStorm!</p>
                            <button onClick={() => setStatus('')} className="mt-6 btn-primary">Register Another</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Team Name</label>
                                    <input type="text" name="teamName" value={formData.teamName} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-color" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Team Leader Name</label>
                                    <input type="text" name="leaderName" value={formData.leaderName} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-color" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-color" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Phone</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-color" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">College Name</label>
                                <input type="text" name="college" value={formData.college} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-color" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Select Track</label>
                                    <select name="track" value={formData.track} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-color">
                                        <option>Generative AI & LLM</option>
                                        <option>Robotics & Drones</option>
                                        <option>Cybersecurity</option>
                                        <option>HealthTech</option>
                                        <option>FinTech</option>
                                        <option>Smart Cities</option>
                                        <option>Green Tech</option>
                                        <option>Agritech</option>
                                        <option>Transportation</option>
                                        <option>Open Innovation</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Team Size</label>
                                    <div className="flex space-x-4 mt-2">
                                        {[4, 5, 6].map(size => (
                                            <label key={size} className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="teamSize"
                                                    value={size}
                                                    checked={parseInt(formData.teamSize) === size}
                                                    onChange={handleChange}
                                                    className="accent-primary-color"
                                                />
                                                <span>{size}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full py-4 mt-4">
                                {status === 'submitting' ? 'Submitting...' : 'Complete Registration (₹600)'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Registration;
