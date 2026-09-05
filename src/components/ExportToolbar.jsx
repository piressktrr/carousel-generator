import React from 'react';
import { exportService } from '../services/exportService';

export default function ExportToolbar() {
  return (
    <div style={{ padding: '20px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', margin: '20px', display: 'flex', gap: '15px' }}>
      <button onClick={() => exportService.exportAsZip('instagram-1-1')} style={{ padding: '10px 20px', background: 'var(--accent)', color: 'var(--bg-primary)', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>
        Exportar ZIP (Imagens)
      </button>
      <button onClick={() => exportService.exportAsPdf()} style={{ padding: '10px 20px', background: 'var(--color-silver-mist)', color: 'var(--bg-primary)', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>
        Exportar PDF (LinkedIn)
      </button>
    </div>
  );
}
