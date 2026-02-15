
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
  <footer className="bg-[#020617] py-24 px-8 text-white border-t border-white/5">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
      <div className="col-span-1 md:col-span-2 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 border border-[#C5A059] rounded-full flex items-center justify-center">
            <span className="text-white font-light text-xl">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif text-white tracking-[0.2em] uppercase leading-none">Signature</span>
            <span className="text-[8px] text-[#C5A059] tracking-[0.5em] uppercase font-bold mt-1">Spaces</span>
          </div>
        </div>
        <p className="text-slate-500 max-w-sm text-sm font-light leading-relaxed italic">
          Defining the intersection of architecture and fine art for the world's most discerning patrons.
        </p>
      </div>
      
      <div className="space-y-6">
        <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-[#C5A059]">The Collections</h4>
        <ul className="space-y-3 text-slate-400 text-[10px] tracking-[0.2em] uppercase font-bold">
          <li><a href="#" className="hover:text-white">Coastal Sovereignty</a></li>
          <li><a href="#" className="hover:text-white">Urban Landmarks</a></li>
          <li><a href="#" className="hover:text-white">Bespoke Penthouses</a></li>
        </ul>
      </div>
      
      <div className="space-y-6">
        <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-[#C5A059]">Concierge</h4>
        <ul className="space-y-3 text-slate-400 text-[10px] tracking-[0.2em] uppercase font-bold">
          <li><a href="#" className="hover:text-white">Privacy Protocols</a></li>
          <li><a href="#" className="hover:text-white">Asset Management</a></li>
          <li><a href="#" className="hover:text-white">Advisor Portal</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-slate-600 text-[8px] tracking-[0.5em] uppercase font-black text-center">
      &copy; 2024 Signature Spaces. Silence is the Ultimate Luxury.
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
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
