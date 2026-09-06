/**
 * Algorithmic Local Text Segmenter (Deterministic Fallback & Dynamic Parsing)
 * Intelligently chunks raw script text into an adaptive sequence of slides
 * without arbitrary fixed limits (supports short, medium, or extensive carousels).
 */

/**
 * Segmenta um texto bruto em blocos de conteúdo lógicos para slides.
 * @param {string} rawScript - Texto bruto inserido pelo usuário
 * @returns {Array<Object>} Lista adaptativa de SlideItem
 */
export function segmentTextToSlides(rawScript) {
  if (!rawScript || !rawScript.trim()) {
    return [];
  }

  const cleanText = rawScript.trim();

  // 1. Dividir por parágrafos duplos ou blocos de lista numerada/marcada
  // Normaliza quebras de linha
  const normalized = cleanText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  // Divide por quebras de linha duplas ou itens de lista (ex: "1. ", "2. ", "- ")
  const rawBlocks = normalized
    .split(/\n\s*\n+/)
    .map(b => b.trim())
    .filter(b => b.length > 0);

  // Se houver blocos que contêm listas numeradas internas, dividi-los individualmente
  const expandedBlocks = [];
  for (const block of rawBlocks) {
    // Verifica se o bloco contém itens numerados em linhas separadas (ex: "1. Item\n2. Item")
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    const hasNumberedList = lines.length > 1 && lines.some(l => /^\d+[\.\)]\s+/.test(l));

    if (hasNumberedList) {
      let currentItem = [];
      for (const line of lines) {
        if (/^\d+[\.\)]\s+/.test(line)) {
          if (currentItem.length > 0) {
            expandedBlocks.push(currentItem.join('\n'));
            currentItem = [];
          }
        }
        currentItem.push(line);
      }
      if (currentItem.length > 0) {
        expandedBlocks.push(currentItem.join('\n'));
      }
    } else {
      expandedBlocks.push(block);
    }
  }

  // Se tivermos apenas 1 bloco muito longo, quebrar por frases/parágrafos simples
  let blocks = expandedBlocks;
  if (blocks.length === 1 && blocks[0].length > 250) {
    blocks = blocks[0]
      .split(/\n+/)
      .map(b => b.trim())
      .filter(Boolean);
  }

  // Constrói a lista dinâmica de slides adaptada ao conteúdo
  const slides = blocks.map((blockContent, index) => {
    const isFirst = index === 0;
    const isLast = index === blocks.length - 1 && blocks.length > 1;
    
    // Detecta se o último bloco tem perfil de chamada para ação (CTA)
    const isCtaCandidate = isLast && (
      /\?|salve|comente|compartilhe|siga|link|comentários|gostou/i.test(blockContent) ||
      blockContent.length < 160
    );

    let type = 'content';
    if (isFirst) {
      type = 'cover';
    } else if (isCtaCandidate) {
      type = 'cta';
    }

    return {
      id: `slide-${index + 1}`,
      order: index + 1,
      type,
      content: blockContent,
      subtext: '',
      slideTemplate: 'classic',
      fontOverride: null,
      showBranding: true,
      dockedImage: null,
      overlays: []
    };
  });

  return slides;
}
