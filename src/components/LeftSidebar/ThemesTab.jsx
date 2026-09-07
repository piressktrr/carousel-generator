import React, { useState } from 'react';
import { AVAILABLE_THEMES } from '../../services/workspaceConstants.js';
import { CustomThemeBuilder } from './CustomThemeBuilder.jsx';
import { aiService } from '../../services/aiService.js';
import { createCustomTheme } from '../../services/themeService.js';
import {
  Palette,
  Check,
  Sparkles,
  Plus,
  Trash2,
  Key,
  Eye,
  EyeOff,
  Loader2,
  Wand2,
  ArrowRight
} from 'lucide-react';

export function ThemesTab({
  currentTheme = 'abyssal-glow',
  customThemes = [],
  onSelectTheme,
  onSaveCustomTheme,
  onDeleteCustomTheme,
  apiKey = '',
  onUpdateApiKey
}) {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [keyInput, setKeyInput] = useState(apiKey || '');
  const [isKeySaved, setIsKeySaved] = useState(false);

  // Estados para geração de tema por IA
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiError, setAiError] = useState('');
  const [generatedAiTheme, setGeneratedAiTheme] = useState(null);

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

  const handleSaveApiKey = () => {
    if (onUpdateApiKey) {
      onUpdateApiKey(keyInput.trim());
      setIsKeySaved(true);
      setTimeout(() => setIsKeySaved(false), 2000);
    }
  };

  const handleGenerateAiTheme = async () => {
    if (!keyInput.trim()) {
      setAiError('Informe sua chave de API do Gemini para gerar temas por IA.');
      return;
    }
    if (!aiPrompt.trim()) {
      setAiError('Digite uma ideia ou descrição para a identidade do tema.');
      return;
    }

    setAiError('');
    setIsGeneratingAi(true);
    setGeneratedAiTheme(null);

    try {
      const result = await aiService.generateThemeFromPrompt(aiPrompt.trim(), keyInput.trim());
      const customThemeObj = createCustomTheme({
        name: result.name,
        bg: result.bg,
        heading: result.heading,
        accent: result.accent,
        text: result.text,
        subtext: result.subtext,
        preview: result.preview
      });
      setGeneratedAiTheme(customThemeObj);
    } catch (err) {
      setAiError(err.message || 'Falha ao gerar tema com IA.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleApplyAiTheme = () => {
    if (!generatedAiTheme) return;
    onSaveCustomTheme && onSaveCustomTheme(generatedAiTheme);
    onSelectTheme && onSelectTheme(generatedAiTheme.id);
    setGeneratedAiTheme(null);
    setAiPrompt('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 1. Integração com IA do Gemini */}
      <div className="control-card">
        <label className="section-label">
          <Sparkles size={14} color="var(--accent-biolum)" />
          Gerador de Temas por IA (Gemini)
        </label>
        <span style={{ fontSize: '11px', color: 'var(--text-silver)', lineHeight: 1.4 }}>
          Crie temas cromáticos completos e harmoniosos a partir de uma descrição em linguagem natural.
        </span>

        {/* Gerenciamento seguro de API Key */}
        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-silver)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Key size={12} /> CHAVE DE API GEMINI
            </span>
            {isKeySaved && (
              <span style={{ fontSize: '11px', color: 'var(--accent-biolum)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Check size={12} /> Salva
              </span>
            )}
          </div>

          <div className="api-key-input-group">
            <input
              type={showApiKey ? 'text' : 'password'}
              placeholder="Cole sua Gemini API Key..."
              value={keyInput}
              onChange={(e) => {
                setKeyInput(e.target.value);
                if (aiError) setAiError('');
              }}
              onBlur={handleSaveApiKey}
            />
            <button
              type="button"
              className="api-key-toggle-btn"
              onClick={() => setShowApiKey(!showApiKey)}
              title={showApiKey ? 'Ocultar chave' : 'Exibir chave'}
            >
              {showApiKey ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {/* Campo de prompt para geração de tema */}
        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <input
            type="text"
            placeholder="Ex: Minimalista nórdico café e caramelo, ou Tech neon..."
            value={aiPrompt}
            onChange={(e) => {
              setAiPrompt(e.target.value);
              if (aiError) setAiError('');
            }}
            disabled={isGeneratingAi}
            style={{
              padding: '8px 10px',
              fontSize: '12px',
              background: 'rgba(0, 15, 14, 0.8)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-platinum)'
            }}
          />

          {aiError && (
            <div style={{ color: '#f43f5e', fontSize: '11px', fontWeight: '500' }}>
              ⚠️ {aiError}
            </div>
          )}

          <button
            type="button"
            onClick={handleGenerateAiTheme}
            disabled={isGeneratingAi || !aiPrompt.trim() || !keyInput.trim()}
            style={{
              padding: '8px 14px',
              fontSize: '12px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #05ffd4 0%, #00b497 100%)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              color: '#00221f',
              cursor: (isGeneratingAi || !aiPrompt.trim() || !keyInput.trim()) ? 'not-allowed' : 'pointer',
              opacity: (isGeneratingAi || !aiPrompt.trim() || !keyInput.trim()) ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 2px 10px rgba(5, 255, 212, 0.2)',
              transition: 'var(--transition-smooth)'
            }}
          >
            {isGeneratingAi ? (
              <>
                <Loader2 size={14} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                Gerando Paleta com IA...
              </>
            ) : (
              <>
                <Wand2 size={14} />
                Gerar Tema com IA
              </>
            )}
          </button>
        </div>

        {/* Pré-visualização do tema gerado pela IA */}
        {generatedAiTheme && (
          <div className="ai-theme-preview-card" style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '700', fontSize: '13px', color: '#FFFFFF' }}>
                {generatedAiTheme.name}
              </span>
              <span style={{ fontSize: '10px', color: 'var(--accent-biolum)', background: 'rgba(5, 255, 212, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                Gerado por IA
              </span>
            </div>

            {/* Amostras de cores */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  background: generatedAiTheme.bg,
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
                title="Fundo"
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                <div style={{ fontSize: '11px', color: generatedAiTheme.heading, fontWeight: '700' }}>
                  Título: {generatedAiTheme.heading}
                </div>
                <div style={{ fontSize: '11px', color: generatedAiTheme.accent }}>
                  Destaque: {generatedAiTheme.accent}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleApplyAiTheme}
              style={{
                marginTop: '4px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '700',
                background: '#00A3FF',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Check size={14} />
              Salvar e Aplicar Tema
            </button>
          </div>
        )}
      </div>

      {/* 2. Temas Personalizados & Criador Manual */}
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
              Nenhum tema personalizado ainda. Clique em "Criar Novo Tema" ou use a IA acima para criar um.
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

      {/* 3. Temas Nativos do Sistema */}
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
