
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import ProjectCard from '../components/ProjectCard';

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
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center px-6 md:px-12 bg-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=100" 
            className="w-full h-full object-cover opacity-[0.03]"
            alt="Hero Background"
          />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto pt-24 flex flex-col items-center">
          <div className="reveal flex items-center justify-center space-x-3 md:space-x-6 mb-10 md:mb-14">
            <span className="h-[1px] w-6 md:w-16 bg-[#C5A059]/40"></span>
            <span className="text-[#C5A059] tracking-[0.4em] md:tracking-[0.6em] uppercase text-[7px] md:text-[10px] font-black italic whitespace-nowrap">The Heritage Collection</span>
            <span className="h-[1px] w-6 md:w-16 bg-[#C5A059]/40"></span>
          </div>
          <h1 className="reveal mobile-title text-6xl md:text-[10rem] font-serif text-slate-900 mb-10 md:mb-14 leading-[1.05] md:leading-[0.9] tracking-tighter">
            Luxury <br className="hidden md:block"/> <span className="italic text-[#C5A059]">Refined</span>
          </h1>
          <p className="reveal mobile-subtitle text-slate-400 text-base md:text-xl mb-14 md:mb-20 max-w-2xl mx-auto leading-relaxed font-light tracking-wide px-4">
            Curating landmarks of pure architectural integrity. We bridge the gap between residence and fine art for the world's most discerning patrons.
          </p>
          <div className="reveal flex flex-col sm:flex-row gap-6 md:gap-12 justify-center items-center w-full sm:w-auto px-6">
            <Link to="/projects" className="w-full sm:w-auto bg-[#0F172A] text-white font-black px-12 py-6 rounded-full transition-all uppercase tracking-[0.3em] text-[9px] md:text-[10px] hover:bg-slate-800 shadow-2xl shadow-slate-300 text-center">
              The Portfolio
            </Link>
            <Link to="/services" className="w-full sm:w-auto text-slate-900 font-black uppercase tracking-[0.4em] text-[9px] md:text-[10px] hover:text-[#C5A059] transition-all border-b-[1.5px] border-slate-200 pb-2 text-center">
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section id="featured" className="py-24 md:py-48 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="reveal flex flex-col lg:flex-row justify-between items-start md:items-end mb-20 md:mb-32 gap-10">
          <div className="max-w-3xl">
            <span className="text-[#C5A059] font-black uppercase tracking-[0.6em] text-[8px] md:text-[9px] mb-6 block">Current Masterpieces</span>
            <h2 className="text-4xl md:text-7xl font-serif text-slate-900 leading-tight">Architecture of <br className="hidden md:block"/> Sovereign Living</h2>
          </div>
          <p className="text-slate-400 max-w-sm text-sm md:text-base leading-loose font-light italic border-l border-[#C5A059]/30 pl-8">
            "We believe that a residence should be as unique as a fingerprint and as enduring as a legacy."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 md:gap-24">
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
