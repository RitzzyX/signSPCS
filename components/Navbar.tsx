
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { storageService } from '../services/storageService';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = storageService.getAuth();

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
            <div className={`w-10 h-10 border rounded-full flex items-center justify-center transition-all duration-500 border-[#C5A059]`}>
              <span className={`font-light text-xl text-[#C5A059]`}>S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif tracking-[0.2em] uppercase leading-none text-white">Signature</span>
              <span className="text-[9px] text-[#C5A059] tracking-[0.5em] uppercase font-bold mt-1">Spaces</span>
            </div>
          </Link>
          
          <div className="hidden md:flex space-x-12 items-center text-[9px] tracking-[0.4em] uppercase font-black">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`${location.pathname === link.path ? 'text-[#C5A059]' : 'text-slate-400 hover:text-white'} transition-all`}
              >
                {link.name}
              </Link>
            ))}
            <Link to={auth.isAuthenticated ? "/admin" : "/admin-login"} className="bg-[#C5A059] text-[#020617] px-6 py-2 rounded-full hover:bg-white transition-all">
              {auth.isAuthenticated ? 'Dashboard' : 'Portal'}
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden relative z-[160] text-white">
            {isMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 bg-[#020617] z-[140] transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col h-full justify-center px-12 space-y-12">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className="text-5xl font-serif italic text-white">
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
