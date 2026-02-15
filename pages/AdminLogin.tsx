
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';

const AdminLogin: React.FC = () => {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Forgot password flow states
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // The master password is now Sign@2025
      if (creds.username === 'admin' && creds.password === 'Sign@2025') {
        storageService.setAuth({ isAuthenticated: true, username: 'Principal Advisor' });
        navigate('/admin');
      } else {
        setError('Unauthorized entry denied.');
      }
      setLoading(false);
    }, 800);
  };

  const sendOtp = () => {
    if (!email.includes('@gmail.com') && !email.includes('@')) {
      setError('A valid Gmail or Corporate address is required.');
      return;
    }
    setError('');
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpSent(true);
    // Simulation logic
    console.log(`[GMAIL VERIFICATION]: Sent code ${code} to ${email}`);
    alert(`[SIGNATURE SPACES]: A security code has been transmitted to ${email}. Verification required.`);
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput === generatedOtp && newPassword.length >= 6) {
      setResetSuccess(true);
      setError('');
      setTimeout(() => {
        setShowForgot(false);
        setOtpSent(false);
        setResetSuccess(false);
        setCreds({...creds, password: newPassword});
      }, 2000);
    } else if (otpInput !== generatedOtp) {
      setError('Security code mismatch.');
    } else {
      setError('Password must meet complexity requirements (6+ chars).');
    }
  };

  return (
    <div className="min-h-[95vh] flex items-center justify-center px-8 bg-white">
      <div className="max-w-md w-full bg-white p-14 shadow-[0_60px_120px_-30px_rgba(15,23,42,0.12)] border border-slate-50">
        <div className="text-center mb-14">
          <div className="w-16 h-16 border border-[#0F172A] rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-2xl font-light text-[#0F172A]">S</span>
          </div>
          <h1 className="text-3xl font-serif text-[#0F172A] mb-3">{showForgot ? 'Vault Recovery' : 'Heritage Entry'}</h1>
          <p className="text-slate-400 uppercase tracking-[0.4em] text-[9px] font-bold">Encrypted Advisor Access</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-5 py-4 text-[11px] mb-8 font-medium text-center border-l-2 border-red-500">
            {error}
          </div>
        )}

        {resetSuccess && (
          <div className="bg-emerald-50 text-emerald-600 px-5 py-4 text-[11px] mb-8 font-medium text-center border-l-2 border-emerald-500">
            Security Protocol Updated.
          </div>
        )}

        {!showForgot ? (
          <form onSubmit={handleLogin} className="space-y-10">
            <div className="space-y-3">
              <label className="block text-[#0F172A] text-[10px] uppercase tracking-[0.4em] font-bold">Username</label>
              <input 
                required
                type="text" 
                className="w-full bg-transparent border-b border-slate-200 text-[#0F172A] py-3 focus:outline-none focus:border-[#0F172A] transition-all font-light"
                value={creds.username}
                onChange={(e) => setCreds({...creds, username: e.target.value})}
              />
            </div>
            <div className="space-y-3">
              <label className="block text-[#0F172A] text-[10px] uppercase tracking-[0.4em] font-bold">Security Key</label>
              <input 
                required
                type="password" 
                className="w-full bg-transparent border-b border-slate-200 text-[#0F172A] py-3 focus:outline-none focus:border-[#0F172A] transition-all font-light"
                value={creds.password}
                onChange={(e) => setCreds({...creds, password: e.target.value})}
              />
            </div>
            <div className="flex flex-col space-y-6">
              <button 
                disabled={loading}
                type="submit"
                className="w-full bg-[#0F172A] text-white font-bold py-6 rounded-sm uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-[#0F172A]/10 transition-all hover:bg-[#1E293B] disabled:opacity-50"
              >
                {loading ? 'Decrypting Vault...' : 'Authenticate Access'}
              </button>
              <button 
                type="button" 
                onClick={() => setShowForgot(true)}
                className="text-[9px] text-slate-400 uppercase tracking-[0.3em] font-bold hover:text-[#0F172A] transition-colors"
              >
                Request Gmail Reset Code
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-10">
            {!otpSent ? (
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="block text-[#0F172A] text-[10px] uppercase tracking-[0.4em] font-bold">Gmail Address</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-transparent border-b border-slate-200 text-[#0F172A] py-3 outline-none focus:border-[#0F172A] font-light"
                    placeholder="advisor@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button 
                  type="button" 
                  onClick={sendOtp}
                  className="w-full bg-[#0F172A] text-white font-bold py-6 rounded-sm uppercase tracking-[0.4em] text-[10px]"
                >
                  Send Verification Code
                </button>
              </div>
            ) : (
              <div className="space-y-10">
                <div className="space-y-3">
                  <label className="block text-[#0F172A] text-[10px] uppercase tracking-[0.4em] font-bold">Verification OTP</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-transparent border-b border-slate-200 text-[#0F172A] py-4 text-center text-3xl tracking-[1em] font-serif"
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-[#0F172A] text-[10px] uppercase tracking-[0.4em] font-bold">New Security Key</label>
                  <input 
                    required
                    type="password" 
                    className="w-full bg-transparent border-b border-slate-200 text-[#0F172A] py-3 outline-none focus:border-[#0F172A] font-light"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#C5A059] text-white font-bold py-6 rounded-sm uppercase tracking-[0.4em] text-[10px] shadow-xl shadow-[#C5A059]/20"
                >
                  Update Credential
                </button>
              </div>
            )}
            <button 
              type="button" 
              onClick={() => { setShowForgot(false); setOtpSent(false); setError(''); }}
              className="w-full text-[9px] text-slate-400 uppercase tracking-[0.3em] font-bold"
            >
              &larr; Return to login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
