import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import About from './components/About';
import Tracks from './components/Tracks';
import Timeline from './components/Timeline';
import Prizes from './components/Prizes';
import Footer from './components/Footer';
import Background from './components/Background';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  return (
    <Router>
      <div className="App relative text-white w-full overflow-x-hidden">
        <Background />
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <Countdown />
              <About />
              <Tracks />
              <Timeline />
              <Prizes />
              <Footer />
            </>
          } />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<AdminLoginPage />} />
          <Route path="/dashboard" element={<AdminDashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
