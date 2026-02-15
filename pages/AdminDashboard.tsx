
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Project, Lead, ProjectConfig } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'leads' | 'projects'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = storageService.getAuth();
    if (!auth.isAuthenticated) {
      navigate('/admin-login');
      return;
    }
    setLeads(storageService.getLeads());
    setProjects(storageService.getProjects());
  }, [navigate]);

  const handleLogout = () => {
    storageService.setAuth({ isAuthenticated: false, username: null });
    navigate('/admin-login');
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Project', 'Prospect Name', 'Email', 'Phone', 'Date', 'Message'];
    const rows = leads.map(l => [
      l.id,
      l.projectName,
      l.name,
      l.email,
      l.phone,
      new Date(l.timestamp).toLocaleString(),
      `"${l.message.replace(/"/g, '""')}"`
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Signature_Leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    const updated = projects.some(p => p.id === editingProject.id)
      ? projects.map(p => p.id === editingProject.id ? editingProject : p)
      : [editingProject, ...projects];
    setProjects(updated);
    storageService.saveProjects(updated);
    setShowProjectModal(false);
    setEditingProject(null);
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white pt-32 pb-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div>
            <h1 className="text-5xl font-serif italic mb-4">Advisor Hub</h1>
            <div className="flex space-x-12 text-[10px] uppercase tracking-[0.5em] font-black">
              <button onClick={() => setActiveView('leads')} className={activeView === 'leads' ? 'text-[#C5A059]' : 'text-slate-500'}>Lead Management</button>
              <button onClick={() => setActiveView('projects')} className={activeView === 'projects' ? 'text-[#C5A059]' : 'text-slate-500'}>Portfolio Control</button>
            </div>
          </div>
          <div className="flex space-x-6">
            <button onClick={handleLogout} className="text-red-400 text-[10px] uppercase tracking-[0.5em] font-black border border-red-400/20 px-8 py-3 rounded-full hover:bg-red-400/10 transition-all">Sign Out</button>
          </div>
        </div>

        {activeView === 'leads' ? (
          <div className="space-y-12">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-serif italic">Prospect Ledger</h2>
              <button 
                onClick={handleExportCSV} 
                className="bg-[#C5A059] text-[#020617] px-10 py-4 rounded-full text-[10px] uppercase tracking-[0.5em] font-black shadow-xl shadow-[#C5A059]/10"
              >
                Download CSV Dataset
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {leads.map(lead => (
                <div key={lead.id} className="bg-white/5 border border-white/5 p-10 hover:border-white/20 transition-all">
                  <div className="flex flex-col md:flex-row justify-between gap-8 mb-8 border-b border-white/5 pb-8">
                    <div>
                      <p className="text-2xl font-serif italic mb-2 text-[#C5A059]">{lead.name}</p>
                      <p className="text-slate-400 text-[10px] tracking-widest uppercase">{lead.email} | {lead.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] uppercase tracking-[0.5em] text-slate-500 mb-2">Portfolio Target</p>
                      <p className="text-xl font-serif text-white">{lead.projectName}</p>
                    </div>
                  </div>
                  <p className="text-slate-400 font-light italic text-lg">"{lead.message || 'Expressed immediate interest in asset walkthrough.'}"</p>
                </div>
              ))}
              {leads.length === 0 && <p className="text-center py-40 italic text-slate-500 text-2xl font-serif">Awaiting prospect intelligence synchronization...</p>}
            </div>
          </div>
        ) : (
          <div className="space-y-16">
             <div className="flex justify-between items-center">
              <h2 className="text-3xl font-serif italic">Inventory Control</h2>
              <button 
                onClick={() => { setEditingProject({ id: Math.random().toString(36).substr(2,9), title: '', tagline: '', description: '', location: '', mainImage: '', coverType: 'image', gallery: [], status: 'Pre-Launch', configurations: [], amenities: [], createdAt: Date.now() }); setShowProjectModal(true); }}
                className="bg-white text-[#020617] px-10 py-4 rounded-full text-[10px] uppercase tracking-[0.5em] font-black"
              >
                Inaugurate Asset
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {projects.map(p => (
                <div key={p.id} className="group bg-white/5 border border-white/5 p-8">
                  <div className="aspect-square mb-8 bg-black">
                    <img src={p.mainImage} className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="" />
                  </div>
                  <h3 className="text-2xl font-serif italic mb-2">{p.title}</h3>
                  <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/5">
                    <button onClick={() => { setEditingProject(p); setShowProjectModal(true); }} className="text-[9px] uppercase tracking-[0.5em] font-black text-[#C5A059]">Modify</button>
                    <button className="text-[9px] uppercase tracking-[0.5em] font-black text-red-400/50 hover:text-red-400 transition-all">Archive</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showProjectModal && editingProject && (
        <div className="fixed inset-0 z-[200] bg-[#020617] flex flex-col p-12 overflow-y-auto">
           <div className="max-w-5xl w-full mx-auto">
              <div className="flex justify-between items-center mb-24">
                <h3 className="text-5xl font-serif italic">Asset Profile</h3>
                <button onClick={() => setShowProjectModal(false)} className="text-5xl font-light text-slate-500">&times;</button>
              </div>
              <form onSubmit={saveProject} className="space-y-20 pb-20">
                  <div className="grid md:grid-cols-2 gap-16">
                    <div className="space-y-8">
                       <label className="text-[10px] uppercase tracking-[0.5em] text-slate-500 font-black block">Heritage Title</label>
                       <input required className="w-full text-3xl font-serif py-4" value={editingProject.title} onChange={e => setEditingProject({...editingProject, title: e.target.value})} />
                    </div>
                    <div className="space-y-8">
                       <label className="text-[10px] uppercase tracking-[0.5em] text-slate-500 font-black block">Global Coordinates</label>
                       <input required className="w-full text-xl font-light py-4" value={editingProject.location} onChange={e => setEditingProject({...editingProject, location: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-8">
                      <label className="text-[10px] uppercase tracking-[0.5em] text-slate-500 font-black block">Architectural Vision</label>
                      <textarea required className="w-full h-40 p-8 text-lg font-light leading-relaxed" value={editingProject.description} onChange={e => setEditingProject({...editingProject, description: e.target.value})} />
                  </div>
                  <button type="submit" className="w-full bg-[#C5A059] text-[#020617] py-8 text-sm uppercase tracking-[0.5em] font-black">Synchronize Blueprint</button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
