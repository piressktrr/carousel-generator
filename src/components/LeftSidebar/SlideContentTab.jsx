import React from 'react';
import { Type, ArrowUp, ArrowDown, Plus, Trash2 } from 'lucide-react';

export function SlideContentTab({
  activeSlide,
  slides = [],
  onUpdateSlide,
  onAddSlide,
  onRemoveSlide,
  onReorderSlide
}) {
  if (!activeSlide) {
    return (
      <div style={{ color: 'var(--text-silver)', textAlign: 'center', padding: '24px 0' }}>
        Nenhum slide selecionado.
      </div>
    );
  }

  const currentIndex = slides.findIndex(s => s.id === activeSlide.id);
  const totalSlides = slides.length;

  const handleTextChange = (e) => {
    onUpdateSlide(activeSlide.id, { content: e.target.value });
  };

  const handleTypeChange = (e) => {
    onUpdateSlide(activeSlide.id, { type: e.target.value });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="control-card">
        <label className="section-label">
          <Type size={14} />
          Texto do Slide {currentIndex + 1} de {totalSlides}
        </label>
        
        <textarea
          rows={6}
          value={activeSlide.content || ''}
          onChange={handleTextChange}
          placeholder="Conteúdo do slide..."
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '14px',
            lineHeight: 1.5,
            color: 'var(--text-platinum)',
            resize: 'vertical'
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
          <label style={{ fontSize: '12px', color: 'var(--text-silver)' }}>
            Tipo de Slide:
          </label>
          <select
            value={activeSlide.type || 'content'}
            onChange={handleTypeChange}
            style={{ padding: '6px 10px', fontSize: '12px' }}
          >
            <option value="cover">Capa / Gancho</option>
            <option value="content">Conteúdo Principal</option>
            <option value="cta">Chamada para Ação (CTA)</option>
          </select>
        </div>
      </div>

      <div className="control-card">
        <label className="section-label">
          Organização & Ações do Slide
        </label>
        
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-new-project"
            disabled={currentIndex === 0}
            onClick={() => onReorderSlide && onReorderSlide(activeSlide.id, 'up')}
            style={{ flex: 1, justifyContent: 'center', opacity: currentIndex === 0 ? 0.4 : 1 }}
          >
            <ArrowUp size={14} />
            Mover para Cima
          </button>

          <button
            type="button"
            className="btn-new-project"
            disabled={currentIndex === totalSlides - 1}
            onClick={() => onReorderSlide && onReorderSlide(activeSlide.id, 'down')}
            style={{ flex: 1, justifyContent: 'center', opacity: currentIndex === totalSlides - 1 ? 0.4 : 1 }}
          >
            <ArrowDown size={14} />
            Mover para Baixo
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <button
            type="button"
            onClick={() => onAddSlide && onAddSlide(currentIndex)}
            style={{
              flex: 1,
              padding: '8px 12px',
              background: 'rgba(5, 255, 212, 0.1)',
              border: '1px solid rgba(5, 255, 212, 0.3)',
              color: 'var(--accent-biolum)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontWeight: '600',
              fontSize: '12px'
            }}
          >
            <Plus size={14} />
            Adicionar Slide
          </button>

          {totalSlides > 1 && (
            <button
              type="button"
              onClick={() => onRemoveSlide && onRemoveSlide(activeSlide.id)}
              style={{
                padding: '8px 12px',
                background: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                color: '#f43f5e',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontSize: '12px'
              }}
              title="Excluir este slide"
            >
              <Trash2 size={14} />
              Excluir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default SlideContentTab;
