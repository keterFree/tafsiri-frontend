'use client';

import Navbar from '../components/navbar';
import { useAuth } from '../context/authcontext';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return <p>Not logged in</p>;

  return (
    <div className="p-6">
      <Navbar />
      <h1 className="text-xl font-semibold">Your Profile</h1>
      <p>Email: {user.email}</p>
      <p>User ID: {user.uid}</p>
    </div>
  );
}
