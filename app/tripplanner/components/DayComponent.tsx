'use client'
import React, { useState } from "react";
import axios from "axios";
import TimeDestinationCard from "./TimeDestinationCard";

interface Day {
  date: Date;
  details: string;
}

interface Marker {
  lat: number;
  lon: number;
  startTime: string;
  endTime: string;
  place: string;
}

interface DayComponentProps {
  day: Day;
  index: number;
  onAddDayAfter: () => void;
  onDeleteDay: () => void;
  onUpdateDetails: (details: string) => void;
}

const DayComponent: React.FC<DayComponentProps> = ({
  day,
  index,
  onAddDayAfter,
  onDeleteDay,
  onUpdateDetails,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const [destination, setDestination] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [timeDetails, setTimeDetails] = useState<string[]>([]);
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
        setMarkers([...markers, newMarker]);

        // Create a new time detail card
        const timeDetail = `${startTime} - ${endTime} : ${destination}`;
        setTimeDetails([...timeDetails, timeDetail]);

        // Clear inputs after adding
        setDestination("");
        setStartTime("");
        setDuration(60); // Reset duration to default
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    }
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(parseInt(e.target.value));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-100 p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{`Day ${index}: ${day.date.toLocaleDateString()}`}</h3>
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
              onChange={handleDurationChange}
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
                selectedTags.includes("Restaurant")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTagClick("Restaurant")}
            >
              Restaurant
            </button>
          </div>
          <div>
            {timeDetails.map((detail, idx) => (
              <TimeDestinationCard
                key={idx}
                startTime={detail.split(" - ")[0]}
                endTime={detail.split(" - ")[1].split(" : ")[0]}
                destination={detail.split(" : ")[1]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DayComponent;
