
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Services from './pages/Services';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { storageService } from './services/storageService';

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const auth = storageService.getAuth();
  if (!auth.isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }
  return <>{children}</>;
};

const Footer = () => (
  <footer className="bg-[#020617] py-32 px-8 text-white border-t border-white/5">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-24">
      <div className="col-span-1 md:col-span-2 space-y-10">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center">
            <span className="text-white font-light text-2xl">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-serif text-white tracking-[0.2em] uppercase leading-none">Signature</span>
            <span className="text-[10px] text-[#C5A059] tracking-[0.5em] uppercase font-bold mt-1">Spaces</span>
          </div>
        </div>
        <p className="text-slate-500 max-w-sm text-lg font-light italic leading-relaxed">
          Architectural heritage stewardship. Defining the boundary between residence and art for the world's most discerning patron.
        </p>
      </div>
      
      <div className="space-y-8">
        <h4 className="text-[11px] uppercase tracking-[0.5em] font-black text-[#C5A059]">The Collections</h4>
        <ul className="space-y-5 text-slate-400 text-[10px] tracking-[0.2em] uppercase font-bold">
          <li><a href="#" className="hover:text-white transition-colors">Coastal Sovereignty</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Urban Landmarks</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Alpine Retreats</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Bespoke Penthouses</a></li>
        </ul>
      </div>
      
      <div className="space-y-8">
        <h4 className="text-[11px] uppercase tracking-[0.5em] font-black text-[#C5A059]">Concierge</h4>
        <ul className="space-y-5 text-slate-400 text-[10px] tracking-[0.2em] uppercase font-bold">
          <li><a href="#" className="hover:text-white transition-colors">Privacy Protocols</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Asset Management</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Global Offices</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Investor Ledger</a></li>
        </ul>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-600 text-[8px] tracking-[0.6em] uppercase font-black">
      <p>&copy; 2024 Signature Spaces Portfolio. All rights reserved.</p>
      <div className="flex space-x-12 mt-6 md:mt-0">
         <p className="italic">Privacy is Luxury</p>
         <p>Terms of Engagement</p>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#020617]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
