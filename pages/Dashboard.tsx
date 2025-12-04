import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, BookCheck, Flame, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { Recharts } from '../constants'; // Assumed mocked or not used heavily, using simple layout instead for speed/aesthetics

export const Dashboard = () => {
  const { user } = useAuth();
  const { progress } = useProgress();

  const stats = [
    { 
      label: 'Total XP', 
      value: user?.xp || 0, 
      icon: <Flame className="text-orange-500" size={24} />,
      bg: 'bg-orange-50'
    },
    { 
      label: 'Topics Read', 
      value: progress.completedTopics.length, 
      icon: <BookCheck className="text-blue-500" size={24} />,
      bg: 'bg-blue-50'
    },
    { 
      label: 'Quizzes Aced', 
      value: Object.keys(progress.quizScores).length, 
      icon: <Trophy className="text-yellow-500" size={24} />,
      bg: 'bg-yellow-50'
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">Track your scientific journey and achievements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity / Next Steps */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Continue Learning</h2>
          {progress.completedTopics.length > 0 ? (
             <div className="space-y-4">
               <p className="text-gray-600">You're doing great! Why not explore a new category today?</p>
               <Link 
                to="/topics"
                className="inline-flex items-center space-x-2 text-indigo-600 font-medium hover:underline"
              >
                <span>Browse All Topics</span>
                <ArrowRight size={16} />
              </Link>
             </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-block p-4 rounded-full bg-indigo-50 mb-4">
                <BookCheck className="text-indigo-500" size={32} />
              </div>
              <h3 className="text-gray-900 font-medium">Start your first lesson</h3>
              <p className="text-gray-500 text-sm mb-6">Pick a topic to begin earning XP.</p>
              <Link 
                to="/topics" 
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Go to Topics
              </Link>
            </div>
          )}
        </div>

        {/* Motivation Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl shadow-lg text-white">
          <h2 className="text-xl font-bold mb-2">Did You Know?</h2>
          <p className="text-indigo-100 mb-6">
            Scientific literacy isn't just about memorizing facts. It's about understanding how the world works and making informed decisions.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
              Keep going!
            </span>
            <Trophy className="text-yellow-300 opacity-80" size={48} />
          </div>
        </div>
      </div>
    </div>
  );
};
