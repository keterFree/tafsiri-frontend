'use client';

import Navbar from '../components/navbar';
import { useAuth } from '../context/authcontext';
import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import ProfileHeader from './profilehead';
import StatsDashboard from './statsDashboard';
import ChartsSection from './chartsSection';
import TimelineSection from './timeline';
import CallToAction from "./callToAction";

export default function ProfilePage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', 'week', 'month'

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user, timeFilter]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contributions/stats?translator_auth_id=${user?.uid}`
      );
      
      if (!res.ok) throw new Error('Failed to fetch statistics');
      
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
      <p className="text-lg text-gray-700">Please log in to view your profile</p>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 pb-20">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProfileHeader user={user} stats={stats} />
        
        {/* Time Filter */}
        <div className="flex justify-end mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                timeFilter === 'all' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setTimeFilter('all')}
            >
              All Time
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                timeFilter === 'month' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setTimeFilter('month')}
            >
              This Month
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                timeFilter === 'week' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setTimeFilter('week')}
            >
              This Week
            </button>
          </div>
        </div>

        {stats && (
          <>
            <StatsDashboard stats={stats} />
            <ChartsSection stats={stats} />
            <TimelineSection stats={stats} />
          </>
        )}
        
        <CallToAction />
      </div>
    </div>
  );
}