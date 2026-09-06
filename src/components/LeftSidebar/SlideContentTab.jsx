import React from 'react';
import { Type, AlignLeft, ArrowUp, ArrowDown, Plus, Trash2, Layout, Quote, ListOrdered, BarChart3, Sparkles, Check } from 'lucide-react';
import { SLIDE_TEMPLATES } from '../../services/workspaceConstants.js';

export function SlideContentTab({
  activeSlide,
  slides = [],
  onUpdateSlide,
  onAddSlide,
  onRemoveSlide,
  onReorderSlide,
  onApplyTemplateToAll
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
  const currentTemplate = activeSlide.slideTemplate || 'classic';

  const handleTextChange = (e) => {
    onUpdateSlide(activeSlide.id, { content: e.target.value });
  };

  const handleSubtextChange = (e) => {
    onUpdateSlide(activeSlide.id, { subtext: e.target.value });
  };

  const handleTypeChange = (e) => {
    onUpdateSlide(activeSlide.id, { type: e.target.value });
  };

  const handleTemplateSelect = (templateId) => {
    onUpdateSlide(activeSlide.id, { slideTemplate: templateId });
  };

  const handleApplyToAll = (templateId) => {
    if (onApplyTemplateToAll) {
      onApplyTemplateToAll(templateId);
    }
  };

  const getTemplateIcon = (iconName) => {
    switch (iconName) {
      case 'Quote': return <Quote size={14} />;
      case 'ListOrdered': return <ListOrdered size={14} />;
      case 'BarChart3': return <BarChart3 size={14} />;
      case 'Sparkles': return <Sparkles size={14} />;
      case 'Layout':
      default:
        return <Layout size={14} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Texto Principal do Slide */}
      <div className="control-card">
        <label className="section-label">
          <Type size={14} />
          Texto Principal (Slide {currentIndex + 1} de {totalSlides})
        </label>
        
        <textarea
          rows={5}
          value={activeSlide.content || ''}
          onChange={handleTextChange}
          placeholder="Texto principal ou gancho do slide..."
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '14px',
            lineHeight: 1.5,
            color: 'var(--text-platinum)',
            resize: 'vertical'
          }}
        />

        {/* Campo de Subtexto Independente (Hierarquia Tipográfica) */}
        <div style={{ marginTop: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-silver)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlignLeft size={13} /> Subtexto / Detalhamento (Opcional):
            </label>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              {(activeSlide.subtext || '').length}/280
            </span>
          </div>

          <textarea
            rows={3}
            value={activeSlide.subtext || ''}
            onChange={handleSubtextChange}
            placeholder="Subtítulo, explicação de apoio ou nota de contexto..."
            maxLength={280}
            style={{
              width: '100%',
              padding: '8px 10px',
              fontSize: '12px',
              lineHeight: 1.4,
              color: 'var(--text-silver)',
              background: 'rgba(0, 15, 14, 0.4)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
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

      {/* Catálogo de Templates Visuais de Slide */}
      <div className="control-card">
        <label className="section-label">
          <Layout size={14} />
          Template do Slide
        </label>
        
        <p style={{ fontSize: '11px', color: 'var(--text-silver)', marginTop: '2px', marginBottom: '8px' }}>
          Selecione uma diagramação visual específica para este slide:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
          {SLIDE_TEMPLATES.map((tmpl) => {
            const isSelected = currentTemplate === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => handleTemplateSelect(tmpl.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: isSelected ? 'rgba(0, 163, 255, 0.12)' : 'rgba(0, 20, 19, 0.5)',
                  border: isSelected ? '1px solid #00A3FF' : '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: isSelected ? '#00A3FF' : 'var(--text-silver)' }}>
                    {getTemplateIcon(tmpl.icon)}
                  </span>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: isSelected ? 600 : 500, color: isSelected ? '#F0F7FF' : 'var(--text-platinum)' }}>
                      {tmpl.name}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-silver)' }}>
                      {tmpl.description}
                    </div>
                  </div>
                </div>

                {isSelected && <Check size={14} color="#00A3FF" />}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => handleApplyToAll(currentTemplate)}
          className="btn-new-project"
          style={{ width: '100%', justifyContent: 'center', marginTop: '10px', fontSize: '11px' }}
        >
          Aplicar este template a todos os slides
        </button>
      </div>

      {/* Organização & Ações do Slide */}
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
