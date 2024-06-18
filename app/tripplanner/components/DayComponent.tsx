import React, { useState } from "react";
import TimeDestinationCard from "./TimeDestinationCard";
import { Marker } from "./MapComponent"; // Import Marker interface
import axios from 'axios';

interface Day {
  date: Date;
  details: string;
}

interface TimeDetail {
  startTime: string;
  endTime: string;
  destination: string;
  imageUrl?: string; // Optional image URL
}

interface DayComponentProps {
  day: Day;
  index: number;
  onAddDayAfter: () => void;
  onDeleteDay: () => void;
  onUpdateDetails: (details: string) => void;
  onAddMarker: (marker: Marker) => void; // Function to add marker
  onRemoveMarker: (marker: Marker) => void; // Function to remove marker
}

const DayComponent: React.FC<DayComponentProps> = ({
  day,
  index,
  onAddDayAfter,
  onDeleteDay,
  onUpdateDetails,
  onAddMarker,
  onRemoveMarker,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const [destination, setDestination] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [timeDetails, setTimeDetails] = useState<TimeDetail[]>([]);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [startTime, setStartTime] = useState<string>("");
  const [duration, setDuration] = useState<number>(60); // Default duration in minutes

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddMarker = async () => {
    if (destination && startTime && duration) {
      try {
        const response = await axios.get("https://us1.locationiq.com/v1/search.php", {
          params: {
            key: process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY,
            q: destination,
            format: "json",
          },
        });

        const data = response.data[0];
        const lat = parseFloat(data.lat);
        const lon = parseFloat(data.lon);

        // Calculate end time based on start time and duration
        const start = new Date(`2000-01-01T${startTime}`);
        const end = new Date(start.getTime() + duration * 60000); // Add duration in milliseconds

        const endTime = end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        // Create a new marker object
        const newMarker: Marker = {
          lat,
          lon,
          startTime,
          endTime,
          place: destination,
        };

        onAddMarker(newMarker); // Pass new marker to parent (TripPlannerPage)
        setMarkers([...markers, newMarker]);

        // Fetch the image URL once and store it
        try {
          const unsplashResponse = await axios.get('https://api.unsplash.com/photos/random', {
            headers: {
              Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
            },
            params: {
              query: destination,
              orientation: 'landscape',
              count: 1
            }
          });

          const imageUrl = unsplashResponse.data[0]?.urls.regular;
          const newTimeDetail: TimeDetail = {
            startTime,
            endTime,
            destination,
            imageUrl,
          };

          setTimeDetails([...timeDetails, newTimeDetail]);

          // Clear inputs after adding
          setDestination("");
          setStartTime("");
          setDuration(60); // Reset duration to default
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    }
  };

  const handleDeleteTimeDetail = (index: number) => {
    const updatedTimeDetails = [...timeDetails];
    const removedDetail = updatedTimeDetails.splice(index, 1)[0];
    setTimeDetails(updatedTimeDetails);
  
    // Find and remove the corresponding marker
    const updatedMarkers = markers.filter(
      (marker) => !(marker.place === removedDetail.destination && marker.startTime === removedDetail.startTime)
    );
  
    const removedMarker = markers.find(
      (marker) => marker.place === removedDetail.destination && marker.startTime === removedDetail.startTime
    );
  
    if (removedMarker) {
      onRemoveMarker(removedMarker); // Pass removed marker to parent (TripPlannerPage)
    }
  
    setMarkers(updatedMarkers);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-100 p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{`Day ${index + 1}: ${day.date.toLocaleDateString()}`}</h3>
          <div className="space-x-2">
            <button
              onClick={onAddDayAfter}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
              title="Add Day After"
            >
              +
            </button>
            <button
              onClick={onDeleteDay}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
              title="Delete Day"
            >
              -
            </button>
          </div>
        </div>
        <button
          className="mt-2 text-gray-600 hover:text-gray-800 transition"
          onClick={toggleCollapsed}
        >
          {collapsed ? "▼ Show Details" : "▲ Hide Details"}
        </button>
      </div>
      {!collapsed && (
        <div className="p-4">
          <p className="mb-4">{day.details}</p>
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Enter destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddMarker}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              title="Add Marker"
            >
              Add Marker
            </button>
          </div>
          <div className="flex space-x-4 mb-4">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={90}>1 hour 30 minutes</option>
              <option value={120}>2 hours</option>
            </select>
          </div>
          <div className="space-x-2 mb-4">
            <button
              className={`px-3 py-1 rounded ${
                selectedTags.includes("Destination")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTagClick("Destination")}
            >
              Destination
            </button>
            <button
              className={`px-3 py-1 rounded ${
                selectedTags.includes("Activity")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTagClick("Activity")}
            >
              Activity
            </button>
          </div>
          <div>
            {timeDetails.map((detail, idx) => (
              <TimeDestinationCard
                key={idx}
                startTime={detail.startTime}
                endTime={detail.endTime}
                destination={detail.destination}
                imageUrl={detail.imageUrl} 
                onDelete={() => handleDeleteTimeDetail(idx)} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DayComponent;
