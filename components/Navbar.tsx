
import React from 'react';
import { Layout, Search, Bell, User, Landmark } from 'lucide-react';

interface NavbarProps {
  onHomeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHomeClick }) => {
  return (
    <nav className="h-20 border-b border-zinc-900 bg-black/80 backdrop-blur-xl sticky top-0 z-50 px-8 flex items-center justify-between">
      <div 
        className="flex items-center gap-3 cursor-pointer group" 
        onClick={onHomeClick}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-emerald-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
          <div className="text-white"><Landmark size={24} /></div>
        </div>
        <div className="flex flex-col -gap-1">
          <span className="font-black text-2xl tracking-tighter bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent italic lowercase">cryptomagz</span>
          <div className="h-0.5 w-0 group-hover:w-full bg-emerald-500 transition-all duration-500"></div>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-8">
        <button onClick={onHomeClick} className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">강의 탐색</button>
        <button className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">자산 분석</button>
        <button className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">내 강의실</button>
        <button className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">인사이트</button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input 
            type="text" 
            placeholder="강의나 리포트를 검색하세요" 
            className="bg-zinc-900 border border-zinc-800 rounded-full pl-10 pr-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-64 transition-all"
          />
        </div>
        <button className="p-2 text-zinc-400 hover:text-white relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-black"></span>
        </button>
        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden cursor-pointer hover:border-emerald-500 transition-colors">
          <User size={20} className="text-zinc-400" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
