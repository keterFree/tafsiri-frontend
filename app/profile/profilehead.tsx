// src/components/profile/ProfileHeader.tsx
import React from "react";
import { User } from "firebase/auth";
import Image from "next/image";

interface ProfileHeaderProps {
  user: User;
  stats: {
    languages_count?: number;
    total?: number;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, stats }) => {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl p-8 mb-12 transform transition-all hover:scale-[1.01] duration-300">
      <div className="flex flex-col md:flex-row items-center">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-6 md:mb-0 md:mr-8 shadow-lg">
          {user.email?.[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
            <Image
              src="/taf.png"
              alt="Tafsiri Logo"
              width={274}
              height={66}
              priority
            />
          </h1>

          <p className="text-lg text-green-600 dark:text-green-400 font-medium">
            {user.email}
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-4 py-1 rounded-full text-sm font-medium">
              {stats?.languages_count || 0} Languages
            </span>
            <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 px-4 py-1 rounded-full text-sm font-medium">
              {stats?.total || 0} Total Contributions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
