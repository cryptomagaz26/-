
import { Course, PreviewVideo } from '../types';

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: '재테크 기초반 (3개월 과정)',
    description: '건강한 투자를 위한 첫걸음. 차트 보는 법부터 매크로 분석, 투자자로서의 멘탈 관리까지 재테크의 뿌리를 튼튼하게 다집니다.',
    thumbnail: 'https://images.unsplash.com/photo-1611974714024-4607a50d40f1?auto=format&fit=crop&w=800&q=80',
    instructor: '송진우',
    category: '기초 교육',
    price: '200,000원',
    lessons: [
      { id: 'l1', title: 'OT: 크립토매거진 아카데미 활용법', duration: '10:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: true },
      { id: 'l2', title: '금리와 자산 가격의 상관관계', duration: '25:30', videoUrl: 'https://www.w3schools.com/html/movie.mp4', isCompleted: false },
    ]
  },
  {
    id: 'c2',
    title: '재테크 중급반 (3개월 과정)',
    description: '저축을 넘어선 실전 자산 배분. 주식, 부동산, 암호화폐를 아우르는 통합 투자 전략으로 건강한 재테크 습관을 완성합니다.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bbbda5366392?auto=format&fit=crop&w=800&q=80',
    instructor: '송진우',
    category: '실전 투자',
    price: '200,000원',
    lessons: [
      { id: 'l3', title: '실전 포트폴리오 구성 원칙', duration: '15:20', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: false },
    ]
  },
  {
    id: 'c3',
    title: '재테크 고급반 (3개월 과정)',
    description: '나만을 위한 최적의 포트폴리오. 회원별 자산 현황을 정밀 검토하고 수익률 극대화를 위한 맞춤형 1:1 심화 교육을 진행합니다.',
    thumbnail: 'https://images.unsplash.com/photo-1642790103517-1810759553a0?auto=format&fit=crop&w=800&q=80',
    instructor: '송진우',
    category: '맞춤형 코칭',
    price: '400,000원',
    lessons: [
      { id: 'l4', title: '자산 가치 극대화 전략', duration: '20:15', videoUrl: 'https://www.w3schools.com/html/movie.mp4', isCompleted: false },
    ]
  }
];

export const PREVIEWS: PreviewVideo[] = [
  {
    id: 'p1',
    title: '2025년 시장 전망 리포트 (송진우 강사)',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p2',
    title: '초보 투자자가 가장 많이 하는 실수 TOP 5',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p3',
    title: '자산 10억을 만드는 매일 아침 습관',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bbbda5366392?auto=format&fit=crop&w=800&q=80'
  }
];
