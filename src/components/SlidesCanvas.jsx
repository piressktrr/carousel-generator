import React, { useRef, useEffect } from 'react';
import { SlideCard } from './SlideCard.jsx';
import { Layers, ChevronLeft, ChevronRight, PanelLeft, AlignLeft, Smartphone, Square } from 'lucide-react';

export function SlidesCanvas({
  slides = [],
  activeSlideId,
  globalFont = 'Inter',
  profile = null,
  currentTheme = 'abyssal-glow',
  themeInlineStyles = {},
  aspectRatio = '4:5',
  onToggleAspectRatio,
  onSelectSlide,
  renderTopRight = null,
  isLeftSidebarOpen = true,
  onToggleLeftSidebar,
  isRightSidebarOpen = false,
  onToggleRightSidebar
}) {
  const stageRef = useRef(null);
  const activeIndex = slides.findIndex(s => s.id === activeSlideId);
  const currentSlideNumber = activeIndex >= 0 ? activeIndex + 1 : 1;

  // Rola o canvas suavemente para o slide ativo quando este mudar
  useEffect(() => {
    if (!stageRef.current || !activeSlideId) return;
    const activeElem = stageRef.current.querySelector(`[data-slide-id="${activeSlideId}"]`);
    if (activeElem) {
      activeElem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeSlideId]);

  // Suporte a navegação fluida por setas do teclado (Esquerda / Direita)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeTag = document.activeElement?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag)) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIdx = activeIndex + 1;
        if (nextIdx < slides.length && onSelectSlide) {
          onSelectSlide(slides[nextIdx].id);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIdx = activeIndex - 1;
        if (prevIdx >= 0 && onSelectSlide) {
          onSelectSlide(slides[prevIdx].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, slides, onSelectSlide]);

  const handleStepSlide = (direction) => {
    if (direction === 'prev') {
      const prevIdx = Math.max(0, activeIndex - 1);
      if (slides[prevIdx] && onSelectSlide) onSelectSlide(slides[prevIdx].id);
    } else {
      const nextIdx = Math.min(slides.length - 1, activeIndex + 1);
      if (slides[nextIdx] && onSelectSlide) onSelectSlide(slides[nextIdx].id);
    }
  };

  return (
    <main className="slides-canvas-container" data-theme={currentTheme} style={themeInlineStyles}>
      {/* Barra de Topo do Palco */}
      <header className="workspace-top-bar">
        {/* Lado Esquerdo: Toggle da Barra Lateral & Identificação */}
        <div className="top-bar-meta">
          {onToggleLeftSidebar && (
            <button
              type="button"
              className={`sidebar-toggle-btn ${isLeftSidebarOpen ? 'active' : ''}`}
              onClick={onToggleLeftSidebar}
              title={isLeftSidebarOpen ? "Ocultar barra de ferramentas esquerda" : "Exibir barra de ferramentas esquerda"}
            >
              <PanelLeft size={16} />
              <span>Painel</span>
            </button>
          )}

          <div className="top-bar-brand-group">
            <Layers size={18} color="var(--accent-biolum)" />
            <span className="top-bar-title">Palco de Lâminas</span>
          </div>
        </div>

        {/* Centro: Seletor de Proporção (4:5 / 1:1) & Contador Dinâmico de Slides */}
        <div className="top-bar-center-controls">
          {onToggleAspectRatio && (
            <div className="aspect-ratio-selector" role="group" aria-label="Proporção dos Slides">
              <button
                type="button"
                className={`ratio-btn ${aspectRatio === '4:5' ? 'active' : ''}`}
                onClick={() => onToggleAspectRatio('4:5')}
                title="Proporção Retrato Vertical (4:5 - 1080×1350)"
              >
                <Smartphone size={13} />
                <span>4:5</span>
              </button>
              <button
                type="button"
                className={`ratio-btn ${aspectRatio === '1:1' ? 'active' : ''}`}
                onClick={() => onToggleAspectRatio('1:1')}
                title="Proporção Quadrada (1:1 - 1080×1080)"
              >
                <Square size={13} />
                <span>1:1</span>
              </button>
            </div>
          )}

          <div className="slide-counter-badge" title="Posição do slide selecionado">
            <span>Slide</span>
            <span className="counter-current">{currentSlideNumber}</span>
            <span className="counter-sep">/</span>
            <span>{slides.length}</span>
          </div>
        </div>

        {/* Lado Direito: Ações de Exportação e Drawer de Roteiro */}
        <div className="top-bar-actions">
          {renderTopRight}

          {onToggleRightSidebar && (
            <button
              type="button"
              className={`sidebar-toggle-btn ${isRightSidebarOpen ? 'active' : ''}`}
              onClick={onToggleRightSidebar}
              title={isRightSidebarOpen ? "Ocultar roteiro bruto" : "Exibir roteiro na barra lateral direita"}
            >
              <AlignLeft size={16} />
              <span>Roteiro</span>
            </button>
          )}
        </div>
      </header>

      {/* Palco Central com Faixa Contínua Dinâmica de Slides */}
      <div className="slides-stage" ref={stageRef}>
        {slides.map((slide, idx) => (
          <SlideCard
            key={slide.id}
            slide={slide}
            index={idx}
            total={slides.length}
            globalFont={globalFont}
            profile={profile}
            themeInlineStyles={themeInlineStyles}
            aspectRatio={aspectRatio}
            isActive={slide.id === activeSlideId}
            onSelect={() => onSelectSlide(slide.id)}
          />
        ))}
      </div>

      {/* Botões Flutuantes de Navegação Direcional e Atalhos */}
      {slides.length > 1 && (
        <nav className="canvas-nav-overlay" aria-label="Navegação de Slides">
          <button
            type="button"
            className="canvas-nav-btn"
            onClick={() => handleStepSlide('prev')}
            disabled={activeIndex <= 0}
            title="Lâmina anterior (Seta para a esquerda)"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="canvas-nav-btn"
            onClick={() => handleStepSlide('next')}
            disabled={activeIndex >= slides.length - 1}
            title="Próxima lâmina (Seta para a direita)"
          >
            <ChevronRight size={20} />
          </button>
        </nav>
      )}
    </main>
  );
}
export default SlidesCanvas;
