
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService.ts';
import ProjectCard from '../components/ProjectCard.tsx';

const Home: React.FC = () => {
  const projects = storageService.getProjects().slice(0, 3);

  return (
    <div className="bg-[#020617]">
      {/* Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80" 
            className="w-full h-full object-cover opacity-20 scale-105 animate-slow-zoom"
            alt="Estate Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]"></div>
        </div>

        <div className="relative z-10 text-center px-8">
          <div className="reveal flex items-center justify-center space-x-6 mb-12">
            <span className="w-12 h-px bg-[#C5A059]/30"></span>
            <span className="text-[#C5A059] tracking-[0.7em] uppercase text-[10px] font-black italic">The Private Collection</span>
            <span className="w-12 h-px bg-[#C5A059]/30"></span>
          </div>
          <h1 className="reveal text-7xl md:text-[11rem] font-serif text-white mb-10 leading-[0.9] tracking-tighter">
            Luxury <br/> <span className="italic text-[#C5A059]">Redefined</span>
          </h1>
          <p className="reveal text-slate-400 text-lg md:text-2xl font-light italic mb-16 max-w-2xl mx-auto leading-relaxed">
            Curating global landmarks of architectural integrity for those who view residence as fine art.
          </p>
          <div className="reveal flex flex-col md:flex-row items-center justify-center gap-8">
            <Link to="/projects" className="bg-[#C5A059] text-[#020617] px-16 py-6 rounded-full uppercase tracking-[0.5em] text-[10px] font-black hover:bg-white transition-all shadow-2xl shadow-[#C5A059]/10">
              The Portfolio
            </Link>
            <Link to="/services" className="text-white border-b border-white/20 pb-2 uppercase tracking-[0.5em] text-[10px] font-black hover:border-[#C5A059] transition-all">
              Our Advisory
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 animate-bounce opacity-30">
          <span className="text-[8px] uppercase tracking-widest font-black">Scroll</span>
          <div className="w-[1px] h-12 bg-white/50"></div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-48 px-8 max-w-7xl mx-auto">
        <div className="reveal flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-1/2">
            <span className="text-[#C5A059] uppercase tracking-[0.6em] text-[9px] font-black mb-8 block">Legacy Architecture</span>
            <h2 className="text-5xl md:text-8xl font-serif text-white mb-10 leading-tight">Sovereign <br/> Existence</h2>
            <p className="text-slate-500 text-xl font-light italic leading-relaxed mb-12 max-w-lg">
              "We do not build structures; we manifest legacies. Every Signature Space is a dialogue between location, light, and legacy."
            </p>
            <div className="flex space-x-16 pt-8 border-t border-white/5">
              <div>
                <h4 className="text-3xl font-serif italic text-white">$4.2B+</h4>
                <p className="text-[8px] uppercase tracking-widest text-slate-600 mt-2">Assets Managed</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif italic text-white">12</h4>
                <p className="text-[8px] uppercase tracking-widest text-slate-600 mt-2">Global Jurisdictions</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-8">
            <div className="space-y-8 mt-24">
              <div className="aspect-[3/4] overflow-hidden bg-slate-900">
                <img src="https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Detail" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 leading-relaxed italic">The Ivory Terrace, Monaco</p>
            </div>
            <div className="space-y-8">
              <div className="aspect-[3/4] overflow-hidden bg-slate-900">
                <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Detail" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 leading-relaxed italic">Bespoke Living, Dubai</p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlighted Portfolio */}
      <section className="bg-white py-48 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-32">
            <h3 className="text-6xl md:text-9xl font-serif text-[#020617] mb-8">Portfolio <br/> Highlights</h3>
            <p className="text-slate-400 text-lg md:text-2xl font-light italic max-w-xl mx-auto">Accessing the world's most coveted private estates.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
            {projects.map((project, idx) => (
              <div key={project.id} className="reveal">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
          <div className="reveal mt-32 text-center">
            <Link to="/projects" className="text-[#020617] border-b-2 border-[#C5A059] pb-4 uppercase tracking-[0.6em] text-[10px] font-black hover:text-[#C5A059] transition-all">
              View Full Portfolio &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
