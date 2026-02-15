
import React, { useState, useMemo } from 'react';
import { storageService } from '../services/storageService';
import ProjectCard from '../components/ProjectCard';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const projects = storageService.getProjects();

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter(p => p.status === filter);
  }, [projects, filter]);

  return (
    <div className="bg-white min-h-screen pt-40 pb-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-32 gap-12 border-b border-slate-50 pb-16">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-px bg-[#C5A059]"></div>
              <span className="text-[#C5A059] font-bold uppercase tracking-[0.6em] text-[10px]">Active Portfolio</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-serif text-[#0F172A] leading-tight tracking-tighter">
              The Sovereign <br/> <span className="italic text-[#C5A059]">Collections</span>
            </h1>
          </div>
          
          {/* Refined Filter Bar */}
          <div className="flex flex-wrap gap-8 text-[10px] uppercase tracking-[0.4em] font-black overflow-x-auto no-scrollbar pb-4 md:pb-0 w-full md:w-auto">
            {['All', 'Ready to Move', 'Under Construction', 'Pre-Launch'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`transition-all border-b-2 pb-3 whitespace-nowrap ${
                  filter === status 
                    ? 'border-[#0F172A] text-[#0F172A]' 
                    : 'border-transparent text-slate-200 hover:text-slate-400'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <div key={project.id} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <ProjectCard project={project} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-60 bg-slate-50 border border-slate-100">
              <p className="text-slate-300 font-serif text-3xl italic tracking-wide">
                Refining new portfolio entries...
              </p>
              <p className="text-slate-200 text-[10px] uppercase tracking-[0.5em] mt-6 font-bold">Inquiry synchronization active</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
