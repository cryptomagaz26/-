
import React from 'react';
import { X } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
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
          <h2 className="text-2xl font-black italic tracking-tight">개인정보 처리방침</h2>
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
            <h1 className="text-xl font-black text-white mb-6">개인정보 처리방침(Crypto Magazine Privacy Policy)</h1>
            
            <section>
              <h3 className="text-lg font-bold text-emerald-400 mb-3">1. 개인정보의 처리 목적</h3>
              <p>[(주)크립토매거진] (이하 크립토매거진) 는 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400 text-sm">
                <li>고객 가입의사 확인, 고객에 대한 서비스 제공에 따른 본인 식별.인증, 회원자격 유지.관리, 물품 또는 서비스 공급에 따른 금액 결제, 물품 또는 서비스의 공급.배송 등</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-emerald-400 mb-3">2. 개인정보의 처리 및 보유 기간</h3>
              <p>① ‘크립토매거진’은 정보주체로부터 개인정보를 수집할 때 동의 받은 개인정보 보유․이용기간 또는 법령에 따른 개인정보 보유․이용기간 내에서 개인정보를 처리․보유합니다.</p>
              <p className="mt-2">② 구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400 text-sm">
                <li>고객 가입 및 관리 : 카카오를 통한 회원가입 및 크립토매거진 회원가입 페이지를 통한 가입</li>
                <li>보유 기간 : 수집 시점으로부터 3년 보관</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-emerald-400 mb-3">3. 정보주체와 법정대리인의 권리·의무 및 그 행사방법</h3>
              <p>이용자는 개인정보주체로써 다음과 같은 권리를 행사할 수 있습니다.</p>
              <p>① 정보주체는 ‘크립토매거진’ 에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
              <ol className="list-decimal pl-5 mt-2 space-y-1 text-slate-400 text-sm">
                <li>개인정보 열람요구</li>
                <li>오류 등이 있을 경우 정정 요구</li>
                <li>삭제 요구</li>
                <li>처리정지 요구</li>
              </ol>
            </section>

            <section>
              <h3 className="text-lg font-bold text-emerald-400 mb-3">4. 처리하는 개인정보의 항목</h3>
              <p>① ‘크립토매거진’는 다음의 개인정보 항목을 처리하고 있습니다.</p>
              <div className="bg-slate-800/50 p-6 rounded-2xl mt-4 space-y-4">
                <div>
                  <h4 className="font-bold text-white text-sm mb-2">■ 회원가입 시</h4>
                  <p className="text-sm">필수항목 : 이름, 이메일, 전화번호</p>
                  <p className="text-sm">선택항목 : 생년월일</p>
                  <p className="text-sm">수집목적 : 크립토매거진 회원관리 및 마케팅 이용</p>
                  <p className="text-sm">보유기간 : 회원 탈퇴 또는 동의철회 시 지체없이 파기</p>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-2">카카오 개인정보 제3자 제공</h4>
                  <p className="text-sm">필수항목 : 프로필 정보(닉네임/프로필 사진), 카카오계정(이메일), 카카오계정(전화번호)</p>
                  <p className="text-sm">수집목적 : 크립토매거진 카카오채널을 통한 회원관리 및 마케팅 이용</p>
                  <p className="text-sm">보유기간 : 회원탈퇴 시 지체없이 파기</p>
                </div>
              </div>
              <p className="mt-4">② ‘크립토매거진’는 만 18세 미만 미성년자의 개인정보를 보호하기 위하여 회원가입은 만18세 이상만 가능하도록 함으로써 미성년자의 개인정보를 수집하지 않습니다.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-emerald-400 mb-3">5. 개인정보의 파기</h3>
              <p>‘크립토매거진’는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.</p>
              <div className="mt-4 space-y-3">
                <p className="text-sm font-bold text-white">- 파기절차</p>
                <p className="text-sm text-slate-400">이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 파기됩니다. 이때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.</p>
                <p className="text-sm font-bold text-white">- 파기기한</p>
                <p className="text-sm text-slate-400">이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다.</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-emerald-400 mb-3">6. 개인정보 자동 수집 장치의 설치</h3>
              <p>회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.</p>
              <p className="text-sm text-slate-400 mt-2">가. 쿠키의 사용 목적: 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.</p>
              <p className="text-sm text-slate-400 mt-1">나. 쿠키의 설치·운영 및 거부: 웹브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.</p>
              <p className="text-sm text-slate-400 mt-1">다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-emerald-400 mb-3">7. 개인정보 보호책임자</h3>
              <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
              <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl mt-4">
                <p className="font-bold text-emerald-400 mb-2">▶️ 개인정보 보호책임자</p>
                <ul className="text-sm space-y-1">
                  <li>성명: 송진우</li>
                  <li>직책: 대표이사</li>
                  <li>직급: CEO</li>
                  <li>전화: 02-6952-3171</li>
                </ul>
              </div>
              <p className="mt-4 text-sm text-slate-400 italic">정보주체는 회사의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있습니다. 크립토매거진은 정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-emerald-400 mb-3">8. 개인정보 처리방침 변경</h3>
              <p>이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-emerald-400 mb-3">9. 개인정보의 안전성 확보 조치</h3>
              <p>크립토매거진은 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.</p>
              <ul className="space-y-4 mt-4">
                <li>
                  <p className="text-sm font-bold text-white">① 개인정보 취급 직원의 최소화 및 교육</p>
                  <p className="text-xs text-slate-400 ml-4 mt-1">개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화하여 개인정보를 관리하는 대책을 시행하고 있습니다.</p>
                </li>
                <li>
                  <p className="text-sm font-bold text-white">② 해킹 등에 대비한 기술적 대책</p>
                  <p className="text-xs text-slate-400 ml-4 mt-1">크립토매거진은 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.</p>
                </li>
                <li>
                  <p className="text-sm font-bold text-white">③ 개인정보의 암호화</p>
                  <p className="text-xs text-slate-400 ml-4 mt-1">이용자의 개인정보는 비밀번호는 암호화되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.</p>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-emerald-400 mb-3">10. 정보주체의 권익침해에 대한 구제방법</h3>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-800 p-4 rounded-xl">
                  <p className="text-xs font-bold mb-2">▶️ 개인정보 침해신고센터</p>
                  <p className="text-[11px] text-slate-400">홈페이지: privacy.kisa.or.kr</p>
                  <p className="text-[11px] text-slate-400">전화: (국번없이) 118</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl">
                  <p className="text-xs font-bold mb-2">▶️ 개인정보 분쟁조정위원회</p>
                  <p className="text-[11px] text-slate-400">홈페이지: www.kopico.go.kr</p>
                  <p className="text-[11px] text-slate-400">전화: (국번없이) 1833-6972</p>
                </div>
              </div>
            </section>
            
            <p className="text-right text-slate-500 font-black pt-12">시행일자: 2025년 12월 1일</p>
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

export default PrivacyPolicyModal;
