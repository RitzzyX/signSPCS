
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Home from './pages/Home.tsx';
import Projects from './pages/Projects.tsx';
import ProjectDetail from './pages/ProjectDetail.tsx';
import Services from './pages/Services.tsx';
import AdminLogin from './pages/AdminLogin.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import { storageService } from './services/storageService.ts';

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const auth = storageService.getAuth();
  if (!auth.isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }
  return <>{children}</>;
};

const BrandFooter = () => (
  <footer className="bg-[#020617] py-32 px-8 text-white border-t border-white/5">
    <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-20">
      <div className="space-y-6">
        <div className="w-16 h-16 border border-[#C5A059] rounded-full flex items-center justify-center mx-auto mb-10">
          <span className="text-white font-light text-3xl">S</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-serif tracking-tight">Signature Spaces</h2>
        <p className="text-[#C5A059] text-[11px] uppercase tracking-[0.6em] font-black">Architectural Sovereignty</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 w-full max-w-4xl border-y border-white/5 py-20">
        <div className="space-y-6">
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-500">London</h4>
          <p className="text-xs text-slate-400 font-light italic">Mayfair <br/> W1K 3AH</p>
        </div>
        <div className="space-y-6">
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-500">Dubai</h4>
          <p className="text-xs text-slate-400 font-light italic">DIFC <br/> Gate Village</p>
        </div>
        <div className="space-y-6">
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-500">Monaco</h4>
          <p className="text-xs text-slate-400 font-light italic">Carré d'Or <br/> MC 98000</p>
        </div>
        <div className="space-y-6">
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-500">Singapore</h4>
          <p className="text-xs text-slate-400 font-light italic">Marina Bay <br/> Tower 2</p>
        </div>
      </div>

      <div className="pt-10 flex flex-col md:flex-row justify-between items-center w-full text-[9px] uppercase tracking-[0.5em] text-slate-700 font-black">
        <p>&copy; 2025 Signature Spaces Portfolio. All Rights Reserved.</p>
        <div className="flex space-x-12 mt-6 md:mt-0 italic">
          <a href="#" className="hover:text-white transition-colors">Privacy Charter</a>
          <a href="#" className="hover:text-white transition-colors">Legacy Terms</a>
        </div>
      </div>
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
        <BrandFooter />
      </div>
    </Router>
  );
};

export default App;
