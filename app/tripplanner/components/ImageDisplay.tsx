import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ImageDisplayProps {
  destination: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ destination }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const unsplashResponse = await axios.get('https://api.unsplash.com/photos/random', {
          headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
          },
          params: {
            query: destination,
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

    fetchImage();

    // Cleanup function to cancel any ongoing requests if component unmounts or if destination changes
    return () => {
      // Implement cancellation logic if needed
    };
  }, [destination]);

  if (!imageUrl) {
    return null; // You can render a placeholder or loading indicator here if needed
  }

  return <img src={imageUrl} alt={destination} className="w-full h-full object-cover" />;
};

export default ImageDisplay;
