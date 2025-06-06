// src/components/profile/ChartsSection.tsx
import React, { useMemo, useEffect, useState } from "react";
import Card from "./card";
import { Chart } from "react-google-charts";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface ChartsSectionProps {
  stats: {
    by_source?: Record<string, number>;
    daily_contributions?: Array<{ date: string; count: number }>;
  };
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ stats }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sourceChartData = useMemo(() => {
    const entries = stats?.by_source ? Object.entries(stats.by_source) : [];
    return entries.length > 0
      ? [["Source", "Contributions"], ...entries]
      : null;
  }, [stats]);

  const prepareAggregatedChartData = () => {
    const map = new Map<string, number>();
    stats?.daily_contributions?.forEach((item) => {
      const date = new Date(item.date);
      const key = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      map.set(key, (map.get(key) || 0) + item.count);
    });

    const data = Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([monthYear, count]) => [
        new Date(`${monthYear}-01`).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        }),
        count,
      ]);

    return data.length > 0 ? [["Month", "Contributions"], ...data] : null;
  };

  const prepareLineChartData = () => {
    const dateMap = new Map<string, number>();
    const now = new Date();
    let daysToShow = 30;

    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const filter = searchParams.get("time_filter");
      if (filter === "week") {
        daysToShow = 7;
      } else if (filter === "all") {
        return prepareAggregatedChartData();
      }
    }

    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      dateMap.set(dateStr, 0);
    }

    stats?.daily_contributions?.forEach(({ date, count }) => {
      dateMap.set(date, count);
    });

    const data = Array.from(dateMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => [
        new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        count,
      ]);

    return data.length > 0 ? [["Date", "Contributions"], ...data] : null;
  };

  const lineChartData = useMemo(() => prepareLineChartData(), [stats]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {/* Pie Chart */}
      <Card className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 mr-3">
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
          </div>
          <h3 className="text-lg font-semibold">Source Distribution</h3>
        </div>
        {sourceChartData ? (
          <Chart
            key={windowWidth}
            chartType="PieChart"
            width="100%"
            height="300px"
            loader={<div className="text-center">Loading chart...</div>}
            data={sourceChartData}
            options={{
              colors: ["#10B981", "#F59E0B", "#3B82F6"],
              pieHole: 0.4,
              legend: {
                position: "labeled",
                textStyle: { color: "#6B7280", fontSize: 12 },
              },
              pieSliceText: "value",
              chartArea: { width: "90%", height: "80%" },
              backgroundColor: "transparent",
            }}
          />
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            No source data available
          </div>
        )}
      </Card>

      {/* Line Chart */}
      <Card className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mr-3">
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
          </div>
          <h3 className="text-lg font-semibold">
            Daily Contributions ({stats?.daily_contributions?.length ?? 0})
          </h3>
        </div>

        {stats?.daily_contributions?.length ? (
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={stats.daily_contributions.map((entry) => ({
                  date: new Date(entry.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  }),
                  count: entry.count,
                }))}
                margin={{ top: 10, right: 30, left: 0, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  label={{
                    value: "Contributions",
                    angle: -90,
                    position: "insideLeft",
                    offset: 10,
                    fill: "#6B7280",
                    style: { fontSize: 12 },
                  }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            No contribution data available
          </div>
        )}
      </Card>
    </div>
  );
};

export default ChartsSection;
