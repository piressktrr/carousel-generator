import React, { useState, useEffect } from 'react';
import { SAMPLE_SCRIPT } from '../services/workspaceConstants.js';
import { storageService } from '../services/storageService.js';
import { Sparkles, Key, ArrowRight, Loader2, Eye, EyeOff, Check } from 'lucide-react';

export function ScriptInputView({ onGenerate, isGenerating = false }) {
  const [scriptText, setScriptText] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeySection, setShowApiKeySection] = useState(false);
  const [showKeyText, setShowKeyText] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isKeySaved, setIsKeySaved] = useState(false);

  // Carrega chave persistida no IndexedDB na inicialização
  useEffect(() => {
    let isMounted = true;
    async function loadSavedKey() {
      try {
        const savedKey = await storageService.getGeminiApiKey();
        if (isMounted && savedKey) {
          setApiKey(savedKey);
          setIsKeySaved(true);
        }
      } catch (err) {
        console.error('[ScriptInputView] Erro ao carregar Gemini API Key salva:', err);
      }
    }
    loadSavedKey();
    return () => { isMounted = false; };
  }, []);

  const handleLoadSample = () => {
    setScriptText(SAMPLE_SCRIPT);
    setErrorMsg('');
  };

  const handleApiKeyChange = (e) => {
    const val = e.target.value;
    setApiKey(val);
    if (val.trim()) {
      storageService.saveGeminiApiKey(val.trim());
      setIsKeySaved(true);
    } else {
      storageService.saveGeminiApiKey('');
      setIsKeySaved(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!scriptText.trim()) {
      setErrorMsg('Por favor, cole ou digite o roteiro do seu carrossel antes de gerar os slides.');
      return;
    }
    setErrorMsg('');
    onGenerate(scriptText.trim(), apiKey.trim() || null);
  };

  return (
    <div className="script-input-view">
      <div className="script-input-card">
        <div className="script-input-header">
          <h1>
            <Sparkles className="brand-badge" size={28} />
            Carousel Studio Workspace
          </h1>
          <p>
            Cole seu roteiro bruto abaixo. O sistema estruturará automaticamente o conteúdo em uma sequência dinâmica e adaptativa de slides prontos para personalização.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <textarea
            className="script-textarea"
            placeholder="Cole aqui o seu roteiro... Ex: Título chamativo, pontos essenciais numerados ou divididos em parágrafos, e chamada para ação final."
            value={scriptText}
            onChange={(e) => {
              setScriptText(e.target.value);
              if (errorMsg) setErrorMsg('');
            }}
            disabled={isGenerating}
          />

          {errorMsg && (
            <div style={{ color: '#f43f5e', fontSize: '13px', fontWeight: '500' }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <div className="script-actions-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                type="button"
                className="btn-example"
                onClick={handleLoadSample}
                disabled={isGenerating}
              >
                Carregar roteiro de exemplo
              </button>

              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: showApiKeySection ? 'var(--accent-biolum)' : 'var(--text-silver)',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer'
                }}
                onClick={() => setShowApiKeySection(!showApiKeySection)}
              >
                <Key size={14} />
                {showApiKeySection ? 'Ocultar Gemini API Key' : 'Configurar Gemini API Key (Opcional)'}
                {isKeySaved && !showApiKeySection && (
                  <span style={{ color: 'var(--accent-biolum)', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                    <Check size={12} /> Salva
                  </span>
                )}
              </button>
            </div>

            <button
              type="submit"
              className="btn-generate-slides"
              disabled={isGenerating || !scriptText.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                  Gerando Slides...
                </>
              ) : (
                <>
                  Gerar Slides
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>

          {showApiKeySection && (
            <div
              style={{
                marginTop: '10px',
                padding: '12px 16px',
                background: 'rgba(0, 20, 19, 0.6)',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ fontSize: '11px', color: 'var(--text-silver)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Key size={12} /> CHAVE DE API DO GOOGLE GEMINI (OPCIONAL)
                </label>
                {isKeySaved && (
                  <span style={{ fontSize: '11px', color: 'var(--accent-biolum)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Check size={12} /> Chave Salva
                  </span>
                )}
              </div>

              <div className="api-key-input-group">
                <input
                  type={showKeyText ? 'text' : 'password'}
                  placeholder="Insira sua Gemini API Key (mantida em segurança no seu navegador)"
                  value={apiKey}
                  onChange={handleApiKeyChange}
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

              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                A chave é armazenada com segurança no seu navegador e utilizada tanto para síntese de slides quanto para o gerador de temas na aba Cores. Se não informada, a divisão ocorre localmente.
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ScriptInputView;
