import React, { useState } from 'react';

export default function TextInputModal({ onGenerate }) {
  const [text, setText] = useState('');
  const [useAI, setUseAI] = useState(true);
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onGenerate(text, useAI ? apiKey : null);
    }
  };

  return (
    <div className="text-input-modal" style={{ padding: '20px', background: 'var(--bg-primary)', color: 'var(--text-primary)', borderRadius: 'var(--radius-card)', maxWidth: '600px', margin: '20px auto' }}>
      <h2>Criar Novo Carrossel</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
        <textarea 
          rows={6}
          placeholder="Cole seu texto aqui..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--color-silver-mist)' }}
        />
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" checked={useAI} onChange={(e) => setUseAI(e.target.checked)} />
          Usar Inteligência Artificial (Gemini) para ganchos e otimização
        </label>

        {useAI && (
          <input 
            type="password"
            placeholder="Gemini API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--color-silver-mist)' }}
          />
        )}
        
        <button type="submit" style={{ padding: '12px', background: 'var(--gradient-bioluminescent)', color: 'var(--text-primary)', border: 'none', borderRadius: 'var(--radius-button)', cursor: 'pointer', fontWeight: 'bold' }}>
          {useAI ? 'Gerar com IA' : 'Divisão Local'}
        </button>
      </form>
    </div>
  );
}
