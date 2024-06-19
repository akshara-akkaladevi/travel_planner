import { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Place {
  name: string;
}

const AISuggestion: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    async function fetchPlaces() {
      const destination = "Delhi";
      const travelers = "4";
      const travelStyle = "couple";

      try {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) {
          throw new Error('API key is missing');
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const prompt = `Destination: ${destination} Travelers: ${travelers} Travel style: ${travelStyle} return ONLY a json object consisting of only potential places that might be a great fit for me in the above destination don't add anything extra`;
        const model = await genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = await response.text();

        const data = JSON.parse(text);
        if (data && data.Places) {
          setPlaces(data.Places as Place[]);
        }
      } catch (error) {
        console.error('Error generating places:', error);
      }
    }

    fetchPlaces();
  }, []);

  return (
    <div>
      <h1>Potential Places in Destination</h1>
      <ul>
        {places.map((place, index) => (
          <li key={index}>
            <h2>{place.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AISuggestion;
