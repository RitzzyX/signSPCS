
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService.ts';
import { Project, Lead } from '../types.ts';

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
    if (leads.length === 0) {
      alert("No data available to export.");
      return;
    }
    const headers = ['ID', 'Date', 'Prospect', 'Email', 'Phone', 'Asset Interest', 'Message'];
    const rows = leads.map(l => [
      l.id,
      new Date(l.timestamp).toLocaleDateString(),
      l.name,
      l.email,
      l.phone,
      l.projectName,
      `"${l.message.replace(/"/g, '""')}"`
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Signature_Intelligence_Leads_${Date.now()}.csv`);
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
    <div className="bg-[#020617] min-h-screen text-white pt-32 pb-20 px-8 font-inter">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div>
            <span className="text-[#C5A059] text-[9px] uppercase tracking-[0.5em] font-black mb-4 block">Private Advisor Portal</span>
            <h1 className="text-5xl md:text-7xl font-serif italic tracking-tight">The Ledger</h1>
          </div>
          <div className="flex space-x-12 text-[10px] uppercase tracking-[0.5em] font-black pb-2 border-b border-white/5">
            <button onClick={() => setActiveView('leads')} className={activeView === 'leads' ? 'text-[#C5A059]' : 'text-slate-600 hover:text-white transition-colors'}>Intelligence</button>
            <button onClick={() => setActiveView('projects')} className={activeView === 'projects' ? 'text-[#C5A059]' : 'text-slate-600 hover:text-white transition-colors'}>Portfolio</button>
            <button onClick={handleLogout} className="text-red-400/50 hover:text-red-400 transition-colors">Terminate Session</button>
          </div>
        </header>

        {activeView === 'leads' ? (
          <div className="space-y-16 reveal active">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <h2 className="text-2xl font-serif italic text-slate-400">Prospect Intelligence Flow</h2>
              <button 
                onClick={handleExportCSV} 
                className="bg-white text-[#020617] px-12 py-4 rounded-full text-[9px] uppercase tracking-[0.6em] font-black hover:bg-[#C5A059] transition-all"
              >
                Transmit to CSV
              </button>
            </div>
            
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[9px] uppercase tracking-[0.5em] text-slate-600">
                    <th className="py-8 font-black">Timestamp</th>
                    <th className="py-8 font-black">Prospect</th>
                    <th className="py-8 font-black">Contact Intelligence</th>
                    <th className="py-8 font-black">Asset Targeting</th>
                    <th className="py-8 font-black">Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leads.map(lead => (
                    <tr key={lead.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-10 text-[10px] font-mono text-slate-500 uppercase">{new Date(lead.timestamp).toLocaleDateString()}</td>
                      <td className="py-10">
                        <p className="text-lg font-serif italic text-white mb-1">{lead.name}</p>
                        <span className="text-[8px] uppercase tracking-widest text-slate-600">ID: {lead.id}</span>
                      </td>
                      <td className="py-10">
                        <p className="text-xs text-slate-300 mb-1">{lead.email}</p>
                        <p className="text-[10px] text-[#C5A059] tracking-widest">{lead.phone}</p>
                      </td>
                      <td className="py-10">
                        <p className="text-sm font-bold tracking-wider text-white uppercase">{lead.projectName}</p>
                      </td>
                      <td className="py-10 max-w-xs">
                        <p className="text-xs text-slate-500 font-light italic leading-relaxed truncate group-hover:whitespace-normal group-hover:text-slate-300">
                          {lead.message || 'Immediate priority walkthrough requested.'}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {leads.length === 0 && (
                <div className="py-40 text-center border-b border-white/5">
                  <p className="text-2xl font-serif italic text-slate-600">Awaiting prospect synchronization...</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-16 reveal active">
             <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif italic text-slate-400">Inventory Status</h2>
              <button 
                onClick={() => { setEditingProject({ id: Math.random().toString(36).substr(2,9), title: '', tagline: '', description: '', location: '', mainImage: '', coverType: 'image', gallery: [], status: 'Pre-Launch', configurations: [], amenities: [], createdAt: Date.now() }); setShowProjectModal(true); }}
                className="border border-white/10 text-white px-12 py-4 rounded-full text-[9px] uppercase tracking-[0.6em] font-black hover:border-white transition-all"
              >
                Inaugurate New Asset
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {projects.map(p => (
                <div key={p.id} className="group bg-white/[0.03] border border-white/5 p-10 hover:border-[#C5A059]/30 transition-all">
                  <div className="aspect-square mb-10 overflow-hidden bg-black">
                    <img src={p.mainImage} className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt="" />
                  </div>
                  <div className="space-y-4">
                    <p className="text-[8px] uppercase tracking-[0.5em] text-[#C5A059] font-black">{p.status}</p>
                    <h3 className="text-3xl font-serif italic text-white">{p.title}</h3>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-slate-600 font-bold">{p.location}</p>
                  </div>
                  <div className="flex justify-between items-center mt-12 pt-10 border-t border-white/5">
                    <button onClick={() => { setEditingProject(p); setShowProjectModal(true); }} className="text-[9px] uppercase tracking-[0.6em] font-black text-[#C5A059] hover:text-white transition-colors">Refine Details</button>
                    <button className="text-[9px] uppercase tracking-[0.6em] font-black text-red-500/30 hover:text-red-500 transition-colors">Decommission</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Project Modal - Full Screen Portal */}
      {showProjectModal && editingProject && (
        <div className="fixed inset-0 z-[200] bg-[#020617] flex flex-col p-12 overflow-y-auto animate-fade-in no-scrollbar">
           <div className="max-w-4xl w-full mx-auto">
              <div className="flex justify-between items-center mb-32">
                <h3 className="text-6xl font-serif italic tracking-tighter">Asset Refining</h3>
                <button onClick={() => setShowProjectModal(false)} className="text-4xl font-light text-slate-600 hover:text-white transition-colors">&times;</button>
              </div>
              <form onSubmit={saveProject} className="space-y-24 pb-40">
                  <div className="grid md:grid-cols-2 gap-20">
                    <div className="space-y-6">
                       <label className="text-[10px] uppercase tracking-[0.6em] text-slate-600 font-black block">Heritage Title</label>
                       <input 
                         required 
                         className="w-full bg-transparent border-b border-white/10 text-4xl font-serif py-4 focus:outline-none focus:border-[#C5A059] transition-all" 
                         value={editingProject.title} 
                         onChange={e => setEditingProject({...editingProject, title: e.target.value})} 
                       />
                    </div>
                    <div className="space-y-6">
                       <label className="text-[10px] uppercase tracking-[0.6em] text-slate-600 font-black block">Geographic Precinct</label>
                       <input 
                         required 
                         className="w-full bg-transparent border-b border-white/10 text-xl font-light py-4 focus:outline-none focus:border-[#C5A059] transition-all" 
                         value={editingProject.location} 
                         onChange={e => setEditingProject({...editingProject, location: e.target.value})} 
                       />
                    </div>
                  </div>
                  <div className="space-y-6">
                      <label className="text-[10px] uppercase tracking-[0.6em] text-slate-600 font-black block">Architectural Manifest</label>
                      <textarea 
                        required 
                        className="w-full bg-white/[0.02] border border-white/10 h-60 p-10 text-lg font-light leading-relaxed focus:outline-none focus:border-[#C5A059] transition-all resize-none" 
                        value={editingProject.description} 
                        onChange={e => setEditingProject({...editingProject, description: e.target.value})} 
                      />
                  </div>
                  <div className="pt-20">
                    <button type="submit" className="w-full bg-[#C5A059] text-[#020617] py-10 text-xs uppercase tracking-[0.7em] font-black hover:bg-white transition-all shadow-2xl shadow-[#C5A059]/20">
                      Synchronize Intelligence
                    </button>
                  </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
