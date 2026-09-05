import React, { useRef } from 'react';
import { Upload, Trash2, ArrowUp, ArrowDown, SplitSquareVertical, SplitSquareHorizontal } from 'lucide-react';

export function ImageDockingTab({
  activeSlide,
  onSetDockedImage,
  onRemoveDockedImage
}) {
  const fileInputRef = useRef(null);

  if (!activeSlide) {
    return <div style={{ color: 'var(--text-silver)', padding: '20px 0' }}>Nenhum slide selecionado.</div>;
  }

  const docked = activeSlide.dockedImage;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      if (base64) {
        onSetDockedImage(
          activeSlide.id,
          base64,
          docked?.position || 'top',
          docked?.scale || 1.0
        );
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePositionChange = (position) => {
    if (!docked?.src) return;
    onSetDockedImage(activeSlide.id, docked.src, position, docked.scale || 1.0);
  };

  const handleScaleChange = (e) => {
    if (!docked?.src) return;
    const newScale = parseFloat(e.target.value);
    onSetDockedImage(activeSlide.id, docked.src, docked.position || 'top', newScale);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Upload de Imagem */}
      <div className="control-card">
        <label className="section-label">
          Imagem Principal de Destaque
        </label>

        {docked && docked.src ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                width: '100%',
                height: '120px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
                background: '#000'
              }}
            >
              <img
                src={docked.src}
                alt="Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="btn-new-project"
                onClick={() => fileInputRef.current?.click()}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Upload size={14} /> Trocar Imagem
              </button>
              <button
                type="button"
                onClick={() => onRemoveDockedImage(activeSlide.id)}
                style={{
                  padding: '6px 12px',
                  background: 'rgba(244, 63, 94, 0.15)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  color: '#f43f5e',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px'
                }}
                title="Remover imagem do slide"
              >
                <Trash2 size={14} /> Remover
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: '2px dashed var(--border-subtle)',
              borderRadius: '8px',
              padding: '24px 16px',
              textAlign: 'center',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-silver)',
              transition: 'var(--transition-smooth)'
            }}
          >
            <Upload size={24} color="var(--accent-biolum)" />
            <span style={{ fontSize: '13px', fontWeight: '500' }}>Carregar Imagem de Destaque</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>PNG, JPG ou WebP (máx. 10MB)</span>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>

      {/* Modos de Ancoragem Estruturada (4 Modos) */}
      {docked && docked.src && (
        <>
          <div className="control-card">
            <label className="section-label">
              Modo de Ancoragem Estruturada (Docking)
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              <button
                type="button"
                className={`sidebar-tab-btn ${docked.position === 'top' ? 'active' : ''}`}
                onClick={() => handlePositionChange('top')}
                style={{
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  padding: '10px'
                }}
              >
                <ArrowUp size={16} />
                <span>Superior (Topo)</span>
              </button>

              <button
                type="button"
                className={`sidebar-tab-btn ${docked.position === 'bottom' ? 'active' : ''}`}
                onClick={() => handlePositionChange('bottom')}
                style={{
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  padding: '10px'
                }}
              >
                <ArrowDown size={16} />
                <span>Inferior (Base)</span>
              </button>

              <button
                type="button"
                className={`sidebar-tab-btn ${docked.position === 'left' ? 'active' : ''}`}
                onClick={() => handlePositionChange('left')}
                style={{
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  padding: '10px'
                }}
              >
                <SplitSquareVertical size={16} />
                <span>Metade Esquerda</span>
              </button>

              <button
                type="button"
                className={`sidebar-tab-btn ${docked.position === 'right' ? 'active' : ''}`}
                onClick={() => handlePositionChange('right')}
                style={{
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  padding: '10px'
                }}
              >
                <SplitSquareHorizontal size={16} />
                <span>Metade Direita</span>
              </button>
            </div>
          </div>

          {/* Controle de Escala / Zoom */}
          <div className="control-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="section-label" style={{ margin: 0 }}>
                Escala / Zoom da Imagem
              </label>
              <span style={{ fontSize: '12px', color: 'var(--accent-biolum)', fontWeight: 'bold' }}>
                {Math.round((docked.scale || 1.0) * 100)}%
              </span>
            </div>

            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.05"
              value={docked.scale || 1.0}
              onChange={handleScaleChange}
              style={{ width: '100%', accentColor: 'var(--accent-biolum)', cursor: 'pointer' }}
            />
          </div>
        </>
      )}
    </div>
  );
}
export default ImageDockingTab;
