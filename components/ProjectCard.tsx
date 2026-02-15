
import React from 'react';
import { Project } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();

  const handleAccess = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate directly to detail page. The detail page handles the gated form inline.
    navigate(`/projects/${project.id}`);
  };

  return (
    <div 
      onClick={handleAccess}
      className="group bg-white transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(15,23,42,0.12)] cursor-pointer p-4 md:p-6"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-50 mb-10">
        <img 
          src={project.mainImage} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
        <div className="absolute top-8 left-8 flex space-x-2">
            <span className="bg-white/95 text-[#0F172A] text-[9px] font-black px-5 py-2 uppercase tracking-[0.3em] shadow-sm">
              {project.status}
            </span>
        </div>
        <div className="absolute inset-0 bg-[#0F172A]/0 group-hover:bg-[#0F172A]/5 transition-colors duration-700"></div>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-between items-start border-b border-slate-50 pb-6">
          <div className="flex-1">
            <h3 className="text-3xl font-serif text-[#0F172A] mb-2 leading-tight group-hover:text-[#C5A059] transition-colors duration-500">
              {project.title}
            </h3>
            <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em] font-bold italic">
              {project.location}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[#C5A059] font-serif text-xl italic">{project.configurations[0]?.price.split(' ')[0]}*</span>
          </div>
        </div>
        
        <p className="text-slate-400 text-sm font-light leading-relaxed line-clamp-2 italic h-10">
          {project.description}
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#0F172A] font-black border-b border-[#0F172A]/10 group-hover:border-[#0F172A] transition-all pb-1">
            Discover Asset &rarr;
          </span>
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]/40"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
