import React, { useState, useEffect } from 'react';
import { SAMPLE_SCRIPT } from '../services/workspaceConstants.js';
import { storageService } from '../services/storageService.js';
import { Sparkles, Key, ArrowRight, Loader2, Eye, EyeOff, Check, FileText } from 'lucide-react';

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
      setErrorMsg('Por favor, cole ou digite o roteiro do seu carrossel antes de gerar as lâminas.');
      return;
    }
    setErrorMsg('');
    onGenerate(scriptText.trim(), apiKey.trim() || null);
  };

  const wordCount = scriptText.trim() ? scriptText.trim().split(/\s+/).length : 0;
  const charCount = scriptText.length;

  return (
    <div className="script-input-view">
      <div className="script-input-card">
        {/* Cabeçalho Elegante */}
        <div className="script-input-header">
          <div className="brand-badge-row">
            <Sparkles className="brand-badge" size={24} />
            <span className="brand-title">Carousel Studio</span>
          </div>
          <h1>Crie carrosséis memoráveis em segundos</h1>
          <p>
            Cole seu roteiro ou ideias abaixo. O estúdio estruturará automaticamente o conteúdo em lâminas balanceadas e prontas para personalização visual.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '11.5px', fontWeight: '600', color: 'var(--accent-biolum)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FileText size={13} />
                Roteiro de Entrada
              </label>
              <span style={{ fontSize: '11px', color: 'var(--text-silver)' }}>
                {wordCount} {wordCount === 1 ? 'palavra' : 'palavras'} • {charCount} carac.
              </span>
            </div>

            <textarea
              className="script-textarea"
              placeholder="Cole aqui seu roteiro... Ex: Título chamativo, pontos essenciais numerados ou divididos em parágrafos, e chamada para ação final."
              value={scriptText}
              onChange={(e) => {
                setScriptText(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              disabled={isGenerating}
            />
          </div>

          {errorMsg && (
            <div className="script-error-msg" role="alert">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Barra de Ações Rápidas & Botão Primário */}
          <div className="script-actions-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
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
                className={`btn-api-key-toggle ${showApiKeySection ? 'active' : ''}`}
                onClick={() => setShowApiKeySection(!showApiKeySection)}
              >
                <Key size={13} />
                <span>{showApiKeySection ? 'Ocultar Gemini API Key' : 'Gemini API Key (Opcional)'}</span>
                {isKeySaved && !showApiKeySection && (
                  <span className="key-saved-tag">
                    <Check size={11} /> Salva
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
                  <Loader2 size={16} className="animate-spin" />
                  <span>Gerando Lâminas...</span>
                </>
              ) : (
                <>
                  <span>Gerar Carrossel</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          {/* Painel Expansível de Chave do Gemini */}
          {showApiKeySection && (
            <div className="api-key-panel">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ fontSize: '11px', color: 'var(--text-silver)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Key size={12} /> CHAVE DE API DO GOOGLE GEMINI (OPCIONAL)
                </label>
                {isKeySaved && (
                  <span style={{ fontSize: '11px', color: 'var(--accent-biolum)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Check size={12} /> Salva no Navegador
                  </span>
                )}
              </div>

              <div className="api-key-input-group">
                <input
                  type={showKeyText ? 'text' : 'password'}
                  placeholder="Insira sua Gemini API Key para estruturação avançada com IA..."
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

              <span style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Sua chave fica segura localmente no IndexedDB do seu navegador. Se nenhuma chave for informada, o particionamento do roteiro ocorre de maneira local e determinística.
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ScriptInputView;
