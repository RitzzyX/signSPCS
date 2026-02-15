
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { storageService } from '../services/storageService';
import EnquiryForm from '../components/EnquiryForm';
import { Project } from '../types';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'configurations' | 'amenities' | 'walkthrough'>('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      const found = storageService.getProjects().find(p => p.id === id);
      if (found) {
        setProject(found);
        setIsUnlocked(storageService.hasEnquired(id));
      }
    }
  }, [id]);

  if (!project) return <div className="text-slate-900 p-20 md:p-40 text-center font-serif text-2xl md:text-3xl italic animate-pulse">Awaiting portfolio synchronization...</div>;

  const handleUnlock = () => {
    setIsUnlocked(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Cinematic Header */}
      <div className="h-[65vh] md:h-[90vh] relative overflow-hidden bg-slate-100">
        {project.coverType === 'video' && project.mainImage.startsWith('data:video') ? (
           <video autoPlay muted loop className="w-full h-full object-cover">
             <source src={project.mainImage} />
           </video>
        ) : (
           <img src={project.mainImage} alt={project.title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        
        <div className="absolute bottom-12 md:bottom-24 left-0 right-0 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col items-start">
            <div className="flex items-center space-x-3 md:space-x-6 mb-6 md:mb-10 reveal active">
              <span className="w-8 md:w-16 h-[1px] bg-[#C5A059]"></span>
              <span className="text-[#C5A059] font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] text-[7px] md:text-[10px]">{project.location}</span>
            </div>
            <h1 className="text-4xl md:text-[10rem] font-serif text-slate-900 mb-6 md:mb-10 leading-[1.1] md:leading-none tracking-tighter reveal active">
              {project.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? 'italic text-[#C5A059]' : ''}>{word} </span>
              ))}
            </h1>
            <p className="text-slate-400 text-base md:text-3xl font-light italic reveal active max-w-2xl">{project.tagline}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32">
        {!isUnlocked ? (
          <div className="grid lg:grid-cols-2 gap-16 md:gap-40 items-start">
            <div className="reveal active space-y-10 md:space-y-16">
              <div className="border-l-[1px] border-slate-900 pl-6 md:pl-16 space-y-6 md:space-y-10">
                <h2 className="text-3xl md:text-6xl font-serif text-slate-900 leading-tight">Gated <br/> Intelligence</h2>
                <p className="text-slate-400 leading-relaxed text-base md:text-2xl font-light">
                  To preserve the exclusivity of this development, sensitive technical specifications, pricing indices, and virtual walk-throughs are gated. 
                  <br/><br/>
                  Please register your interest to unlock the digital master plan and internal configuration tiers.
                </p>
                <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-12 pt-4 md:pt-10">
                  <div>
                    <p className="text-[#C5A059] uppercase text-[7px] md:text-[9px] tracking-[0.3em] mb-1 md:mb-3 font-bold">Investment Floor</p>
                    <p className="text-slate-900 font-serif text-xl md:text-4xl">{project.configurations[0]?.price.split(' ')[0] || 'TBA'}</p>
                  </div>
                  <div className="hidden md:block w-[1px] h-12 md:h-16 bg-slate-100"></div>
                  <div>
                    <p className="text-[#C5A059] uppercase text-[7px] md:text-[9px] tracking-[0.3em] mb-1 md:mb-3 font-bold">Project Status</p>
                    <p className="text-slate-900 font-serif text-xl md:text-4xl uppercase tracking-tighter">{project.status}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal active mt-12 md:mt-0">
              <div className="md:sticky md:top-32">
                <EnquiryForm 
                  projectId={project.id} 
                  projectName={project.title} 
                  onSuccess={handleUnlock} 
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* Tab Navigation - Optimized for horizontal swipe on mobile */}
            <div className="flex space-x-8 md:space-x-20 border-b border-slate-100 mb-12 md:mb-24 overflow-x-auto no-scrollbar scroll-smooth">
              {[
                {id: 'overview', label: 'Overview'}, 
                {id: 'configurations', label: 'Configurations'}, 
                {id: 'walkthrough', label: 'Cinematic Walk'}, 
                {id: 'amenities', label: 'Amenities'}
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-4 md:pb-10 uppercase tracking-[0.3em] md:tracking-[0.5em] text-[7px] md:text-[10px] font-bold transition-all border-b-2 whitespace-nowrap ${
                    activeTab === tab.id ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-200 hover:text-slate-400'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content refined for high-end white minimalism */}
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-12 md:gap-32 items-start reveal active">
                <div className="space-y-10 md:space-y-12">
                  <h3 className="text-3xl md:text-5xl font-serif text-slate-900">The Vision</h3>
                  <p className="text-slate-400 leading-relaxed text-base md:text-xl font-light">{project.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 pt-6 md:pt-10">
                    {project.gallery.map((img, i) => (
                      <div key={i} className="aspect-[3/4] overflow-hidden bg-slate-50">
                        <img src={img} alt="Gallery" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-50 p-8 md:p-20 md:sticky md:top-32">
                   <h4 className="text-xl md:text-3xl font-serif text-slate-900 mb-8 md:mb-12">Asset Specifications</h4>
                   <div className="space-y-6 md:space-y-10">
                      {[
                        { l: 'Total Area', v: 'Signature Classified' },
                        { l: 'Architecture', v: 'Modernist Sovereignty' },
                        { l: 'Privacy Level', v: 'Absolute Elite' },
                        { l: 'Security', v: 'Vaulted Entryways' }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between border-b border-slate-200 pb-4 md:pb-6 items-baseline">
                          <span className="text-[#C5A059] uppercase text-[7px] md:text-[8px] tracking-[0.3em] font-bold">{item.l}</span>
                          <span className="text-slate-900 font-medium text-sm md:text-lg italic">{item.v}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'configurations' && (
              <div className="reveal active space-y-8 md:space-y-16">
                 {project.configurations.length > 0 ? project.configurations.map(conf => (
                    <div key={conf.id} className="group border-b border-slate-100 pb-8 md:pb-16 hover:border-slate-300 transition-colors">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-6 md:gap-10">
                            <div className="max-w-xl">
                                <h4 className="text-2xl md:text-4xl font-serif text-slate-900 mb-2 md:mb-4">{conf.type}</h4>
                                <p className="text-slate-400 font-light text-sm md:text-lg">{conf.description || 'Exclusive Signature Unit with Bespoke Finishes'}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-20 w-full md:w-auto pt-4 md:pt-0">
                                <div className="text-left sm:text-center">
                                    <p className="text-[#C5A059] uppercase text-[7px] md:text-[8px] tracking-widest font-bold mb-1">Dimension</p>
                                    <p className="text-slate-900 text-base md:text-xl font-light">{conf.size}</p>
                                </div>
                                <div className="text-left sm:text-center">
                                    <p className="text-[#C5A059] uppercase text-[7px] md:text-[8px] tracking-widest font-bold mb-1">Investment</p>
                                    <p className="text-slate-900 text-base md:text-xl font-bold">{conf.price}</p>
                                </div>
                                <button className="w-full sm:w-auto bg-slate-900 text-white text-[7px] md:text-[8px] uppercase tracking-widest font-bold px-8 md:px-12 py-4 md:py-5 rounded-full hover:bg-slate-800 transition-all">
                                    Unlock Plan
                                </button>
                            </div>
                        </div>
                    </div>
                 )) : (
                   <div className="py-20 text-center border-2 border-dashed border-slate-50 italic text-slate-200 text-xl md:text-3xl font-serif">
                     Unit configurations being refined by architectural team...
                   </div>
                 )}
              </div>
            )}

            {activeTab === 'walkthrough' && (
              <div className="reveal active max-w-6xl mx-auto">
                 {project.videoUrl ? (
                    <div className="aspect-video bg-slate-900 shadow-2xl overflow-hidden relative group">
                        <video controls className="w-full h-full object-cover">
                            <source src={project.videoUrl} />
                        </video>
                    </div>
                 ) : (
                    <div className="py-24 md:py-40 text-center border-2 border-dashed border-slate-100 italic text-slate-200 text-xl md:text-3xl font-serif">
                        Walkthrough pending release...
                    </div>
                 )}
              </div>
            )}

            {activeTab === 'amenities' && (
              <div className="reveal active grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-slate-100 border border-slate-100">
                  {(project.amenities.length > 0 ? project.amenities : ['Private Butler', 'Vaulted Entry', 'Molecular Kitchen', 'Helipad Access']).map((item, i) => (
                    <div key={i} className="bg-white p-10 md:p-20 flex flex-col items-center justify-center text-center group hover:bg-slate-50 transition-all">
                        <div className="w-10 h-10 border border-[#C5A059]/20 flex items-center justify-center mb-6 rounded-full group-hover:bg-[#C5A059] group-hover:border-[#C5A059] transition-all">
                             <svg className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                             </svg>
                        </div>
                        <span className="text-slate-900 text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">{item}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
