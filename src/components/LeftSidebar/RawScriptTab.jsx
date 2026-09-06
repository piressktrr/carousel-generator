import React, { useState, useEffect } from 'react';
import { AlignLeft, RefreshCw, Sparkles, Check } from 'lucide-react';

export function RawScriptTab({
  rawScript = '',
  slidesCount = 0,
  onRegenerateFromScript
}) {
  const [text, setText] = useState(rawScript);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  useEffect(() => {
    setText(rawScript);
  }, [rawScript]);

  const handleApply = () => {
    if (!text.trim()) return;
    if (onRegenerateFromScript) {
      onRegenerateFromScript(text);
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2500);
    }
  };

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="tab-pane">
      <div className="tab-pane-header">
        <h3 className="tab-pane-title">
          <AlignLeft size={16} className="title-icon" />
          Roteiro Completo
        </h3>
        <p className="tab-pane-desc">
          Edite ou cole um novo roteiro completo. O carrossel será recalculado em lote preservando suas imagens e ícones ancorados nos mesmos slides.
        </p>
      </div>

      <div className="input-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <label className="input-label" style={{ margin: 0 }}>Texto do Roteiro:</label>
          <span style={{ fontSize: '11px', color: 'var(--text-silver)' }}>
            {wordCount} palavras | {charCount} carac.
          </span>
        </div>

        <textarea
          className="slide-content-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Cole seu roteiro com quebras de linha ou parágrafos aqui..."
          rows={12}
          style={{ minHeight: '220px', resize: 'vertical' }}
        />
      </div>

      <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          type="button"
          className="btn-primary"
          onClick={handleApply}
          disabled={!text.trim()}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '12px',
            fontWeight: 600
          }}
        >
          {copiedSuccess ? (
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

        <div style={{ fontSize: '11px', color: 'var(--text-silver)', textAlign: 'center', marginTop: '4px' }}>
          Atualmente renderizando {slidesCount} slide{slidesCount !== 1 ? 's' : ''} no estúdio.
        </div>
      </div>
    </div>
  );
}

export default RawScriptTab;
