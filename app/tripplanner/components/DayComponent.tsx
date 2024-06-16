"use client";

import React, { useState } from "react";

interface Day {
  date: Date;
  details: string;
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
  const [activityDetails, setActivityDetails] = useState(day.details);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivityDetails(e.target.value);
    onUpdateDetails(e.target.value);
  };

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
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
          <input
            type="text"
            placeholder="Enter details (e.g., destinations, restaurants)"
            value={activityDetails}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="space-x-2">
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
        </div>
      )}
    </div>
  );
};

export default DayComponent;
