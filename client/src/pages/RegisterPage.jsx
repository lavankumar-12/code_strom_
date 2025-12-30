import React from 'react';
import { motion } from 'framer-motion';
import Registration from '../components/Registration';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Background from '../components/Background';

const RegisterPage = () => {
    return (
        <div className="min-h-screen relative text-white w-full overflow-x-hidden">
            <Navbar />
            <div className="pt-20">
                <Registration />
            </div>
            <Footer />
        </div>
    );
};

export default RegisterPage;
