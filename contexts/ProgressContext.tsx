import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Progress } from '../types';
import { useAuth } from './AuthContext';

interface ProgressContextType {
  progress: Progress;
  markTopicComplete: (topicId: string) => void;
  saveQuizScore: (topicId: string, score: number) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const initialProgress: Progress = {
  completedTopics: [],
  quizScores: {}
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const { user, updateXP } = useAuth();
  const [progress, setProgress] = useState<Progress>(initialProgress);

  useEffect(() => {
    if (user) {
      const storedProgress = localStorage.getItem(`slh_progress_${user.id}`);
      if (storedProgress) {
        setProgress(JSON.parse(storedProgress));
      } else {
        setProgress(initialProgress);
      }
    } else {
      setProgress(initialProgress);
    }
  }, [user]);

  const saveToStorage = (newProgress: Progress) => {
    if (user) {
      localStorage.setItem(`slh_progress_${user.id}`, JSON.stringify(newProgress));
    }
  };

  const markTopicComplete = (topicId: string) => {
    if (!progress.completedTopics.includes(topicId)) {
      const newProgress = {
        ...progress,
        completedTopics: [...progress.completedTopics, topicId]
      };
      setProgress(newProgress);
      saveToStorage(newProgress);
      updateXP(50); // 50 XP for reading a topic
    }
  };

  const saveQuizScore = (topicId: string, score: number) => {
    const currentHigh = progress.quizScores[topicId] || 0;
    if (score > currentHigh) {
      const newProgress = {
        ...progress,
        quizScores: { ...progress.quizScores, [topicId]: score }
      };
      setProgress(newProgress);
      saveToStorage(newProgress);
      updateXP(score * 10); // 10 XP per correct answer roughly
    }
  };

  return (
    <ProgressContext.Provider value={{ progress, markTopicComplete, saveQuizScore }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within a ProgressProvider');
  return context;
};
