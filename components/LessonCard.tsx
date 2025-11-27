import React from 'react';
import { Lesson } from '../types';
import { BookOpen } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  const renderContent = (text: string) => {
    const parts = text.split(/(```python[\s\S]*?```|`[^`]+`)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```python')) {
        const code = part.replace(/```python\n?|```/g, '');
        return (
          <div key={index} className="my-6 rounded-xl bg-[#1e1e1e] border border-gray-800 shadow-xl overflow-hidden">
            <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-gray-800">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
              </div>
              <span className="ml-3 text-xs text-gray-500 font-mono">example.py</span>
            </div>
            <div className="p-4 overflow-x-auto custom-scrollbar">
              <pre className="text-sm font-mono text-gray-300 leading-relaxed">{code}</pre>
            </div>
          </div>
        );
      } else if (part.startsWith('`') && part.endsWith('`')) {
         return (
           <code key={index} className="px-1.5 py-0.5 mx-0.5 bg-gray-100 dark:bg-gray-800 text-primary-700 dark:text-primary-400 rounded font-mono text-sm border border-gray-200 dark:border-gray-700">
             {part.slice(1, -1)}
           </code>
         );
      } else if (part.trim().startsWith('* ')) {
        // Simple list handling
        const items = part.split('\n').filter(line => line.trim().startsWith('*'));
        return (
           <ul key={index} className="list-disc pl-5 space-y-2 mb-4 text-gray-600 dark:text-gray-300">
             {items.map((item, i) => (
               <li key={i}>{item.replace('* ', '')}</li>
             ))}
           </ul>
        );
      }
      // Handle paragraphs naturally, avoiding empty ones
      if (!part.trim()) return null;
      return <p key={index} className="mb-4 leading-7 text-gray-600 dark:text-gray-300">{part}</p>;
    });
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar pr-2">
      <div className="max-w-3xl mx-auto py-4">
        <div className="flex items-center gap-3 mb-6">
          <span className={`
            px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border
            ${lesson.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' : 
              lesson.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800' :
              'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'}
          `}>
            {lesson.difficulty}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">
          {lesson.title}
        </h2>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          {renderContent(lesson.content)}
        </div>
      
        <div className="mt-8 bg-gradient-to-br from-primary-50 to-white dark:from-[#1e293b] dark:to-[#0f172a] border border-primary-100 dark:border-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-primary-100 dark:bg-primary-900/50 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-2">
                Your Task
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Use the code editor to practice what you've just learned. 
                Modify the code, try your own variations, and click <strong className="text-primary-600 dark:text-primary-400">Run Code</strong> to see the results instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;