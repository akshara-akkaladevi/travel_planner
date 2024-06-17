// app/tripplanner.tsx
"use client";
import { useState, useCallback } from "react";
import DateInput from "./components/DateInput";
import TextInput from "./components/TextInput";
import NumberInput from "./components/NumberInput";
import AdventureTypeSelect from "./components/AdventureTypeSelect";
import DayComponent from "./components/DayComponent";
import MapComponent from "./components/MapComponent";
import axios from 'axios';

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
  const [coordinates, setCoordinates] = useState<{ lat: number, lon: number } | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const calculateAndSetDays = useCallback(() => {
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
  }, [startDate, endDate]);

  const fetchCoordinates = async () => {
    try {
      const response = await axios.get(`https://us1.locationiq.com/v1/search`, {
        params: {
          key: process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY,
          q: place,
          format: "json"
        }
      });
      const data = response.data[0];
      console.log("Coordinates data:", data);
      setCoordinates({ lat: parseFloat(data.lat), lon: parseFloat(data.lon) });
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const fetchImage = async () => {
    try {
      const unsplashResponse = await axios.get('https://api.unsplash.com/photos/random', {
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
        },
        params: {
          query: place,
          orientation: 'landscape',
          count: 1
        }
      });

      const imageUrl = unsplashResponse.data[0]?.urls.regular;
      console.log("Image URL:", imageUrl);
      setImageUrl(imageUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleAddDayAfter = (index: number) => {
    const updatedDays = [...days];
    const nextDayDate = new Date(
      updatedDays[index].date.getTime() + 24 * 3600 * 1000,
    );

    if (
      index < updatedDays.length - 1 &&
      isSameDate(nextDayDate, updatedDays[index + 1].date)
    ) {
      return;
    }

    updatedDays.splice(index + 1, 0, { date: nextDayDate, details: "" });
    setDays(updatedDays);
  };

  const handleDeleteDay = (index: number) => {
    if (days.length === 1) {
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    calculateAndSetDays();
    await fetchCoordinates();
    await fetchImage();
  };

  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <div className="flex h-screen bg-blue-50">
      <div className="flex-1 overflow-y-auto p-8 w-1/2">
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

        {formSubmitted && imageUrl && (
            <div className="mb-6 relative">
              <img src={imageUrl} alt={place} className="w-96 h-64 rounded-lg shadow-md" />
              <div className="absolute left-2 top-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md">
                {place}
              </div>
            </div>
        )}

        {formSubmitted && days.length > 0 && (
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

      <div className="w-1/2">
        <div className="h-full">
          {formSubmitted && coordinates && (
            <MapComponent
              apiKey={process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY}
              lat={coordinates.lat}
              lon={coordinates.lon}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TripPlannerPage;
