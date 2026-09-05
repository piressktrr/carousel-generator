export const textSegmenter = {
  segmentText(text, maxCharsPerSlide = 250) {
    if (!text) return [];
    const paragraphs = text.split('\n').filter(p => p.trim().length > 0);
    const slides = [];
    
    // First paragraph is always a hook/cover if it's short, or just the first slide
    let currentSlide = '';
    
    paragraphs.forEach(p => {
      if ((currentSlide.length + p.length) > maxCharsPerSlide && currentSlide.length > 0) {
        slides.push(currentSlide.trim());
        currentSlide = p;
      } else {
        currentSlide += (currentSlide.length > 0 ? '\n\n' : '') + p;
      }
    });
    
    if (currentSlide.trim().length > 0) {
      slides.push(currentSlide.trim());
    }
    
    return slides.map((content, index) => ({
      id: `slide-${Date.now()}-${index}`,
      content,
      isCover: index === 0,
      isCTA: index === slides.length - 1 && slides.length > 1
    }));
  }
};
