
import React from 'react';
import { Project } from '../types';
import EnquiryForm from './EnquiryForm';

interface EnquiryModalProps {
  project: Project;
  onClose: () => void;
  onSuccess: () => void;
}

const EnquiryModal: React.FC<EnquiryModalProps> = ({ project, onClose, onSuccess }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-xl transition-opacity animate-fade-in"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden animate-scale-up grid md:grid-cols-5">
        {/* Left Side: Visual Context */}
        <div className="hidden md:block md:col-span-2 relative">
          <img src={project.mainImage} className="absolute inset-0 w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-8 right-8 text-white">
            <p className="text-[9px] uppercase tracking-[0.5em] font-bold text-[#C5A059] mb-4">Gated Heritage</p>
            <h4 className="text-3xl font-serif italic mb-2">{project.title}</h4>
            <p className="text-white/60 text-xs font-light tracking-wide">{project.location}</p>
          </div>
        </div>
        
        {/* Right Side: The Form */}
        <div className="md:col-span-3 p-10 md:p-16 relative">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors text-3xl font-light"
          >
            ×
          </button>
          
          <EnquiryForm 
            projectId={project.id} 
            projectName={project.title} 
            onSuccess={onSuccess} 
          />
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
