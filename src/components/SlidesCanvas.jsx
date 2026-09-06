import React, { useRef, useEffect } from 'react';
import { SlideCard } from './SlideCard.jsx';
import { Layers, ChevronLeft, ChevronRight } from 'lucide-react';

export function SlidesCanvas({
  slides = [],
  activeSlideId,
  globalFont = 'Inter',
  profile = null,
  currentTheme = 'abyssal-glow',
  onSelectSlide,
  renderTopRight = null
}) {
  const stageRef = useRef(null);

  // Rola o canvas suavemente para o slide ativo quando este mudar
  useEffect(() => {
    if (!stageRef.current || !activeSlideId) return;
    const activeElem = stageRef.current.querySelector(`[data-slide-id="${activeSlideId}"]`);
    if (activeElem) {
      activeElem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeSlideId]);

  const handleScroll = (direction) => {
    if (!stageRef.current) return;
    const scrollAmount = 420;
    stageRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <main className="slides-canvas-container" data-theme={currentTheme}>
      {/* Barra de Topo do Palco */}
      <header className="workspace-top-bar">
        <div className="top-bar-meta">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-platinum)' }}>
            <Layers size={18} color="var(--accent-biolum)" />
            <span style={{ fontWeight: '700', fontSize: '14px' }}>Palco de Slides</span>
          </div>
          <span className="slide-count-badge">
            {slides.length} {slides.length === 1 ? 'slide gerado' : 'slides gerados'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Ações adicionais (ex: ExportToolbar) */}
          {renderTopRight}
        </div>
      </header>

      {/* Palco Central com Rolagem Horizontal de Slides */}
      <div className="slides-stage" ref={stageRef}>
        {slides.map((slide, idx) => (
          <SlideCard
            key={slide.id}
            slide={slide}
            index={idx}
            total={slides.length}
            globalFont={globalFont}
            profile={profile}
            isActive={slide.id === activeSlideId}
            onSelect={() => onSelectSlide(slide.id)}
          />
        ))}
      </div>

      {/* Botões de Rolagem Rápida */}
      {slides.length > 2 && (
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            display: 'flex',
            gap: '8px',
            zIndex: 15
          }}
        >
          <button
            type="button"
            onClick={() => handleScroll('left')}
            style={{
              padding: '10px',
              background: 'rgba(0, 20, 19, 0.85)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '50%',
              color: 'var(--text-platinum)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Rolar para a esquerda"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            style={{
              padding: '10px',
              background: 'rgba(0, 20, 19, 0.85)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '50%',
              color: 'var(--text-platinum)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Rolar para a direita"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </main>
  );
}
export default SlidesCanvas;
