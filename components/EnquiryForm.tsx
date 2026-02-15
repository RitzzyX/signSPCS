
import React, { useState } from 'react';
import { storageService } from '../services/storageService';
import { Lead } from '../types';

interface EnquiryFormProps {
  projectId: string;
  projectName: string;
  onSuccess: () => void;
}

const EnquiryForm: React.FC<EnquiryFormProps> = ({ projectId, projectName, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newLead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      projectId,
      projectName,
      ...formData,
      timestamp: Date.now()
    };

    setTimeout(() => {
      storageService.addLead(newLead);
      storageService.markEnquired(projectId);
      setLoading(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="bg-white border border-slate-100 p-10 md:p-12 shadow-[0_40px_100px_-20px_rgba(15,23,42,0.1)]">
      <div className="mb-10">
        <h2 className="text-3xl font-serif text-[#0F172A] mb-3">Private Inquiry</h2>
        <p className="text-slate-400 text-sm font-light leading-relaxed">
          Registered guests receive prioritized access to virtual walkthroughs and technical masterplans.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[#0F172A] text-[9px] uppercase tracking-[0.3em] font-bold mb-2">Full Name</label>
          <input 
            required
            type="text"
            className="w-full bg-slate-50 border-b border-transparent focus:border-[#C5A059] focus:bg-white text-[#0F172A] px-5 py-4 outline-none transition-all font-light"
            placeholder="Hon. Guest Name (e.g. Julian Vane)"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[#0F172A] text-[9px] uppercase tracking-[0.3em] font-bold mb-2">Email</label>
            <input 
              required
              type="email"
              className="w-full bg-slate-50 border-b border-transparent focus:border-[#C5A059] focus:bg-white text-[#0F172A] px-5 py-4 outline-none transition-all font-light"
              placeholder="private@sovereign.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[#0F172A] text-[9px] uppercase tracking-[0.3em] font-bold mb-2">Phone</label>
            <input 
              required
              type="tel"
              className="w-full bg-slate-50 border-b border-transparent focus:border-[#C5A059] focus:bg-white text-[#0F172A] px-5 py-4 outline-none transition-all font-light"
              placeholder="+1 000 000 000"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>
        <div>
          <label className="block text-[#0F172A] text-[9px] uppercase tracking-[0.3em] font-bold mb-2">Portfolio Interests</label>
          <textarea 
            className="w-full bg-slate-50 border-b border-transparent focus:border-[#C5A059] focus:bg-white text-[#0F172A] px-5 py-4 outline-none transition-all h-28 font-light resize-none"
            placeholder="Please specify specific tier interests or bespoke architectural requirements..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>
        
        <button 
          disabled={loading}
          type="submit"
          className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-6 uppercase tracking-[0.4em] text-[10px] transition-all shadow-xl shadow-[#0F172A]/10 disabled:opacity-50"
        >
          {loading ? 'Transmitting Intelligence...' : 'Request Sovereign Access'}
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;
