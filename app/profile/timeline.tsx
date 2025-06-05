// src/components/profile/TimelineSection.tsx
import React from 'react';
import Card from './card';

interface TimelineSectionProps {
  stats: {
    total?: number;
    last_contribution?: any;
  };
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ stats }) => {
  return (
    <Card>
      <h3 className="text-xl font-bold text-gray-800 mb-6">Contribution Timeline</h3>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-200"></div>
        <div className="space-y-6 pl-10">
          {stats?.last_contribution && (
            <div className="relative">
              <div className="absolute -left-4 top-4 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="bg-indigo-50 rounded-2xl p-5">
                <p className="text-indigo-700 font-medium">Most Recent Contribution</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(stats.last_contribution.timestamp).toLocaleDateString()}
                </p>
                <p className="mt-2">{stats.last_contribution.english_sentence}</p>
                <p className="font-semibold text-indigo-600 mt-1">{stats.last_contribution.translated_sentence}</p>
              </div>
            </div>
          )}

          {stats?.total && stats.total > 0 && (
            <div className="relative">
              <div className="absolute -left-4 top-4 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="bg-purple-50 rounded-2xl p-5">
                <p className="text-purple-700 font-medium">Milestone Achieved</p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.total >= 100 ? '100+ Contributions!' : 
                  stats.total >= 50 ? '50 Contributions!' : 
                  stats.total >= 25 ? '25 Contributions!' : 
                  stats.total >= 10 ? '10 Contributions!' : 
                  'First Contribution!'}
                </p>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      stats.total >= 100 ? 'bg-purple-600' : 
                      stats.total >= 50 ? 'bg-purple-500' : 
                      stats.total >= 25 ? 'bg-purple-400' : 
                      'bg-purple-300'
                    }`} 
                    style={{width: `${Math.min(100, stats.total)}%`}}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {stats.total} of 100 contributions
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TimelineSection;