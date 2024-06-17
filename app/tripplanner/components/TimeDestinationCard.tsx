// TimeDestinationCard.tsx
import React from "react";

interface TimeDestinationCardProps {
  startTime: string;
  endTime: string;
  destination: string;
}

const TimeDestinationCard: React.FC<TimeDestinationCardProps> = ({
  startTime,
  endTime,
  destination,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <p className="text-lg font-semibold">{`${startTime} - ${endTime} : ${destination}`}</p>
    </div>
  );
};

export default TimeDestinationCard;
