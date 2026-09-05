import * as htmlToImage from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

export const exportService = {
  async exportAsZip(platform) {
    const slideElements = document.querySelectorAll('.slide-card');
    if (!slideElements.length) return;
    
    const zip = new JSZip();
    
    for (let i = 0; i < slideElements.length; i++) {
      const el = slideElements[i];
      // Temporarily remove scaling for high-res export
      const originalTransform = el.style.transform;
      el.style.transform = 'scale(1)';
      
      const dataUrl = await htmlToImage.toPng(el, { quality: 1.0, pixelRatio: 2 });
      
      el.style.transform = originalTransform;
      
      const base64Data = dataUrl.replace(/^data:image\/(png|jpeg);base64,/, "");
      zip.file(`slide-${i+1}.png`, base64Data, {base64: true});
    }
    
    const content = await zip.generateAsync({type:"blob"});
    saveAs(content, `carousel-${platform}.zip`);
  },
  
  async exportAsPdf() {
    const slideElements = document.querySelectorAll('.slide-card');
    if (!slideElements.length) return;
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [1080, 1080]
    });
    
    for (let i = 0; i < slideElements.length; i++) {
      const el = slideElements[i];
      const originalTransform = el.style.transform;
      el.style.transform = 'scale(1)';
      
      const dataUrl = await htmlToImage.toPng(el, { quality: 1.0, pixelRatio: 2 });
      
      el.style.transform = originalTransform;
      
      if (i > 0) pdf.addPage([1080, 1080], 'portrait');
      pdf.addImage(dataUrl, 'PNG', 0, 0, 1080, 1080);
    }
    
    pdf.save('carousel.pdf');
  }
};
