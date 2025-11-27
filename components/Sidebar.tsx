
import React, { useState, useEffect } from 'react';
import { CURRICULUM } from '../constants';
import { CheckCircle, Circle, BookOpen, ChevronRight, ChevronDown, Play, Terminal, Database, Cpu, Home, Link as LinkIcon, Award } from 'lucide-react';
import { AppView } from '../types';

interface SidebarProps {
  activeModuleId: string;
  activeLessonId: string;
  completedLessons: Set<string>;
  onSelectLesson: (moduleId: string, lessonId: string) => void;
  onNavigate: (view: AppView) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  currentView: AppView;
}

const IconMap: Record<string, React.ElementType> = {
  'Layout': Terminal,
  'Database': Database,
  'Code': BookOpen,
  'Cpu': Cpu
};

const Sidebar: React.FC<SidebarProps> = ({ 
  activeModuleId, 
  activeLessonId, 
  completedLessons, 
  onSelectLesson,
  onNavigate,
  isOpen,
  onCloseMobile,
  currentView
}) => {
  // State to track which module is currently expanded
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(activeModuleId);

  // Automatically expand the module when the active module changes (e.g. via Next Lesson button)
  useEffect(() => {
    if (activeModuleId && currentView === 'LESSON') {
      setExpandedModuleId(activeModuleId);
    }
  }, [activeModuleId, currentView]);

  const toggleModule = (moduleId: string) => {
    setExpandedModuleId(prev => prev === moduleId ? null : moduleId);
  };

  return (
    <div className={`
      fixed inset-y-0 left-0 z-30 w-72 bg-white dark:bg-[#1e293b] border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out flex flex-col
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:translate-x-0 md:static md:h-screen
    `}>
      {/* Sidebar Header */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0f172a] shrink-0">
        <div 
          className="flex items-center gap-2 font-bold text-xl text-gray-800 dark:text-white cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={() => onNavigate('HOME')}
        >
          <Terminal className="w-6 h-6 text-primary-500" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-python-blue to-accent-green">
            Python Learner
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        
        {/* Home Button */}
        <button 
          onClick={() => {
            onNavigate('HOME');
            onCloseMobile();
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 mb-6 text-sm font-semibold rounded-xl transition-all shadow-sm
            ${currentView === 'HOME' 
              ? 'bg-primary-600 text-white shadow-primary-500/20' 
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}
          `}
        >
          <Home className="w-4 h-4" />
          Home
        </button>

        <div className="space-y-2">
          <div className="px-2 mb-3 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            LESSONS
          </div>

          {CURRICULUM.map((module) => {
            const Icon = IconMap[module.icon] || BookOpen;
            const isExpanded = expandedModuleId === module.id;
            const completedCount = module.lessons.filter(l => completedLessons.has(l.id)).length;
            const totalCount = module.lessons.length;
            const isActiveModule = currentView === 'LESSON' && module.id === activeModuleId;

            return (
              <div key={module.id} className="rounded-xl overflow-hidden transition-all duration-300">
                {/* Module Header - Clickable Accordion Trigger */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-3 text-sm font-semibold transition-colors
                    ${isActiveModule && !isExpanded
                      ? 'bg-primary-50 dark:bg-primary-900/10 text-primary-700 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActiveModule ? 'text-primary-500' : 'text-gray-400'}`} />
                  <span className="flex-1 text-left">{module.title}</span>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                      {completedCount}/{totalCount}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {/* Expandable Lesson List */}
                {isExpanded && (
                  <div className="bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 animate-fadeIn">
                    <div className="space-y-1 p-2">
                      {module.lessons.map((lesson) => {
                        const isActive = currentView === 'LESSON' && lesson.id === activeLessonId;
                        const isCompleted = completedLessons.has(lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => {
                              onSelectLesson(module.id, lesson.id);
                              onCloseMobile();
                            }}
                            className={`
                              w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all text-left relative overflow-hidden group ml-1
                              ${isActive 
                                ? 'bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 font-medium shadow-sm ring-1 ring-gray-200 dark:ring-gray-700' 
                                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'}
                            `}
                          >
                            {/* Active Indicator Bar */}
                            {isActive && <div className="absolute left-0 top-1 bottom-1 w-1 bg-primary-500 rounded-full"></div>}

                            <div className="shrink-0">
                              {isCompleted ? (
                                <CheckCircle className="w-4 h-4 text-accent-green" />
                              ) : isActive ? (
                                <Play className="w-4 h-4 text-primary-500 fill-current" />
                              ) : (
                                <Circle className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-400" />
                              )}
                            </div>
                            <span className="truncate flex-1">{lesson.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 space-y-2">
           <div className="px-2 mb-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            EXTRAS
          </div>
          
          <button 
             onClick={() => {
               onNavigate('RESOURCES');
               onCloseMobile();
             }}
             className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all text-left 
               ${currentView === 'RESOURCES' 
                 ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-medium' 
                 : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          >
            <LinkIcon className="w-4 h-4" />
            Resources
          </button>

           <button 
             onClick={() => {
               onNavigate('CERTIFICATE');
               onCloseMobile();
             }}
             className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all text-left 
               ${currentView === 'CERTIFICATE' 
                 ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-medium' 
                 : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          >
            <Award className="w-4 h-4" />
            Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
