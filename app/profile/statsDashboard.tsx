import React from "react";
import {
  FiActivity,
  FiDatabase,
  FiGlobe,
  FiClock,
  FiFlag,
  FiBook,
} from "react-icons/fi";
import { motion } from "framer-motion";

interface StatsDashboardProps {
  stats: {
    total?: number;
    by_source?: Record<string, number>;
    by_language?: Record<string, number>;
    last_contribution?: any;
  };
}

const cardVariants = {
  hover: {
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {/* Total Contributions Card */}
      <motion.div
        className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden group"
        variants={cardVariants}
        whileHover="hover"
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Decorative elements */}
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10"></div>
        <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full bg-white/5"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                <FiActivity size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold">Total Contributions</h3>
            </div>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              {stats?.total || 0}
            </p>
          </div>

          <div className="mt-auto pt-4 border-t border-white/20">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/90">Last Activity</span>
              <span className="font-medium bg-white/10 px-2 py-1 rounded-md">
                {stats?.last_contribution?.timestamp
                  ? new Date(
                      stats.last_contribution.timestamp
                    ).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* By Source Card */}
      <motion.div
        className="bg-gradient-to-br from-purple-600 to-fuchsia-700 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden group"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-purple-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm mr-4">
              <FiDatabase size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold">By Source</h3>
          </div>

          <div className="space-y-4 flex-1">
            {stats?.by_source &&
              Object.entries(stats.by_source).map(([source, count]) => (
                <div key={source} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-3 ${
                        source === "original"
                          ? "bg-green-400 shadow-green-glow"
                          : source === "sentence_db"
                          ? "bg-blue-400 shadow-blue-glow"
                          : "bg-amber-400 shadow-amber-glow"
                      }`}
                    ></div>
                    <span className="text-sm font-medium capitalize">
                      {source.replace("_", " ")}
                    </span>
                  </div>
                  <span className="font-bold text-lg">{count}</span>
                </div>
              ))}
          </div>
        </div>
      </motion.div>

      {/* Languages Card */}
      <motion.div
        className="bg-gradient-to-br from-teal-600 to-emerald-700 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden group"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm mr-4">
              <FiGlobe size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold">Top Languages</h3>
          </div>

          <div className="space-y-4 flex-1">
            {stats?.by_language &&
              Object.entries(stats.by_language)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([language, count]) => (
                  <div
                    key={language}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <FiBook className="text-white/90 mr-3" size={18} />
                      <span className="text-sm font-medium">{language}</span>
                    </div>
                    <span className="font-bold text-lg">{count}</span>
                  </div>
                ))}
          </div>
        </div>
      </motion.div>

      {/* Recent Activity Card */}
      <motion.div
        className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden group"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-orange-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="relative z-10 h-full flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <p className="text-2xl font-bold mt-1">
                {stats?.last_contribution ? "New" : "None"}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
              <FiClock size={24} className="text-amber-100" />
            </div>
          </div>

          {stats?.last_contribution ? (
            <div className="mt-auto bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-xs font-medium opacity-90 mb-1">
                {new Date(
                  stats.last_contribution.timestamp
                ).toLocaleDateString()}
              </p>
              <p className="text-sm font-medium line-clamp-2 mb-3">
                "{stats.last_contribution.english_sentence}"
              </p>
              <div className="flex items-center text-xs font-medium bg-white/20 rounded-full px-3 py-1 w-fit">
                <FiFlag className="mr-2" size={14} />
                <span className="capitalize">
                  {stats.last_contribution.source.replace("_", " ")}
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-auto bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-sm opacity-90">No recent activity</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default StatsDashboard;
