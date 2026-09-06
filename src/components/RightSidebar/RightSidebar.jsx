import React, { useState, useEffect } from 'react';
import { AlignLeft, RefreshCw, Check, X, BookOpen } from 'lucide-react';

export function RightSidebar({
  isOpen = true,
  onClose,
  rawScript = '',
  slidesCount = 0,
  onRegenerateFromScript
}) {
  const [text, setText] = useState(rawScript);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    setText(rawScript);
  }, [rawScript]);

  const handleApply = () => {
    if (!text.trim()) return;
    if (onRegenerateFromScript) {
      onRegenerateFromScript(text);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 2500);
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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
          rows={15}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            type="button"
            className="btn-generate-slides"
            onClick={handleApply}
            disabled={!text.trim()}
            style={{
              width: '100%',
              justifyContent: 'center',
              fontSize: '13px',
              padding: '12px 16px'
            }}
          >
            {successMsg ? (
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
