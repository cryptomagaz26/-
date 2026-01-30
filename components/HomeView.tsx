
import React, { useState } from 'react';
import { Course, PreviewVideo } from '../types';
import { PlayCircle, ArrowRight, Youtube, TrendingUp, Wallet, ShieldCheck, Zap, User, Phone, BookOpen, Check } from 'lucide-react';

interface HomeViewProps {
  onCourseSelect: (course: Course) => void;
  courses: Course[];
  previews: PreviewVideo[];
}

const HomeView: React.FC<HomeViewProps> = ({ onCourseSelect, courses, previews }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: '',
    agreement: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreement) {
      alert('개인정보처리방침에 동의해 주세요.');
      return;
    }
    // 실제 DB 연동 시 이 부분에 API 호출 로직 추가
    console.log('상담 신청 데이터:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', phone: '', course: '', agreement: false });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
      {/* Hero */}
      <section className="relative mb-24 rounded-[3rem] overflow-hidden bg-slate-900 border border-slate-800/50 group shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-slate-950 to-emerald-600/10 opacity-60"></div>
        <div className="relative z-10 p-10 md:p-20 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur">
            <Zap size={12} className="text-cyan-400" />
            cryptomagz exclusive
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.2] md:leading-[1.1] mb-8 tracking-tighter italic break-keep">
            자산 관리의 새로운 기준,<br className="hidden md:block" />
            <span className="text-white not-italic bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> 크립토매거진의 재테크 아카데미</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed font-medium break-keep max-w-2xl">
            단순한 투자를 넘어 건강한 자산 생태계를 구축합니다. 기초부터 1:1 심화 코칭까지, cryptomagz만의 데이터 기반 실전 전략을 만나보세요.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => document.getElementById('courses-grid')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-lg hover:bg-emerald-50 transition-all shadow-xl shadow-white/5 flex items-center gap-2"
            >
              커리큘럼 확인하기 <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-slate-800/50 backdrop-blur text-white px-8 py-4 rounded-2xl font-black text-lg border border-white/10 hover:bg-slate-800 transition-all"
            >
              수강 문의 (1:1)
            </button>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {[
          { icon: <TrendingUp className="text-emerald-400" />, title: "기업 재무 분석 교육", desc: "데이터 기반 매크로 분석" },
          { icon: <Wallet className="text-indigo-400" />, title: "체계적 자산 배분", desc: "주식·부동산·코인 통합" },
          { icon: <ShieldCheck className="text-cyan-400" />, title: "리스크 철저 관리", desc: "맞춤형 포트폴리오 검토" },
        ].map((item, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl flex items-center gap-6 hover:bg-slate-900 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center">
              {item.icon}
            </div>
            <div>
              <h4 className="font-black text-lg">{item.title}</h4>
              <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* YouTube Preview Section */}
      <section className="mb-24">
        <div className="flex items-center gap-3 mb-10">
          <Youtube className="text-red-500" size={32} />
          <h2 className="text-3xl font-black tracking-tight italic">cryptomagz insights</h2>
          <div className="h-px bg-slate-800 flex-1 ml-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previews.map((video) => (
            <div key={video.id} className="group cursor-pointer" onClick={() => window.open(video.youtubeId.includes('http') ? video.youtubeId : `https://youtube.com/watch?v=${video.youtubeId}`, '_blank')}>
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-800 mb-4">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-all">
                  <PlayCircle size={48} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </div>
              </div>
              <h3 className="text-lg font-bold group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">{video.title}</h3>
              <p className="text-xs text-slate-500 mt-2 font-black uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> YouTube 업로드 영상
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Course Grid */}
      <section id="courses-grid" className="mb-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-black tracking-tight italic mb-2">프리미엄 커리큘럼</h2>
            <p className="text-slate-500 font-medium">송진우 강사님과 함께하는 단계별 재테크 과정</p>
          </div>
          <div className="flex gap-2 bg-slate-900 p-1 rounded-2xl border border-slate-800">
            {['전체', '기초', '실전', '고급'].map(cat => (
              <button key={cat} className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${cat === '전체' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}`}>{cat}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="group bg-slate-900/50 rounded-[3rem] overflow-hidden border border-slate-800 hover:border-emerald-500/40 transition-all hover:-translate-y-2 cursor-pointer flex flex-col h-full shadow-lg relative"
              onClick={() => onCourseSelect(course)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-emerald-500 text-slate-950 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest">
                      {course.category}
                    </span>
                    <span className="bg-slate-950/80 backdrop-blur px-3 py-1 rounded-xl text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
                      3개월 과정
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-black mb-4 group-hover:text-emerald-400 transition-colors leading-tight italic break-keep">{course.title}</h3>
                <p className="text-sm text-slate-400 line-clamp-3 mb-8 font-medium leading-relaxed break-keep">{course.description}</p>
                
                <div className="mt-auto flex flex-col gap-6">
                  <div className="flex items-center justify-between border-y border-slate-800/50 py-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">수강료</span>
                      <span className="text-xl font-black text-white">{course.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-sm font-black border border-white/10 shadow-lg shadow-indigo-600/20">
                        {course.instructor.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-slate-300">강사 {course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-500 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                      상세보기 <PlayCircle size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consultation Form Section */}
      <section id="consultation-form" className="relative py-20 px-8 md:px-16 rounded-[4rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-3xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -ml-48 -mb-48 pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 italic tracking-tight uppercase">강의 신청 상담 접수</h2>
            <p className="text-slate-400 font-medium">크립토매거진 전문가가 직접 연락드려 상세한 수강 안내를 도와드립니다.</p>
          </div>

          {isSubmitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-12 rounded-[2.5rem] text-center animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                <Check size={40} className="text-slate-950" />
              </div>
              <h3 className="text-2xl font-black text-emerald-400 mb-2">상담 신청이 완료되었습니다!</h3>
              <p className="text-slate-400 font-medium">빠른 시일 내에 기재해주신 번호로 연락드리겠습니다.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2">
                    <User size={12} className="text-emerald-500" /> 이름
                  </label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="성함을 입력해주세요"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-emerald-500 outline-none transition-all placeholder:text-slate-700 font-bold"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2">
                    <Phone size={12} className="text-emerald-500" /> 연락처
                  </label>
                  <input 
                    required
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="010-0000-0000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-emerald-500 outline-none transition-all placeholder:text-slate-700 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2">
                  <BookOpen size={12} className="text-emerald-500" /> 희망강의 선택
                </label>
                <select 
                  required
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-emerald-500 outline-none transition-all font-bold appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-slate-700">희망하시는 강의를 선택해주세요</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.title}>{course.title}</option>
                  ))}
                  <option value="기타 문의">기타 문의 / 커스텀 컨설팅</option>
                </select>
              </div>

              <div className="flex items-center gap-3 py-4">
                <label className="relative flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.agreement}
                    onChange={(e) => setFormData({...formData, agreement: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-6 h-6 bg-slate-950 border border-slate-800 rounded-lg peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all flex items-center justify-center">
                    <Check size={14} className={`text-slate-950 transition-opacity ${formData.agreement ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                  <span className="ml-3 text-sm font-bold text-slate-400">
                    <span className="text-emerald-500">개인정보처리방침</span>을 확인하고 동의합니다.
                  </span>
                </label>
              </div>

              <button 
                type="submit"
                className="w-full py-6 bg-emerald-600 hover:bg-emerald-500 text-slate-950 rounded-[2rem] font-black text-xl shadow-xl shadow-emerald-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
              >
                상담 신청 완료하기 <ArrowRight size={24} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomeView;
