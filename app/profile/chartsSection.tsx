// src/components/profile/ChartsSection.tsx
import React from "react";
import Card from "./card";
import { Chart } from "react-google-charts";

interface ChartsSectionProps {
  stats: {
    by_source?: Record<string, number>;
    daily_contributions?: Array<{ date: string; count: number }>;
  };
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ stats }) => {
  const sourceChartData = stats?.by_source
    ? [["Source", "Contributions"], ...Object.entries(stats.by_source)]
    : null;

  // Prepare daily contributions data for line chart
  const prepareLineChartData = () => {
    if (!stats?.daily_contributions) return null;

    // Create a map of all dates in the period
    const dateMap = new Map<string, number>();
    const now = new Date();
    let daysToShow = 30; // Default for month view

    if (window.location.search.includes("time_filter=week")) {
      daysToShow = 7;
    } else if (window.location.search.includes("time_filter=all")) {
      // For "all time" you might want to group by week/month instead
      return prepareAggregatedChartData();
    }

    // Initialize with 0 counts for all dates in range
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      dateMap.set(dateStr, 0);
    }

    // Fill with actual data
    stats.daily_contributions.forEach((item) => {
      dateMap.set(item.date, item.count);
    });

    // Convert to array and sort
    const result = Array.from(dateMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, count]) => [
        new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        count,
      ]);

    return [["Date", "Contributions"], ...result];
  };

  // For "all time" view - aggregate by month
  const prepareAggregatedChartData = () => {
    if (!stats?.daily_contributions) return null;

    const monthMap = new Map<string, number>();

    stats.daily_contributions.forEach((item) => {
      const date = new Date(item.date);
      const monthYear = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      monthMap.set(monthYear, (monthMap.get(monthYear) || 0) + item.count);
    });

    const result = Array.from(monthMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([monthYear, count]) => [
        new Date(monthYear).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        }),
        count,
      ]);

    return [["Month", "Contributions"], ...result];
  };

  const lineChartData = prepareLineChartData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {/* Source Distribution Pie Chart */}
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
            width={"100%"}
            height={"300px"}
            chartType="PieChart"
            loader={
              <div className="flex justify-center items-center h-64">
                Loading Chart...
              </div>
            }
            data={sourceChartData}
            options={{
              colors: ["#10B981", "#3B82F6", "#F59E0B"],
              pieHole: 0.4,
              legend: {
                position: "labeled",
                textStyle: {
                  color: "#6B7280",
                  fontSize: 12,
                },
              },
              pieSliceText: "value",
              chartArea: { width: "90%", height: "80%" },
              backgroundColor: "transparent",
            }}
          />
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No data available
          </div>
        )}
      </Card>

      {/* Daily Contributions Line Chart */}
      <Card className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">
            {window.location.search.includes("time_filter=all")
              ? "Monthly Contributions"
              : "Daily Contributions"}
          </h3>
        </div>
        {lineChartData ? (
          <Chart
            width={"100%"}
            height={"300px"}
            chartType="LineChart"
            loader={
              <div className="flex justify-center items-center h-64">
                Loading Chart...
              </div>
            }
            data={lineChartData}
            options={{
              colors: ["#3B82F6"],
              curveType: "function",
              legend: { position: "none" },
              hAxis: {
                textStyle: {
                  color: "#6B7280",
                  fontSize: 11,
                },
                gridlines: { color: "transparent" },
                slantedText: true,
                slantedTextAngle: 45,
              },
              vAxis: {
                textStyle: {
                  color: "#6B7280",
                  fontSize: 11,
                },
                gridlines: {
                  color: "#E5E7EB",
                  count: 5,
                },
                baselineColor: "transparent",
                minValue: 0,
                format: "0",
              },
              chartArea: {
                width: "85%",
                height: "75%",
                backgroundColor: "transparent",
              },
              backgroundColor: "transparent",
              lineWidth: 3,
              pointSize: 5,
              animation: {
                duration: 1000,
                easing: "out",
                startup: true,
              },
            }}
          />
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No data available
          </div>
        )}
      </Card>
    </div>
  );
};

export default ChartsSection;
