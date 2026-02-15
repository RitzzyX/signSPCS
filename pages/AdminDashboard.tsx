
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Project, Lead, ProjectConfig } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'leads' | 'projects' | 'settings'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newPass, setNewPass] = useState('');
  const [passUpdated, setPassUpdated] = useState(false);

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
    const headers = ['ID', 'Project', 'Name', 'Email', 'Phone', 'Date', 'Message'];
    const rows = leads.map(l => [
      l.id,
      l.projectName,
      l.name,
      l.email,
      l.phone,
      new Date(l.timestamp).toLocaleString(),
      l.message.replace(/,/g, ';')
    ]);
    
    const csvContent = headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `signature_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const saveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    let updated = projects.find(p => p.id === editingProject.id) 
        ? projects.map(p => p.id === editingProject.id ? editingProject : p)
        : [editingProject, ...projects];
    setProjects(updated);
    storageService.saveProjects(updated);
    setShowProjectModal(false);
    setEditingProject(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'gallery' | 'walkthrough') => {
    const files = e.target.files;
    if (!files || !editingProject) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file) continue;

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (type === 'main') {
          setEditingProject(prev => prev ? ({ ...prev, mainImage: base64 }) : null);
        } else if (type === 'walkthrough') {
          setEditingProject(prev => prev ? ({ ...prev, videoUrl: base64 }) : null);
        } else if (type === 'gallery') {
          setEditingProject(prev => prev ? ({ ...prev, gallery: [...prev.gallery, base64] }) : null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addConfig = () => {
    if (!editingProject) return;
    const newConf: ProjectConfig = {
      id: Math.random().toString(36).substr(2, 9),
      type: '',
      size: '',
      price: '',
      description: ''
    };
    setEditingProject({ ...editingProject, configurations: [...editingProject.configurations, newConf] });
  };

  const updateConfig = (id: string, field: keyof ProjectConfig, value: string) => {
    if (!editingProject) return;
    const updated = editingProject.configurations.map(c => c.id === id ? { ...c, [field]: value } : c);
    setEditingProject({ ...editingProject, configurations: updated });
  };

  const removeConfig = (id: string) => {
    if (!editingProject) return;
    setEditingProject({ ...editingProject, configurations: editingProject.configurations.filter(c => c.id !== id) });
  };

  return (
    <div className="bg-white min-h-screen text-[#0F172A] pb-20">
      {/* High-visibility header with correct layering */}
      <header className="fixed top-0 left-0 right-0 z-[110] bg-white border-b border-slate-100 px-6 md:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-12">
           <div className="flex flex-col">
             <span className="text-lg font-serif italic tracking-tight">Admin Portal</span>
           </div>
           <nav className="hidden md:flex space-x-10 text-[10px] uppercase tracking-[0.4em] font-black">
              <button onClick={() => setActiveView('leads')} className={activeView === 'leads' ? 'text-[#0F172A]' : 'text-slate-300'}>Leads</button>
              <button onClick={() => setActiveView('projects')} className={activeView === 'projects' ? 'text-[#0F172A]' : 'text-slate-300'}>Portfolio</button>
              <button onClick={() => setActiveView('settings')} className={activeView === 'settings' ? 'text-[#0F172A]' : 'text-slate-300'}>Settings</button>
           </nav>
        </div>
        <button onClick={handleLogout} className="text-[9px] uppercase tracking-[0.4em] font-black text-red-400 hover:text-red-600">Terminate</button>
      </header>

      {/* Sub-header for Mobile Navigation */}
      <div className="md:hidden fixed top-20 left-0 right-0 z-[105] bg-slate-50 border-b border-slate-100 flex justify-around p-4">
         {['leads', 'projects', 'settings'].map((view: any) => (
           <button 
             key={view} 
             onClick={() => setActiveView(view)}
             className={`text-[8px] uppercase tracking-[0.4em] font-black ${activeView === view ? 'text-slate-900' : 'text-slate-300'}`}
           >
             {view}
           </button>
         ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-40 md:pt-32 animate-fade-in">
        {activeView === 'leads' && (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <h2 className="text-4xl md:text-6xl font-serif mb-2">Lead Intelligence</h2>
                <p className="text-slate-400 text-sm font-light">Global prospect ledger updated in real-time.</p>
              </div>
              <button onClick={handleExportCSV} className="w-full md:w-auto bg-[#0F172A] text-white px-10 py-5 rounded-full text-[10px] uppercase tracking-[0.4em] font-black shadow-xl shadow-[#0F172A]/10">Download Dataset</button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {leads.map(lead => (
                <div key={lead.id} className="bg-slate-50/50 border border-slate-100 p-8 md:p-10 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all">
                  <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 border-b border-slate-100 pb-8">
                    <div>
                      <p className="text-2xl font-serif italic mb-1">{lead.name}</p>
                      <p className="text-slate-400 text-[10px] tracking-widest uppercase">{lead.email} | {lead.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] uppercase tracking-[0.4em] text-[#C5A059] font-black mb-1">Target Asset</p>
                      <p className="text-lg font-serif">{lead.projectName}</p>
                    </div>
                  </div>
                  <p className="text-slate-500 font-light italic text-base leading-relaxed">"{lead.message || 'Expressed immediate interest in the portfolio asset.'}"</p>
                  <p className="mt-8 text-[8px] uppercase tracking-[0.4em] text-slate-300 font-black">{new Date(lead.timestamp).toLocaleString()}</p>
                </div>
              ))}
              {leads.length === 0 && <p className="text-center py-40 italic text-slate-300 text-2xl font-serif">Awaiting prospect intelligence...</p>}
            </div>
          </div>
        )}

        {activeView === 'projects' && (
          <div className="space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div>
                <h2 className="text-4xl md:text-6xl font-serif mb-2">Portfolio Management</h2>
                <p className="text-slate-400 text-sm font-light">Inventory control for exclusive architectural landmarks.</p>
              </div>
              <button 
                onClick={() => { setEditingProject({ id: Math.random().toString(36).substr(2,9), title: '', tagline: '', description: '', location: '', mainImage: '', coverType: 'image', gallery: [], status: 'Pre-Launch', configurations: [], amenities: [], createdAt: Date.now() }); setShowProjectModal(true); }}
                className="w-full md:w-auto bg-[#0F172A] text-white px-12 py-5 rounded-full text-[10px] uppercase tracking-[0.4em] font-black"
              >
                Inaugurate Asset
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {projects.map(p => (
                <div key={p.id} className="group border border-slate-100 p-8 hover:shadow-2xl transition-all">
                  <div className="aspect-square bg-slate-50 mb-8 overflow-hidden relative">
                    <img src={p.mainImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white px-3 py-1 text-[8px] uppercase tracking-[0.3em] font-black">{p.status}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif italic mb-2">{p.title}</h3>
                  <p className="text-[9px] uppercase tracking-[0.4em] text-slate-300 font-bold mb-8">{p.location}</p>
                  <div className="flex justify-between border-t border-slate-50 pt-8">
                    <button onClick={() => { setEditingProject(p); setShowProjectModal(true); }} className="text-[9px] uppercase tracking-[0.4em] font-black hover:text-[#C5A059]">Modify</button>
                    <button onClick={() => { if(confirm('Archive this landmark permanently?')) { const u = projects.filter(x => x.id !== p.id); setProjects(u); storageService.saveProjects(u); }}} className="text-[9px] uppercase tracking-[0.4em] font-black text-red-200 hover:text-red-500">Archive</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'settings' && (
          <div className="max-w-xl py-20">
            <h2 className="text-5xl font-serif italic mb-6">Protocols</h2>
            <div className="space-y-12">
              <div>
                <label className="text-[9px] uppercase tracking-[0.5em] font-black text-slate-400 block mb-4">Vault Master Key</label>
                <input 
                  type="password" 
                  className="w-full border-b border-slate-100 py-4 outline-none focus:border-[#C5A059] transition-all font-light text-2xl" 
                  placeholder="Enter New Security Code..."
                  value={newPass}
                  onChange={e => setNewPass(e.target.value)}
                />
              </div>
              <button onClick={() => { setPassUpdated(true); setTimeout(() => setPassUpdated(false), 3000); }} className="w-full bg-[#0F172A] text-white py-6 text-[10px] uppercase tracking-[0.4em] font-black">Sync Protocol</button>
              {passUpdated && <p className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Gateway Synchronized.</p>}
            </div>
          </div>
        )}
      </div>

      {/* Asset Modal Refined */}
      {showProjectModal && editingProject && (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col p-0 md:p-12 overflow-y-auto">
          <div className="max-w-6xl w-full mx-auto bg-white py-16 px-6 md:px-0">
            <div className="flex justify-between items-center mb-24">
              <div>
                <h3 className="text-4xl md:text-6xl font-serif italic">Asset Profile</h3>
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#C5A059] font-black mt-4">Drafting Heritage Specifications</p>
              </div>
              <button onClick={() => setShowProjectModal(false)} className="text-5xl font-light text-slate-200 hover:text-slate-900 transition-colors">×</button>
            </div>

            <form onSubmit={saveProject} className="space-y-32">
              <div className="grid lg:grid-cols-2 gap-24 items-start">
                {/* Identity */}
                <div className="space-y-16">
                  <h4 className="text-[11px] uppercase tracking-[0.5em] font-black text-slate-400 border-b border-slate-50 pb-6">Core Identity</h4>
                  <div className="space-y-12">
                    <div className="group">
                      <label className="text-[9px] uppercase tracking-[0.4em] font-black text-slate-300 group-focus-within:text-[#0F172A] transition-colors">Heritage Title</label>
                      <input required className="w-full border-b border-slate-100 py-4 outline-none focus:border-[#C5A059] transition-all text-3xl font-serif placeholder:text-slate-100" placeholder="e.g. The Sapphire Spire" value={editingProject.title} onChange={e => setEditingProject({...editingProject, title: e.target.value})} />
                    </div>
                    <div className="group">
                      <label className="text-[9px] uppercase tracking-[0.4em] font-black text-slate-300 group-focus-within:text-[#0F172A] transition-colors">Global Coordinates</label>
                      <input required className="w-full border-b border-slate-100 py-4 outline-none focus:border-[#C5A059] transition-all text-lg font-light placeholder:text-slate-100" placeholder="e.g. Monte Carlo, Monaco" value={editingProject.location} onChange={e => setEditingProject({...editingProject, location: e.target.value})} />
                    </div>
                    <div className="group">
                      <label className="text-[9px] uppercase tracking-[0.4em] font-black text-slate-300 group-focus-within:text-[#0F172A] transition-colors">Architectural Vision</label>
                      <textarea required className="w-full h-48 bg-slate-50 p-8 mt-4 outline-none focus:bg-white focus:ring-1 focus:ring-slate-100 transition-all font-light leading-relaxed placeholder:text-slate-300 text-lg" placeholder="Compose the unique legacy of this project. Focus on materiality and aesthetic philosophy..." value={editingProject.description} onChange={e => setEditingProject({...editingProject, description: e.target.value})} />
                    </div>
                  </div>
                </div>

                {/* Assets */}
                <div className="space-y-16">
                   <h4 className="text-[11px] uppercase tracking-[0.5em] font-black text-slate-400 border-b border-slate-50 pb-6">Cinematic Collateral</h4>
                   <div className="space-y-12">
                      <div className="p-10 bg-slate-50 border border-slate-100">
                        <label className="text-[9px] uppercase tracking-[0.4em] font-black block mb-6">Master Portfolio Cover</label>
                        <input type="file" accept="image/*" onChange={e => handleFileUpload(e, 'main')} className="text-[10px] file:bg-[#0F172A] file:text-white file:border-none file:px-8 file:py-3 file:rounded-full file:mr-6 file:cursor-pointer w-full" />
                        {editingProject.mainImage && <img src={editingProject.mainImage} className="mt-8 aspect-[16/9] w-full object-cover shadow-2xl" alt="" />}
                      </div>
                      
                      <div className="p-10 bg-slate-50 border border-slate-100">
                        <label className="text-[9px] uppercase tracking-[0.4em] font-black block mb-6">Lifestyle Walkthrough (MP4)</label>
                        <input type="file" accept="video/*" onChange={e => handleFileUpload(e, 'walkthrough')} className="text-[10px] file:bg-[#0F172A] file:text-white file:border-none file:px-8 file:py-3 file:rounded-full file:mr-6 file:cursor-pointer w-full" />
                        {editingProject.videoUrl && <p className="mt-4 text-[9px] uppercase tracking-widest text-emerald-600 font-black">✓ Cinematic Asset Attached</p>}
                      </div>
                   </div>
                </div>
              </div>

              {/* Tiers */}
              <div className="space-y-16">
                 <div className="flex justify-between items-end border-b border-slate-50 pb-6">
                    <h4 className="text-[11px] uppercase tracking-[0.5em] font-black text-slate-400">Investment Configurations</h4>
                    <button type="button" onClick={addConfig} className="text-[10px] uppercase tracking-[0.4em] font-black text-[#C5A059] hover:underline underline-offset-8">+ New Tier Specification</button>
                 </div>
                 <div className="space-y-8">
                    {editingProject.configurations.map(conf => (
                      <div key={conf.id} className="grid md:grid-cols-4 gap-8 bg-slate-50 p-10 items-end relative group transition-all hover:bg-white hover:shadow-2xl">
                         <div>
                            <label className="text-[8px] uppercase tracking-[0.4em] text-slate-300 font-black block mb-2">Tier Designation</label>
                            <input className="w-full border-b border-slate-100 py-3 outline-none focus:border-[#C5A059] text-sm font-bold bg-transparent" placeholder="e.g. Royal Penthouse" value={conf.type} onChange={e => updateConfig(conf.id, 'type', e.target.value)} />
                         </div>
                         <div>
                            <label className="text-[8px] uppercase tracking-[0.4em] text-slate-300 font-black block mb-2">Dimension</label>
                            <input className="w-full border-b border-slate-100 py-3 outline-none focus:border-[#C5A059] text-sm font-light bg-transparent" placeholder="e.g. 4,500 sq.ft" value={conf.size} onChange={e => updateConfig(conf.id, 'size', e.target.value)} />
                         </div>
                         <div>
                            <label className="text-[8px] uppercase tracking-[0.4em] text-slate-300 font-black block mb-2">Investment Floor</label>
                            <input className="w-full border-b border-slate-100 py-3 outline-none focus:border-[#C5A059] text-sm font-black bg-transparent" placeholder="e.g. $8.5M" value={conf.price} onChange={e => updateConfig(conf.id, 'price', e.target.value)} />
                         </div>
                         <div className="flex justify-end">
                            <button type="button" onClick={() => removeConfig(conf.id)} className="text-[9px] uppercase tracking-[0.4em] text-red-300 font-black hover:text-red-600">Remove</button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="flex flex-col md:flex-row justify-end items-center gap-12 pt-24 border-t border-slate-100">
                 <button type="button" onClick={() => setShowProjectModal(false)} className="text-[11px] uppercase tracking-[0.5em] font-black text-slate-300 hover:text-red-500 transition-colors">Discard Blueprint</button>
                 <button type="submit" className="w-full md:w-auto bg-[#0F172A] text-white px-20 py-8 rounded-full text-[12px] uppercase tracking-[0.5em] font-black shadow-2xl shadow-[#0F172A]/20">Synchronize Portfolio Asset</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
