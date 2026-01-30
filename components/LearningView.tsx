
import React, { useState } from 'react';
import { Course, Lesson } from '../types.ts';
import AITutor from './AITutor.tsx';
import { ChevronLeft, Play, CheckCircle, Clock, BookOpen, Lock } from 'lucide-react';

interface LearningViewProps {
  course: Course;
  onBack: () => void;
}

const LearningView: React.FC<LearningViewProps> = ({ course, onBack }) => {
  const [activeLesson, setActiveLesson] = useState<Lesson>(course.lessons[0]);

  // 유튜브 URL에서 비디오 ID 추출하는 헬퍼 함수
  const getYouTubeID = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeID(activeLesson.videoUrl);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-5rem)] overflow-hidden bg-black">
      {/* Video Side */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-black">
        <div className="p-6 md:p-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-all mb-8 text-sm font-black uppercase tracking-widest"
          >
            <ChevronLeft size={18} /> 커리큘럼으로 돌아가기
          </button>

          <div className="aspect-video bg-black rounded-[3rem] overflow-hidden shadow-2xl border border-slate-900 relative group mb-10 ring-1 ring-white/5">
            {videoId ? (
              <iframe
                key={activeLesson.id}
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={activeLesson.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-700 gap-4">
                <Play size={48} className="opacity-20" />
                <p className="font-bold text-sm">올바른 유튜브 영상 경로를 찾을 수 없습니다.</p>
              </div>
            )}
          </div>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-emerald-600 text-slate-950 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                Lesson {course.lessons.indexOf(activeLesson) + 1}
              </span>
              <span className="text-slate-500 font-bold text-sm">/ {course.lessons.length}강 구성</span>
            </div>
            
            <h1 className="text-4xl font-black mb-8 italic tracking-tighter break-keep leading-tight text-white">{activeLesson.title}</h1>
            
            <div className="flex items-center gap-8 pb-8 border-b border-slate-900">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 border border-white/10 flex items-center justify-center text-lg font-black shadow-lg">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Senior Instructor</p>
                  <p className="text-base font-bold text-slate-200">{course.instructor} 전문가</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                <Clock size={16} /> 강의 분량 {activeLesson.duration}
              </div>
            </div>

            <div className="mt-10 space-y-6">
              <h2 className="text-xl font-black flex items-center gap-3 text-white">
                <BookOpen size={24} className="text-emerald-500" /> 오늘의 핵심 학습 내용
              </h2>
              <p className="text-slate-400 leading-relaxed text-lg font-medium break-keep">
                본 강의는 <strong>{course.title}</strong>의 필수 교육 과정입니다. {activeLesson.title} 단원에서는 실무 데이터를 바탕으로 {course.instructor} 강사님의 노하우를 직접 전수합니다.
              </p>
              <div className="p-6 bg-slate-900/30 rounded-3xl border border-slate-800/30">
                <h4 className="text-sm font-black text-slate-200 mb-3 uppercase tracking-widest flex items-center gap-2">
                  <Lock size={14} className="text-indigo-400" /> 유료 수강생 전용 자료
                </h4>
                <p className="text-slate-500 text-sm">수강생 전용 PDF 강의 교안 및 차트 분석 툴은 자료실에서 다운로드 가능합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Side */}
      <div className="w-full lg:w-[420px] bg-slate-950/40 backdrop-blur-3xl border-l border-slate-900 flex flex-col shadow-2xl relative z-10">
        <div className="p-6 border-b border-slate-900 bg-black/20">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">Course Progress</h3>
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[33%] rounded-full shadow-[0_0_8px_#10b981]"></div>
          </div>
        </div>
        
        <div className="p-4 border-b border-slate-900 flex gap-1 bg-black/10">
          <button className="flex-1 py-3 text-xs font-black uppercase tracking-widest text-emerald-400 border-b-2 border-emerald-500 transition-all">커리큘럼</button>
          <button className="flex-1 py-3 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-all">메모</button>
          <button className="flex-1 py-3 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-all">자료실</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-black/20">
          {course.lessons.map((lesson, idx) => (
            <button 
              key={lesson.id}
              onClick={() => setActiveLesson(lesson)}
              className={`w-full flex items-center gap-4 p-5 rounded-[2rem] transition-all border ${
                activeLesson.id === lesson.id 
                  ? 'bg-emerald-600/10 border-emerald-500/30 text-emerald-400 shadow-lg ring-1 ring-emerald-500/20' 
                  : 'bg-slate-900/20 border-transparent text-slate-600 hover:bg-slate-900/60'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                activeLesson.id === lesson.id ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800'
              }`}>
                {activeLesson.id === lesson.id ? <Play size={14} fill="currentColor" /> : <span className="text-[10px] font-black">{idx + 1}</span>}
              </div>
              <div className="flex-1 text-left">
                <p className={`text-sm font-black line-clamp-1 italic break-all ${activeLesson.id === lesson.id ? 'text-white' : ''}`}>
                  {lesson.title}
                </p>
                <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest flex items-center gap-1.5">
                  <Clock size={10} /> {lesson.duration}
                </span>
              </div>
              {lesson.isCompleted && (
                <CheckCircle size={18} className="text-emerald-500 shrink-0" />
              )}
            </button>
          ))}
        </div>

        <AITutor context={activeLesson.title} courseTitle={course.title} />
      </div>
    </div>
  );
};

export default LearningView;
