
import React, { useState, useRef } from 'react';
import { Award, Printer, Terminal, Lock, CheckCircle2 } from 'lucide-react';

interface CertificatePageProps {
  completedCount: number;
  totalCount: number;
}

const CertificatePage: React.FC<CertificatePageProps> = ({ completedCount, totalCount }) => {
  const [name, setName] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  
  // Calculate completion status
  const isUnlocked = totalCount > 0 && completedCount === totalCount;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setShowCertificate(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Locked State View
  if (!isUnlocked) {
    return (
      <div className="h-full overflow-y-auto custom-scrollbar p-6 md:p-12 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full bg-white dark:bg-[#1e293b] p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 text-center">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-gray-400 dark:text-gray-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Certificate Locked
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            You must complete all exercises to unlock your official certificate of completion. Keep going, you're almost there!
          </p>

          <div className="mb-8">
            <div className="flex justify-between text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>{completedCount} / {totalCount} Exercises</span>
            </div>
            <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-500 transition-all duration-1000 ease-out relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-6 md:p-12 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <div className="mb-10 text-center print:hidden">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Get Certified
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Congratulations on finishing the course! Enter your name below to generate your certificate.
          </p>

          {!showCertificate ? (
            <form onSubmit={handleGenerate} className="max-w-md mx-auto bg-white dark:bg-[#1e293b] p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                  Enter Your Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg shadow-lg shadow-primary-500/30 transition-all transform hover:-translate-y-0.5"
              >
                Generate Certificate
              </button>
            </form>
          ) : (
            <div className="flex gap-4 justify-center mb-8">
              <button
                onClick={() => setShowCertificate(false)}
                className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Edit Name
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-md transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print Certificate
              </button>
            </div>
          )}
        </div>

        {/* Certificate Display Area */}
        {showCertificate && (
          <div className="relative flex justify-center print:block print:w-full print:h-full print:absolute print:top-0 print:left-0 print:m-0 print:bg-white">
            <div 
              id="certificate-print"
              className="relative w-full max-w-[800px] aspect-[1.4/1] bg-white text-gray-900 shadow-2xl overflow-hidden print:shadow-none print:w-full print:h-full print:max-w-none"
            >
              {/* Decorative Background */}
              <div className="absolute inset-0 border-[20px] border-primary-600 print:border-primary-600"></div>
              <div className="absolute inset-4 border-2 border-primary-200"></div>
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-accent-green/20 rounded-br-[100%] print:bg-accent-green/20"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary-500/10 rounded-tl-[100%] print:bg-primary-500/10"></div>

              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
                
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8">
                  <Terminal className="w-10 h-10 text-primary-600" />
                  <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-python-blue to-accent-green print:text-primary-700">
                    Python Learner! &gt;_
                  </span>
                </div>

                <div className="uppercase tracking-[0.2em] text-sm text-primary-600 font-bold mb-4">
                  Certificate of Achievement
                </div>

                <h2 className="text-5xl font-serif font-bold text-gray-900 mb-2">
                  COMPLETION
                </h2>
                <div className="text-xl text-gray-500 tracking-widest mb-12">
                  CERTIFICATE
                </div>

                <p className="text-gray-600 italic mb-6">
                  This certificate is proudly presented to
                </p>

                <div className="text-4xl font-bold text-primary-700 border-b-2 border-gray-300 pb-2 mb-8 px-12 min-w-[300px]">
                  {name}
                </div>

                <p className="text-gray-600 max-w-lg leading-relaxed mb-12">
                  For successfully completing the comprehensive <br/>
                  <span className="font-bold text-gray-800">Python for Beginners Course</span> <br/>
                  demonstrating proficiency in core programming concepts.
                </p>

                <div className="w-full flex justify-between items-end px-12 mt-auto">
                   <div className="text-center">
                     <div className="text-sm font-bold text-gray-400 mb-2">{new Date().toLocaleDateString()}</div>
                     <div className="h-px w-32 bg-gray-300 mx-auto"></div>
                     <div className="text-xs text-gray-500 mt-2 uppercase tracking-wider">Date</div>
                   </div>

                   <Award className="w-20 h-20 text-accent-yellow/80 absolute left-1/2 bottom-16 -translate-x-1/2 opacity-80" />

                   <div className="text-center">
                     <div className="font-script text-2xl text-primary-700 mb-1" style={{fontFamily: 'cursive'}}>Python Learner Team</div>
                     <div className="h-px w-32 bg-gray-300 mx-auto"></div>
                     <div className="text-xs text-gray-500 mt-2 uppercase tracking-wider">Signature</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatePage;
