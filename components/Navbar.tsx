
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { storageService } from '../services/storageService';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = storageService.getAuth();

  const isActive = (path: string) => location.pathname === path;

  // Total lock on body scroll when menu is open to ensure clean experience
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Legacy', path: '/' },
    { name: 'Portfolio', path: '/projects' },
    { name: 'Services', path: '/services' },
  ];

  return (
    <>
      {/* Primary Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-500 ${isMenuOpen ? 'bg-transparent border-transparent' : 'glass-nav border-b border-slate-100'} py-4 md:py-6 px-6 md:px-12`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 md:space-x-4 relative z-[160]">
            <div className={`w-8 h-8 md:w-10 md:h-10 border rounded-full flex items-center justify-center transition-all duration-500 ${isMenuOpen ? 'border-white/20' : 'border-slate-900'}`}>
              <span className={`font-light text-base md:text-xl transition-colors duration-500 ${isMenuOpen ? 'text-white' : 'text-slate-900'}`}>S</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-sm md:text-xl font-serif tracking-[0.15em] md:tracking-[0.2em] uppercase leading-none transition-colors duration-500 ${isMenuOpen ? 'text-white' : 'text-slate-900'}`}>Signature</span>
              <span className="text-[7px] md:text-[9px] text-[#C5A059] tracking-[0.4em] md:tracking-[0.5em] uppercase font-bold mt-0.5">Spaces</span>
            </div>
          </Link>
          
          {/* Desktop Links - Minimal & Elegant */}
          <div className="hidden md:flex space-x-12 items-center text-[10px] tracking-[0.4em] uppercase font-black">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`${isActive(link.path) ? 'text-[#C5A059]' : 'text-slate-900 hover:text-[#C5A059]'} transition-all`}
              >
                {link.name}
              </Link>
            ))}
            
            {auth.isAuthenticated ? (
              <Link to="/admin" className="bg-[#0F172A] text-white px-8 py-3 rounded-full hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">Management</Link>
            ) : (
              <Link to="/admin-login" className="border border-slate-200 text-slate-500 hover:text-slate-900 px-8 py-3 rounded-full transition-all">Advisor Portal</Link>
            )}
          </div>

          {/* Mobile Toggle Trigger */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden relative z-[160] p-2 focus:outline-none"
            aria-label="Menu Toggle"
          >
            <div className="w-6 space-y-2">
              <span className={`block h-[1.5px] w-full transition-all duration-500 transform ${isMenuOpen ? 'bg-white rotate-45 translate-y-[9.5px]' : 'bg-slate-900'}`}></span>
              <span className={`block h-[1.5px] w-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'bg-slate-900'}`}></span>
              <span className={`block h-[1.5px] w-full transition-all duration-500 transform ${isMenuOpen ? 'bg-white -rotate-45 -translate-y-[9.5px]' : 'bg-slate-900'}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Solid Deep Navy (Luxury Shield) */}
      <div 
        className={`fixed inset-0 bg-[#0F172A] z-[140] md:hidden transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col h-full justify-between pt-32 pb-16 px-10">
          {/* Navigation Links with Staggered Fade-in */}
          <div className="flex flex-col space-y-12">
            <div className="flex items-center space-x-4 mb-2">
              <div className="w-8 h-[1px] bg-[#C5A059]/40"></div>
              <span className="text-[#C5A059] text-[8px] uppercase tracking-[0.5em] font-black italic">The Directory</span>
            </div>
            
            <div className="flex flex-col space-y-8">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-5xl font-serif italic text-white transition-all duration-500 ${
                    isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className={`pt-12 transition-all duration-700 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '650ms' }}>
              {auth.isAuthenticated ? (
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-[11px] uppercase tracking-[0.4em] font-black text-[#C5A059] flex items-center">
                  Management Hub <span className="ml-4 text-lg">→</span>
                </Link>
              ) : (
                <Link to="/admin-login" onClick={() => setIsMenuOpen(false)} className="text-[11px] uppercase tracking-[0.4em] font-black text-slate-400">
                  Advisor Access Portal
                </Link>
              )}
            </div>
          </div>

          {/* Brand Footer */}
          <div className={`space-y-10 transition-all duration-700 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
            <div className="h-px w-full bg-white/5"></div>
            <div className="grid grid-cols-1 gap-8">
              <div>
                <p className="text-[#C5A059] text-[7px] uppercase tracking-[0.4em] font-black mb-2 italic">Global Inquiries</p>
                <p className="text-white/40 text-[10px] tracking-[0.2em] font-light">concierge@signature-spaces.com</p>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <p className="text-[8px] uppercase tracking-[0.5em] font-bold">Privacy Policy</p>
                <p className="text-[8px] uppercase tracking-[0.5em] font-bold">Terms of Use</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
