/**
 * Export Service
 * High-resolution client-side rendering of carousel slides into:
 * 1. ZIP pack of high-res individual PNG images
 * 2. Multi-page PDF optimized for LinkedIn carousel documents
 */
import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

export const exportService = {
  /**
   * Captura todos os slides renderizados e exporta um arquivo ZIP com imagens PNG.
   * @param {Array<Object>} slides
   * @param {string} [filenamePrefix='carrossel']
   * @param {Function} [onProgress]
   * @returns {Promise<void>}
   */
  async exportAsZip(slides = [], filenamePrefix = 'carrossel', onProgress = null) {
    if (!Array.isArray(slides) || slides.length === 0) {
      throw new Error('Nenhum slide disponível para exportação.');
    }

    const zip = new JSZip();
    const folder = zip.folder(filenamePrefix) || zip;

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      if (onProgress) {
        onProgress(`Renderizando slide ${i + 1} de ${slides.length}...`);
      }

      const slideElem = document.querySelector(`.slide-card[data-slide-id="${slide.id}"]`);
      if (!slideElem) continue;

      try {
        const dataUrl = await toPng(slideElem, {
          pixelRatio: 2, // 2x para nitidez perfeita em redes sociais
          quality: 0.95
        });

        // Converte Data URL para base64 puro para o JSZip
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
        const padIndex = String(i + 1).padStart(2, '0');
        folder.file(`${padIndex}-${slide.type || 'slide'}.png`, base64Data, { base64: true });
      } catch (err) {
        console.error(`[exportService] Erro ao renderizar slide ${slide.id}:`, err);
      }
    }

    if (onProgress) onProgress('Empacotando arquivo ZIP...');
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${filenamePrefix}-slides.zip`);
  },

  /**
   * Renderiza todos os slides sequencialmente em um único PDF multipágina (LinkedIn).
   * @param {Array<Object>} slides
   * @param {string} [filename='carrossel-linkedin.pdf']
   * @param {Function} [onProgress]
   * @returns {Promise<void>}
   */
  async exportAsPdf(slides = [], filename = 'carrossel-linkedin.pdf', onProgress = null, aspectRatio = '4:5') {
    if (!Array.isArray(slides) || slides.length === 0) {
      throw new Error('Nenhum slide disponível para exportação.');
    }

    // Dimensões adaptativas por proporção (4:5 -> 1080x1350 | 1:1 -> 1080x1080)
    const pdfWidth = 1080;
    const pdfHeight = aspectRatio === '1:1' ? 1080 : 1350;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [pdfWidth, pdfHeight]
    });

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      if (onProgress) {
        onProgress(`Gerando página PDF ${i + 1} de ${slides.length}...`);
      }

      const slideElem = document.querySelector(`.slide-card[data-slide-id="${slide.id}"]`);
      if (!slideElem) continue;

      try {
        const dataUrl = await toPng(slideElem, {
          pixelRatio: 2,
          quality: 0.95
        });

        if (i > 0) {
          pdf.addPage([pdfWidth, pdfHeight], 'portrait');
        }

        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      } catch (err) {
        console.error(`[exportService] Erro ao processar página PDF ${slide.id}:`, err);
      }
    }

    if (onProgress) onProgress('Concluindo PDF...');
    pdf.save(filename);
  }
};
