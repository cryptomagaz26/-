
import React, { useState, useEffect } from 'react';
import { Course, PreviewVideo, Lesson } from '../types';
import { 
  Settings, 
  Plus, 
  Trash2, 
  Upload, 
  Youtube, 
  Save, 
  ArrowLeft, 
  RefreshCw, 
  Globe, 
  Loader2, 
  Lock, 
  FileCode, 
  CheckCircle2, 
  AlertCircle,
  Image as ImageIcon,
  User as UserIcon,
  BookOpen,
  PlusCircle
} from 'lucide-react';

interface AdminDashboardProps {
  courses: Course[];
  previews: PreviewVideo[];
  onUpdateCourses: (courses: Course[]) => void;
  onUpdatePreviews: (previews: PreviewVideo[]) => void;
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  courses, 
  previews, 
  onUpdateCourses, 
  onUpdatePreviews,
  onBack 
}) => {
  const [activeTab, setActiveTab] = useState<'insights' | 'curriculum' | 'sync'>('insights');
  
  // GitHub Sync States
  const [ghToken, setGhToken] = useState(localStorage.getItem('cm_gh_token') || '');
  const [ghRepo, setGhRepo] = useState(localStorage.getItem('cm_gh_repo') || '');
  const [ghPath, setGhPath] = useState(localStorage.getItem('cm_gh_path') || 'data/mockData.ts');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);

  // --- Helper Functions for UTF-8 Safe Base64 ---
  const utf8ToBase64 = (str: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    let binary = "";
    for (let i = 0; i < data.byteLength; i++) {
      binary += String.fromCharCode(data[i]);
    }
    return btoa(binary);
  };

  const base64ToUtf8 = (base64: string) => {
    const binary = atob(base64.replace(/\s/g, ''));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
  };

  const handleSyncToGithub = async () => {
    if (!ghToken || !ghRepo || !ghPath) {
      setSyncStatus({ type: 'error', message: 'GitHub 설정을 모두 입력해 주세요.' });
      return;
    }

    setIsSyncing(true);
    setSyncStatus(null);
    
    // 로컬 설정 저장
    localStorage.setItem('cm_gh_token', ghToken);
    localStorage.setItem('cm_gh_repo', ghRepo);
    localStorage.setItem('cm_gh_path', ghPath);

    try {
      const getRes = await fetch(`https://api.github.com/repos/${ghRepo}/contents/${ghPath}`, {
        headers: { 
          'Authorization': `Bearer ${ghToken}`,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
      
      if (!getRes.ok) {
        const errData = await getRes.json();
        throw new Error(errData.message || '파일을 찾을 수 없습니다. 저장소와 경로를 확인하세요.');
      }
      
      const fileData = await getRes.json();
      const sha = fileData.sha;
      const oldContent = base64ToUtf8(fileData.content);

      const coursesCode = `export const COURSES: Course[] = ${JSON.stringify(courses, null, 2)};`;
      const previewsCode = `export const PREVIEWS: PreviewVideo[] = ${JSON.stringify(previews, null, 2)};`;
      
      let newContent = oldContent;
      
      const coursesRegex = /export const COURSES: Course\[\] = \[[\s\S]*?\];/;
      if (coursesRegex.test(newContent)) {
        newContent = newContent.replace(coursesRegex, coursesCode);
      }
      
      const previewsRegex = /export const PREVIEWS: PreviewVideo\[\] = \[[\s\S]*?\];/;
      if (previewsRegex.test(newContent)) {
        newContent = newContent.replace(previewsRegex, previewsCode);
      }

      const putRes = await fetch(`https://api.github.com/repos/${ghRepo}/contents/${ghPath}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${ghToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28'
        },
        body: JSON.stringify({
          message: 'Update curriculum & insights via Cryptomagz Admin (UTF-8 Protected)',
          content: utf8ToBase64(newContent),
          sha: sha
        })
      });

      if (putRes.ok) {
        setSyncStatus({ type: 'success', message: 'GitHub 동기화가 성공적으로 완료되었습니다!' });
      } else {
        const err = await putRes.json();
        throw new Error(err.message || 'GitHub 업데이트에 실패했습니다.');
      }
    } catch (e: any) {
      setSyncStatus({ type: 'error', message: `오류 발생: ${e.message}` });
    } finally {
      setIsSyncing(false);
    }
  };

  // Preview Helpers
  const handlePreviewUpdate = (id: string, field: keyof PreviewVideo, value: string) => {
    const updated = previews.map(p => p.id === id ? { ...p, [field]: value } : p);
    onUpdatePreviews(updated);
  };

  const handlePreviewImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handlePreviewUpdate(id, 'thumbnail', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPreview = () => {
    const newPreview: PreviewVideo = {
      id: `p-${Date.now()}`,
      title: '새로운 인사이트 제목',
      youtubeId: '',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bbbda5366392?auto=format&fit=crop&w=800&q=80'
    };
    onUpdatePreviews([...previews, newPreview]);
  };

  // Course Helpers
  const handleCourseUpdate = (id: string, field: keyof Course, value: any) => {
    const updated = courses.map(c => c.id === id ? { ...c, [field]: value } : c);
    onUpdateCourses(updated);
  };

  const handleCourseImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleCourseUpdate(id, 'thumbnail', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLessonUpdate = (courseId: string, lessonId: string, field: keyof Lesson, value: any) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          lessons: c.lessons.map(l => l.id === lessonId ? { ...l, [field]: value } : l)
        };
      }
      return c;
    });
    onUpdateCourses(updated);
  };

  const handleAddLesson = (courseId: string) => {
    const newLesson: Lesson = {
      id: `l-${Date.now()}`,
      title: '새로운 목차 제목',
      duration: '00:00',
      videoUrl: '',
      isCompleted: false
    };
    const updated = courses.map(c => {
      if (c.id === courseId) {
        return { ...c, lessons: [...c.lessons, newLesson] };
      }
      return c;
    });
    onUpdateCourses(updated);
  };

  const handleDeleteLesson = (courseId: string, lessonId: string) => {
    if (!confirm('정말 이 목차를 삭제하시겠습니까?')) return;
    const updated = courses.map(c => {
      if (c.id === courseId) {
        return { ...c, lessons: c.lessons.filter(l => l.id !== lessonId) };
      }
      return c;
    });
    onUpdateCourses(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Admin Header */}
      <header className="h-20 bg-slate-900/50 border-b border-slate-800 backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <Settings className="text-emerald-500" size={24} />
            <h1 className="text-xl font-black italic tracking-tighter uppercase">Admin Console</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('insights')}
            className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'insights' ? 'bg-emerald-600 text-slate-950' : 'bg-slate-800 text-slate-500 hover:text-white'}`}
          >
            INSIGHTS
          </button>
          <button 
            onClick={() => setActiveTab('curriculum')}
            className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'curriculum' ? 'bg-emerald-600 text-slate-950' : 'bg-slate-800 text-slate-500 hover:text-white'}`}
          >
            CURRICULUM
          </button>
          <button 
            onClick={() => setActiveTab('sync')}
            className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'sync' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-800 text-slate-500 hover:text-white'}`}
          >
            SYNC
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full p-8 md:p-12">
        {activeTab === 'insights' && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-black italic mb-2 tracking-tight">Manage Insights</h2>
                <p className="text-slate-500 text-sm font-medium">유튜브 인사이트 섹션의 콘텐츠를 관리합니다.</p>
              </div>
              <button 
                onClick={handleAddPreview}
                className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <Plus size={18} /> 콘텐츠 추가
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {previews.map((preview) => (
                <div key={preview.id} className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] space-y-6 group hover:border-emerald-500/30 transition-all">
                  <div className="flex justify-between items-start">
                    <Youtube className="text-red-500" size={24} />
                    <button onClick={() => onUpdatePreviews(previews.filter(p => p.id !== preview.id))} className="p-2 text-slate-600 hover:text-red-500 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">영상 제목</label>
                      <input 
                        value={preview.title}
                        onChange={(e) => handlePreviewUpdate(preview.id, 'title', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm focus:border-emerald-500 outline-none transition-all font-bold"
                        placeholder="영상 제목"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">YouTube ID / URL</label>
                      <input 
                        value={preview.youtubeId}
                        onChange={(e) => handlePreviewUpdate(preview.id, 'youtubeId', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm focus:border-emerald-500 outline-none transition-all"
                        placeholder="YouTube ID 또는 URL"
                      />
                    </div>
                    
                    <div className="space-y-2 pt-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">썸네일 이미지</label>
                      <div className="flex items-center gap-4">
                        <div className="w-32 h-20 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-emerald-500/20 transition-colors">
                          {preview.thumbnail ? (
                            <img src={preview.thumbnail} className="w-full h-full object-cover" alt="미리보기" />
                          ) : (
                            <ImageIcon size={20} className="text-slate-700" />
                          )}
                        </div>
                        <label className="flex-1">
                          <div className="cursor-pointer w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-[11px] font-black text-slate-400 hover:text-white hover:border-emerald-500 transition-all flex items-center justify-center gap-2">
                            <Upload size={14} /> 이미지 업로드
                          </div>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handlePreviewImageUpload(preview.id, e)} 
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'curriculum' && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
            <div>
              <h2 className="text-3xl font-black italic mb-2 tracking-tight">Curriculum Editor</h2>
              <p className="text-slate-500 text-sm font-medium">프리미엄 커리큘럼의 상세 내용을 수정합니다.</p>
            </div>
            {courses.map(course => (
              <div key={course.id} className="bg-slate-900/50 border border-slate-800 rounded-[3rem] p-10 space-y-10 group hover:border-emerald-500/20 transition-all">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="space-y-3 shrink-0">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">강의 썸네일</label>
                    <div className="relative group/thumb">
                      <div className="w-48 h-32 md:w-64 md:h-44 rounded-3xl overflow-hidden border border-slate-800 bg-slate-950">
                        <img src={course.thumbnail} className="w-full h-full object-cover" alt="" />
                      </div>
                      <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity cursor-pointer rounded-3xl">
                        <div className="text-white flex flex-col items-center gap-2">
                          <Upload size={32} />
                          <span className="text-[10px] font-black uppercase">Change Image</span>
                        </div>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleCourseImageUpload(course.id, e)} 
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex-1 space-y-6 w-full">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex items-center gap-2">
                          <BookOpen size={12} className="text-emerald-500" /> 강의명
                        </label>
                        <input 
                          value={course.title}
                          onChange={(e) => handleCourseUpdate(course.id, 'title', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-lg focus:border-emerald-500 outline-none transition-all font-black italic"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex items-center gap-2">
                          <UserIcon size={12} className="text-emerald-500" /> 강사명
                        </label>
                        <input 
                          value={course.instructor}
                          onChange={(e) => handleCourseUpdate(course.id, 'instructor', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-lg focus:border-emerald-500 outline-none transition-all font-bold"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">강의 상세 설명</label>
                      <textarea 
                        rows={2}
                        value={course.description}
                        onChange={(e) => handleCourseUpdate(course.id, 'description', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm focus:border-emerald-500 outline-none transition-all font-medium leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-800/50">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Lesson List Management
                    </h4>
                    <button 
                      onClick={() => handleAddLesson(course.id)}
                      className="bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 flex items-center gap-2 transition-all"
                    >
                      <Plus size={14} /> 목차 추가
                    </button>
                  </div>

                  <div className="space-y-4">
                    {course.lessons.map((lesson, idx) => (
                      <div key={lesson.id} className="bg-slate-950/50 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-center group/lesson hover:border-slate-700 transition-colors animate-in slide-in-from-left-2 duration-300">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 font-black text-xs shrink-0 group-hover/lesson:border-emerald-500/30 group-hover/lesson:text-emerald-500 transition-all">
                          {idx + 1}
                        </div>
                        <div className="flex-1 grid md:grid-cols-2 gap-4 w-full">
                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-1">제목</label>
                            <input 
                              value={lesson.title} 
                              onChange={(e) => handleLessonUpdate(course.id, lesson.id, 'title', e.target.value)}
                              className="w-full bg-transparent border-b border-slate-800 focus:border-emerald-500 outline-none p-1 text-sm font-bold"
                              placeholder="Lesson Title"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-1">비디오 URL / 소스</label>
                            <div className="flex items-center gap-3">
                              <input 
                                value={lesson.videoUrl} 
                                onChange={(e) => handleLessonUpdate(course.id, lesson.id, 'videoUrl', e.target.value)}
                                className="flex-1 bg-transparent border-b border-slate-800 focus:border-emerald-500 outline-none p-1 text-xs text-slate-500 font-mono"
                                placeholder="Video URL (MP4, Youtube, etc.)"
                              />
                              <button 
                                onClick={() => handleDeleteLesson(course.id, lesson.id)}
                                className="p-2 text-slate-700 hover:text-red-500 transition-colors shrink-0"
                                title="목차 삭제"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {course.lessons.length === 0 && (
                      <div className="py-12 border-2 border-dashed border-slate-800 rounded-[2rem] flex flex-col items-center justify-center text-slate-600 gap-4">
                        <PlusCircle size={40} className="opacity-20" />
                        <p className="text-sm font-bold">등록된 목차가 없습니다. 새로운 목차를 추가해 보세요.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {activeTab === 'sync' && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="w-20 h-20 bg-indigo-600/20 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                <Globe className="text-indigo-400" size={40} />
              </div>
              <h2 className="text-4xl font-black italic mb-4 uppercase tracking-tighter">Deployment & Sync</h2>
              <p className="text-slate-400 font-medium break-keep">수정한 데이터를 실제 웹사이트에 반영하기 위해 GitHub와 동기화합니다.<br/>개인용 액세스 토큰(PAT)이 필요합니다.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 md:p-12 space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] -mr-32 -mt-32 pointer-events-none" />
              
              <div className="grid gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex items-center gap-2">
                    <Lock size={12} className="text-indigo-400" /> GitHub PAT (Token)
                  </label>
                  <input 
                    type="password"
                    value={ghToken}
                    onChange={(e) => setGhToken(e.target.value)}
                    placeholder="ghp_..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-indigo-500 outline-none transition-all font-bold"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex items-center gap-2">
                      <RefreshCw size={12} className="text-indigo-400" /> Repository (Owner/Name)
                    </label>
                    <input 
                      type="text"
                      value={ghRepo}
                      onChange={(e) => setGhRepo(e.target.value)}
                      placeholder="username/repo-name"
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-indigo-500 outline-none transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex items-center gap-2">
                      <FileCode size={12} className="text-indigo-400" /> Target File Path
                    </label>
                    <input 
                      type="text"
                      value={ghPath}
                      onChange={(e) => setGhPath(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-indigo-500 outline-none transition-all font-bold"
                    />
                  </div>
                </div>
              </div>

              {syncStatus && (
                <div className={`p-6 rounded-2xl border flex items-start gap-4 animate-in slide-in-from-top-2 ${
                  syncStatus.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                  {syncStatus.type === 'success' ? <CheckCircle2 size={24} className="shrink-0" /> : <AlertCircle size={24} className="shrink-0" />}
                  <p className="text-sm font-bold leading-relaxed">{syncStatus.message}</p>
                </div>
              )}

              <button 
                onClick={handleSyncToGithub}
                disabled={isSyncing}
                className={`w-full py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 ${
                  isSyncing ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
                }`}
              >
                {isSyncing ? (
                  <><Loader2 className="animate-spin" size={24} /> 동기화 진행 중...</>
                ) : (
                  <><RefreshCw size={24} /> GitHub에 데이터 즉시 업데이트</>
                )}
              </button>
            </div>
          </section>
        )}
      </main>

      {activeTab !== 'sync' && (
        <div className="fixed bottom-8 right-8 flex gap-4">
          <button 
            onClick={() => {
              localStorage.setItem('cryptomagz_courses', JSON.stringify(courses));
              localStorage.setItem('cryptomagz_previews', JSON.stringify(previews));
              alert('브라우저 캐시에 저장되었습니다. 실제 배포는 SYNC 탭을 이용하세요.');
              onBack();
            }}
            className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 px-10 py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-emerald-600/40 flex items-center gap-3 transition-all active:scale-95"
          >
            <Save size={24} /> 로컬 저장 및 종료
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
