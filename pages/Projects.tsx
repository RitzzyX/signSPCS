
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
    <div className="bg-[#020617] min-h-screen pt-48 pb-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-12 border-b border-white/5 pb-20">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-16 h-[1px] bg-[#C5A059]"></div>
              <span className="text-[#C5A059] font-bold uppercase tracking-[0.6em] text-[10px]">Active Portfolio</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-serif text-white leading-tight tracking-tighter">
              The <span className="italic text-[#C5A059]">Collections</span>
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-10 text-[10px] uppercase tracking-[0.5em] font-black w-full md:w-auto overflow-x-auto no-scrollbar pb-4">
            {['All', 'Ready to Move', 'Under Construction', 'Pre-Launch'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`transition-all border-b-2 pb-4 whitespace-nowrap ${
                  filter === status 
                    ? 'border-[#C5A059] text-[#C5A059]' 
                    : 'border-transparent text-slate-500 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
          {filteredProjects.map((project, idx) => (
            <div key={project.id} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <ProjectCard project={project} />
            </div>
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-60 border border-white/5 bg-white/5">
              <p className="text-slate-500 font-serif text-3xl italic">Awaiting new portfolio entries...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
