import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Atom, Dna, FlaskConical, Globe, Microscope } from 'lucide-react';
import { Topic } from '../types';

const TOPICS: Topic[] = [
  { id: 'physics-motion', title: 'Laws of Motion', category: 'Physics', description: 'Understand how things move and why.', icon: 'Atom' },
  { id: 'bio-cell', title: 'Cell Structure', category: 'Biology', description: 'The building blocks of life explained.', icon: 'Dna' },
  { id: 'chem-reactions', title: 'Chemical Reactions', category: 'Chemistry', description: 'How substances interact and change.', icon: 'FlaskConical' },
  { id: 'astro-solar', title: 'The Solar System', category: 'Astronomy', description: 'Explore our cosmic neighborhood.', icon: 'Globe' },
  { id: 'physics-energy', title: 'Energy & Work', category: 'Physics', description: 'The capacity to do work and its forms.', icon: 'Atom' },
  { id: 'bio-genetics', title: 'Basics of Genetics', category: 'Biology', description: 'Inheritance, DNA, and traits.', icon: 'Dna' },
  { id: 'env-climate', title: 'Climate Change', category: 'General Science', description: 'Understanding global warming trends.', icon: 'Globe' },
];

const IconMap: Record<string, React.ReactNode> = {
  'Atom': <Atom size={24} />,
  'Dna': <Dna size={24} />,
  'FlaskConical': <FlaskConical size={24} />,
  'Globe': <Globe size={24} />,
  'Microscope': <Microscope size={24} />,
};

export const TopicList = () => {
  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>('All');

  const categories = ['All', ...Array.from(new Set(TOPICS.map(t => t.category)))];

  const filteredTopics = TOPICS.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Explore Topics</h1>
          <p className="text-gray-500 mt-1">Select a topic to start learning.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search topics..." 
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => (
          <Link 
            key={topic.id} 
            to={`/topics/${topic.id}`}
            className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all flex flex-col h-full"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {IconMap[topic.icon] || <Atom />}
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 text-gray-500">
                {topic.category}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
              {topic.title}
            </h3>
            <p className="text-gray-500 text-sm mb-4 flex-grow">
              {topic.description}
            </p>
            
            <div className="pt-4 border-t border-gray-50 flex items-center text-sm font-medium text-indigo-600">
              Start Learning <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No topics found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
