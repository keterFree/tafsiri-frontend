// src/components/profile/TimelineSection.tsx
import React from 'react';
import Card from './card';

interface Contribution {
  timestamp: string;
  english_sentence: string;
  translated_sentence: string;
}

interface Stats {
  total?: number;
  last_contribution?: Contribution;
  daily_contributions?: { date: string; count: number }[];
}

interface TimelineSectionProps {
  stats?: Stats;
}

// Milestone levels
const MILESTONES = [
  { threshold: 100, text: '100+ Contributions!', color: 'bg-emerald-600' },
  { threshold: 50, text: '50 Contributions!', color: 'bg-emerald-500' },
  { threshold: 25, text: '25 Contributions!', color: 'bg-emerald-400' },
  { threshold: 10, text: '10 Contributions!', color: 'bg-emerald-300' },
];

// Progress bar
const ProgressBar: React.FC<{ value: number; max: number; color: string }> = ({ value, max, color }) => {
  const percentage = Math.min(100, (value / max) * 100);
  return (
    <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
      <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${percentage}%` }} />
    </div>
  );
};

// Timeline item
const TimelineItem: React.FC<{
  icon: React.ReactNode;
  iconBg: string;
  cardBg: string;
  title: string;
  titleColor: string;
  date?: string;
  children?: React.ReactNode;
}> = ({ icon, iconBg, cardBg, title, titleColor, date, children }) => (
  <div className="relative">
    <div className={`absolute -left-4 top-4 w-8 h-8 rounded-full flex items-center justify-center text-white ${iconBg}`}>
      {icon}
    </div>
    <div className={`rounded-xl p-5 ${cardBg}`}>
      <p className={`font-medium ${titleColor}`}>{title}</p>
      {date && <p className="text-sm text-gray-500 mt-1">{date}</p>}
      {children}
    </div>
  </div>
);

const TimelineSection: React.FC<TimelineSectionProps> = ({ stats }) => {
  const totalContributions = stats?.total ?? 0;
  const lastContribution = stats?.last_contribution;

  // Milestone progress
  const sortedMilestones = [...MILESTONES].sort((a, b) => a.threshold - b.threshold);
  const nextMilestone = sortedMilestones.find(m => totalContributions < m.threshold);
  const prevMilestone = [...sortedMilestones].reverse().find(m => totalContributions >= m.threshold) || {
    threshold: 0,
    text: 'First Contribution!',
    color: 'bg-emerald-300'
  };
  const progressMax = nextMilestone ? nextMilestone.threshold - prevMilestone.threshold : 1;
  const progressValue = totalContributions - prevMilestone.threshold;

  // Incentives
  const incentives: { icon: string; label: string; description: string }[] = [];

  // 1. Consistent Contributor: contributed in the last 24 hours
  if (lastContribution) {
    const last = new Date(lastContribution.timestamp);
    const now = new Date();
    const diffHrs = Math.abs(now.getTime() - last.getTime()) / 36e5;
    if (diffHrs <= 24) {
      incentives.push({
        icon: '⏰',
        label: 'Consistent Contributor',
        description: 'You contributed in the last 24 hours!'
      });
    }
  }

  // 2. Streak Badge: 5+ consecutive days of contribution
  const streak = (() => {
    if (!stats?.daily_contributions) return 0;
    const sorted = stats.daily_contributions
      .map(c => new Date(c.date).toDateString())
      .sort((a, b) => +new Date(b) - +new Date(a));

    let count = 1;
    for (let i = 1; i < sorted.length; i++) {
      const current = new Date(sorted[i]);
      const prev = new Date(sorted[i - 1]);
      const diff = (prev.getTime() - current.getTime()) / (1000 * 60 * 60 * 24);
      if (diff === 1) count++;
      else break;
    }
    return count;
  })();

  if (streak >= 5) {
    incentives.push({
      icon: '🔥',
      label: 'Streak Badge',
      description: `You're on a ${streak}-day contribution streak!`
    });
  }

  // 3. Super Contributor: 100+ total contributions
  if (totalContributions >= 100) {
    incentives.push({
      icon: '🌟',
      label: 'Super Contributor',
      description: 'Over 100 total contributions. Amazing!'
    });
  }

  return (
    <Card>
      <h3 className="text-xl font-bold text-gray-800 mb-6">Contribution Timeline</h3>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-200" />
        <div className="space-y-6 pl-10">

          {/* Recent contribution */}
          {lastContribution && (
            <TimelineItem
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>}
              iconBg="bg-indigo-500"
              cardBg="bg-indigo-50"
              title="Most Recent Contribution"
              titleColor="text-indigo-700"
              date={new Date(lastContribution.timestamp).toLocaleDateString()}
            >
              <p className="mt-2">{lastContribution.english_sentence}</p>
              <p className="font-semibold text-indigo-600 mt-1">{lastContribution.translated_sentence}</p>
            </TimelineItem>
          )}

          {/* Milestone */}
          {totalContributions > 0 && (
            <TimelineItem
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>}
              iconBg="bg-emerald-500"
              cardBg="bg-emerald-50"
              title="Milestone Achieved"
              titleColor="text-emerald-700"
            >
              <p className="text-sm text-gray-500 mt-1">{prevMilestone.text}</p>
              <ProgressBar value={progressValue} max={progressMax} color={prevMilestone.color} />
              <p className="text-xs text-gray-500 mt-2">
                {totalContributions} of {nextMilestone?.threshold ?? totalContributions} contributions
              </p>
            </TimelineItem>
          )}

          {/* Incentives */}
          {incentives.map((badge, index) => (
            <TimelineItem
              key={index}
              icon={<span className="text-lg">{badge.icon}</span>}
              iconBg="bg-yellow-500"
              cardBg="bg-yellow-50"
              title={badge.label}
              titleColor="text-yellow-700"
            >
              <p className="text-sm text-gray-600 mt-1">{badge.description}</p>
            </TimelineItem>
          ))}

          {/* No contributions */}
          {!lastContribution && totalContributions === 0 && (
            <div className="text-center py-8 text-gray-500">
              No contributions yet. Start contributing to see your timeline!
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TimelineSection;
