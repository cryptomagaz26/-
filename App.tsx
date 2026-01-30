
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import HomeView from './components/HomeView.tsx';
import LearningView from './components/LearningView.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import AdminLoginModal from './components/AdminLoginModal.tsx';
import TermsOfServiceModal from './components/TermsOfServiceModal.tsx';
import PrivacyPolicyModal from './components/PrivacyPolicyModal.tsx';
import { Course, PreviewVideo } from './types.ts';
import { COURSES as initialCourses, PREVIEWS as initialPreviews } from './data/mockData.ts';
import { Shield } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'learning' | 'admin'>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('cryptomagz_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [previews, setPreviews] = useState<PreviewVideo[]>(() => {
    const saved = localStorage.getItem('cryptomagz_previews');
    return saved ? JSON.parse(saved) : initialPreviews;
  });

  useEffect(() => {
    localStorage.setItem('cryptomagz_courses', JSON.stringify(courses));
    localStorage.setItem('cryptomagz_previews', JSON.stringify(previews));
  }, [courses, previews]);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setView('learning');
    window.scrollTo(0, 0);
  };

  const handleHomeClick = () => {
    setView('home');
    setSelectedCourse(null);
  };

  const handleAdminAccess = () => {
    if (isAdminLoggedIn) {
      setView('admin');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30">
      {view !== 'admin' && <Navbar onHomeClick={handleHomeClick} />}
      <main>
        {view === 'home' && (<HomeView courses={courses} previews={previews} onCourseSelect={handleCourseSelect} />)}
        {view === 'learning' && selectedCourse && (<LearningView course={selectedCourse} onBack={handleHomeClick} />)}
        {view === 'admin' && isAdminLoggedIn && (
          <AdminDashboard courses={courses} previews={previews} onUpdateCourses={setCourses} onUpdatePreviews={setPreviews} onBack={handleHomeClick} />
        )}
      </main>

      {view === 'home' && (
        <footer className="bg-slate-900/50 border-t border-slate-800 py-16 mt-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-2 space-y-6">
                <span className="font-black text-3xl italic tracking-tighter text-white">cryptomagz</span>
                <p className="text-sm text-slate-400 font-medium max-w-sm leading-relaxed break-keep">
                  검증된 데이터와 실전 노하우로 당신의 자산 가치를 극대화하는 투자 전문 교육 플랫폼입니다.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">학습 메뉴</h4>
                <ul className="space-y-2 text-sm text-slate-400 font-bold">
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">전체 강의</li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">자산 분석 툴</li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">수강 후기</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">고객 지원</h4>
                <ul className="space-y-2 text-sm text-slate-400 font-bold">
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">공지사항</li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">자주 묻는 질문</li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">1:1 문의</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800/50 pt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="text-[11px] text-slate-500 space-y-2 font-medium">
                <p>주식회사 크립토매거진 | 대표자 : 송진우</p>
                <p>서울특별시 강남구 논현로 106길 16-4(역삼동)</p>
                <p>사업자등록번호 : 365-86-02985 | 상담전화 : 02-6952-3171</p>
                <p>개인정보보호책임자 : 송진우 대표</p>
                <p className="mt-4">© 2025 cryptomagz. ALL RIGHTS RESERVED.</p>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-black text-slate-400">
                <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors">개인정보처리방침</button>
                <button onClick={() => setIsTermsOpen(true)} className="hover:text-white transition-colors">이용약관</button>
                <button className="hover:text-white transition-colors">사업자정보확인</button>
                <button onClick={handleAdminAccess} className="flex items-center gap-1 hover:text-emerald-400 transition-colors uppercase"><Shield size={12} /> Admin Login</button>
              </div>
            </div>
          </div>
        </footer>
      )}

      <AdminLoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLoginSuccess={() => { setIsAdminLoggedIn(true); setView('admin'); }} />
      <TermsOfServiceModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
};

export default App;
