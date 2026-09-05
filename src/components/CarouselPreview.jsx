import React from 'react';
import SlideCard from './SlideCard';

export default function CarouselPreview({ slides, updateSlide, removeSlide, profile, theme }) {
  if (!slides || slides.length === 0) return null;

  return (
    <div className="carousel-preview" style={{ display: 'flex', overflowX: 'auto', gap: '20px', padding: '20px', background: '#e0e0e0', minHeight: '400px' }}>
      {slides.map((slide, index) => (
        <SlideCard 
          key={slide.id} 
          slide={slide} 
          index={index} 
          total={slides.length}
          onChange={(newContent) => updateSlide(slide.id, newContent)}
          onRemove={() => removeSlide(slide.id)}
          profile={profile}
          theme={theme}
        />
      ))}
    </div>
  );
}
