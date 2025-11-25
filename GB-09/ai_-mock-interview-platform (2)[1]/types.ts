
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface JobRole {
  id: string;

  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface InterviewSession {
  id: string;
  role: string;
  date: string;
  score: number;
  transcript: { speaker: 'user' | 'ai'; text: string }[];
}

export interface Feedback {
  overallScore: number;
  strengths: string[];
  areasForImprovement: string[];
  suggestedTopics: string[];
  questionBreakdown: {
    question: string;
    answer: string;
    feedback: string;
    score: number;
  }[];
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}
