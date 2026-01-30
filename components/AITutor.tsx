
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

interface AITutorProps {
  context: string;
  courseTitle: string;
}

const AITutor: React.FC<AITutorProps> = ({ context, courseTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', content: string}[]>([
    { role: 'model', content: `반가워요! 저는 여러분의 AI 학습 도우미입니다. 현재 "${courseTitle}" 강의를 수강 중이시네요. "${context}" 단원과 관련해 궁금한 점이 있다면 무엇이든 물어보세요!` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `당신은 프리미엄 LMS 플랫폼의 전문 교육 튜터입니다.
          모든 답변은 한국어로 정중하고 친절하게 작성하세요.
          사용자가 수강 중인 강의: "${courseTitle}".
          현재 학습 중인 단원: "${context}".
          복잡한 개념을 쉽게 설명하고, 관련이 있다면 코드 예제를 제공하며 학생을 격려하세요.
          답변은 가독성을 위해 마크다운 형식을 사용하여 간결하게 작성하세요.`
        }
      });

      setMessages(prev => [...prev, { role: 'model', content: response.text || "죄송합니다. 답변을 생성하지 못했습니다. 다시 시도해 주세요." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "연결에 문제가 발생했습니다. 네트워크 상태를 확인해 주세요." }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="p-6 pt-0">
        <button 
          onClick={() => setIsOpen(true)}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-[1.5rem] flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98] group"
        >
          <Sparkles size={18} className="text-white group-hover:animate-pulse" />
          <span className="font-black text-white text-sm uppercase tracking-widest">AI 튜터와 대화하기</span>
        </button>
      </div>
    );
  }

  return (
    <div className="h-[450px] m-4 mt-0 bg-slate-950 rounded-[2rem] border border-indigo-500/30 flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
      <div className="p-4 bg-indigo-600 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
          <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Gemini AI 활성화됨</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
          <X size={18} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.05),transparent)]">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[88%] p-4 rounded-2xl text-sm leading-relaxed break-keep ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white shadow-lg font-medium' 
                : 'bg-slate-800/80 border border-slate-700 text-slate-200'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-800/80 p-4 rounded-2xl flex gap-1.5">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-900/50 backdrop-blur border-t border-slate-800">
        <div className="relative group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="강의 내용 중 궁금한 점을 물어보세요..."
            className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-5 py-3 pr-12 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all placeholder:text-slate-600"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-indigo-400 disabled:opacity-30 p-1"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
