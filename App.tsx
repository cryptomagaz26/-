
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import LearningView from './components/LearningView';
import AdminDashboard from './components/AdminDashboard';
import AdminLoginModal from './components/AdminLoginModal';
import TermsOfServiceModal from './components/TermsOfServiceModal';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import { Course, PreviewVideo } from './types';
import { COURSES as initialCourses, PREVIEWS as initialPreviews } from './data/mockData';
import { Shield } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'learning' | 'admin'>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Master Data State with Persistence
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('cryptomagz_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [previews, setPreviews] = useState<PreviewVideo[]>(() => {
    const saved = localStorage.getItem('cryptomagz_previews');
    return saved ? JSON.parse(saved) : initialPreviews;
  });

  // Sync to localStorage whenever data changes
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
      {/* Navbar is visible except in Admin View for focused work */}
      {view !== 'admin' && <Navbar onHomeClick={handleHomeClick} />}

      <main>
        {view === 'home' && (
          <HomeView 
            courses={courses} 
            previews={previews} 
            onCourseSelect={handleCourseSelect} 
          />
        )}
        
        {view === 'learning' && selectedCourse && (
          <LearningView 
            course={selectedCourse} 
            onBack={handleHomeClick} 
          />
        )}

        {view === 'admin' && isAdminLoggedIn && (
          <AdminDashboard 
            courses={courses}
            previews={previews}
            onUpdateCourses={setCourses}
            onUpdatePreviews={setPreviews}
            onBack={handleHomeClick}
          />
        )}
      </main>

      {/* Global Footer (only shown on home view) */}
      {view === 'home' && (
        <footer className="bg-slate-900/50 border-t border-slate-800 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col gap-2">
                <span className="font-black text-xl italic tracking-tighter text-white">cryptomagz</span>
                <p className="text-xs text-slate-500 font-medium">© 2026 Cryptomagz Academy. All rights reserved.</p>
              </div>
              <div className="flex gap-6 text-xs font-bold text-slate-400">
                <button onClick={() => setIsTermsOpen(true)} className="hover:text-white transition-colors">이용약관</button>
                <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors">개인정보처리방침</button>
                <button 
                  onClick={handleAdminAccess} 
                  className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
                >
                  <Shield size={14} /> 관리자
                </button>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Overlays / Modals */}
      <AdminLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLoginSuccess={() => {
          setIsAdminLoggedIn(true);
          setView('admin');
        }}
      />
      <TermsOfServiceModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
};

export default App;
