import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <img
        src={new URL(`../assets/images/${images[currentImageIndex]}`, import.meta.url).href}
        alt={`Gallery Image ${currentImageIndex + 1}`}
        className="w-auto h-[300px] lg:h-[450px] object-cover rounded-lg"
      />
      <button
        onClick={handlePrevClick}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-almond text-white p-1 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={handleNextClick}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-almond text-white p-1 rounded-full"
      >
        &#10095;
      </button>
    </div>
  );
};

export default ImageGallery;
