// components/MapComponent.tsx
"use client";
// app/tripplanner/components/MapComponent.tsx
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  apiKey: any;
  lat: number;
  lon: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ apiKey, lat, lon }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const loadMap = async () => {
      const L = await import("leaflet");

      if (!mapRef.current) {
        mapRef.current = L.map("map").setView([lat, lon], 13);

        L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapRef.current);

        L.marker([lat, lon]).addTo(mapRef.current)
          .bindPopup('Location')
          .openPopup();
      }
    };

    if (typeof window !== "undefined") {
      loadMap();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lon]);

  return <div id="map" className="h-96 w-full rounded-lg shadow-md"></div>;
};

export default MapComponent;
