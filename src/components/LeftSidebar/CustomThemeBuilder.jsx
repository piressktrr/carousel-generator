import React, { useState } from 'react';
import { generateGradientCss, createCustomTheme, calculateContrastRatio } from '../../services/themeService.js';
import { Sparkles, Plus, Trash2, Check, X, Sliders, Palette } from 'lucide-react';

export function CustomThemeBuilder({
  onSaveTheme,
  onCancel,
  initialTheme = null
}) {
  const [themeName, setThemeName] = useState(initialTheme?.name || 'Novo Tema');
  const [bgMode, setBgMode] = useState(
    initialTheme?.gradientConfig ? 'gradient' : (initialTheme?.bg?.includes('gradient') ? 'gradient' : 'solid')
  );
  
  // Cores de Tipografia & Acentos
  const [headingColor, setHeadingColor] = useState(initialTheme?.heading || '#00D2FF');
  const [accentColor, setAccentColor] = useState(initialTheme?.accent || '#00A3FF');
  const [textColor, setTextColor] = useState(initialTheme?.text || '#F0F7FF');
  const [subtextColor, setSubtextColor] = useState(initialTheme?.subtext || '#8ECAE6');
  
  // Cor sólida de fundo
  const [solidBg, setSolidBg] = useState(
    (!initialTheme?.bg?.includes('gradient') && initialTheme?.bg) || '#0B132B'
  );

  // Gradiente Angular com múltiplos stops
  const [gradientAngle, setGradientAngle] = useState(
    initialTheme?.gradientConfig?.angle !== undefined ? initialTheme.gradientConfig.angle : 135
  );
  const [stops, setStops] = useState(
    initialTheme?.gradientConfig?.stops || [
      { color: '#0d0221', position: 0, opacity: 1 },
      { color: '#0f0c29', position: 100, opacity: 1 }
    ]
  );

  // Calcula a string de fundo em tempo real
  const currentBg = bgMode === 'gradient'
    ? generateGradientCss({ type: 'linear', angle: gradientAngle, stops })
    : solidBg;

  // Adiciona novo stop intermediário
  const handleAddStop = () => {
    if (stops.length >= 5) return;
    const newPos = stops.length > 0 ? Math.round((stops[stops.length - 1].position + (stops[0]?.position || 0)) / 2) : 50;
    setStops([...stops, { color: '#00A3FF', position: newPos, opacity: 1 }]);
  };

  // Remove um stop (mantendo no mínimo 2)
  const handleRemoveStop = (index) => {
    if (stops.length <= 2) return;
    setStops(stops.filter((_, i) => i !== index));
  };

  // Atualiza um stop específico
  const handleUpdateStop = (index, field, value) => {
    const updated = [...stops];
    updated[index] = { ...updated[index], [field]: value };
    setStops(updated);
  };

  // Salva o tema
  const handleSave = (e) => {
    e.preventDefault();
    const finalTheme = createCustomTheme({
      name: themeName.trim() || 'Tema Personalizado',
      bg: currentBg,
      heading: headingColor,
      accent: accentColor,
      text: textColor,
      subtext: subtextColor,
      preview: accentColor,
      gradientConfig: bgMode === 'gradient' ? { type: 'linear', angle: gradientAngle, stops } : null
    });

    onSaveTheme(finalTheme);
  };

  return (
    <div className="custom-theme-builder">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-platinum)', fontWeight: '700', fontSize: '13px' }}>
          <Palette size={16} color="var(--accent-biolum)" />
          <span>Criador de Tema Personalizado</span>
        </div>
        <button
          type="button"
          onClick={onCancel}
          style={{ background: 'none', border: 'none', color: 'var(--text-silver)', cursor: 'pointer', padding: '2px' }}
          title="Fechar criador"
        >
          <X size={16} />
        </button>
      </div>

      {/* Nome do Tema */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '11px', color: 'var(--text-silver)', fontWeight: '600' }}>
          NOME DO TEMA
        </label>
        <input
          type="text"
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
          placeholder="Ex: Cyberpunk Neon, Minimal Slate..."
          style={{
            padding: '7px 10px',
            fontSize: '12px',
            background: 'rgba(0, 15, 14, 0.8)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-platinum)'
          }}
        />
      </div>

      {/* Tipo de Fundo: Gradiente vs Sólido */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '11px', color: 'var(--text-silver)', fontWeight: '600' }}>
          ESTILO DO FUNDO
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          <button
            type="button"
            className={`sidebar-tab-btn ${bgMode === 'gradient' ? 'active' : ''}`}
            onClick={() => setBgMode('gradient')}
            style={{ justifyContent: 'center', padding: '6px' }}
          >
            Gradiente Angular
          </button>
          <button
            type="button"
            className={`sidebar-tab-btn ${bgMode === 'solid' ? 'active' : ''}`}
            onClick={() => setBgMode('solid')}
            style={{ justifyContent: 'center', padding: '6px' }}
          >
            Cor Sólida
          </button>
        </div>
      </div>

      {/* Caixa de Pré-visualização do Fundo */}
      <div
        className="gradient-preview-box"
        style={{ background: currentBg }}
      >
        <span style={{ color: textColor }}>
          {themeName || 'Pré-visualização'}
        </span>
      </div>

      {/* Controles de Fundo */}
      {bgMode === 'gradient' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Ângulo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-silver)' }}>
              Ângulo de Rotação ({gradientAngle}°)
            </span>
            <input
              type="range"
              min="0"
              max="360"
              value={gradientAngle}
              onChange={(e) => setGradientAngle(Number(e.target.value))}
              style={{ width: '120px', cursor: 'pointer' }}
            />
          </div>

          {/* Lista de Pontos do Gradiente (Stops) */}
          <div className="gradient-stops-list">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-silver)', fontWeight: '600' }}>
                PONTOS DE COR ({stops.length}/5)
              </span>
              {stops.length < 5 && (
                <button
                  type="button"
                  onClick={handleAddStop}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-biolum)',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={12} /> Adicionar Ponto
                </button>
              )}
            </div>

            {stops.map((stop, idx) => (
              <div key={idx} className="gradient-stop-row">
                <input
                  type="color"
                  className="color-picker-input"
                  value={stop.color.startsWith('#') ? stop.color : '#00A3FF'}
                  onChange={(e) => handleUpdateStop(idx, 'color', e.target.value)}
                />
                <input
                  type="text"
                  className="color-hex-input"
                  value={stop.color}
                  onChange={(e) => handleUpdateStop(idx, 'color', e.target.value)}
                  style={{ width: '70px' }}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stop.position}
                  onChange={(e) => handleUpdateStop(idx, 'position', Number(e.target.value))}
                  style={{ flex: 1, cursor: 'pointer' }}
                />
                <span style={{ fontSize: '11px', color: 'var(--text-silver)', width: '32px', textAlign: 'right' }}>
                  {stop.position}%
                </span>
                {stops.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveStop(idx)}
                    style={{ background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '2px' }}
                    title="Remover ponto"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Cor sólida */
        <div className="color-field-row">
          <span className="color-field-label">Cor de Fundo</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="text"
              className="color-hex-input"
              value={solidBg}
              onChange={(e) => setSolidBg(e.target.value)}
            />
            <input
              type="color"
              className="color-picker-input"
              value={solidBg.startsWith('#') ? solidBg : '#0B132B'}
              onChange={(e) => setSolidBg(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Paleta Tipográfica e Destaques */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
        <label style={{ fontSize: '11px', color: 'var(--text-silver)', fontWeight: '600' }}>
          PALETA DE CORES DOS ELEMENTOS
        </label>

        {/* Título Principal */}
        <div className="color-field-row">
          <span className="color-field-label">Título Principal</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="text"
              className="color-hex-input"
              value={headingColor}
              onChange={(e) => setHeadingColor(e.target.value)}
            />
            <input
              type="color"
              className="color-picker-input"
              value={headingColor}
              onChange={(e) => setHeadingColor(e.target.value)}
            />
          </div>
        </div>

        {/* Destaques / Acento */}
        <div className="color-field-row">
          <span className="color-field-label">Destaques & Selos</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="text"
              className="color-hex-input"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
            />
            <input
              type="color"
              className="color-picker-input"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
            />
          </div>
        </div>

        {/* Texto do Corpo */}
        <div className="color-field-row">
          <span className="color-field-label">Texto dos Slides</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="text"
              className="color-hex-input"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
            <input
              type="color"
              className="color-picker-input"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>
        </div>

        {/* Subtexto / Legendas */}
        <div className="color-field-row">
          <span className="color-field-label">Subtexto & Legendas</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="text"
              className="color-hex-input"
              value={subtextColor}
              onChange={(e) => setSubtextColor(e.target.value)}
            />
            <input
              type="color"
              className="color-picker-input"
              value={subtextColor}
              onChange={(e) => setSubtextColor(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '7px 14px',
            fontSize: '12px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-silver)',
            cursor: 'pointer'
          }}
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={handleSave}
          style={{
            padding: '7px 16px',
            fontSize: '12px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #00A3FF 0%, #0077B6 100%)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 10px rgba(0, 163, 255, 0.3)'
          }}
        >
          <Check size={14} />
          Salvar e Aplicar Tema
        </button>
      </div>
    </div>
  );
}

export default CustomThemeBuilder;
