import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaCrown, FaEnvelope, FaPhone, FaArrowLeft, FaSchool, FaHashtag, FaVenusMars, FaCodeBranch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Registration = () => {
    const emptyMember = { name: '', college: '', collegeCode: '', gender: '', branch: '', isLead: false, email: '', phone: '' };

    const [formData, setFormData] = useState({
        teamName: '',
        track: 'Generative AI & LLM',
        members: [
            { ...emptyMember, isLead: true },
            { ...emptyMember },
            { ...emptyMember },
            { ...emptyMember },
            { ...emptyMember },
            { ...emptyMember },
        ]
    });

    const [status, setStatus] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const API_BASE = "https://codestrom-production.up.railway.app";

const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate first 4 members
    const mandatoryMembers = formData.members.slice(0, 4);
    const allFilled = mandatoryMembers.every(m =>
        m.name.trim() &&
        m.college.trim() &&
        m.collegeCode.trim() &&
        m.gender.trim() &&
        m.branch.trim()
    );

    if (!allFilled) {
        alert("Details for the first 4 members are mandatory!");
        return;
    }

    const lead = formData.members.find(m => m.isLead);
    if (!lead.email || !lead.phone) {
        alert("Team Lead must provide Email and Mobile number!");
        return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
        const payload = {
            teamName: formData.teamName,
            track: formData.track,
            leaderName: lead.name,
            email: lead.email,
            phone: lead.phone,
            college: lead.college,
            teamSize: formData.members.filter(m => m.name.trim()).length,
            members: formData.members.filter(m => m.name.trim())
        };

        const response = await fetch(
            "https://codestrom-production.up.railway.app/api/register",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }
        );

        const data = await response.json();

        if (response.ok) {
            setStatus("success");
            alert("Registration successful!");
        } else {
            setStatus("error");
            setErrorMsg(data.message || "Registration failed");
        }

    } catch (err) {
        setStatus("error");
        setErrorMsg("Network error. Server not reachable.");
    }
};



    if (status === 'success') {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-panel p-12 max-w-lg border-green-500/30"
                >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Registration Received!</h3>
                    <p className="text-gray-400 mb-8">Your team <span className="text-accent-color font-bold">{formData.teamName}</span> is now in the storm. Check your email for further instructions.</p>
                    <Link to="/" className="btn-primary px-8 py-3">Back to Home</Link>
                </motion.div>
            </div>
        );
    }

    return (
        <section className="py-12 md:py-20">
            <div className="max-w-6xl mx-auto px-6">

                <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors group">
                    <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
                </Link>

                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">Team <span className="text-primary-color">Registration</span></h1>
                    <p className="text-gray-400 uppercase tracking-[0.3em] text-xs font-bold">CodeStorm 2026 • Build The Future</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="glass-panel p-8 md:p-12 border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-color/5 rounded-full blur-[100px] -z-10"></div>

                        {/* Unified Top Section: Team Details */}
                        <div className="grid md:grid-cols-2 gap-8 mb-12 pb-12 border-b border-white/5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 text-primary-color">Team Identity</label>
                                <input
                                    type="text"
                                    name="teamName"
                                    value={formData.teamName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter Team Name"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary-color focus:bg-white/[0.08] transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 text-primary-color">Innovation Track</label>
                                <select
                                    name="track"
                                    value={formData.track}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary-color focus:bg-white/[0.08] transition-all appearance-none cursor-pointer"
                                >
                                    {[
                                        'Generative AI & LLM', 'Robotics & Drones', 'Cybersecurity',
                                        'HealthTech', 'FinTech', 'Smart Cities', 'Green Tech', 'Open Innovation'
                                    ].map(t => <option key={t} value={t} className="bg-gray-900">{t}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Roster Layout Info */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <h3 className="text-lg font-bold uppercase tracking-wider text-accent-color">Team Roster</h3>
                            <div className="flex items-center space-x-6">
                                <span className="flex items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest"><span className="w-2 h-2 rounded-full bg-primary-color mr-2"></span> Mandatory (4)</span>
                                <span className="flex items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest"><span className="w-2 h-2 rounded-full bg-white/20 mr-2"></span> Optional (2)</span>
                            </div>
                        </div>

                        {/* Member Roster Grid */}
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            {formData.members.map((member, index) => (
                                <motion.div
                                    key={index}
                                    className={`p-6 rounded-2xl border transition-all duration-300 ${member.isLead ? 'bg-primary-color/[0.03] border-primary-color/30' : 'bg-white/[0.01] border-white/5'
                                        } ${index >= 4 && member.name === '' ? 'opacity-60 grayscale-[0.5]' : 'opacity-100'}`}
                                >
                                    <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                                        <div className="flex items-center">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${member.isLead ? 'bg-primary-color text-white' : 'bg-white/5 text-gray-500'}`}>
                                                {member.isLead ? <FaCrown /> : <FaUser />}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-600 uppercase">Member {index + 1}</p>
                                                <p className="text-xs font-black text-white">{member.isLead ? 'LEADER' : index < 4 ? 'REQUIRED' : 'OPTIONAL'}</p>
                                            </div>
                                        </div>
                                        {!member.isLead && (
                                            <button
                                                type="button"
                                                onClick={() => setLead(index)}
                                                className="text-[9px] font-black text-gray-500 hover:text-primary-color transition-colors uppercase border border-white/10 px-2 py-1 rounded-md"
                                            >
                                                Promote
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <input
                                            type="text"
                                            value={member.name}
                                            onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                            required={index < 4}
                                            placeholder="Full Name"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-primary-color"
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                value={member.college}
                                                onChange={(e) => handleMemberChange(index, 'college', e.target.value)}
                                                required={index < 4}
                                                placeholder="College Name"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-primary-color"
                                            />
                                            <input
                                                type="text"
                                                value={member.collegeCode}
                                                onChange={(e) => handleMemberChange(index, 'collegeCode', e.target.value)}
                                                required={index < 4}
                                                placeholder="College Code"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-primary-color"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <select
                                                value={member.gender}
                                                onChange={(e) => handleMemberChange(index, 'gender', e.target.value)}
                                                required={index < 4}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-primary-color appearance-none"
                                            >
                                                <option value="" className="bg-gray-900">Gender</option>
                                                <option value="Male" className="bg-gray-900">Male</option>
                                                <option value="Female" className="bg-gray-900">Female</option>
                                            </select>
                                            <input
                                                type="text"
                                                value={member.branch}
                                                onChange={(e) => handleMemberChange(index, 'branch', e.target.value)}
                                                required={index < 4}
                                                placeholder="Branch"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-primary-color"
                                            />
                                        </div>

                                        <AnimatePresence>
                                            {member.isLead && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="space-y-4 pt-4 border-t border-white/5 overflow-hidden"
                                                >
                                                    <input
                                                        type="email"
                                                        value={member.email || ''}
                                                        onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                                                        required={member.isLead}
                                                        placeholder="Email Address"
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-primary-color"
                                                    />
                                                    <input
                                                        type="tel"
                                                        value={member.phone || ''}
                                                        onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                                                        required={member.isLead}
                                                        placeholder="Mobile Number"
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-primary-color"
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Submission Section */}
                        <div className="pt-8 border-t border-white/5">
                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center font-bold"
                                >
                                    {errorMsg}
                                </motion.div>
                            )}
                            <div className="flex items-center justify-between mb-8 px-4">
                                <span className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em]">Total Processing Fee</span>
                                <motion.span
                                    key={formData.members.filter(m => m.name.trim() !== '').length}
                                    initial={{ scale: 1.2, color: '#ff416c' }}
                                    animate={{ scale: 1, color: '#fff' }}
                                    className="text-3xl font-black text-white"
                                >
                                    ₹ {formData.members.filter(m => m.name.trim() !== '').length * 600}
                                </motion.span>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                disabled={status === 'submitting'}
                                className="btn-primary w-full py-6 text-xl font-black uppercase tracking-tighter transition-all flex items-center justify-center gap-4 bg-gradient-to-r from-primary-color to-secondary-color"
                            >
                                {status === 'submitting' ? 'Processing Transaction...' : `Confirm Registration (₹${formData.members.filter(m => m.name.trim() !== '').length * 600})`}
                            </motion.button>
                            <p className="text-center text-gray-500 text-[10px] mt-6 uppercase tracking-[0.2em] font-bold">Secure SSL Submission • Team CodeStorm 2026</p>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Registration;
