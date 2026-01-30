
import React, { useState } from 'react';
import { X, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');

    // 어드민 계정 정보 변경: ID(12345), PW(12345)
    if (adminId === '12345' && password === '12345') {
      setTimeout(() => {
        onLoginSuccess();
        setIsLoggingIn(false);
        onClose();
      }, 800);
    } else {
      setTimeout(() => {
        setError('아이디 또는 비밀번호가 일치하지 않습니다.');
        setIsLoggingIn(false);
      }, 600);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 md:p-12 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 hover:bg-slate-800 rounded-full transition-all text-slate-500 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="text-emerald-500" size={32} />
          </div>
          <h2 className="text-2xl font-black italic mb-2 tracking-tighter uppercase text-white">Admin Access</h2>
          <p className="text-slate-500 text-sm font-medium">관리자 전용 로그인 페이지입니다.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Admin ID</label>
            <input 
              required
              autoFocus
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-emerald-500 outline-none transition-all placeholder:text-slate-700"
              placeholder="아이디를 입력하세요"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Password</label>
            <div className="relative">
              <input 
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 pr-12 text-white focus:border-emerald-500 outline-none transition-all placeholder:text-slate-700"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-500 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="text-red-500 text-xs font-bold text-center bg-red-500/10 p-3 rounded-xl border border-red-500/20">
              {error}
            </div>
          )}

          <button 
            disabled={isLoggingIn} 
            className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-50"
          >
            {isLoggingIn ? <Loader2 className="animate-spin" size={20} /> : '관리자 접속'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
