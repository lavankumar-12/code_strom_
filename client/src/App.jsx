import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Tracks from './components/Tracks';
import Timeline from './components/Timeline';
import Prizes from './components/Prizes';
import Footer from './components/Footer';
import Background from './components/Background';
import Registration from './components/Registration';

function App() {
  return (
    <div className="App relative text-white">
      <Background />
      <Navbar />
      <Hero />
      <About />
      <Tracks />
      <Timeline />
      <Prizes />
      <Footer />
    </div>
  );
}

export default App;
