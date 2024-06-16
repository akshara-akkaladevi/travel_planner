// app/tripplanner.tsx
"use client";
import { useState, useEffect } from "react";
import DateInput from "./components/DateInput";
import TextInput from "./components/TextInput";
import NumberInput from "./components/NumberInput";
import AdventureTypeSelect from "./components/AdventureTypeSelect";
import DayComponent from "./components/DayComponent";
import MapComponent from "./components/MapComponent";
interface Day {
  date: Date;
  details: string;
}

const TripPlannerPage = () => {
  const [place, setPlace] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [adventureType, setAdventureType] = useState("");
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
          details: "",
        }));

        setDays(newDays);
      }
    };

    calculateAndSetDays();
  }, [startDate, endDate]);

  const handleAddDayAfter = (index: number) => {
    const updatedDays = [...days];
    const nextDayDate = new Date(
      updatedDays[index].date.getTime() + 24 * 3600 * 1000,
    );

    // Check if the next day already exists
    if (
      index < updatedDays.length - 1 &&
      isSameDate(nextDayDate, updatedDays[index + 1].date)
    ) {
      return; // Do not add duplicate day
    }

    updatedDays.splice(index + 1, 0, { date: nextDayDate, details: "" });
    setDays(updatedDays);
  };

  const handleDeleteDay = (index: number) => {
    if (days.length === 1) {
      // Do not delete if there's only one day
      return;
    }
    const updatedDays = [...days];
    updatedDays.splice(index, 1);
    setDays(updatedDays);
  };

  const handleUpdateDetails = (index: number, details: string) => {
    const updatedDays = [...days];
    updatedDays[index].details = details;
    setDays(updatedDays);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Additional form submission logic can go here if needed
  };

  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <div className="flex min-h-screen bg-blue-50 items-center">
      {/* Left Side: Trip Planner */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {place || "My Trip"}
        </h2>
        <h1 className="text-xl font-semibold text-gray-600 mb-6">
          Plan Your Adventure
        </h1>

        <form
          onSubmit={handleFormSubmit}
          className="bg-white shadow-md rounded-lg p-6 mb-8"
        >
          <TextInput
            label="Destination"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />

          <div className="mb-4">
            <DateInput
              label="Travel Dates"
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>

          <AdventureTypeSelect
            value={adventureType}
            onChange={(e) => setAdventureType(e.target.value)}
          />

          <NumberInput
            label="Number of Travelers"
            value={numParticipants}
            onChange={(e) => setNumParticipants(parseInt(e.target.value))}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Plan My Trip
          </button>
        </form>

        {days.length > 0 && (
          <div className="space-y-4">
            {days.map((day, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <DayComponent
                  day={day}
                  index={index + 1}
                  onAddDayAfter={() => handleAddDayAfter(index)}
                  onDeleteDay={() => handleDeleteDay(index)}
                  onUpdateDetails={(details) =>
                    handleUpdateDetails(index, details)
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Side: Map Component */}
      <div className="flex-1">
        <div className="">
          <MapComponent apiKey={process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY} />
        </div>
      </div>
    </div>
  );
};

export default TripPlannerPage;
