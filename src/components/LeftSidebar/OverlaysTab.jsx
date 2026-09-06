import React, { useState, useRef } from 'react';
import { CURATED_ICONS, GRID_ANCHORS } from '../../services/workspaceConstants.js';
import * as LucideIcons from 'lucide-react';
import { Trash2, Plus, Upload, Palette } from 'lucide-react';

export function OverlaysTab({
  activeSlide,
  onAddOverlay,
  onUpdateOverlay,
  onRemoveOverlay
}) {
  const fileInputRef = useRef(null);
  const [selectedAnchor, setSelectedAnchor] = useState('top-right');
  const [elementSize, setElementSize] = useState(48);
  const [iconColor, setIconColor] = useState('#05ffd4');

  if (!activeSlide) {
    return <div style={{ color: 'var(--text-silver)', padding: '20px 0' }}>Nenhum slide selecionado.</div>;
  }

  const overlays = activeSlide.overlays || [];

  const handleSelectIcon = (iconName) => {
    onAddOverlay(activeSlide.id, 'icon', iconName, selectedAnchor, elementSize, iconColor);
  };

  const handleCustomImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      if (base64) {
        onAddOverlay(activeSlide.id, 'image', base64, selectedAnchor, elementSize);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Matriz 3x3 de Âncoras de Grade */}
      <div className="control-card">
        <label className="section-label">
          Posicionamento na Grade de 9 Âncoras
        </label>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          Clique na região do slide onde deseja fixar o elemento:
        </span>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="grid-3x3-selector">
            {GRID_ANCHORS.map((anchor) => (
              <button
                key={anchor.id}
                type="button"
                className={`grid-anchor-btn ${selectedAnchor === anchor.id ? 'active' : ''}`}
                onClick={() => setSelectedAnchor(anchor.id)}
                title={anchor.title}
              >
                {anchor.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ajuste de Tamanho (Escala) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-silver)' }}>Tamanho do Elemento:</span>
          <span style={{ fontSize: '12px', color: 'var(--accent-biolum)', fontWeight: 'bold' }}>
            {elementSize}px
          </span>
        </div>
        <input
          type="range"
          min="24"
          max="180"
          step="4"
          value={elementSize}
          onChange={(e) => setElementSize(parseInt(e.target.value, 10))}
          style={{ width: '100%', accentColor: 'var(--accent-biolum)', cursor: 'pointer' }}
        />

        {/* Cor do Ícone */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-silver)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Palette size={14} /> Cor do Ícone:
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {['#05ffd4', '#f5f7fa', '#c084fc', '#f43f5e', '#38bdf8', '#eab308'].map(c => (
              <div
                key={c}
                onClick={() => setIconColor(c)}
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: c,
                  cursor: 'pointer',
                  border: iconColor === c ? '2px solid white' : '1px solid rgba(0,0,0,0.5)',
                  boxShadow: iconColor === c ? '0 0 6px white' : 'none'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Catálogo Curado de Ícones Lucide */}
      <div className="control-card">
        <label className="section-label">
          Catálogo Curado de Ícones Vetoriais
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginTop: '4px' }}>
          {CURATED_ICONS.map((iconDef) => {
            const IconComponent = LucideIcons[iconDef.id] || LucideIcons.Sparkles;
            return (
              <button
                key={iconDef.id}
                type="button"
                onClick={() => handleSelectIcon(iconDef.id)}
                style={{
                  padding: '10px 4px',
                  background: 'rgba(0, 20, 19, 0.7)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'var(--text-platinum)'
                }}
                title={`Inserir ${iconDef.label}`}
              >
                <IconComponent size={20} color={iconColor} />
                <span style={{ fontSize: '9px', color: 'var(--text-silver)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '46px' }}>
                  {iconDef.id}
                </span>
              </button>
            );
          })}
        </div>

        {/* Upload de Imagem Menor / Selo Customizado */}
        <div style={{ marginTop: '12px' }}>
          <button
            type="button"
            className="btn-new-project"
            onClick={() => fileInputRef.current?.click()}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Upload size={14} /> Carregar Imagem Menor / Selo (PNG/SVG)
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleCustomImage}
            accept="image/png,image/svg+xml,image/webp"
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {/* Gerenciador de Overlays Ativos no Slide */}
      {overlays.length > 0 && (
        <div className="control-card">
          <label className="section-label">
            Elementos Inseridos Neste Slide ({overlays.length}/5)
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {overlays.map((ov, idx) => (
              <div
                key={ov.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  background: 'rgba(0, 15, 14, 0.6)',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600' }}>
                    {ov.type === 'icon' ? `Ícone: ${ov.iconName}` : `Imagem Customizada`}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--accent-biolum)' }}>
                    ({ov.anchor} • {ov.size}px)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveOverlay(activeSlide.id, ov.id)}
                  style={{
                    color: '#f43f5e',
                    padding: '4px',
                    borderRadius: '4px'
                  }}
                  title="Remover elemento"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default OverlaysTab;
