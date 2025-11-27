
import React from 'react';
import { Module } from '../types';
import { Database, Code, Cpu, Terminal, Sparkles, BookOpen, Link as LinkIcon, Award, ArrowRight, Play } from 'lucide-react';
import { AppView } from '../types';

interface HomePageProps {
  modules: Module[];
  completedLessons: Set<string>;
  onStartModule: (moduleId: string) => void;
  onNavigate: (view: AppView) => void;
}

const IconMap: Record<string, React.ElementType> = {
  'Layout': Terminal,
  'Database': Database,
  'Code': BookOpen,
  'Cpu': Cpu
};

const HomePage: React.FC<HomePageProps> = ({ modules, completedLessons, onStartModule, onNavigate }) => {
  // Calculate total progress
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = completedLessons.size;
  const progressPercentage = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="min-h-full bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-white pb-20 overflow-y-auto custom-scrollbar">
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-6 text-center">
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-primary-100/50 to-transparent dark:from-primary-900/10 pointer-events-none"></div>
        
        <h1 className="relative text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          <span className="block text-gray-900 dark:text-white">Welcome to</span>
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-python-blue to-accent-green dark:from-[#306998] dark:to-accent-green">
              Python Learning!
            </span>
            <Terminal className="w-12 h-12 text-accent-purple animate-bounce" />
          </div>
        </h1>
        
        <p className="relative text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          Master Python programming from the ground up with interactive lessons and hands-on exercises.
        </p>
      
        {/* Stats Cards */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 transform hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center">
              <BookOpen className="w-8 h-8 text-primary-500 mb-3" />
              <div className="text-3xl font-bold mb-1">{modules.length} Modules</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Comprehensive lessons</div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 transform hover:scale-105 transition-transform duration-300">
             <div className="flex flex-col items-center">
              <Code className="w-8 h-8 text-accent-green mb-3" />
              <div className="text-3xl font-bold mb-1">{totalLessons} Exercises</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Hands-on practice</div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 transform hover:scale-105 transition-transform duration-300">
             <div className="flex flex-col items-center">
              <Sparkles className="w-8 h-8 text-accent-purple mb-3" />
              <div className="text-3xl font-bold mb-1">{progressPercentage}%</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Completion rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Grid */}
      <div className="max-w-6xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">What You'll Learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => {
            const Icon = IconMap[module.icon] || BookOpen;
            const moduleCompleted = module.lessons.filter(l => completedLessons.has(l.id)).length;
            const moduleTotal = module.lessons.length;
            const percent = Math.round((moduleCompleted / moduleTotal) * 100);

            return (
              <div 
                key={module.id}
                onClick={() => onStartModule(module.id)}
                className="group bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-800 cursor-pointer hover:shadow-xl hover:border-primary-500/30 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300
                  ${module.id === 'fundamentals' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                    module.id === 'datatypes' ? 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' :
                    module.id === 'functions' ? 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400' :
                    'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'}
                `}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors">{module.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2 h-10">
                  {module.description}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    <span>Progress</span>
                    <span>{moduleCompleted} of {moduleTotal} completed</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500
                         ${module.id === 'fundamentals' ? 'bg-blue-500' :
                           module.id === 'datatypes' ? 'bg-pink-500' :
                           module.id === 'functions' ? 'bg-cyan-500' :
                           'bg-purple-500'}
                      `}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Resources Card */}
          <div 
            onClick={() => onNavigate('RESOURCES')}
            className="group bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-800 cursor-pointer hover:shadow-xl hover:border-primary-500/30 transition-all duration-300 flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
               <LinkIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors">Resources</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-1">
              Curated links to official documentation, communities, and extra practice problems.
            </p>
            <div className="mt-auto flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400">
              Explore Resources <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Certificate Card */}
           <div 
            onClick={() => onNavigate('CERTIFICATE')}
            className="group bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-800 cursor-pointer hover:shadow-xl hover:border-primary-500/30 transition-all duration-300 flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
               <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors">Certification</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-1">
              Generate your official certificate of completion after finishing the course modules.
            </p>
             <div className="mt-auto flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400">
              Get Certified <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* Start Learning CTA */}
      <div className="max-w-4xl mx-auto px-6 text-center pb-12">
        <div className="bg-gradient-to-r from-primary-600 to-python-blue rounded-3xl p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <h2 className="relative text-3xl md:text-4xl font-extrabold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="relative text-lg text-blue-50 mb-8 max-w-2xl mx-auto">
            Click on any module above or use the sidebar navigation to begin your Python journey!
          </p>
          
          <button 
            onClick={() => onStartModule('fundamentals')}
            className="relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-primary-700 bg-white rounded-xl hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Play className="w-5 h-5 mr-2 fill-current" />
            Start Learning
          </button>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
