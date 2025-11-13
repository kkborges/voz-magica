export interface Word {
  id: string;
  text: string;
  syllables: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  imageUrl?: string;
  audioUrl?: string;
}

export interface GameProgress {
  wordsCompleted: number;
  currentLevel: number;
  totalStars: number;
  achievements: string[];
}

export interface FeedbackResult {
  success: boolean;
  accuracy: number;
  message: string;
  stars: number;
}
