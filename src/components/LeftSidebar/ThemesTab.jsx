import React from 'react';
import { AVAILABLE_THEMES } from '../../services/workspaceConstants.js';
import { Palette, Check, Sparkles, Sun, Moon } from 'lucide-react';

export function ThemesTab({
  currentTheme = 'abyssal-glow',
  onSelectTheme
}) {
  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'bioluminescent': return 'Bioluminescente';
      case 'clean': return 'Clean & Editorial';
      case 'vibrant': return 'Vibrante';
      case 'dark': return 'Escuro';
      default: return 'Tema';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="control-card">
        <label className="section-label">
          <Palette size={14} />
          Paleta de Cores & Estilos Visuais
        </label>
        <span style={{ fontSize: '11px', color: 'var(--text-silver)', lineHeight: 1.4 }}>
          Selecione a harmonia cromática do carrossel. Destaques luminosos em Azul Celestial, fundos editoriais Clean Ivory e estética nórdica Scandinavian Slate.
        </span>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginTop: '12px' }}>
          {AVAILABLE_THEMES.map(theme => {
            const isSelected = currentTheme === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => onSelectTheme && onSelectTheme(theme.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'rgba(0, 163, 255, 0.14)' : 'rgba(0, 20, 19, 0.5)',
                  border: isSelected ? '1px solid #00A3FF' : '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: theme.preview,
                      border: isSelected ? '2px solid #FFFFFF' : '1px solid rgba(255,255,255,0.3)',
                      boxShadow: isSelected ? `0 0 10px ${theme.preview}` : 'none',
                      flexShrink: 0
                    }}
                  />
                  <div>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? '#F0F7FF' : 'var(--text-platinum)'
                    }}>
                      {theme.name}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-silver)', textTransform: 'capitalize' }}>
                      {getCategoryLabel(theme.category)}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#00A3FF', fontSize: '11px', fontWeight: 600 }}>
                    <Check size={14} /> Ativo
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ThemesTab;
