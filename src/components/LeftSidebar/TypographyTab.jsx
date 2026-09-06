import React from 'react';
import { AVAILABLE_FONTS, AVAILABLE_THEMES } from '../../services/workspaceConstants.js';
import { Type, Sparkles, Palette, Check } from 'lucide-react';

export function TypographyTab({
  activeSlide,
  globalFont = 'Inter',
  currentTheme = 'abyssal-glow',
  onSelectTheme,
  onUpdateGlobalFont,
  onUpdateSlide
}) {
  const hasOverride = Boolean(activeSlide?.fontOverride);

  const handleGlobalFontChange = (e) => {
    onUpdateGlobalFont(e.target.value);
  };

  const handleToggleOverride = (e) => {
    const checked = e.target.checked;
    if (checked) {
      onUpdateSlide(activeSlide.id, { fontOverride: globalFont });
    } else {
      onUpdateSlide(activeSlide.id, { fontOverride: null });
    }
  };

  const handleSlideFontChange = (e) => {
    onUpdateSlide(activeSlide.id, { fontOverride: e.target.value });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Seletor de Temas de Cores & Estética Clean */}
      <div className="control-card">
        <label className="section-label">
          <Palette size={14} />
          Paleta de Cores & Estilo Visual
        </label>
        <span style={{ fontSize: '11px', color: 'var(--text-silver)' }}>
          Escolha entre temas minimalistas cleans ou bioluminescentes com destaque em Azul Celestial:
        </span>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
          {AVAILABLE_THEMES.map(theme => {
            const isSelected = currentTheme === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => onSelectTheme && onSelectTheme(theme.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  background: isSelected ? 'rgba(0, 163, 255, 0.14)' : 'rgba(0, 20, 19, 0.5)',
                  border: isSelected ? '1px solid #00A3FF' : '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: theme.preview,
                    border: '1px solid rgba(255,255,255,0.4)',
                    boxShadow: isSelected ? '0 0 6px ' + theme.preview : 'none',
                    flexShrink: 0
                  }}
                />
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: isSelected ? 600 : 400,
                    color: isSelected ? '#F0F7FF' : 'var(--text-platinum)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                  title={theme.name}
                >
                  {theme.name}
                </span>
                {isSelected && <Check size={12} color="#00A3FF" style={{ marginLeft: 'auto' }} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tipografia Global do Carrossel */}
      <div className="control-card">
        <label className="section-label">
          <Type size={14} />
          Família Tipográfica Global
        </label>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          Aplica-se por padrão a todos os slides do carrossel:
        </span>

        <select
          value={globalFont}
          onChange={handleGlobalFontChange}
          style={{ width: '100%', padding: '10px 12px', fontSize: '13px', marginTop: '6px' }}
        >
          {AVAILABLE_FONTS.map(font => (
            <option key={font.id} value={font.id} style={{ fontFamily: font.id }}>
              {font.name}
            </option>
          ))}
        </select>

        {/* Amostra visual */}
        <div
          style={{
            marginTop: '10px',
            padding: '12px',
            background: 'rgba(0, 15, 14, 0.5)',
            borderRadius: '6px',
            border: '1px solid var(--border-subtle)',
            fontFamily: globalFont,
            fontSize: '15px'
          }}
        >
          Aa Bb Cc Dd — Tipografia Global Ativa
        </div>
      </div>

      {/* Override de Fonte por Slide (Individual) */}
      {activeSlide && (
        <div className="control-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label className="section-label" style={{ margin: 0 }}>
              <Sparkles size={14} />
              Personalizar Fonte Neste Slide
            </label>
            <input
              type="checkbox"
              id="toggle-override"
              checked={hasOverride}
              onChange={handleToggleOverride}
              style={{ width: '16px', height: '16px', accentColor: 'var(--accent-biolum)', cursor: 'pointer' }}
            />
          </div>

          <p style={{ fontSize: '11px', color: 'var(--text-silver)', marginTop: '4px' }}>
            Ative para dar destaque tipográfico exclusivo ao slide ativo (ex: capa ou citação) sem alterar os demais slides.
          </p>

          {hasOverride && (
            <div style={{ marginTop: '8px' }}>
              <label style={{ fontSize: '11px', color: 'var(--accent-biolum)', fontWeight: '600' }}>
                Fonte Específica Deste Slide:
              </label>
              <select
                value={activeSlide.fontOverride || globalFont}
                onChange={handleSlideFontChange}
                style={{ width: '100%', padding: '10px 12px', fontSize: '13px', marginTop: '4px' }}
              >
                {AVAILABLE_FONTS.map(font => (
                  <option key={font.id} value={font.id} style={{ fontFamily: font.id }}>
                    {font.name}
                  </option>
                ))}
              </select>

              <div
                style={{
                  marginTop: '8px',
                  padding: '10px',
                  background: 'rgba(5, 255, 212, 0.06)',
                  borderRadius: '6px',
                  border: '1px solid rgba(5, 255, 212, 0.2)',
                  fontFamily: activeSlide.fontOverride,
                  fontSize: '14px',
                  color: 'var(--accent-biolum)'
                }}
              >
                Destaque Exclusivo: {activeSlide.fontOverride}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default TypographyTab;
