import React, { useState, useEffect } from 'react';
import { AlignLeft, RefreshCw, Check, X, BookOpen, Key, Eye, EyeOff, Loader2 } from 'lucide-react';
import { storageService } from '../../services/storageService.js';

export function RightSidebar({
  isOpen = true,
  onClose,
  rawScript = '',
  slidesCount = 0,
  apiKey = '',
  onUpdateApiKey,
  onRegenerateFromScript
}) {
  const [text, setText] = useState(rawScript);
  const [keyInput, setKeyInput] = useState(apiKey || '');
  const [showKeyText, setShowKeyText] = useState(false);
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [isKeySaved, setIsKeySaved] = useState(Boolean(apiKey));
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    setText(rawScript);
  }, [rawScript]);

  useEffect(() => {
    if (apiKey) {
      setKeyInput(apiKey);
      setIsKeySaved(true);
    }
  }, [apiKey]);

  const handleKeyChange = (e) => {
    const val = e.target.value;
    setKeyInput(val);
    if (val.trim()) {
      storageService.saveGeminiApiKey(val.trim());
      if (onUpdateApiKey) onUpdateApiKey(val.trim());
      setIsKeySaved(true);
    } else {
      storageService.saveGeminiApiKey('');
      if (onUpdateApiKey) onUpdateApiKey('');
      setIsKeySaved(false);
    }
  };

  const handleApply = async () => {
    if (!text.trim() || isRegenerating) return;
    setIsRegenerating(true);
    try {
      if (onRegenerateFromScript) {
        await onRegenerateFromScript(text, keyInput.trim() || null);
        setSuccessMsg(true);
        setTimeout(() => setSuccessMsg(false), 2500);
      }
    } finally {
      setIsRegenerating(false);
    }
  };

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <aside className={`right-sidebar ${!isOpen ? 'collapsed' : ''}`}>
      {/* Cabeçalho do Roteiro */}
      <div className="right-sidebar-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlignLeft size={18} color="var(--accent-biolum)" />
          <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-platinum)' }}>
            Roteiro do Carrossel
          </span>
        </div>

        {onClose && (
          <button
            type="button"
            className="sidebar-toggle-btn"
            onClick={onClose}
            title="Ocultar barra de roteiro"
            style={{ padding: '4px 8px' }}
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Conteúdo e Editor de Roteiro */}
      <div className="right-sidebar-content">
        <div style={{ fontSize: '11px', color: 'var(--text-silver)', lineHeight: 1.5 }}>
          Cole ou edite o texto bruto. Ao atualizar, novos slides são gerados em lote preservando as imagens ancoradas e elementos visuais de cada posição.
        </div>

        {/* Gerenciador Mascarado de Gemini API Key para Roteiros */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              type="button"
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              style={{
                background: 'none',
                border: 'none',
                color: showKeyConfig ? 'var(--accent-biolum)' : 'var(--text-silver)',
                fontSize: '11px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
                padding: 0
              }}
            >
              <Key size={13} />
              {showKeyConfig ? 'Ocultar Gemini API Key' : 'Gemini API Key (Opcional)'}
            </button>
            {isKeySaved && (
              <span style={{ fontSize: '10px', color: 'var(--accent-biolum)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                <Check size={11} /> Configurada
              </span>
            )}
          </div>

          {showKeyConfig && (
            <div className="api-key-input-group">
              <input
                type={showKeyText ? 'text' : 'password'}
                placeholder="Cole sua Gemini API Key para síntese por IA..."
                value={keyInput}
                onChange={handleKeyChange}
              />
              <button
                type="button"
                className="api-key-toggle-btn"
                onClick={() => setShowKeyText(!showKeyText)}
                title={showKeyText ? 'Ocultar chave' : 'Exibir chave'}
              >
                {showKeyText ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-biolum)' }}>
            Editor de Texto Livre
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-silver)' }}>
            {wordCount} {wordCount === 1 ? 'palavra' : 'palavras'} • {charCount} carac.
          </span>
        </div>

        <textarea
          className="right-sidebar-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Cole seu roteiro com quebras de linha ou parágrafos aqui..."
          rows={14}
          disabled={isRegenerating}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            type="button"
            className="btn-generate-slides"
            onClick={handleApply}
            disabled={!text.trim() || isRegenerating}
            style={{
              width: '100%',
              justifyContent: 'center',
              fontSize: '13px',
              padding: '12px 16px'
            }}
          >
            {isRegenerating ? (
              <>
                <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                Gerando Slides...
              </>
            ) : successMsg ? (
              <>
                <Check size={16} />
                Slides Atualizados com Sucesso!
              </>
            ) : (
              <>
                <RefreshCw size={16} />
                Atualizar Slides pelo Roteiro
              </>
            )}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-silver)' }}>
            <BookOpen size={13} />
            Atualmente alimentando {slidesCount} {slidesCount === 1 ? 'slide' : 'slides'} no estúdio
          </div>
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;
