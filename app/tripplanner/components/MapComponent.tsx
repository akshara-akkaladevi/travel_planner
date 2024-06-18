// components/MapComponent.tsx
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl, { Marker as MapMarker } from 'maplibre-gl'; // Import Marker as MapMarker

interface Location {
  name: string;
  lat: number;
  lon: number;
}

// Export Marker interface here
export interface Marker {
  lat: number;
  lon: number;
  startTime: string;
  endTime: string;
  place: string;
}

interface MapComponentProps {
  apiKey: any;
  place: string;
  markers: Marker[]; // Receive markers as props
}

const MapComponent: React.FC<MapComponentProps> = ({ apiKey, place, markers }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(`https://us1.locationiq.com/v1/search.php`, {
          params: {
            key: apiKey,
            q: place,
            format: "json"
          }
        });
        const data = response.data.map((item: any) => ({
          name: item.display_name,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon)
        }));
        setLocations(data);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    if (place) {
      fetchCoordinates();
    }
  }, [place, apiKey]);

  useEffect(() => {
    if (mapContainer.current && locations.length > 0) {
      if (map) {
        map.remove();
        setMap(null);
      }

      const initialMap = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://tiles.locationiq.com/v3/streets/vector.json?key=' + apiKey, // Style URL for tiles
        center: [locations[0].lon, locations[0].lat], // Initial center coordinates
        zoom: 12, // Initial zoom level
      });

      locations.forEach((location) => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(https://tiles.locationiq.com/static/images/marker50px.png)';
        el.style.width = '50px';
        el.style.height = '50px';

        new maplibregl.Marker(el)
          .setLngLat([location.lon, location.lat])
          .setPopup(new maplibregl.Popup().setText(location.name)) // Add popup
          .addTo(initialMap);
      });

      // Add markers from props
      markers.forEach((marker) => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(https://tiles.locationiq.com/static/images/marker50px.png)';
        el.style.width = '50px';
        el.style.height = '50px';

        new maplibregl.Marker(el)
          .setLngLat([marker.lon, marker.lat])
          .setPopup(new maplibregl.Popup().setText(marker.place)) // Add popup with marker place
          .addTo(initialMap);
      });

      setMap(initialMap);
    }
  }, [locations, apiKey, markers]);

  return <div ref={mapContainer} className="h-96 w-full rounded-lg shadow-md"></div>;
};

export default MapComponent;
