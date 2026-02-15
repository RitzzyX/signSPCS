
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService.ts';
import ProjectCard from '../components/ProjectCard.tsx';

const Home: React.FC = () => {
  const projects = storageService.getProjects().slice(0, 3);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, []);

  return (
    <div className="bg-[#020617] overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center px-8">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80" 
            className="w-full h-full object-cover opacity-[0.08]"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020617]"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto flex flex-col items-center">
          <div className="reveal flex items-center justify-center space-x-6 mb-12">
            <span className="h-[1px] w-20 bg-[#C5A059]/30"></span>
            <span className="text-[#C5A059] tracking-[0.6em] uppercase text-[10px] font-black italic">The Master Collection</span>
            <span className="h-[1px] w-20 bg-[#C5A059]/30"></span>
          </div>
          <h1 className="reveal text-[5rem] md:text-[11rem] font-serif text-white mb-12 leading-[0.9] tracking-tighter">
            Luxury <br/> <span className="italic text-[#C5A059]">Refined</span>
          </h1>
          <p className="reveal text-slate-400 text-lg md:text-2xl mb-20 max-w-3xl mx-auto leading-relaxed font-light tracking-wide italic">
            Curating landmarks of architectural integrity for those who view residence as fine art.
          </p>
          <div className="reveal flex flex-col md:flex-row gap-10 items-center">
            <Link to="/projects" className="bg-[#C5A059] text-[#020617] font-black px-16 py-6 rounded-full transition-all uppercase tracking-[0.4em] text-[10px] hover:bg-white shadow-2xl shadow-[#C5A059]/10">
              The Portfolio
            </Link>
            <Link to="/services" className="text-white font-black uppercase tracking-[0.4em] text-[10px] hover:text-[#C5A059] transition-all border-b border-white/10 pb-2">
              Our Advisory
            </Link>
          </div>
        </div>
      </section>

      <section className="py-48 px-8 max-w-7xl mx-auto">
        <div className="reveal flex flex-col lg:flex-row justify-between items-start lg:items-end mb-32 gap-12">
          <div className="max-w-4xl">
            <span className="text-[#C5A059] font-black uppercase tracking-[0.6em] text-[9px] mb-8 block">Legacy Architecture</span>
            <h2 className="text-5xl md:text-8xl font-serif text-white leading-tight">Sovereign <br/> Living</h2>
          </div>
          <p className="text-slate-500 max-w-sm text-lg leading-relaxed font-light italic border-l border-[#C5A059]/30 pl-10">
            "A residence should be as unique as a fingerprint and as enduring as a legacy."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
          {projects.map((project, idx) => (
            <div key={project.id} className="reveal" style={{ transitionDelay: `${idx * 150}ms` }}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
