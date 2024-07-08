// components/Dashboard.tsx
"use client"
import { useEffect, useState } from 'react';
import useUser from '../lib/useUser';

interface Trip {
  destination: string;
  from_date: string;
  to_date: string;
}

const Dashboard = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const { user, loading } = useUser();

  useEffect(() => {
    const fetchTrips = async (userId: string) => {
      try {
        const response = await fetch(`/api/trips`, {
          headers: {
            'user-id': userId
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch trips');
        }
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    if (!loading && user) {
      fetchTrips(user.id);
    }
  }, [loading, user]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (!user) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-700">
      Please log in to see your trips.
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Trips</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">{trip.destination}</h2>
              <p className="text-gray-600">From: {new Date(trip.from_date).toLocaleDateString()}</p>
              <p className="text-gray-600">To: {new Date(trip.to_date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;