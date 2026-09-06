import React from 'react';
import { AVAILABLE_FONTS } from '../../services/workspaceConstants.js';
import { Type, Sparkles } from 'lucide-react';

export function TypographyTab({
  activeSlide,
  globalFont = 'Inter',
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
