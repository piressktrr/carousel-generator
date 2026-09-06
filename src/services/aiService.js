/**
 * AI Service (Gemini API Integration with 10s Defensive Timeout and Algorithmic Fallback)
 * Adheres strictly to Principle III (Concurrency & Resilience) and dynamic slide quantity.
 */
import { segmentTextToSlides } from './textSegmenter.js';

export const aiService = {
  /**
   * Divide e estrutura o roteiro em slides utilizando IA com fallback local automático.
   * @param {string} rawScript - Texto do roteiro
   * @param {string|null} [apiKey] - Chave opcional da API Gemini
   * @returns {Promise<Array<Object>>} Lista de SlideItem gerados
   */
  async generateSlides(rawScript, apiKey = null) {
    if (!rawScript || !rawScript.trim()) {
      return [];
    }

    // Se nenhuma chave for fornecida, aciona imediatamente o segmentador local
    if (!apiKey || !apiKey.trim()) {
      console.info('[aiService] Nenhuma API Key configurada. Utilizando particionamento determinístico local.');
      return segmentTextToSlides(rawScript);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
      const prompt = `Você é um especialista em diagramação de carrosséis para redes sociais.
Analise o seguinte roteiro bruto e divida-o de forma dinâmica e adaptativa na quantidade ideal de slides para acomodar com máxima clareza e síntese todo o conteúdo fornecido.
IMPORTANTE: NÃO limite nem force uma quantidade fixa (como 6 slides). O número de slides deve se ajustar organicamente à extensão e quantidade de tópicos do roteiro (podendo ser 4, 7, 10, 14 ou quantos forem necessários).

Estrutura esperada:
- Primeiro slide: Capa com título atraente e gancho (type: "cover")
- Slides intermediários: Cada argumento, dica ou ponto chave em um slide individual com texto sintetizado (type: "content")
- Último slide: Chamada para ação (CTA) para salvar, comentar ou compartilhar (type: "cta")

Retorne EXCLUSIVAMENTE um JSON no formato de array de objetos:
[
  { "type": "cover", "content": "Título de Gancho..." },
  { "type": "content", "content": "Texto do ponto 1..." },
  { "type": "cta", "content": "Chamada final..." }
]

Roteiro:
"""
${rawScript}
"""`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.4,
              responseMimeType: 'application/json'
            }
          })
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Gemini API error: HTTP ${response.status}`);
      }

      const data = await response.json();
      const rawOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawOutput) {
        throw new Error('Resposta vazia da API do Gemini');
      }

      // Remove eventuais blocos de código markdown
      const cleaned = rawOutput.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsedArray = JSON.parse(cleaned);

      if (Array.isArray(parsedArray) && parsedArray.length > 0) {
        return parsedArray.map((item, idx) => ({
          id: `slide-${idx + 1}`,
          order: idx + 1,
          type: item.type || (idx === 0 ? 'cover' : 'content'),
          content: item.content || String(item),
          fontOverride: null,
          showBranding: true,
          dockedImage: null,
          overlays: []
        }));
      }

      throw new Error('Formato JSON inválido retornado pelo Gemini');
    } catch (err) {
      clearTimeout(timeoutId);
      console.warn('[aiService] Falha ou timeout na chamada da IA. Ativando fallback algorítmico local:', err.message);
      return segmentTextToSlides(rawScript);
    }
  }
};
