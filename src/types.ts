export interface CarouselSlide {
  slideNumber: number;
  title: string;
  description: string;
}

export interface GeneratedPost {
  hook: string;
  caption: string;
  carousel: CarouselSlide[];
  hashtags: string[];
  promptUsed: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  niche: string;
  metric: string;
  before?: string;
  after?: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface GeneratedAdCreative {
  title: string;
  format: string;
  angle: string;
  hook: string;
  videoScript?: {
    scene: string;
    action: string;
    audio: string;
  }[];
  carouselSlides?: {
    slide: number;
    title: string;
    text: string;
  }[];
  caption: string;
  productionTips: string;
}

