
import React from 'react';
import { X } from 'lucide-react';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Content Card */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <h2 className="text-2xl font-black italic tracking-tight">이용약관</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-500 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar text-slate-300">
          <div className="prose prose-invert max-w-none space-y-8 font-medium leading-relaxed break-keep">
            <h1 className="text-xl font-black text-white mb-6 underline underline-offset-8 decoration-emerald-500/30">크립토매거진 이용약관</h1>
            
            <section className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-emerald-400 mb-2">[제1조 (목적)]</h3>
                <p className="text-sm">이 약관은 (주)크립토매거진(이하 "회사")이 제공하는 온라인 콘텐츠 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적에 있습니다.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-emerald-400 mb-2">[제2조 (정의)]</h3>
                <ul className="list-disc pl-5 text-sm space-y-2 text-slate-400">
                  <li>"서비스"란 회사가 운영하는 웹사이트 및 이를 통해 제공되는 콘텐츠, 정보, 커뮤니티, 제휴 서비스 등을 말합니다.</li>
                  <li>"이용자"란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
                  <li>"회원"이란 회사와 이용계약을 체결하고 계정을 부여받아 서비스를 이용하는 자를 의미합니다.</li>
                  <li>"콘텐츠"란 회사가 제작하거나 제공하는 기사, 분석자료, 이미지, 영상, 데이터 등 일체의 정보를 말합니다.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-emerald-400 mb-2">[제3조 (약관의 효력 및 변경)]</h3>
                <p className="text-sm">1. 본 약관은 서비스 화면에 게시되거나 연결 화면을 제공함으로써 효력을 발생합니다.</p>
                <p className="text-sm">2. 회사는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있습니다.</p>
                <p className="text-sm">3. 변경 시 시행일 최소 7일 전 공지하며, 이용자가 변경 약관에 동의하지 않을 경우 회원탈퇴로 의사를 표시할 수 있습니다.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-emerald-400 mb-2">[제4조 (회원가입 및 계정 관리)]</h3>
                <p className="text-sm mb-2">1. 회원가입은 이용자가 약관과 개인정보 처리방침에 동의하고 회사가 정한 절차에 따라 정보를 입력함으로써 이루어집니다.</p>
                <p className="text-sm font-bold text-white mb-1">2. 회사는 다음의 경우 회원가입을 승낙하지 않을 수 있습니다.</p>
                <ul className="list-disc pl-5 text-xs text-slate-500 mb-2">
                  <li>허위 정보 제공 또는 타인의 명의 도용</li>
                  <li>만 18세 미만의 미성년자</li>
                  <li>서비스 제공에 지장을 초래하는 경우</li>
                </ul>
                <p className="text-sm">3. 회원은 자신의 계정 정보를 안전하게 관리해야 하며, 제3자에게 공유·양도할 수 없습니다.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-emerald-400 mb-2">[제5조 (서비스의 제공)]</h3>
                <p className="text-sm font-bold text-white mb-1">1. 회사는 다음과 같은 서비스를 제공합니다.</p>
                <ul className="list-disc pl-5 text-xs text-slate-500 mb-2">
                  <li>블록체인·가상자산 관련 뉴스 및 분석 제공</li>
                  <li>커뮤니티 서비스</li>
                  <li>제휴 콘텐츠 또는 광고 서비스</li>
                </ul>
                <p className="text-sm">2. 회사는 운영상·기술상 필요에 따라 서비스 내용을 변경할 수 있습니다.</p>
                <p className="text-sm">3. 무료 서비스는 회사의 재량으로 제공되며, 사전 공지 후 변경하거나 종료할 수 있습니다.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-emerald-400 mb-2">[제6조 (서비스의 이용 제한 및 중단)]</h3>
                <p className="text-sm font-bold text-white mb-1">1. 회사는 다음 사유가 발생할 경우 서비스 제공을 일시 중단할 수 있습니다.</p>
                <ul className="list-disc pl-5 text-xs text-slate-500 mb-2">
                  <li>시스템 점검, 정전, 장애, 통신 두절</li>
                  <li>천재지변 등 불가항력</li>
                </ul>
                <p className="text-sm font-bold text-white mb-1">2. 회사는 회원이 다음 행위를 한 경우 서비스 이용을 제한할 수 있습니다.</p>
                <ul className="list-disc pl-5 text-xs text-slate-500">
                  <li>불법 콘텐츠 게시 또는 저작권 침해</li>
                  <li>타인의 정보 도용</li>
                  <li>서비스 운영 방해(크롤링, 스팸, 해킹 시도 등)</li>
                  <li>기타 법령 또는 공서양속 위반</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-emerald-400 mb-2">[제7조 (저작권 및 콘텐츠 이용)]</h3>
                <p className="text-sm">1. 회사가 제공하는 모든 콘텐츠의 저작권은 회사 또는 제휴 제공자에게 귀속됩니다.</p>
                <p className="text-sm font-bold text-white mt-2 mb-1">2. 이용자는 아래 행위를 금지합니다.</p>
                <ul className="list-disc pl-5 text-xs text-slate-500 mb-2">
                  <li>무단 복제, 배포, 스크래핑, 변조</li>
                  <li>보고서·분석자료 등의 제3자 제공</li>
                  <li>상업적 재사용</li>
                </ul>
                <p className="text-sm">3. 이용자가 작성한 게시물의 저작권은 이용자에게 있으나, 회사는 서비스 운영을 위한 비독점적 이용권을 가집니다.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-emerald-400 mb-2">[제8조 (면책 조항)]</h3>
                <p className="text-sm">1. 회사는 천재지변, 통신 장애 등 불가항력 사유로 발생한 손해에 책임을 지지 않습니다.</p>
                <p className="text-sm text-amber-500 font-bold mt-2">2. 서비스 내 제공되는 시장 정보 및 분석 자료는 투자 권유가 아니며, 최종 판단은 이용자 본인의 책임입니다.</p>
                <p className="text-sm">3. 회사는 해외 가상자산 거래소 이용 과정에서 발생하는 수수료, 환율, 손실 등에 대해 책임을 지지 않습니다.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-emerald-400 mb-2">[제9조 (개인정보 보호)]</h3>
                <p className="text-sm">회사는 관련 법령 및 개인정보 처리방침에 따라 이용자의 개인정보를 보호합니다. 개인정보 처리방침은 별도 페이지에 게시하며, 본 약관의 일부를 구성합니다.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-emerald-400 mb-2">[제10조 (광고 및 제휴 서비스)]</h3>
                <p className="text-sm">회사는 서비스 내 광고를 게재할 수 있습니다. 이용자가 광고 또는 제휴 서비스를 이용하며 발생한 문제는 해당 업체와 해결하는 것을 원칙으로 하며, 회사는 책임을 지지 않습니다.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-emerald-400 mb-2">[제11조 (회원 해지 및 자격 상실)]</h3>
                <p className="text-sm">1. 회원은 언제든지 서비스 탈퇴를 요청할 수 있습니다.</p>
                <p className="text-sm font-bold text-white mt-2 mb-1">2. 아래 사유가 있을 경우 회사는 회원 자격을 제한·박탈할 수 있습니다.</p>
                <ul className="list-disc pl-5 text-xs text-slate-500">
                  <li>허위 정보 제공</li>
                  <li>법령 또는 약관 위반</li>
                  <li>저작권 등 법적 문제가 발생한 경우</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-emerald-400 mb-2">[제12조 (분쟁 해결)]</h3>
                <p className="text-sm">서비스 이용 중 발생한 분쟁은 회사와 이용자가 성실히 협의하여 해결합니다. 협의로 해결되지 않을 경우 회사 본사 소재지 관할 법원을 전속 관할로 합니다.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-emerald-400 mb-2">[제13조 (약관의 게시 및 개정)]</h3>
                <p className="text-sm">본 약관은 서비스 화면에 게시하여 그 효력을 가집니다. 회사는 법령 또는 정책 변경 시 약관을 개정할 수 있으며, 개정 시 시행일 7일 전 공지합니다.</p>
              </div>
            </section>
            
            <p className="text-right text-slate-500 font-black pt-12">시행일자: 2025년 12월 01일</p>
          </div>
        </div>
        
        {/* Footer Action */}
        <div className="p-8 border-t border-slate-800 bg-slate-900/80">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black transition-all"
          >
            내용 확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServiceModal;
