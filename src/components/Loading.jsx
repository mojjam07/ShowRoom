import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white via-gray-100 to-white dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-4">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Please wait...
        </h2>
        <div className="w-64 mx-auto">
          <div className="bg-gray-300 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{ width: '100%', animation: 'progress 2s ease-in-out infinite' }}></div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 50%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Loading;
