// src/components/profile/ProfileHeader.tsx
import React from 'react';
import { User } from 'firebase/auth';

interface ProfileHeaderProps {
  user: User;
  stats: {
    languages_count?: number;
    total?: number;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, stats }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 transform transition-all hover:scale-[1.01] duration-300">
      <div className="flex flex-col md:flex-row items-center">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-6 md:mb-0 md:mr-8 shadow-lg">
          {user.email?.[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Translation Dashboard</h1>
          <p className="text-lg text-purple-600 font-medium">{user.email}</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <span className="bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm font-medium">
              {stats?.languages_count || 0} Languages
            </span>
            <span className="bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-medium">
              {stats?.total || 0} Total Contributions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;