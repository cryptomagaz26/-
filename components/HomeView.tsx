
import React, { useState } from 'react';
import { Course, PreviewVideo } from '../types';
import { PlayCircle, ArrowRight, Youtube, TrendingUp, Wallet, ShieldCheck, Zap, User, Phone, BookOpen, Check, Loader2 } from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreement) {
      alert('개인정보처리방침에 동의해 주세요.');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/mbdyapkp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          이름: formData.name,
          연락처: formData.phone,
          희망강의: formData.course,
          동의여부: formData.agreement ? '동의함' : '동의안함'
        })
      });
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', phone: '', course: '', agreement: false });
        setTimeout(() => setIsSubmitted(false), 8000);
      } else {
        alert('서버 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 bg-black">
      {/* Hero Section - Solid Background */}
      <section className="relative mb-24 rounded-[3rem] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
        <div className="relative z-10 p-10 md:p-20 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] font-black uppercase tracking-widest mb-6">
            <Zap size={12} className="text-cyan-400" />
            cryptomagz exclusive
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.2] md:leading-[1.1] mb-8 tracking-tighter italic break-keep text-white">
            자산 관리의 새로운 기준,<br className="hidden md:block" />
            <span className="not-italic bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">크립토매거진 재테크 아카데미</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed font-medium break-keep max-w-2xl">
            단순한 투자를 넘어 건강한 자산 생태계를 구축합니다. 기초부터 1:1 심화 코칭까지, 데이터 기반 실전 전략을 만나보세요.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => document.getElementById('courses-grid')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-zinc-950 px-8 py-4 rounded-2xl font-black text-lg hover:bg-emerald-50 transition-all shadow-xl shadow-white/5 flex items-center gap-2"
            >
              커리큘럼 확인하기 <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-zinc-800 text-white px-8 py-4 rounded-2xl font-black text-lg border border-zinc-700 hover:bg-zinc-700 transition-all"
            >
              수강 문의 (1:1)
            </button>
          </div>
        </div>
      </section>

      {/* Feature Cards - Pure Solid Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 relative">
        {[
          { icon: <TrendingUp className="text-emerald-400" />, title: "기업 재무 분석 교육", desc: "데이터 기반 매크로 분석" },
          { icon: <Wallet className="text-indigo-400" />, title: "체계적 자산 배분", desc: "주식·부동산·코인 통합" },
          { icon: <ShieldCheck className="text-cyan-400" />, title: "리스크 철저 관리", desc: "맞춤형 포트폴리오 검토" },
        ].map((item, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl flex items-center gap-6 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center border border-zinc-800">
              {item.icon}
            </div>
            <div>
              <h4 className="font-black text-lg text-white">{item.title}</h4>
              <p className="text-sm text-zinc-500 font-medium">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Insights Section */}
      <section className="mb-24">
        <div className="flex items-center gap-3 mb-10">
          <Youtube className="text-red-500" size={32} />
          <h2 className="text-3xl font-black tracking-tight italic text-white uppercase">cryptomagz insights</h2>
          <div className="h-px bg-zinc-800 flex-1 ml-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previews.map((video) => (
            <div key={video.id} className="group cursor-pointer" onClick={() => window.open(video.youtubeId.includes('http') ? video.youtubeId : `https://youtube.com/watch?v=${video.youtubeId}`, '_blank')}>
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-800 mb-4 bg-zinc-900">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all">
                  <PlayCircle size={48} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </div>
              </div>
              <h3 className="text-lg font-bold group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug text-white">{video.title}</h3>
              <p className="text-xs text-zinc-500 mt-2 font-black uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> YouTube 업로드 영상
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum Grid */}
      <section id="courses-grid" className="mb-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-black tracking-tight italic mb-2 text-white uppercase">프리미엄 커리큘럼</h2>
            <p className="text-zinc-500 font-medium">전문가와 함께하는 단계별 재테크 과정</p>
          </div>
          <div className="flex gap-2 bg-zinc-900 p-1 rounded-2xl border border-zinc-800">
            {['전체', '기초', '실전', '고급'].map(cat => (
              <button key={cat} className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${cat === '전체' ? 'bg-indigo-600 text-white' : 'text-zinc-500 hover:text-white'}`}>{cat}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="group bg-zinc-900 rounded-[3rem] overflow-hidden border border-zinc-800 hover:border-emerald-500/40 transition-all hover:-translate-y-2 cursor-pointer flex flex-col h-full shadow-lg"
              onClick={() => onCourseSelect(course)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-emerald-500 text-zinc-950 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest">{course.category}</span>
                    <span className="bg-black/80 backdrop-blur px-3 py-1 rounded-xl text-[10px] font-black text-white uppercase tracking-widest border border-white/10">3개월 과정</span>
                  </div>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-black mb-4 group-hover:text-emerald-400 transition-colors leading-tight italic break-keep text-white">{course.title}</h3>
                <p className="text-sm text-zinc-400 line-clamp-3 mb-8 font-medium leading-relaxed break-keep">{course.description}</p>
                <div className="mt-auto flex flex-col gap-6">
                  <div className="flex items-center justify-between border-y border-zinc-800/50 py-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">수강료</span>
                      <span className="text-xl font-black text-white">{course.price}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-sm font-black text-white shadow-lg">
                        {course.instructor.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-zinc-300">강사 {course.instructor}</span>
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

      {/* Consultation Form - Clean Solid Style */}
      <section id="consultation-form" className="relative py-20 px-8 md:px-16 rounded-[4rem] bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 italic tracking-tight uppercase text-white">강의 신청 상담 접수</h2>
            <p className="text-zinc-400 font-medium">전담 매니저가 직접 연락드려 상세한 수강 안내를 도와드립니다.</p>
          </div>
          {isSubmitted ? (
            <div className="bg-black/40 border border-emerald-500/30 p-12 rounded-[2.5rem] text-center animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                <Check size={40} className="text-zinc-950" />
              </div>
              <h3 className="text-2xl font-black text-emerald-400 mb-2">상담 신청이 완료되었습니다!</h3>
              <p className="text-zinc-400 font-medium">기재해주신 연락처로 확인 후 순차적으로 연락드리겠습니다.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1 flex items-center gap-2"><User size={12} className="text-emerald-500" /> 이름</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="성함을 입력해주세요" className="w-full bg-black border border-zinc-800 rounded-2xl p-4 text-white focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-700 font-bold" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1 flex items-center gap-2"><Phone size={12} className="text-emerald-500" /> 연락처</label>
                  <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="010-0000-0000" className="w-full bg-black border border-zinc-800 rounded-2xl p-4 text-white focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-700 font-bold" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1 flex items-center gap-2"><BookOpen size={12} className="text-emerald-500" /> 희망강의 선택</label>
                <div className="relative">
                  <select required value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-2xl p-4 text-white focus:border-emerald-500 outline-none transition-all font-bold appearance-none cursor-pointer">
                    <option value="" disabled>희망하시는 강의를 선택해주세요</option>
                    {courses.map(course => (<option key={course.id} value={course.title}>{course.title}</option>))}
                    <option value="기타 문의">기타 문의 / 커스텀 컨설팅</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                    <ArrowRight size={18} className="rotate-90" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 py-4">
                <label className="relative flex items-center cursor-pointer">
                  <input type="checkbox" checked={formData.agreement} onChange={(e) => setFormData({...formData, agreement: e.target.checked})} className="sr-only peer" />
                  <div className="w-6 h-6 bg-black border border-zinc-800 rounded-lg peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all flex items-center justify-center">
                    <Check size={14} className={`text-zinc-950 transition-opacity ${formData.agreement ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                  <span className="ml-3 text-sm font-bold text-zinc-400"><span className="text-emerald-500 cursor-pointer">개인정보처리방침</span>을 확인하고 동의합니다.</span>
                </label>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-6 bg-emerald-600 hover:bg-emerald-500 text-zinc-950 rounded-[2rem] font-black text-xl shadow-xl shadow-emerald-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>전송 중... <Loader2 size={24} className="animate-spin" /></>
                ) : (
                  <>상담 신청 완료하기 <ArrowRight size={24} /></>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomeView;
