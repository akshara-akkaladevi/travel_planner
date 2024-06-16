// app/tripplanner.tsx
'use client'
import { useState, useEffect } from 'react';
import DateInput from './components/DateInput';
import TextInput from './components/TextInput';
import NumberInput from './components/NumberInput';
import AdventureTypeSelect from './components/AdventureTypeSelect';
import DayComponent from './components/DayComponent';
import TripSummary from './components/TripSummary';
import MapComponent from './components/MapComponent';
interface Day {
  date: Date;
  details: string;
}

const TripPlannerPage = () => {
  const [place, setPlace] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [adventureType, setAdventureType] = useState('');
  const [numParticipants, setNumParticipants] = useState(1);
  const [days, setDays] = useState<Day[]>([]);

  useEffect(() => {
    const calculateAndSetDays = () => {
      if (startDate && endDate) {
        const start = startDate.getTime();
        const end = endDate.getTime();
        const totalDays = Math.ceil((end - start) / (1000 * 3600 * 24));

        const newDays = Array.from({ length: totalDays }, (_, index) => ({
          date: new Date(start + index * 24 * 3600 * 1000),
          details: '',
        }));

        setDays(newDays);
      }
    };

    calculateAndSetDays();
  }, [startDate, endDate]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Additional form submission logic can go here if needed
  };

  return (
    <div className="split-container">
      {/* Left Side: Trip Planner */}
      <div className="split left">
        <h2>{place}</h2>
        <h3>Plan Your Trip</h3>
        <form onSubmit={handleFormSubmit}>
          <TextInput label="Place Name" value={place} onChange={(e) => setPlace(e.target.value)} />
          <DateInput
            label="Select Dates"
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <AdventureTypeSelect
            value={adventureType}
            onChange={(e) => setAdventureType(e.target.value)}
          />
          <NumberInput
            label="Number of Participants"
            value={numParticipants}
            onChange={(e) => setNumParticipants(parseInt(e.target.value))}
          />
          <button type="submit">Plan Trip</button>
        </form>
        {days.length > 0 && (
          <div>
            {days.map((day, index) => (
              <DayComponent key={index} day={day} index={index + 1} />
            ))}
          </div>
        )}
      </div>

      {/* Right Side: Map Component */}
      <div className="split right">
        <MapComponent apiKey={process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY} />
      </div>
    </div>
  );
};

export default TripPlannerPage;