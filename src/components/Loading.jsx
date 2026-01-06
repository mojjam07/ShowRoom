import React from 'react';
import { Code, Sparkles } from 'lucide-react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 flex items-center justify-center z-50">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Loading Content */}
      <div className="text-center relative z-10">
        {/* Logo/Icon Animation */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto relative">
            {/* Rotating Ring */}
            <div className="absolute inset-0 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
            
            {/* Middle Ring */}
            <div className="absolute inset-2 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            
            {/* Inner Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
                <Code className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent animate-pulse">
          Loading
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm sm:text-base">
          Preparing something amazing for you...
        </p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full animate-progress" />
          </div>
        </div>

        {/* Floating Sparkles */}
        <div className="mt-8 flex items-center justify-center gap-4 text-purple-500/50">
          <Sparkles className="w-5 h-5 animate-bounce" style={{ animationDelay: '0s' }} />
          <Sparkles className="w-4 h-4 animate-bounce" style={{ animationDelay: '0.2s' }} />
          <Sparkles className="w-5 h-5 animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>

      {/* Inline Styles for Custom Animation */}
      <style>{`
        @keyframes progress {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 50%;
            margin-left: 25%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
        
        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;

