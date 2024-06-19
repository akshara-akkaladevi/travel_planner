// TravelSuggestions.tsx
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

interface Place {
  name: string;
  imageUrl: string | null;
}

interface TravelSuggestionsProps {
  destination: string;
  numParticipants: number;
  travelStyle: string;
}
const TravelSuggestions: React.FC<TravelSuggestionsProps> = ({ destination, numParticipants, travelStyle }) => {
  const [places, setPlaces] = useState<Place[]>([]);

  const fetchImagesForPlaces = async (places: Place[]) => {
    const promises = places.map(async (place) => {
      try {
        console.log(destination);
        const unsplashResponse = await axios.get('https://api.unsplash.com/photos/random', {
          headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
          },
          params: {
            query: place.name,
            orientation: 'landscape',
            count: 1
          }
        });

        const imageUrl = unsplashResponse.data[0]?.urls.regular;
        console.log(`Fetched image for ${place.name}:`, imageUrl);

        return { ...place, imageUrl };
      } catch (error) {
        console.error(`Error fetching image for ${place.name}:`, error);
        return place;
      }
    });

    const updatedPlaces = await Promise.all(promises);
    return updatedPlaces;
  };

  const fetchPlacesAndImages = useCallback(async () => {
    try {
      const response = await fetch("/api/genai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Destination: ${destination} Travelers: ${numParticipants} Travel style: ${travelStyle} return ONLY a ARRAY LIST consisting of only pure potential places names(more than 5) that might be a great fit for me in the above destination don't add description in the response`,
            },
          ],
        }),
      });

      const text = await response.text(); 

      let cleanedText = text.replace(/["0:]/g, '');
      const placeList = cleanedText.split('-')
        .map(place => place.trim())
        .map(place => place.replace(/\n/g, ''))
        .map(place => place.slice(0, -2))
        .filter(place => place !== '')
        .map(name => ({ name, imageUrl: null }));

      const updatedPlaces = await fetchImagesForPlaces(placeList);
      setPlaces(updatedPlaces); 
    } catch (error) {
      console.error("Error generating places:", error);
    }
  }, [destination, numParticipants, travelStyle]);

  useEffect(() => {
    fetchPlacesAndImages();
  }, [fetchPlacesAndImages]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Travel Suggestions</h1>
      <div className="flex flex-wrap">
        {places.map((place, index) => (
          <Card key={index} place={place} />
        ))}
      </div>
    </div>
  );
};

interface CardProps {
  place: Place;
}

const Card: React.FC<CardProps> = ({ place }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-3">
      {place.imageUrl && (
        <ImageDisplay imageUrl={place.imageUrl} alt={place.name} />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{place.name}</div>
      </div>
    </div>
  );
};

const ImageDisplay: React.FC<{ imageUrl: string; alt: string }> = ({ imageUrl, alt }) => (
  <div className="w-full h-64 rounded-md overflow-hidden">
    <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
  </div>
);

export default TravelSuggestions;
