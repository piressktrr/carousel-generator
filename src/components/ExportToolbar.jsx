import React, { useState } from 'react';
import { exportService } from '../services/exportService.js';
import { Download, FileText, Loader2 } from 'lucide-react';

export function ExportToolbar({ slides = [], aspectRatio = '4:5' }) {
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

  const handleExportPdf = async () => {
    if (isExporting || slides.length === 0) return;
    setIsExporting(true);
    try {
      await exportService.exportAsPdf(slides, 'carrossel-linkedin.pdf', (msg) => setProgressMsg(msg), aspectRatio);
    } catch (err) {
      alert(`Falha na exportação PDF: ${err.message}`);
    } finally {
      setIsExporting(false);
      setProgressMsg('');
    }
  };

  return (
    <div className="export-toolbar-group">
      {isExporting && (
        <span className="export-status-pill">
          <Loader2 size={13} className="animate-spin" />
          <span>{progressMsg || 'Exportando...'}</span>
        </span>
      )}

      <button
        type="button"
        className="btn-export-action"
        onClick={handleExportZip}
        disabled={isExporting || slides.length === 0}
        title="Baixar pacote com todas as imagens individuais em alta resolução (PNG)"
      >
        <Download size={14} />
        <span>PNGs (ZIP)</span>
      </button>

      <button
        type="button"
        className="btn-export-action"
        onClick={handleExportPdf}
        disabled={isExporting || slides.length === 0}
        title="Exportar documento PDF multipágina formatado para carrossel no LinkedIn"
      >
        <FileText size={14} />
        <span>PDF</span>
      </button>
    </div>
  );
}
export default ExportToolbar;
