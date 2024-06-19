import React from 'react';

interface TimeDestinationCardProps {
  startTime: string;
  endTime: string;
  destination: string;
  imageUrl?: string; 
  onDelete: () => void; 
}

const TimeDestinationCard: React.FC<TimeDestinationCardProps> = ({
  startTime,
  endTime,
  destination,
  imageUrl,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col items-start">
      <p className="text-lg font-semibold mb-2">{`${startTime} - ${endTime} : ${destination}`}</p>
      {imageUrl && <img src={imageUrl} alt={destination} className="w-full h-full object-cover mb-2" />}
      <button
        onClick={onDelete}
        className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition self-end"
        title="Delete Time Destination"
        >
        Delete
      </button>
    </div>
  );
};

export default TimeDestinationCard;
