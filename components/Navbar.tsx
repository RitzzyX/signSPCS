
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { storageService } from '../services/storageService.ts';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = storageService.getAuth();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Legacy', path: '/' },
    { name: 'Portfolio', path: '/projects' },
    { name: 'Services', path: '/services' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-700 ${isMenuOpen ? 'bg-transparent' : 'glass-nav'} py-6 px-8 md:px-16`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-4 relative z-[160]">
            <div className={`w-10 h-10 border rounded-full flex items-center justify-center transition-all duration-500 ${isMenuOpen ? 'border-white/20' : 'border-[#C5A059]'}`}>
              <span className={`font-light text-xl transition-colors duration-500 ${isMenuOpen ? 'text-white' : 'text-[#C5A059]'}`}>S</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-serif tracking-[0.2em] uppercase leading-none transition-colors duration-500 ${isMenuOpen ? 'text-white' : 'text-white'}`}>Signature</span>
              <span className="text-[9px] text-[#C5A059] tracking-[0.5em] uppercase font-bold mt-1">Spaces</span>
            </div>
          </Link>
          
          <div className="hidden md:flex space-x-16 items-center text-[10px] tracking-[0.4em] uppercase font-black">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`${isActive(link.path) ? 'text-[#C5A059]' : 'text-slate-400 hover:text-white'} transition-all`}
              >
                {link.name}
              </Link>
            ))}
            
            {auth.isAuthenticated ? (
              <Link to="/admin" className="bg-[#C5A059] text-[#020617] px-8 py-3 rounded-full hover:bg-white transition-all font-black">Management</Link>
            ) : (
              <Link to="/admin-login" className="border border-white/10 text-slate-400 hover:text-white px-8 py-3 rounded-full transition-all">Advisor Portal</Link>
            )}
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden relative z-[160] p-2 focus:outline-none"
          >
            <div className="w-6 space-y-2">
              <span className={`block h-[1px] w-full transition-all duration-500 ${isMenuOpen ? 'bg-white rotate-45 translate-y-[9px]' : 'bg-white'}`}></span>
              <span className={`block h-[1px] w-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'bg-white'}`}></span>
              <span className={`block h-[1px] w-full transition-all duration-500 ${isMenuOpen ? 'bg-white -rotate-45 -translate-y-[9px]' : 'bg-white'}`}></span>
            </div>
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 bg-[#020617] z-[140] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col h-full justify-center px-12 space-y-16">
          {navLinks.map((link, idx) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`text-6xl font-serif italic text-white transition-all duration-700 delay-[${200 + idx * 100}ms] ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
            >
              {link.name}
            </Link>
          ))}
          <div className={`pt-12 transition-all duration-700 delay-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
            <Link to="/admin-login" onClick={() => setIsMenuOpen(false)} className="text-[#C5A059] text-[11px] uppercase tracking-[0.5em] font-black">Advisor Access &rarr;</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
