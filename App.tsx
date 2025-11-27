
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, CheckCircle2, Moon, Sun } from 'lucide-react';
import Sidebar from './components/Sidebar';
import CodeEditor from './components/CodeEditor';
import LessonCard from './components/LessonCard';
import HomePage from './components/HomePage';
import ResourcesPage from './components/ResourcesPage';
import CertificatePage from './components/CertificatePage';
import { CURRICULUM } from './constants';
import { Module, Lesson, AppView } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('HOME');
  const [activeModuleId, setActiveModuleId] = useState<string>(CURRICULUM[0].id);
  const [activeLessonId, setActiveLessonId] = useState<string>(CURRICULUM[0].lessons[0].id);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Derived state
  const activeModule = CURRICULUM.find(m => m.id === activeModuleId) as Module;
  const activeLesson = activeModule.lessons.find(l => l.id === activeLessonId) as Lesson;

  const handleLessonSelect = (moduleId: string, lessonId: string) => {
    setActiveModuleId(moduleId);
    setActiveLessonId(lessonId);
    setView('LESSON');
    setSidebarOpen(false);
  };

  const handleStartModule = (moduleId: string) => {
    const module = CURRICULUM.find(m => m.id === moduleId);
    if (module) {
      // Find first incomplete lesson, or default to first
      const firstIncomplete = module.lessons.find(l => !completedLessons.has(l.id));
      const targetLesson = firstIncomplete || module.lessons[0];
      
      setActiveModuleId(moduleId);
      setActiveLessonId(targetLesson.id);
      setView('LESSON');
    }
  };

  const markLessonComplete = () => {
    if (!completedLessons.has(activeLessonId)) {
      setCompletedLessons(prev => new Set(prev).add(activeLessonId));
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const handleNextLesson = () => {
    const currentModuleIndex = CURRICULUM.findIndex(m => m.id === activeModuleId);
    const currentLessonIndex = activeModule.lessons.findIndex(l => l.id === activeLessonId);

    if (currentLessonIndex < activeModule.lessons.length - 1) {
      // Next lesson in same module
      setActiveLessonId(activeModule.lessons[currentLessonIndex + 1].id);
    } else if (currentModuleIndex < CURRICULUM.length - 1) {
      // Next module, first lesson
      const nextModule = CURRICULUM[currentModuleIndex + 1];
      setActiveModuleId(nextModule.id);
      setActiveLessonId(nextModule.lessons[0].id);
    } else {
      // Finished all content
      setView('HOME');
    }
  };

  // Find next lesson availability for button state
  const hasNext = (() => {
    const currentModuleIndex = CURRICULUM.findIndex(m => m.id === activeModuleId);
    const currentLessonIndex = activeModule.lessons.findIndex(l => l.id === activeLessonId);
    if (currentLessonIndex < activeModule.lessons.length - 1) return true;
    if (currentModuleIndex < CURRICULUM.length - 1) return true;
    return false;
  })();

  const progressPercentage = Math.round(
    (completedLessons.size / CURRICULUM.reduce((acc, m) => acc + m.lessons.length, 0)) * 100
  );

  const renderContent = () => {
    switch (view) {
      case 'HOME':
        return (
          <HomePage 
            modules={CURRICULUM}
            completedLessons={completedLessons}
            onStartModule={handleStartModule}
            onNavigate={setView}
          />
        );
      case 'RESOURCES':
        return <ResourcesPage />;
      case 'CERTIFICATE':
        const totalLessons = CURRICULUM.reduce((acc, m) => acc + m.lessons.length, 0);
        return <CertificatePage completedCount={completedLessons.size} totalCount={totalLessons} />;
      case 'LESSON':
        return (
          <div className="flex flex-col md:flex-row h-full overflow-hidden">
            {/* Left: Lesson Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden max-w-4xl mx-auto w-full">
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
                <LessonCard lesson={activeLesson} />
                
                 {/* Navigation Footer */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center pb-20 md:pb-0">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Module: <span className="font-medium text-gray-700 dark:text-gray-200">{activeModule.title}</span>
                  </div>
                  
                  {hasNext && completedLessons.has(activeLessonId) && (
                    <button 
                      onClick={handleNextLesson}
                      className="group flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-primary-600 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-primary-500 transition-all font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Next Lesson
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Code Editor */}
            <div className="flex-1 md:w-[45%] lg:w-[40%] bg-gray-100 dark:bg-[#1e293b] p-4 border-l border-gray-200 dark:border-gray-800 flex flex-col md:h-full h-[50vh]">
              <div className="h-full">
                <CodeEditor 
                  initialCode={activeLesson.initialCode} 
                  onRunSuccess={markLessonComplete}
                  lessonId={activeLessonId}
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full h-16 bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 z-20 flex items-center justify-between px-4 print:hidden">
        <div className="font-bold text-gray-800 dark:text-white flex items-center gap-2" onClick={() => setView('HOME')}>
          <span>Python Learner</span>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={() => setDarkMode(!darkMode)} className="text-gray-600 dark:text-gray-400">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-gray-600 dark:text-gray-400">
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div className="print:hidden h-full">
        <Sidebar 
          activeModuleId={activeModuleId}
          activeLessonId={activeLessonId}
          completedLessons={completedLessons}
          onSelectLesson={handleLessonSelect}
          onNavigate={setView}
          isOpen={sidebarOpen}
          onCloseMobile={() => setSidebarOpen(false)}
          currentView={view}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full pt-16 md:pt-0 overflow-hidden relative bg-gray-50 dark:bg-[#0f172a] print:pt-0 print:bg-white">
        
        {/* Top Bar (Desktop) */}
        <div className="hidden md:flex h-16 bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 items-center justify-between px-8 print:hidden">
           <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Progress: {progressPercentage}%
              </span>
              <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent-green transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
           </div>

           <div className="flex items-center gap-4">
             <button 
               onClick={() => setDarkMode(!darkMode)} 
               className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
               title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
             >
               {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>
           </div>
        </div>

        {/* Confetti / Success Indicator */}
        {showConfetti && (
          <div className="absolute top-20 right-8 z-50 bg-accent-green text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-bounce print:hidden">
            <CheckCircle2 className="w-5 h-5" />
            Lesson Completed!
          </div>
        )}

        {/* Dynamic Content */}
        {renderContent()}

      </main>
    </div>
  );
};

export default App;
