import React from 'react';
import { Link } from 'react-router-dom';
import { Atom, Globe, Brain, ArrowRight } from 'lucide-react';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-indigo-600 font-bold text-2xl">
          <Atom size={32} />
          <span>SciHub</span>
        </div>
        <Link to="/login" className="text-gray-600 font-medium hover:text-indigo-600">
          Sign In
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Master Science <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              One Concept at a Time
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-lg">
            An interactive learning platform that uses AI to create personalized lessons, quizzes, and instant doubt resolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/signup" 
              className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition-transform hover:-translate-y-1 shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight size={20} />
            </Link>
            <Link 
              to="/login" 
              className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              Log In
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
          
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform translate-y-8">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <Globe size={24} />
              </div>
              <h3 className="font-bold text-lg mb-1">Real-world Examples</h3>
              <p className="text-sm text-gray-500">Learn how science applies to daily life.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                <Brain size={24} />
              </div>
              <h3 className="font-bold text-lg mb-1">AI Powered</h3>
              <p className="text-sm text-gray-500">Unlimited quizzes and instant answers.</p>
            </div>

             <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform translate-y-8">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center text-green-600 mb-4">
                <Atom size={24} />
              </div>
              <h3 className="font-bold text-lg mb-1">Interactive Topics</h3>
              <p className="text-sm text-gray-500">Physics, Chem, Bio, and more.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
