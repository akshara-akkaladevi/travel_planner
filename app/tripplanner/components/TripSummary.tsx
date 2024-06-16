// components/TripSummary.tsx

import React from 'react';

interface TripSummaryProps {
  days: number;
}

const TripSummary: React.FC<TripSummaryProps> = ({ days }) => {
  return (
    <div>
      <h2>Trip Summary</h2>
      <p>Number of Days: {days}</p>
      {/* Add more summary details as needed */}
    </div>
  );
};

export default TripSummary;
