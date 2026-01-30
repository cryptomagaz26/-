
import { Course, PreviewVideo } from '../types';

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: '2025 매크로 경제 흐름과 자산 배분 전략',
    description: '송진우 대표가 직접 전하는 시장의 흐름 분석. 기초적인 경제 지표 읽기부터 실전 포트폴리오 구성까지 한 번에 끝냅니다.',
    thumbnail: 'https://images.unsplash.com/photo-1611974714024-4607a50d40f1?auto=format&fit=crop&w=800&q=80',
    instructor: '송진우',
    category: '기초',
    price: '₩490,000',
    lessons: [
      { id: 'l1', title: 'OT: 크립토매거진 아카데미 활용법', duration: '10:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: true },
      { id: 'l2', title: '금리와 자산 가격의 상관관계', duration: '25:30', videoUrl: 'https://www.w3schools.com/html/movie.mp4', isCompleted: false },
    ]
  },
  {
    id: 'c2',
    title: '실전 차트 분석 및 온체인 데이터 읽기',
    description: '보조지표의 함정에서 벗어나 가격의 본질을 봅니다. 온체인 데이터를 통한 고래들의 움직임을 포착하는 법을 공개합니다.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bbbda5366392?auto=format&fit=crop&w=800&q=80',
    instructor: '송진우',
    category: '실전',
    price: '₩880,000',
    lessons: [
      { id: 'l3', title: '캔들 패턴의 심리학', duration: '15:20', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: false },
    ]
  }
];

export const PREVIEWS: PreviewVideo[] = [
  {
    id: 'p1',
    title: '비트코인 ETF 승인 이후의 시장 전망',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p2',
    title: 'AI 테마 코인, 거품인가 기회인가?',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80'
  }
];
