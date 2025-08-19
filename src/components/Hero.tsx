import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { hero as heroContent } from '../content';

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {/* Background (optional via content) */}
        {heroContent.background.type === 'video' && heroContent.background.src ? (
          <>
            <div 
              className={`absolute inset-0 transition-opacity duration-1000 animate-pulse-bg
                ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`} 
            />
            <video
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => setIsVideoLoaded(true)}
              className={`w-full h-full object-cover scale-105 transition-opacity duration-1000 
                ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
              <source src={heroContent.background.src} type="video/mp4" />
            </video>
            <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-black/75 dark:via-black/70 dark:to-black/80 
              light:bg-gradient-to-b light:from-black/50 light:via-black/45 light:to-black/60" />
          </>
        ) : heroContent.background.type === 'image' && heroContent.background.src ? (
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${heroContent.background.src})` }}
          >
            <div className="absolute inset-0 dark:bg-black/60 light:bg-black/50" />
          </div>
        ) : (
          <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-black/80 dark:via-black/70 dark:to-black/80 light:bg-gradient-to-b light:from-white light:via-white light:to-white" />
        )}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="dark:bg-white/[0.08] light:bg-black/[0.08] backdrop-blur-lg p-6 sm:p-8 md:p-12 rounded-3xl 
          dark:border-white/10 light:border-black/10 shadow-2xl animate-fade-in
          dark:hover:shadow-[0_20px_60px_-10px_rgba(255,255,255,0.3)] 
          light:hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)]
          hover:-translate-y-1 hover:scale-[1.01]
          transition-all duration-300 ease-out relative overflow-hidden group">
          <div className="absolute -left-[100%] -top-[100%] w-[300%] h-[300%] group-hover:translate-x-[50%] group-hover:translate-y-[50%] rotate-[30deg]
            dark:bg-[linear-gradient(90deg,transparent_10%,rgba(255,255,255,0.05)_20%,rgba(255,255,255,0.1)_30%,rgba(255,255,255,0.05)_40%,transparent_50%)]
            light:bg-[linear-gradient(90deg,transparent_10%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_30%,rgba(0,0,0,0.05)_40%,transparent_50%)]
            transition-transform duration-[1500ms] ease-in-out" />
          {heroContent.eyebrow && (
            <span className="font-medium mb-3 sm:mb-4 block tracking-wide animate-slide-up dark:text-white light:text-black">{heroContent.eyebrow}</span>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight animate-slide-up [text-wrap:balance] dark:text-white light:text-black">
            {heroContent.heading}
          </h1>
          {heroContent.subheading && (
            <p className="text-lg sm:text-xl mb-6 sm:mb-10 max-w-2xl mx-auto animate-slide-up delay-100 [text-wrap:balance] dark:text-gray-200 light:text-gray-700">
              {heroContent.subheading}
            </p>
          )}
          <div className="flex gap-2 sm:gap-3 justify-center items-center animate-slide-up delay-200">
            {heroContent.secondaryCta?.label && (
              <a
                href={heroContent.secondaryCta.href}
                className="inline-flex items-center gap-1.5 sm:gap-2 border 
                  dark:text-white light:text-black 
                  dark:border-white/20 light:border-black/30 
                  px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg text-sm sm:text-base font-semibold 
                  dark:hover:bg-white/10 light:hover:bg-black/10 transition-all"
              >
                {heroContent.secondaryCta.label}
              </a>
            )}
            {heroContent.primaryCta?.label && (
              <a
                href={heroContent.primaryCta.href}
                className="flex justify-center items-center dark:bg-white dark:text-slate-900 light:bg-black light:text-white 
                  px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg text-sm sm:text-base font-semibold 
                  dark:hover:bg-white/80 light:hover:bg-black/80 dark:hover:text-black light:hover:text-white transition-all"
              >
                {heroContent.primaryCta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero