// src/components/profile/StatsDashboard.tsx
import React from 'react';
import StatCard from './statcard';
import Card from './card';

interface StatsDashboardProps {
  stats: {
    total?: number;
    by_source?: Record<string, number>;
    by_language?: Record<string, number>;
    last_contribution?: any;
  };
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {/* Total Contributions Card */}
      <StatCard 
        title="Total Contributions" 
        value={stats?.total || 0} 
        gradient="from-blue-500 to-indigo-600"
      >
        <div className="mt-4 pt-4 border-t border-blue-400 border-opacity-50">
          <div className="flex justify-between text-sm">
            <span>Last Contribution:</span>
            <span>
              {stats?.last_contribution?.timestamp 
                ? new Date(stats.last_contribution.timestamp).toLocaleDateString() 
                : 'N/A'}
            </span>
          </div>
        </div>
      </StatCard>

      {/* By Source Card */}
      <Card gradient="from-purple-500 to-fuchsia-600" hoverEffect>
        <div className="text-lg font-medium mb-4">Contributions by Source</div>
        <div className="space-y-3">
          {stats?.by_source && Object.entries(stats.by_source).map(([source, count]) => (
            <div key={source} className="flex justify-between items-center">
              <span className="capitalize">{source}</span>
              <span className="text-xl font-bold">{count}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Languages Card */}
      <Card gradient="from-teal-500 to-emerald-600" hoverEffect>
        <div className="text-lg font-medium mb-4">Top Languages</div>
        <div className="space-y-3">
          {stats?.by_language && Object.entries(stats.by_language)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([language, count]) => (
              <div key={language} className="flex justify-between items-center">
                <span>{language}</span>
                <span className="text-xl font-bold">{count}</span>
              </div>
            ))}
        </div>
      </Card>

      {/* Recent Activity Card */}
      <Card gradient="from-amber-500 to-orange-600" hoverEffect>
        <div className="text-lg font-medium mb-4">Recent Activity</div>
        {stats?.last_contribution ? (
          <div>
            <p className="text-sm mb-2 italic">
              {new Date(stats.last_contribution.timestamp).toLocaleDateString()}
            </p>
            <p className="truncate">"{stats.last_contribution.english_sentence}"</p>
          </div>
        ) : (
          <p>No recent activity</p>
        )}
      </Card>
    </div>
  );
};

export default StatsDashboard;