
import React from 'react';
import { RESOURCES_DATA } from '../constants';
import { ExternalLink } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Python Resources
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A curated collection of documentation, tutorials, and community links to help you on your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESOURCES_DATA.map((category, idx) => {
            const Icon = category.icon;
            return (
              <div 
                key={idx} 
                className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-primary-600 dark:text-primary-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.category}
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.links.map((link, linkIdx) => (
                    <a 
                      key={linkIdx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-primary-50 dark:hover:bg-primary-900/30 text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      <span className="font-medium">{link.title}</span>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-500" />
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
