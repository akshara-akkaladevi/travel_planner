// components/MapComponent.tsx
"use client";
import React from "react";

interface MapComponentProps {
  apiKey: any;
}

const MapComponent: React.FC<MapComponentProps> = ({ apiKey }) => {
  return (
    <div className="flex justify-center items-center">
      <iframe
        width="400"
        height="300"
        src={`https://maps.locationiq.com/v3/staticmap?key=${apiKey}&center=48.8584,2.2945&zoom=10&size=400x300&format=png`}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MapComponent;
