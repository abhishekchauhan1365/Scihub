import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { generateQuiz } from '../services/gemini';
import { QuizQuestion } from '../types';
import { useProgress } from '../contexts/ProgressContext';
import { Loader2, CheckCircle, XCircle, Trophy, ArrowRight, AlertTriangle } from 'lucide-react';

// Reusing lookup for title
const TOPICS_LOOKUP: Record<string, string> = {
  'physics-motion': 'Laws of Motion',
  'bio-cell': 'Cell Structure',
  'chem-reactions': 'Chemical Reactions',
  'astro-solar': 'The Solar System',
  'physics-energy': 'Energy & Work',
  'bio-genetics': 'Basics of Genetics',
  'env-climate': 'Climate Change',
};

export const Quiz = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { saveQuizScore } = useProgress();
  const topicTitle = id ? TOPICS_LOOKUP[id] : 'Science';

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await generateQuiz(topicTitle);
        if (data && data.length > 0) {
          setQuestions(data);
        } else {
          setError('Failed to generate quiz questions. Please try again.');
        }
      } catch (err) {
        setError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [topicTitle]);

  const handleAnswer = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
    setShowExplanation(true);
    
    if (index === questions[currentQIndex].correctAnswerIndex) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      if (id) saveQuizScore(id, score + (selectedOption === questions[currentQIndex].correctAnswerIndex ? 0 : 0)); // Logic handled in handleAnswer mostly, score is effectively final here
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
        <h2 className="text-xl font-semibold text-gray-700">Generating Quiz...</h2>
        <p className="text-gray-500">The AI is crafting challenging questions for you.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
         <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
         <p className="text-lg text-gray-800">{error}</p>
         <button onClick={() => window.location.reload()} className="mt-4 text-indigo-600 font-medium">Try Again</button>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg text-center animate-scale-in">
        <div className="inline-block p-4 rounded-full bg-yellow-100 mb-6">
          <Trophy className="text-yellow-600" size={48} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
        <p className="text-gray-500 mb-6">You scored</p>
        <div className="text-5xl font-black text-indigo-600 mb-8">
          {score} / {questions.length}
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Go to Dashboard
          </button>
          <button 
            onClick={() => navigate('/topics')}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Explore More Topics
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQIndex];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex justify-between items-center text-sm font-medium text-gray-500">
        <span>Topic: {topicTitle}</span>
        <span>Question {currentQIndex + 1} of {questions.length}</span>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{currentQ.question}</h2>

        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all ";
            
            if (showExplanation) {
              if (idx === currentQ.correctAnswerIndex) {
                btnClass += "border-green-500 bg-green-50 text-green-800";
              } else if (idx === selectedOption) {
                btnClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                btnClass += "border-gray-100 text-gray-400 opacity-50";
              }
            } else {
              btnClass += "border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 text-gray-700";
            }

            return (
              <button
                key={idx}
                disabled={showExplanation}
                onClick={() => handleAnswer(idx)}
                className={btnClass}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showExplanation && idx === currentQ.correctAnswerIndex && <CheckCircle className="text-green-600" size={20} />}
                  {showExplanation && idx === selectedOption && idx !== currentQ.correctAnswerIndex && <XCircle className="text-red-500" size={20} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {showExplanation && (
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-6 animate-fade-in">
          <p className="font-bold text-blue-900 mb-1">Explanation:</p>
          <p className="text-blue-800">{currentQ.explanation}</p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={nextQuestion}
          disabled={!showExplanation}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-bold transition-all ${
            showExplanation 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>{currentQIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
