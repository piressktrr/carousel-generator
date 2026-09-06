import React, { useState } from 'react';
import { exportService } from '../services/exportService.js';
import { Download, Loader2 } from 'lucide-react';

export function ExportToolbar({ slides = [] }) {
  const [isExporting, setIsExporting] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');

  const handleExportZip = async () => {
    if (isExporting || slides.length === 0) return;
    setIsExporting(true);
    try {
      await exportService.exportAsZip(slides, 'carrossel', (msg) => setProgressMsg(msg));
    } catch (err) {
      alert(`Falha na exportação ZIP: ${err.message}`);
    } finally {
      setIsExporting(false);
      setProgressMsg('');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {isExporting && (
        <span style={{ fontSize: '11px', color: 'var(--accent-biolum)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Loader2 size={13} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
          {progressMsg || 'Processando...'}
        </span>
      )}

      <button
        type="button"
        onClick={handleExportZip}
        disabled={isExporting || slides.length === 0}
        style={{
          background: 'rgba(5, 255, 212, 0.12)',
          border: '1px solid rgba(5, 255, 212, 0.3)',
          color: 'var(--accent-biolum)',
          borderRadius: 'var(--radius-sm)',
          padding: '6px 12px',
          fontSize: '12px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: isExporting ? 'not-allowed' : 'pointer'
        }}
        title="Baixar pacote com todas as imagens em alta resolução (PNG)"
      >
        <Download size={14} />
        Baixar PNGs (ZIP)
      </button>
    </div>
  );
}
export default ExportToolbar;
