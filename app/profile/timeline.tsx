// src/components/profile/TimelineSection.tsx
import React, { useState } from "react";
import Card from "./card";

interface Contribution {
  timestamp: string;
  english_sentence: string;
  translated_sentence: string;
}

interface Stats {
  total?: number;
  last_contribution?: Contribution;
  daily_contributions?: { date: string; count: number }[];
  weekly_goal?: number;
  leaderboard_position?: number;
}

interface TimelineSectionProps {
  stats?: Stats;
}

// Enhanced milestone levels
const MILESTONES = [
  {
    threshold: 500,
    text: "Legendary Contributor!",
    color: "bg-purple-600",
    message:
      "Unbelievable! You've reached 500+ contributions. You're a translation legend!",
    icon: "🏆",
  },
  {
    threshold: 250,
    text: "Elite Translator!",
    color: "bg-amber-600",
    message:
      "Phenomenal! 250 contributions reached. You're among our top contributors!",
    icon: "⭐",
  },
  {
    threshold: 100,
    text: "Master Translator!",
    color: "bg-emerald-600",
    message:
      "Incredible work! You've surpassed 100 contributions. Your dedication is truly inspiring!",
    icon: "🌟",
  },
  {
    threshold: 50,
    text: "Senior Translator!",
    color: "bg-emerald-500",
    message:
      "Fantastic! You've made 50 contributions. Keep up the great momentum!",
    icon: "🎯",
  },
  {
    threshold: 25,
    text: "Rising Star!",
    color: "bg-emerald-400",
    message:
      "Nice! You've hit 25 contributions. Your efforts are making a difference!",
    icon: "🚀",
  },
  {
    threshold: 10,
    text: "Contributor!",
    color: "bg-emerald-300",
    message: "Great start! 10 contributions and counting. Keep it going!",
    icon: "🔰",
  },
  {
    threshold: 1,
    text: "First Step!",
    color: "bg-blue-300",
    message:
      "Welcome aboard! You made your first contribution. The journey begins!",
    icon: "👣",
  },
];

// Progress bar with animation
const ProgressBar: React.FC<{ value: number; max: number; color: string }> = ({
  value,
  max,
  color,
}) => {
  const percentage = Math.min(100, (value / max) * 100);
  return (
    <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
      <div
        className={`h-2.5 rounded-full ${color} transition-all duration-700 ease-out`}
        style={{ width: `${percentage}%` }}
      />
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
    <div
      className={`absolute -left-4 top-4 w-8 h-8 rounded-full flex items-center justify-center text-white ${iconBg}`}
    >
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
  const weeklyGoal = stats?.weekly_goal ?? 20;
  const leaderboardPosition = stats?.leaderboard_position;
  const [expandedContribution, setExpandedContribution] = useState(false);

  // Milestone progress
  // Milestone progress
  const sortedMilestones = [...MILESTONES].sort(
    (a, b) => a.threshold - b.threshold
  );

  // Find the next milestone
  const nextMilestone = sortedMilestones.find(
    (m) => totalContributions < m.threshold
  );

  // Find the previous milestone (the one just before the next)
  const prevMilestone = [...sortedMilestones]
    .reverse()
    .find((m) => m.threshold <= totalContributions) || {
    threshold: 0,
    text: "Getting Started!",
    color: "bg-blue-300",
  };

  // Calculate progress
  const progressMax = nextMilestone
    ? nextMilestone.threshold - prevMilestone.threshold
    : 1;
  const progressValue = totalContributions - prevMilestone.threshold;

  const achievedMilestones = sortedMilestones.filter(
    (m) => totalContributions >= m.threshold
  );

  // Calculate weekly contributions
  const weeklyContributions = (() => {
    if (!stats?.daily_contributions) return 0;

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday

    return stats.daily_contributions.reduce((total, day) => {
      const date = new Date(day.date);
      return date >= startOfWeek ? total + day.count : total;
    }, 0);
  })();

  // Calculate streak
  const streak = (() => {
    if (!stats?.daily_contributions) return 0;

    const sorted = stats.daily_contributions
      .map((c) => ({
        ...c,
        date: new Date(c.date).toISOString().split("T")[0],
      }))
      .sort((a, b) => b.date.localeCompare(a.date));

    if (sorted.length === 0) return 0;

    let streak = sorted[0].count > 0 ? 1 : 0;
    for (let i = 1; i < sorted.length; i++) {
      const prevDate = new Date(sorted[i - 1].date);
      const currDate = new Date(sorted[i].date);
      const diffDays = Math.floor(
        (prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 1 && sorted[i].count > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  })();

  // Incentives
  const incentives: { icon: string; label: string; description: string }[] = [];

  // 1. Consistent Contributor: contributed in the last 24 hours
  if (lastContribution) {
    const last = new Date(lastContribution.timestamp);
    const now = new Date();
    const diffHrs = Math.abs(now.getTime() - last.getTime()) / 36e5;
    if (diffHrs <= 24) {
      incentives.push({
        icon: "⏰",
        label: "Consistent Contributor",
        description: "You contributed in the last 24 hours!",
      });
    }
  }

  // 2. Streak Badge
  if (streak >= 3) {
    incentives.push({
      icon: streak >= 7 ? "🔥🔥" : "🔥",
      label:
        streak >= 7
          ? "Fire Streak"
          : streak >= 5
          ? "Hot Streak"
          : "Streak Starter",
      description:
        streak >= 7
          ? `Amazing ${streak}-day streak! You're on fire!`
          : `You're on a ${streak}-day contribution streak!`,
    });
  }

  // 3. Super Contributor
  if (totalContributions >= 100) {
    incentives.push({
      icon: "🏆",
      label: "Super Contributor",
      description: "Over 100 total contributions. Amazing!",
    });
  }

  // 4. Weekly Goal Achiever
  if (weeklyContributions >= weeklyGoal) {
    incentives.push({
      icon: "🏅",
      label: "Weekly Goal Achiever",
      description: `You've met your weekly goal of ${weeklyGoal} contributions!`,
    });
  }

  return (
    <Card className="dark:bg-neutral-800">
      <h3 className="text-xl  font-bold dark:text-neutral-50 text-gray-800 mb-6">
        Contribution Timeline
      </h3>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-500" />
        <div className="space-y-6 pl-10">
          {/* Recent contribution */}
          {lastContribution && (
            <TimelineItem
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              iconBg="bg-indigo-500"
              cardBg="bg-indigo-50"
              title="Most Recent Contribution"
              titleColor="text-indigo-700"
              date={new Date(lastContribution.timestamp).toLocaleDateString(
                undefined,
                {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            >
              <p className="mt-2 text-gray-700">
                {lastContribution.english_sentence}
              </p>
              <p className="font-semibold text-indigo-600 mt-1">
                {lastContribution.translated_sentence}
              </p>

              <button
                className="mt-3 text-sm text-indigo-500 hover:text-indigo-700 flex items-center"
                onClick={() => setExpandedContribution(!expandedContribution)}
              >
                {expandedContribution ? "Show Less" : "Show Details"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 transition-transform ${
                    expandedContribution ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {expandedContribution && (
                <div className="mt-3 p-3 bg-indigo-100 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Contribution ID:</span>{" "}
                    {lastContribution.timestamp}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-medium">Character Length:</span>{" "}
                    {lastContribution.english_sentence.length}
                  </p>
                </div>
              )}
            </TimelineItem>
          )}

          {/* Weekly Goal */}
          <TimelineItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                  clipRule="evenodd"
                />
              </svg>
            }
            iconBg="bg-purple-500"
            cardBg="bg-purple-50"
            title="Weekly Progress"
            titleColor="text-purple-700"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {weeklyContributions} of {weeklyGoal} contributions
              </span>
              <span className="text-sm font-medium text-purple-700">
                {Math.round((weeklyContributions / weeklyGoal) * 100)}%
              </span>
            </div>
            <ProgressBar
              value={weeklyContributions}
              max={weeklyGoal}
              color={
                weeklyContributions >= weeklyGoal
                  ? "bg-green-500"
                  : "bg-purple-400"
              }
            />
            <p className="text-xs text-gray-500 mt-2">
              {weeklyContributions >= weeklyGoal
                ? "🎉 You've reached your weekly goal!"
                : `just ${
                    weeklyGoal - weeklyContributions
                  } more to reach your goal`}
            </p>
          </TimelineItem>

          {/* Streak */}
          {streak > 0 && (
            <TimelineItem
              icon={<span className="text-lg">🔥</span>}
              iconBg="bg-orange-500"
              cardBg="bg-orange-50"
              title="Current Streak"
              titleColor="text-orange-700"
            >
              <div className="flex items-center">
                <span className="text-2xl font-bold text-orange-600">
                  {streak}
                </span>
                <span className="ml-2 text-gray-600">days in a row!</span>
              </div>
              <div className="flex mt-2 space-x-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < streak ? "bg-orange-500" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {streak >= 3
                  ? "Keep going to maintain your streak!"
                  : "Start a new streak by contributing today!"}
              </p>
            </TimelineItem>
          )}

          {/* Milestone */}
          {achievedMilestones.length > 0 && (
            <TimelineItem
              icon={
                <span className="text-lg">{achievedMilestones[0].icon}</span>
              }
              iconBg={prevMilestone.color}
              cardBg="bg-emerald-50"
              title="Latest Milestone"
              titleColor="text-emerald-700"
            >
              <div className="flex items-start">
                <div className="bg-emerald-100 rounded-full p-2">
                  <span className="text-emerald-700 text-lg">
                    {achievedMilestones[0].icon}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="font-medium text-emerald-800">
                    {achievedMilestones[0].text}
                  </p>
                  <p className="text-sm text-emerald-600">
                    {achievedMilestones[0].message}
                  </p>
                </div>
              </div>

              {nextMilestone && (
                <>
                  <div className="mt-4 flex justify-between text-sm text-gray-600">
                    <span>{prevMilestone.threshold}+</span>
                    <span>Next: {nextMilestone.threshold}</span>
                  </div>
                  <ProgressBar
                    value={progressValue}
                    max={progressMax}
                    color={prevMilestone.color}
                  />
                </>
              )}

              {achievedMilestones.length > 1 && (
                <div className="mt-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    PREVIOUS MILESTONES
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {achievedMilestones.slice(1).map((milestone, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                      >
                        {milestone.text}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </TimelineItem>
          )}

          {/* Leaderboard Position */}
          {leaderboardPosition && leaderboardPosition <= 100 && (
            <TimelineItem
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              }
              iconBg="bg-amber-500"
              cardBg="bg-amber-50"
              title="Leaderboard Position"
              titleColor="text-amber-700"
            >
              <div className="flex items-center">
                <span className="text-3xl font-bold text-amber-600">
                  #{leaderboardPosition}
                </span>
                <span className="ml-3 text-gray-600">
                  {leaderboardPosition <= 10
                    ? "Top contributor! You're crushing it!"
                    : leaderboardPosition <= 50
                    ? "Great job! You're in the top tier!"
                    : "Keep going! You're climbing the ranks!"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Out of thousands of contributors worldwide
              </p>
            </TimelineItem>
          )}

          {/* Incentives */}
          {incentives.length > 0 && (
            <TimelineItem
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              iconBg="bg-yellow-500"
              cardBg="bg-yellow-50"
              title="Achievements Unlocked"
              titleColor="text-yellow-700"
            >
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 mt-2">
                {incentives.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 bg-yellow-100 rounded-lg"
                  >
                    <span className="text-2xl mr-2">{badge.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-yellow-800">
                        {badge.label}
                      </p>
                      <p className="text-xs text-yellow-600">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TimelineItem>
          )}

          {/* No contributions */}
          {!lastContribution && totalContributions === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="bg-gray-100 p-6 rounded-xl max-w-md mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <h4 className="mt-4 font-medium text-gray-700">
                  No Contributions Yet
                </h4>
                <p className="mt-2 text-gray-600">
                  Start translating sentences to see your progress and
                  achievements here!
                </p>
                <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Start Contributing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TimelineSection;
