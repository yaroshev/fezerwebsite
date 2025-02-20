import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source src="/DomumMarch24_NoLogo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/70 to-black/80" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/[0.08] backdrop-blur-lg p-6 sm:p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl animate-fade-in
          hover:shadow-[0_20px_60px_-10px_rgba(255,255,255,0.3)] hover:-translate-y-1 hover:scale-[1.01]
          transition-all duration-300 ease-out relative overflow-hidden group">
          <div className="absolute -left-[100%] -top-[100%] w-[300%] h-[300%] group-hover:translate-x-[50%] group-hover:translate-y-[50%] rotate-[30deg]
            bg-[linear-gradient(90deg,transparent_10%,rgba(255,255,255,0.05)_20%,rgba(255,255,255,0.1)_30%,rgba(255,255,255,0.05)_40%,transparent_50%)] 
            transition-transform duration-[1500ms] ease-in-out" />
          <span className="text-white/80 font-medium mb-3 sm:mb-4 block tracking-wide animate-slide-up">WELCOME TO DOMUM</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight animate-slide-up [text-wrap:balance]">
            Premium Cabinetry<br className="hidden md:block" /> Installation
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-6 sm:mb-10 max-w-2xl mx-auto animate-slide-up delay-100 [text-wrap:balance]">
            Victoria's finest custom cabinet solutions, crafted with precision for your dream space
          </p>
          <div className="flex gap-2 sm:gap-3 justify-center items-center animate-slide-up delay-200">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-white text-slate-900 px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-opacity-90 transition-all group"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-white border border-white/20 px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-white/10 transition-all"
            >
              View Our Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero