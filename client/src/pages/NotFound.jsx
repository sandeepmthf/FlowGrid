import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-6 bg-white border border-slate-100 p-10 rounded-3xl shadow-xl animate-scale-in">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
          <HelpCircle className="w-8 h-8" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-5xl font-black font-display text-slate-800">404</h1>
          <h3 className="text-lg font-bold font-display text-slate-700">Page Not Found</h3>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
            The page you are looking for does not exist or has been moved to another section.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-md shadow-indigo-100 rounded-2xl transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
