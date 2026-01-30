
import React, { useState } from 'react';
import { Course, PreviewVideo, Lesson } from '../types';
import { Settings, Plus, Trash2, Upload, Youtube, Save, ArrowLeft, RefreshCw, Globe, Loader2, Lock, FileCode, CheckCircle2, AlertCircle, Image as ImageIcon, User as UserIcon, BookOpen, PlusCircle } from 'lucide-react';

interface AdminDashboardProps {
  courses: Course[];
  previews: PreviewVideo[];
  onUpdateCourses: (courses: Course[]) => void;
  onUpdatePreviews: (previews: PreviewVideo[]) => void;
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ courses, previews, onUpdateCourses, onUpdatePreviews, onBack }) => {
  const [activeTab, setActiveTab] = useState<'insights' | 'curriculum' | 'sync'>('insights');
  const [ghToken, setGhToken] = useState(localStorage.getItem('cm_gh_token') || '');
  const [ghRepo, setGhRepo] = useState(localStorage.getItem('cm_gh_repo') || '');
  const [ghPath, setGhPath] = useState(localStorage.getItem('cm_gh_path') || 'data/mockData.ts');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const utf8ToBase64 = (str: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    let binary = "";
    for (let i = 0; i < data.byteLength; i++) { binary += String.fromCharCode(data[i]); }
    return btoa(binary);
  };

  const base64ToUtf8 = (base64: string) => {
    const binary = atob(base64.replace(/\s/g, ''));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) { bytes[i] = binary.charCodeAt(i); }
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
    localStorage.setItem('cm_gh_token', ghToken);
    localStorage.setItem('cm_gh_repo', ghRepo);
    localStorage.setItem('cm_gh_path', ghPath);

    try {
      const getRes = await fetch(`https://api.github.com/repos/${ghRepo}/contents/${ghPath}`, {
        headers: { 'Authorization': `Bearer ${ghToken}`, 'Accept': 'application/vnd.github+json' }
      });
      if (!getRes.ok) throw new Error('파일을 찾을 수 없습니다.');
      const fileData = await getRes.json();
      const sha = fileData.sha;
      const oldContent = base64ToUtf8(fileData.content);
      const coursesCode = `export const COURSES: Course[] = ${JSON.stringify(courses, null, 2)};`;
      const previewsCode = `export const PREVIEWS: PreviewVideo[] = ${JSON.stringify(previews, null, 2)};`;
      let newContent = oldContent;
      newContent = newContent.replace(/export const COURSES: Course\[\] = \[[\s\S]*?\];/, coursesCode);
      newContent = newContent.replace(/export const PREVIEWS: PreviewVideo\[\] = \[[\s\S]*?\];/, previewsCode);
      const putRes = await fetch(`https://api.github.com/repos/${ghRepo}/contents/${ghPath}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${ghToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Update data via Cryptomagz Admin', content: utf8ToBase64(newContent), sha: sha })
      });
      if (putRes.ok) setSyncStatus({ type: 'success', message: 'GitHub 동기화 성공!' });
      else throw new Error('업데이트 실패');
    } catch (e: any) { setSyncStatus({ type: 'error', message: e.message }); } finally { setIsSyncing(false); }
  };

  const handlePreviewUpdate = (id: string, field: keyof PreviewVideo, value: string) => {
    onUpdatePreviews(previews.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleCourseUpdate = (id: string, field: keyof Course, value: any) => {
    onUpdateCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
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

      <main className="flex-1 max-w-6xl mx-auto w-full p-8">
        {activeTab === 'insights' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in">
            {previews.map((preview) => (
              <div key={preview.id} className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] space-y-4">
                <div className="flex justify-between items-center"><Youtube className="text-red-500" size={24} /><button onClick={() => onUpdatePreviews(previews.filter(p => p.id !== preview.id))} className="text-slate-600 hover:text-red-500 transition-colors"><Trash2 size={20} /></button></div>
                <input value={preview.title} onChange={(e) => handlePreviewUpdate(preview.id, 'title', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm font-bold" placeholder="제목" />
                <input value={preview.youtubeId} onChange={(e) => handlePreviewUpdate(preview.id, 'youtubeId', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm font-mono" placeholder="YouTube ID" />
              </div>
            ))}
          </div>
        )}
        {activeTab === 'curriculum' && (
          <div className="space-y-8 animate-in fade-in">
            {courses.map(course => (
              <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 space-y-6">
                <div className="flex gap-6 items-start">
                  <div className="w-48 h-32 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex-shrink-0"><img src={course.thumbnail} className="w-full h-full object-cover" /></div>
                  <div className="flex-1 space-y-4">
                    <input value={course.title} onChange={(e) => handleCourseUpdate(course.id, 'title', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 font-black" />
                    <textarea value={course.description} onChange={(e) => handleCourseUpdate(course.id, 'description', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm" rows={2} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'sync' && (
          <div className="max-w-xl mx-auto space-y-6 animate-in fade-in">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] space-y-6">
              <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-500">GitHub Token</label><input type="password" value={ghToken} onChange={(e) => setGhToken(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono" placeholder="ghp_..." /></div>
              <button onClick={handleSyncToGithub} disabled={isSyncing} className="w-full py-5 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-500 flex items-center justify-center gap-3 transition-all">{isSyncing ? <Loader2 className="animate-spin" /> : <RefreshCw />} GitHub 동기화 실행</button>
            </div>
          </div>
        )}
      </main>
      <div className="fixed bottom-8 right-8"><button onClick={() => { localStorage.setItem('cryptomagz_courses', JSON.stringify(courses)); onBack(); }} className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 px-10 py-5 rounded-full font-black text-lg shadow-xl flex items-center gap-3 transition-all"><Save size={24} /> 저장 후 종료</button></div>
    </div>
  );
};

export default AdminDashboard;
