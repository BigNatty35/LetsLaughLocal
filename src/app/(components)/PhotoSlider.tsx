"use client"
import React, { useState } from 'react';
import { eventType, ApprovalStatus, EventArray } from '../types';

interface PhotoSliderProps {
  events: Event[];
}

const PhotoSlider: React.FC<PhotoSliderProps> = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  return (
    <div className="relative">
      <button className="absolute left-0 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white" onClick={prevSlide}>
        Previous
      </button>
      <button className="absolute right-0 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white" onClick={nextSlide}>
        Next
      </button>
      {/* <img className="w-full" src={events[currentIndex]} alt={`Slide ${currentIndex + 1}`} /> */}
    </div>
  );
};

export default PhotoSlider;