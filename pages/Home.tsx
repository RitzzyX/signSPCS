
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import ProjectCard from '../components/ProjectCard';

const Home: React.FC = () => {
  const projects = storageService.getProjects().slice(0, 3);

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => el.classList.add('active'));
  }, []);

  return (
    <div className="bg-[#020617]">
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-8 reveal">
          <h1 className="text-6xl md:text-[8rem] font-serif text-white mb-8 leading-none tracking-tighter">
            Luxury <span className="italic text-[#C5A059]">Refined</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-2xl font-light italic mb-12">Curating the world's most exclusive architectural masterpieces.</p>
          <Link to="/projects" className="inline-block bg-[#C5A059] text-[#020617] px-12 py-5 rounded-full uppercase tracking-[0.4em] text-[10px] font-black hover:bg-white transition-all">
            Enter Portfolio
          </Link>
        </div>
      </section>

      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {projects.map((project) => (
            <div key={project.id} className="reveal">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
