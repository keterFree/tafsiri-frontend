// src/components/profile/ChartsSection.tsx
import React from 'react';
import Card from './card';
import { Chart } from 'react-google-charts';

interface ChartsSectionProps {
  stats: {
    by_source?: Record<string, number>;
    by_language?: Record<string, number>;
  };
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ stats }) => {
  const sourceChartData = stats?.by_source 
    ? [['Source', 'Contributions'], ...Object.entries(stats.by_source)]
    : null;

  const languageChartData = stats?.by_language 
    ? [['Language', 'Contributions'], ...Object.entries(stats.by_language)]
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {/* Source Distribution Pie Chart */}
      <Card>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Source Distribution</h3>
        {sourceChartData ? (
          <Chart
            width={'100%'}
            height={'300px'}
            chartType="PieChart"
            loader={<div className="flex justify-center items-center h-64">Loading Chart...</div>}
            data={sourceChartData}
            options={{
              colors: ['#10B981', '#3B82F6', '#F59E0B'],
              pieHole: 0.4,
              legend: { position: 'labeled' },
              pieSliceText: 'value',
              chartArea: { width: '90%', height: '80%' },
            }}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">No data available</div>
        )}
      </Card>

      {/* Language Distribution Pie Chart */}
      <Card>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Language Distribution</h3>
        {languageChartData ? (
          <Chart
            width={'100%'}
            height={'300px'}
            chartType="PieChart"
            loader={<div className="flex justify-center items-center h-64">Loading Chart...</div>}
            data={languageChartData}
            options={{
              colors: ['#8B5CF6', '#EC4899', '#14B8A6', '#0EA5E9', '#F97316'],
              pieHole: 0.4,
              legend: { position: 'labeled' },
              pieSliceText: 'value',
              chartArea: { width: '90%', height: '80%' },
            }}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">No data available</div>
        )}
      </Card>
    </div>
  );
};

export default ChartsSection;