import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <nav className="fixed top-6 sm:top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 rounded-full glass-nav backdrop-blur-lg
        dark:hover:shadow-[0_15px_30px_-10px_rgba(255,255,255,0.08)] light:hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.08)]
        hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-300 ease-out group overflow-hidden">
        <div className="absolute -left-[150%] -top-[150%] w-[400%] h-[400%] group-hover:translate-x-[35%] group-hover:translate-y-[35%] rotate-[45deg]
          dark:bg-[linear-gradient(90deg,transparent_10%,rgba(255,255,255,0.05)_20%,rgba(255,255,255,0.1)_30%,rgba(255,255,255,0.05)_40%,transparent_50%)]
          light:bg-[linear-gradient(90deg,transparent_10%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_30%,rgba(0,0,0,0.05)_40%,transparent_50%)]
          transition-transform duration-[1500ms] ease-in-out origin-[0%_0%]" />
        <div className="px-8 py-4 relative">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center group">
              <div className="flex gap-[3px] group-hover:scale-110 transition-transform duration-300">
                <div className="w-[2px] h-6 dark:bg-white light:bg-black rounded-full"></div>
                <div className="w-[2px] h-6 dark:bg-white light:bg-black rounded-full"></div>
                <div className="w-[2px] h-6 dark:bg-white light:bg-black rounded-full"></div>
              </div>
              <span className="ml-3 text-lg font-medium dark:text-white light:text-black transition-colors duration-300">
                Domum
              </span>
            </a>
            <div className="hidden md:flex md:items-center md:space-x-8">
              <div className="flex items-baseline space-x-8">
                {['Services', 'Portfolio', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="dark:text-gray-300 light:text-gray-600 dark:hover:text-white light:hover:text-black px-3 py-2 text-sm font-medium transition-all duration-300
                      relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left
                      after:scale-x-0 dark:after:bg-white light:after:bg-black after:transition-transform after:duration-300
                      hover:after:scale-x-100"
                  >
                    {item}
                  </a>
                ))}
              </div>
              <button
                onClick={toggleTheme}
                className="relative w-14 h-7 rounded-full 
                  dark:bg-[linear-gradient(145deg,#1a1a1a,#282828)]
                  light:bg-[linear-gradient(145deg,#e2e2e2,#f5f5f5)]
                  border dark:border-white/[0.08] light:border-black/[0.08]
                  transition-colors duration-300
                  before:absolute before:content-[''] 
                  before:top-1/2 before:left-[3px] before:-translate-y-1/2
                  before:w-[20px] before:h-[20px] before:rounded-full 
                  before:bg-[linear-gradient(145deg,#ffffff,#f8f8f8)]
                  dark:before:bg-[linear-gradient(145deg,#ffffff,#f8f8f8)]
                  light:before:bg-[linear-gradient(145deg,#2a2a2a,#343434)]
                  before:border before:border-white/10
                  light:before:border-transparent
                  before:transition-all before:duration-300 ease-out
                  dark:before:translate-x-[28px] light:before:translate-x-0
                  hover:before:scale-95 active:before:scale-90"
                aria-label="Toggle theme"
              >
                <div className="absolute inset-0">
                  <span className={`absolute right-[7px] top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center transition-all duration-300
                    ${theme === 'dark' ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
                    <Sun className="w-[13px] h-[13px] text-gray-600" />
                  </span>
                  <span className={`absolute left-[7px] top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center transition-all duration-300
                    ${theme === 'dark' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    <Moon className="w-[13px] h-[13px] text-gray-200" />
                  </span>
                </div>
              </button>
            </div>
            <button
              className="md:hidden dark:text-gray-300 light:text-gray-600 dark:hover:text-white light:hover:text-black transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div className={`md:hidden fixed top-24 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-40 transition-all duration-300
        ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
      >
        <div className={`overflow-hidden rounded-2xl dark:border-white/10 light:border-black/10 transition-all duration-500
          ${isMenuOpen ? 'dark:bg-white/[0.07] light:bg-black/[0.07] backdrop-blur-xl' : 'bg-transparent backdrop-blur-none'}`}>
          <div className="p-6 space-y-4">
            {['Services', 'Portfolio', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block dark:text-gray-300 light:text-gray-600 dark:hover:text-white light:hover:text-black py-2 text-lg font-medium transition-all duration-300
                  relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left
                  after:scale-x-0 dark:after:bg-white light:after:bg-black after:transition-transform after:duration-300
                  hover:after:scale-x-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="relative w-full p-3 rounded-xl dark:bg-white/[0.07] light:bg-black/[0.07] 
                dark:hover:bg-white/[0.15] light:hover:bg-black/[0.15] 
                dark:text-gray-300 light:text-gray-600 
                dark:hover:text-white light:hover:text-black
                transition-all duration-300 flex items-center justify-center gap-2"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-5 h-5" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;