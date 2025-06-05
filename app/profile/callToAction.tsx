// src/components/profile/CallToAction.tsx
import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl shadow-xl overflow-hidden">
      <div className="px-8 py-12 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Keep Contributing!</h3>
        <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
          Every translation helps preserve cultural heritage and makes knowledge more accessible. 
          Continue your journey as a language champion!
        </p>
        <button 
          className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all transform hover:scale-105"
          onClick={() => window.location.href = '/'}
        >
          Start Translating Now
        </button>
      </div>
    </div>
  );
};

export default CallToAction;