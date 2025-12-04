export interface User {
  id: string;
  name: string;
  email: string;
  xp: number;
}

export interface Topic {
  id: string;
  title: string;
  category: 'Physics' | 'Chemistry' | 'Biology' | 'Astronomy' | 'General Science';
  description: string;
  icon: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number; // 0-3
  explanation: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Progress {
  completedTopics: string[]; // Topic IDs
  quizScores: Record<string, number>; // Topic ID -> High Score
}
