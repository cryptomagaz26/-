
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  isCompleted: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  category: string;
  price: string;
  lessons: Lesson[];
}

export interface PreviewVideo {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
}
