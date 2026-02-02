
import React, { useState, useRef } from 'react';
import { Course, PreviewVideo, Lesson } from '../types';
import { Settings, Trash2, Youtube, Save, ArrowLeft, RefreshCw, Loader2, Image as ImageIcon, Upload, Video, Plus, Play, Link as LinkIcon } from 'lucide-react';

interface AdminDashboardProps {
  courses: Course[];
  previews: PreviewVideo[];
  onUpdateCourses: (courses: Course[]) => void;
  onUpdatePreviews: (previews: PreviewVideo[]) => void;
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ courses, previews, onUpdateCourses, onUpdatePreviews, onBack }) => {
  const [activeTab, setActiveTab] = useState<'insights' | 'curriculum' | 'sync'>('curriculum');
  const [ghToken, setGhToken] = useState(localStorage.getItem('cm_gh_token') || '');
  const [ghRepo, setGhRepo] = useState(localStorage.getItem('cm_gh_repo') || '');
  const [ghPath, setGhPath] = useState(localStorage.getItem('cm_gh_path') || 'data.json');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const utf8ToBase64 = (str: string) => {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  };

  const handleSyncToGithub = async () => {
    if (!ghToken || !ghRepo || !ghPath) {
      setSyncStatus({ type: 'error', message: 'GitHub 설정을 모두 입력해 주세요.' });
      return;
    }
    setIsSyncing(true);
    setSyncStatus(null);
    localStorage.setItem('cm_gh_token', ghToken);
    localStorage.setItem('cm_gh_repo', ghRepo);
    localStorage.setItem('cm_gh_path', ghPath);

    try {
      // 1. 기존 파일 정보 조회 (SHA 확인)
      const getRes = await fetch(`https://api.github.com/repos/${ghRepo}/contents/${ghPath}`, {
        headers: { 'Authorization': `Bearer ${ghToken}`, 'Accept': 'application/vnd.github+json' }
      });
      
      let sha = "";
      if (getRes.ok) {
        const fileData = await getRes.json();
        sha = fileData.sha;
      }

      // 2. 새로운 JSON 데이터 생성
      const newData = {
        courses: courses,
        previews: previews,
        updatedAt: new Date().toISOString()
      };

      // 3. GitHub에 업데이트 요청 (커밋)
      const putRes = await fetch(`https://api.github.com/repos/${ghRepo}/contents/${ghPath}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${ghToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: 'Update academy data via Admin Dashboard', 
          content: utf8ToBase64(JSON.stringify(newData, null, 2)), 
          sha: sha || undefined 
        })
      });

      if (putRes.ok) {
        setSyncStatus({ type: 'success', message: 'GitHub 동기화 성공! 이제 모든 사용자에게 반영됩니다.' });
      } else {
        const errData = await putRes.json();
        throw new Error(errData.message || '동기화 실패');
      }
    } catch (e: any) { 
      setSyncStatus({ type: 'error', message: e.message }); 
    } finally { 
      setIsSyncing(false); 
    }
  };

  const handlePreviewUpdate = (id: string, field: keyof PreviewVideo, value: string) => {
    onUpdatePreviews(previews.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleCourseUpdate = (id: string, field: keyof Course, value: any) => {
    onUpdateCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleLessonUpdate = (courseId: string, lessonId: string, field: keyof Lesson, value: any) => {
    onUpdateCourses(courses.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          lessons: c.lessons.map(l => l.id === lessonId ? { ...l, [field]: value } : l)
        };
      }
      return c;
    }));
  };

  const handleAddLesson = (courseId: string) => {
    onUpdateCourses(courses.map(c => {
      if (c.id === courseId) {
        const newLesson: Lesson = {
          id: `l-${Date.now()}`,
          title: '새로운 레슨',
          duration: '00:00',
          videoUrl: '',
          isCompleted: false
        };
        return { ...c, lessons: [...c.lessons, newLesson] };
      }
      return c;
    }));
  };

  const handleDeleteLesson = (courseId: string, lessonId: string) => {
    onUpdateCourses(courses.map(c => {
      if (c.id === courseId) {
        return { ...c, lessons: c.lessons.filter(l => l.id !== lessonId) };
      }
      return c;
    }));
  };

  const handleImageUpload = (id: string, type: 'preview' | 'course', file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (type === 'preview') {
        handlePreviewUpdate(id, 'thumbnail', base64String);
      } else {
        handleCourseUpdate(id, 'thumbnail', base64String);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col font-sans">
      <header className="h-20 bg-slate-900 border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"><ArrowLeft size={24} /></button>
          <div className="flex items-center gap-3"><Settings className="text-emerald-500" size={24} /><h1 className="text-xl font-black italic tracking-tighter uppercase">Admin Console</h1></div>
        </div>
        <div className="flex gap-2">
          {['insights', 'curriculum', 'sync'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${activeTab === tab ? 'bg-emerald-600 text-slate-950' : 'bg-slate-800 text-slate-500 hover:text-white'}`}>{tab.toUpperCase()}</button>
          ))}
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full p-8 bg-black">
        {activeTab === 'insights' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in">
            {previews.map((preview) => (
              <div key={preview.id} className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] space-y-4 shadow-xl">
                <div className="flex justify-between items-center">
                  <Youtube className="text-red-500" size={24} />
                  <button onClick={() => onUpdatePreviews(previews.filter(p => p.id !== preview.id))} className="text-slate-600 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                </div>
                
                <div className="relative group aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-black mb-4">
                  <img src={preview.thumbnail} alt={preview.title} className="w-full h-full object-cover" />
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
                    <Upload className="text-white mb-2" size={32} />
                    <span className="text-xs font-black text-white uppercase tracking-widest">썸네일 업로드</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(preview.id, 'preview', file);
                    }} />
                  </label>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">영상 제목</label>
                  <input value={preview.title} onChange={(e) => handlePreviewUpdate(preview.id, 'title', e.target.value)} className="w-full bg-black border border-slate-800 rounded-xl p-4 text-sm font-bold text-white" placeholder="제목" />
                  
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">YouTube ID / Link</label>
                  <input value={preview.youtubeId} onChange={(e) => handlePreviewUpdate(preview.id, 'youtubeId', e.target.value)} className="w-full bg-black border border-slate-800 rounded-xl p-4 text-sm font-mono text-white" placeholder="YouTube ID" />
                </div>
              </div>
            ))}
            
            <button 
              onClick={() => onUpdatePreviews([...previews, { id: Date.now().toString(), title: '새 영상', youtubeId: '', thumbnail: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=80' }])}
              className="border-2 border-dashed border-slate-800 rounded-[2rem] p-8 flex flex-col items-center justify-center text-slate-600 hover:text-emerald-500 hover:border-emerald-500/50 transition-all gap-4 bg-slate-900/20"
            >
              <ImageIcon size={48} />
              <span className="font-black uppercase tracking-widest">인사이트 비디오 추가</span>
            </button>
          </div>
        )}

        {activeTab === 'curriculum' && (
          <div className="space-y-12 animate-in fade-in">
            {courses.map(course => (
              <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-[3rem] p-8 md:p-12 space-y-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                   <button onClick={() => onUpdateCourses(courses.filter(c => c.id !== course.id))} className="p-4 text-slate-600 hover:text-red-500 transition-colors bg-black rounded-2xl border border-slate-800 shadow-lg"><Trash2 size={24} /></button>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                  <div className="w-full lg:w-80 space-y-6 flex-shrink-0">
                    <div className="relative group aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-800 bg-black shadow-inner">
                      <img src={course.thumbnail} className="w-full h-full object-cover" alt={course.title} />
                      <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
                        <Upload className="text-white mb-2" size={32} />
                        <span className="text-xs font-black text-white uppercase tracking-widest">강의 썸네일 변경</span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(course.id, 'course', file);
                        }} />
                      </label>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">카테고리</label>
                      <input value={course.category} onChange={(e) => handleCourseUpdate(course.id, 'category', e.target.value)} className="w-full bg-black border border-slate-800 rounded-2xl p-4 text-sm font-bold text-white" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">강의명 (Curriculum Title)</label>
                      <input value={course.title} onChange={(e) => handleCourseUpdate(course.id, 'title', e.target.value)} className="w-full bg-black border border-slate-800 rounded-2xl p-5 font-black text-2xl italic tracking-tighter text-white" />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">강의 상세 설명</label>
                      <textarea value={course.description} onChange={(e) => handleCourseUpdate(course.id, 'description', e.target.value)} className="w-full bg-black border border-slate-800 rounded-2xl p-5 text-sm leading-relaxed text-slate-300" rows={4} />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">강사명</label>
                        <input value={course.instructor} onChange={(e) => handleCourseUpdate(course.id, 'instructor', e.target.value)} className="w-full bg-black border border-slate-800 rounded-2xl p-4 text-sm font-bold text-white" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">수강료 (Price)</label>
                        <input value={course.price} onChange={(e) => handleCourseUpdate(course.id, 'price', e.target.value)} className="w-full bg-black border border-slate-800 rounded-2xl p-4 text-sm font-bold text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <Video className="text-emerald-500" size={24} />
                      <h4 className="text-lg font-black uppercase tracking-tight italic text-white">수업 리스트 (Lessons)</h4>
                    </div>
                    <button onClick={() => handleAddLesson(course.id)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20"><Plus size={16} /> 레슨 추가</button>
                  </div>
                  <div className="space-y-4">
                    {course.lessons.map((lesson, idx) => (
                      <div key={lesson.id} className="bg-black border border-slate-800 p-6 rounded-[2rem] flex flex-col md:flex-row gap-6 items-start md:items-center group hover:border-slate-700 transition-colors">
                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center font-black text-slate-600 flex-shrink-0 border border-slate-800">{idx + 1}</div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest">수업 제목</label>
                            <input value={lesson.title} onChange={(e) => handleLessonUpdate(course.id, lesson.id, 'title', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-bold focus:border-emerald-500 outline-none text-white" placeholder="레슨 제목" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest">강의 시간</label>
                            <input value={lesson.duration} onChange={(e) => handleLessonUpdate(course.id, lesson.id, 'duration', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-bold focus:border-emerald-500 outline-none text-white" placeholder="00:00" />
                          </div>
                          <div className="flex items-end gap-2">
                             <div className="flex-1">
                                <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest flex items-center gap-1.5"><Youtube size={10} className="text-red-500" /> 유튜브 영상 URL</label>
                                <div className="relative">
                                  <LinkIcon size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                  <input value={lesson.videoUrl} onChange={(e) => handleLessonUpdate(course.id, lesson.id, 'videoUrl', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 pl-9 text-xs font-bold focus:border-emerald-500 outline-none text-white" placeholder="https://youtube.com/watch?v=..." />
                                </div>
                             </div>
                             {lesson.videoUrl && (<button onClick={() => window.open(lesson.videoUrl, '_blank')} className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl border border-emerald-500/20 hover:bg-emerald-500/20" title="새 창에서 확인"><Play size={14} /></button>)}
                          </div>
                        </div>
                        <button onClick={() => handleDeleteLesson(course.id, lesson.id)} className="p-3 text-slate-700 hover:text-red-500 transition-colors md:self-end mb-1"><Trash2 size={20} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => onUpdateCourses([...courses, { id: `c-${Date.now()}`, title: '새로운 마스터 클래스', description: '강의에 대한 설명을 입력해 주세요.', thumbnail: 'https://images.unsplash.com/photo-1611974714024-4607a50d40f1?auto=format&fit=crop&w=800&q=80', instructor: '미지정', category: '기타', price: '0원', lessons: [] }])} className="w-full border-2 border-dashed border-slate-800 rounded-[3rem] py-16 flex flex-col items-center justify-center text-slate-600 hover:text-emerald-500 hover:border-emerald-500/50 transition-all gap-4 bg-slate-900/20">
              <Plus size={48} /><span className="font-black uppercase tracking-widest text-lg">새로운 커리큘럼 추가하기</span>
            </button>
          </div>
        )}

        {activeTab === 'sync' && (
          <div className="max-w-xl mx-auto space-y-6 animate-in fade-in bg-black">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] space-y-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                  <RefreshCw className="text-indigo-400" size={24} />
                </div>
                <div>
                  <h3 className="font-black text-white italic uppercase tracking-tighter">GitHub Data Live Sync</h3>
                  <p className="text-xs text-slate-500 font-medium">로컬 변경사항을 깃허브 저장소와 실시간 동기화합니다.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500">GitHub Token</label>
                  <input type="password" value={ghToken} onChange={(e) => setGhToken(e.target.value)} className="w-full bg-black border border-slate-800 rounded-2xl p-4 font-mono text-xs text-white" placeholder="ghp_..." />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500">Repository (Owner/Repo)</label>
                  <input type="text" value={ghRepo} onChange={(e) => setGhRepo(e.target.value)} className="w-full bg-black border border-slate-800 rounded-2xl p-4 text-sm text-white" placeholder="username/my-academy" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500">JSON Data File Path</label>
                  <input type="text" value={ghPath} onChange={(e) => setGhPath(e.target.value)} className="w-full bg-black border border-slate-800 rounded-2xl p-4 text-sm text-white" placeholder="data.json" />
                </div>
              </div>
              {syncStatus && (<div className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-2 ${syncStatus.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>{syncStatus.message}</div>)}
              <button onClick={handleSyncToGithub} disabled={isSyncing} className="w-full py-5 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-500 flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50">
                {isSyncing ? <Loader2 className="animate-spin" /> : <RefreshCw size={20} />} GitHub 동기화 실행
              </button>
            </div>
          </div>
        )}
      </main>

      <div className="fixed bottom-8 right-8 z-[60]">
        <button onClick={() => { localStorage.setItem('cm_gh_repo', ghRepo); onBack(); }} className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 px-10 py-5 rounded-full font-black text-lg shadow-2xl flex items-center gap-3 transition-all active:scale-95"><Save size={24} /> 저장 후 종료</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
