import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-6 sm:top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 rounded-full glass-nav backdrop-blur-lg
        hover:shadow-[0_15px_30px_-10px_rgba(255,255,255,0.08)] hover:-translate-y-0.5 hover:scale-[1.01]
        transition-all duration-300 ease-out group overflow-hidden">
        <div className="absolute -left-[150%] -top-[150%] w-[400%] h-[400%] group-hover:translate-x-[35%] group-hover:translate-y-[35%] rotate-[45deg]
          bg-[linear-gradient(90deg,transparent_10%,rgba(255,255,255,0.05)_20%,rgba(255,255,255,0.1)_30%,rgba(255,255,255,0.05)_40%,transparent_50%)] 
          transition-transform duration-[1500ms] ease-in-out origin-[0%_0%]" />
        <div className="px-8 py-4 relative">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center group">
              <div className="flex gap-[3px] group-hover:scale-110 transition-transform duration-300">
                <div className="w-[2px] h-6 bg-white rounded-full"></div>
                <div className="w-[2px] h-6 bg-white rounded-full"></div>
                <div className="w-[2px] h-6 bg-white rounded-full"></div>
              </div>
              <span className="ml-3 text-lg font-medium text-white transition-colors duration-300 group-hover:text-white">
                Domum
              </span>
            </a>
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-8">
                {['Services', 'Portfolio', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300
                      relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left
                      after:scale-x-0 after:bg-white after:transition-transform after:duration-300
                      hover:after:scale-x-100"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <button
              className="md:hidden text-gray-300 hover:text-white transition-colors duration-300"
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
        <div className={`overflow-hidden rounded-2xl border border-white/10 transition-all duration-500
          ${isMenuOpen ? 'bg-white/[0.07] backdrop-blur-xl' : 'bg-transparent backdrop-blur-none'}`}>
          <div className="p-6 space-y-4">
            {['Services', 'Portfolio', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-gray-300 hover:text-white py-2 text-lg font-medium transition-all duration-300
                  relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left
                  after:scale-x-0 after:bg-white after:transition-transform after:duration-300
                  hover:after:scale-x-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;