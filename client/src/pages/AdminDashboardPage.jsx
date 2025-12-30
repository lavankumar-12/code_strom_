import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaDownload, FaSignOutAlt, FaChevronDown, FaChevronUp, FaSchool, FaCodeBranch, FaChartBar } from 'react-icons/fa';

const AdminDashboardPage = () => {
    const [registrations, setRegistrations] = useState([]);
    const [collegeStats, setCollegeStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('isAdmin') !== 'true') {
            navigate('/login');
            return;
        }
        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/admin/dashboard');
            const result = await response.json();
            if (response.ok) {
                setRegistrations(result.registrations || []);
                setCollegeStats(result.collegeStats || []);
            }
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/login');
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary-color border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter">Event <span className="text-primary-color">ADMIN</span></h1>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">CodeStorm 2026 Admin Dashboard</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => window.print()}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-bold transition-all"
                        >
                            <FaDownload className="text-primary-color" /> Export Data
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-bold text-red-500 transition-all"
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {[
                        { label: 'Total Teams', value: registrations.length, icon: <FaUsers /> },
                        { label: 'Total Participants', value: registrations.reduce((acc, curr) => acc + curr.team_size, 0), icon: <FaUsers /> },
                        { label: 'Revenue (₹)', value: registrations.reduce((acc, curr) => acc + (curr.team_size * 600), 0), icon: <FaUsers /> }
                    ].map((stat, i) => (
                        <div key={i} className="glass-panel p-6 border-white/5">
                            <p className="text-gray-500 text-[10px] uppercase font-black mb-1">{stat.label}</p>
                            <div className="flex items-center justify-between">
                                <h3 className="text-3xl font-black">{stat.value}</h3>
                                <div className="text-primary-color text-xl">{stat.icon}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* College Statistics Section */}
                <div className="mb-12">
                    <h2 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                        <FaChartBar className="text-secondary-color" /> Participation by College
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {collegeStats.map((stat, i) => (
                            <div key={i} className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex justify-between items-center group hover:border-secondary-color/30 transition-all">
                                <div>
                                    <p className="text-white font-bold text-sm truncate max-w-[150px]">{stat.college}</p>
                                    <p className="text-gray-500 text-[10px] uppercase font-black">College</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-black text-secondary-color">{stat.count}</p>
                                    <p className="text-gray-600 text-[8px] uppercase font-bold">Members</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-black uppercase tracking-widest mb-6">Team Registrations</h2>
                    {registrations.map((team) => (
                        <div key={team.id} className="glass-panel border-white/5 overflow-hidden transition-all duration-300">
                            <div
                                onClick={() => toggleExpand(team.id)}
                                className="p-6 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-white/[0.02]"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-xl font-bold text-white">{team.team_name}</h3>
                                        <span className="bg-primary-color/20 text-primary-color text-[10px] font-black px-2 py-0.5 rounded uppercase">
                                            {team.track}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">
                                        Leader: <span className="text-white">{team.leader_name}</span> • {team.college}
                                    </p>
                                </div>
                                <div className="flex items-center gap-8 w-full md:w-auto justify-between">
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-600 font-bold uppercase">Squad Size</p>
                                        <p className="font-black text-xl">{team.team_size}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-600 font-bold uppercase">Status</p>
                                        <p className="text-green-500 font-black text-xs uppercase tracking-widest">Verified</p>
                                    </div>
                                    {expandedId === team.id ? <FaChevronUp className="text-gray-600" /> : <FaChevronDown className="text-gray-600" />}
                                </div>
                            </div>

                            <AnimatePresence>
                                {expandedId === team.id && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        className="overflow-hidden bg-white/[0.01] border-t border-white/5"
                                    >
                                        <div className="p-8">
                                            <div className="grid md:grid-cols-2 gap-12 mb-8">
                                                <div>
                                                    <h4 className="text-xs font-black text-gray-600 uppercase tracking-widest mb-4">Leader Contact</h4>
                                                    <div className="space-y-3">
                                                        <p className="text-sm font-bold flex items-center gap-3"><span className="text-gray-500 uppercase tracking-tighter text-[10px] w-12">Email</span> {team.email}</p>
                                                        <p className="text-sm font-bold flex items-center gap-3"><span className="text-gray-500 uppercase tracking-tighter text-[10px] w-12">Phone</span> {team.phone}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-black text-gray-600 uppercase tracking-widest mb-4">Meta Data</h4>
                                                    <p className="text-sm font-bold flex items-center gap-3"><span className="text-gray-500 uppercase tracking-tighter text-[10px] w-12">Joined</span> {new Date(team.created_at).toLocaleString()}</p>
                                                </div>
                                            </div>

                                            <h4 className="text-xs font-black text-gray-600 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Full Roster</h4>
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {team.members.map((member, idx) => (
                                                    <div key={idx} className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <p className="font-bold text-sm">{member.name}</p>
                                                            {member.is_lead ? <span className="bg-yellow-500 text-black text-[8px] font-black px-1.5 py-0.5 rounded uppercase">Lead</span> : null}
                                                        </div>
                                                        <div className="space-y-1.5 text-[10px] font-bold text-gray-500 uppercase">
                                                            <p className="flex items-center gap-2"><FaSchool className="text-primary-color" /> {member.college} ({member.college_code})</p>
                                                            <p className="flex items-center gap-2"><FaCodeBranch className="text-secondary-color" /> {member.branch} • {member.gender}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
