import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&q=80')] opacity-[0.03] bg-repeat mix-blend-overlay pointer-events-none" />
      <Navbar />
      <main className="relative">
        <Hero />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App