import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { generateTopicContent } from '../services/gemini';
import ReactMarkdown from 'react-markdown';
import { Topic } from '../types';
import { ArrowLeft, PlayCircle, BookOpen, Loader2 } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

// Mock list again just for lookup title
const TOPICS_LOOKUP: Record<string, Partial<Topic>> = {
  'physics-motion': { title: 'Laws of Motion', category: 'Physics' },
  'bio-cell': { title: 'Cell Structure', category: 'Biology' },
  'chem-reactions': { title: 'Chemical Reactions', category: 'Chemistry' },
  'astro-solar': { title: 'The Solar System', category: 'Astronomy' },
  'physics-energy': { title: 'Energy & Work', category: 'Physics' },
  'bio-genetics': { title: 'Basics of Genetics', category: 'Biology' },
  'env-climate': { title: 'Climate Change', category: 'General Science' },
};

export const TopicDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { markTopicComplete } = useProgress();

  const topicInfo = id ? TOPICS_LOOKUP[id] : null;

  useEffect(() => {
    const fetchContent = async () => {
      if (!topicInfo) return;
      setLoading(true);
      const text = await generateTopicContent(topicInfo.title!, topicInfo.category!);
      setContent(text);
      setLoading(false);
      if (id) markTopicComplete(id);
    };

    fetchContent();
  }, [id, topicInfo]);

  if (!topicInfo) return <div className="p-8">Topic not found</div>;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Link to="/topics" className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-6 transition-colors">
        <ArrowLeft size={18} className="mr-1" /> Back to Topics
      </Link>

      <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-8 shadow-sm">
        <img 
          src={`https://picsum.photos/seed/${id}/800/400`} 
          alt="Topic Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
          <div>
            <span className="text-white/80 font-medium text-sm tracking-wider uppercase mb-2 block">
              {topicInfo.category}
            </span>
            <h1 className="text-4xl font-bold text-white">{topicInfo.title}</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p>Consulting the AI knowledge base...</p>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 prose prose-indigo max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-2">Ready to test yourself?</h3>
            <p className="text-indigo-700 text-sm mb-4">Take a quiz to earn XP and solidify your understanding.</p>
            <Link 
              to={`/quiz/${id}`}
              className="w-full bg-indigo-600 text-white flex items-center justify-center space-x-2 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              <BookOpen size={18} />
              <span>Take Quiz</span>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <PlayCircle className="mr-2 text-red-500" size={20} />
              Related Videos
            </h3>
            <div className="space-y-4">
               {/* Mock Video Items */}
               <div className="group cursor-pointer">
                 <div className="aspect-video bg-gray-200 rounded-lg mb-2 relative overflow-hidden">
                   <img src={`https://picsum.photos/seed/${id}vid/300/160`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="bg-black/30 p-2 rounded-full">
                       <PlayCircle className="text-white" size={24} />
                     </div>
                   </div>
                 </div>
                 <p className="text-sm font-medium text-gray-800 line-clamp-2">Introduction to {topicInfo.title}</p>
                 <p className="text-xs text-gray-500">Science Daily • 10:45</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
