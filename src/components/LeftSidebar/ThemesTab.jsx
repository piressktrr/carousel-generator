import React, { useState } from 'react';
import { AVAILABLE_THEMES } from '../../services/workspaceConstants.js';
import { CustomThemeBuilder } from './CustomThemeBuilder.jsx';
import { Palette, Check, Plus, Trash2 } from 'lucide-react';

export function ThemesTab({
  currentTheme = 'abyssal-glow',
  customThemes = [],
  onSelectTheme,
  onSaveCustomTheme,
  onDeleteCustomTheme
}) {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'custom': return 'Personalizado';
      case 'bioluminescent': return 'Bioluminescente';
      case 'clean': return 'Clean & Editorial';
      case 'vibrant': return 'Vibrante';
      case 'dark': return 'Escuro';
      default: return 'Tema';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 1. Temas Personalizados & Criador Manual */}
      <div className="control-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label className="section-label" style={{ marginBottom: 0 }}>
            <Palette size={14} />
            Temas Personalizados
          </label>
          {!isBuilderOpen && (
            <button
              type="button"
              onClick={() => setIsBuilderOpen(true)}
              style={{
                background: 'rgba(0, 163, 255, 0.12)',
                border: '1px solid rgba(0, 163, 255, 0.3)',
                color: '#00A3FF',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 8px',
                fontSize: '11px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              <Plus size={13} />
              Criar Novo Tema
            </button>
          )}
        </div>

        {/* Painel do Criador de Tema (quando aberto) */}
        {isBuilderOpen && (
          <CustomThemeBuilder
            onSaveTheme={(newTheme) => {
              onSaveCustomTheme && onSaveCustomTheme(newTheme);
              onSelectTheme && onSelectTheme(newTheme.id);
              setIsBuilderOpen(false);
            }}
            onCancel={() => setIsBuilderOpen(false)}
          />
        )}

        {/* Lista de temas criados */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginTop: '12px' }}>
          {customThemes.length === 0 && !isBuilderOpen && (
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Nenhum tema personalizado criado. Clique em "Criar Novo Tema" para personalizar gradientes ou cores sólidas.
            </span>
          )}

          {customThemes.map(theme => {
            const isSelected = currentTheme === theme.id;
            return (
              <div
                key={theme.id}
                className={`theme-item-card ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectTheme && onSelectTheme(theme.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    className="theme-preview-swatch"
                    style={{
                      background: theme.bg || theme.preview,
                      border: isSelected ? '2px solid #FFFFFF' : '1px solid rgba(255,255,255,0.3)',
                      boxShadow: isSelected ? `0 0 10px ${theme.preview || '#00A3FF'}` : 'none'
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

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isSelected && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#00A3FF', fontSize: '11px', fontWeight: 600 }}>
                      <Check size={14} /> Ativo
                    </span>
                  )}
                  <button
                    type="button"
                    className="theme-delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Excluir o tema "${theme.name}"?`)) {
                        onDeleteCustomTheme && onDeleteCustomTheme(theme.id);
                      }
                    }}
                    title="Excluir tema personalizado"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Temas Nativos do Sistema */}
      <div className="control-card">
        <label className="section-label">
          <Palette size={14} />
          Temas do Sistema
        </label>
        <span style={{ fontSize: '11px', color: 'var(--text-silver)', lineHeight: 1.4 }}>
          Paletas curadas pré-definidas para leitura rápida e contraste profissional.
        </span>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginTop: '12px' }}>
          {AVAILABLE_THEMES.map(theme => {
            const isSelected = currentTheme === theme.id;
            return (
              <div
                key={theme.id}
                className={`theme-item-card ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectTheme && onSelectTheme(theme.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    className="theme-preview-swatch"
                    style={{
                      backgroundColor: theme.preview,
                      border: isSelected ? '2px solid #FFFFFF' : '1px solid rgba(255,255,255,0.3)',
                      boxShadow: isSelected ? `0 0 10px ${theme.preview}` : 'none'
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
