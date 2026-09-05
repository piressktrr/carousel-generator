import React, { useState } from 'react';
import { SAMPLE_SCRIPT } from '../services/workspaceConstants.js';
import { Sparkles, Key, ArrowRight, Loader2, FileText } from 'lucide-react';

export function ScriptInputView({ onGenerate, isGenerating = false }) {
  const [scriptText, setScriptText] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoadSample = () => {
    setScriptText(SAMPLE_SCRIPT);
    setErrorMsg('');
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
                  color: showApiKey ? 'var(--accent-biolum)' : 'var(--text-silver)',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer'
                }}
                onClick={() => setShowApiKey(!showApiKey)}
              >
                <Key size={14} />
                {showApiKey ? 'Ocultar Gemini API Key' : 'Configurar Gemini API Key (Opcional)'}
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

          {showApiKey && (
            <div
              style={{
                marginTop: '10px',
                padding: '12px 16px',
                background: 'rgba(0, 20, 19, 0.6)',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <label style={{ fontSize: '11px', color: 'var(--text-silver)', fontWeight: '600' }}>
                CHAVE DE API DO GOOGLE GEMINI (OPCIONAL)
              </label>
              <input
                type="password"
                placeholder="Insira sua Gemini API Key para assistência de síntese (ou deixe em branco para segmentação local ultrarrápida)"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                style={{ padding: '8px 12px', fontSize: '13px' }}
              />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Se nenhuma chave for fornecida ou houver falha de rede, a divisão ocorre localmente por tópicos e parágrafos.
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
export default ScriptInputView;
