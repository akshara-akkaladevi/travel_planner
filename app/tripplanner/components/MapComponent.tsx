// components/MapComponent.tsx
'use client'
import React from 'react';

interface MapComponentProps {
  apiKey: any;
}

const MapComponent: React.FC<MapComponentProps> = ({ apiKey }) => {
  return (
    <div className="centered">
      <iframe
        width="600"
        height="400"
        frameBorder="0"
        src={`https://maps.locationiq.com/v3/staticmap?key=${apiKey}&center=48.8584,2.2945&zoom=10&size=400x300&format=png`}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MapComponent;
