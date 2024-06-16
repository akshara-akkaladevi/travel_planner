'use client'

import React, { useState } from 'react';

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

const DayComponent: React.FC<DayComponentProps> = ({ day, index, onAddDayAfter, onDeleteDay, onUpdateDetails }) => {
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
    <div className="day-component">
      <div className="day-header">
        <div className="day-header-top">
          <h3>{`Day ${index}: ${day.date.toLocaleDateString()}`}</h3>
          <div className="day-actions">
            <button onClick={onAddDayAfter} className="action-button" title="Add Day After">
              +
            </button>
            <button onClick={onDeleteDay} className="action-button" title="Delete Day">
              -
            </button>
          </div>
        </div>
        <span className={`arrow ${collapsed ? 'down' : 'up'}`} onClick={toggleCollapsed}>
          {collapsed ? '▼' : '▲'}
        </span>
      </div>
      {!collapsed && (
        <div className="day-details">
          <p>{day.details}</p>
          <input
            type="text"
            placeholder="Enter details (e.g., destinations, restaurants)"
            value={activityDetails}
            onChange={handleInputChange}
            className="activity-input"
          />
          <div className="tags-container">
            <span
              className="tag"
              onClick={() => handleTagClick('Destination')}
              style={{ backgroundColor: selectedTags.includes('Destination') ? '#007bff' : '#e9ecef' }}
            >
              Destination
            </span>
            <span
              className="tag"
              onClick={() => handleTagClick('Restaurant')}
              style={{ backgroundColor: selectedTags.includes('Restaurant') ? '#007bff' : '#e9ecef' }}
            >
              Restaurant
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayComponent;
