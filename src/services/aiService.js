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
  },

  /**
   * Gera uma paleta de cores completa e título temático a partir de um prompt em linguagem natural.
   * Utiliza a API REST do Gemini com garantia de contraste visual para carrosséis.
   * @param {string} prompt - Descrição do estilo desejado (ex: "Tecnologia minimalista azul e grafite")
   * @param {string} apiKey - Chave da API do Gemini
   * @returns {Promise<Object>} Objeto CustomTheme gerado
   */
  async generateThemeFromPrompt(prompt, apiKey) {
    if (!apiKey || !apiKey.trim()) {
      throw new Error('Chave de API do Google Gemini não informada. Configure sua chave na aba Cores.');
    }

    if (!prompt || !prompt.trim()) {
      throw new Error('Por favor, informe uma descrição para o tema desejado.');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout defensivo

    const systemPrompt = `Você é um designer sênior especialista em identidade visual e design de carrosséis para redes sociais.
Crie um tema cromático completo, harmonioso e moderno baseado na seguinte descrição do usuário:
"${prompt.trim()}"

REQUISITOS OBRIGATÓRIOS:
1. "name": Um título criativo e profissional em português para o tema (máximo 4 palavras).
2. "bg": Uma cor sólida (hex) OU um gradiente CSS moderno (ex: "linear-gradient(135deg, #0d0221 0%, #0f0c29 100%)" ou "radial-gradient(circle at top, #1e293b 0%, #0f172a 100%)").
3. "heading": Cor em hexadecimal para títulos principais (deve ter altíssimo contraste e destaque com o fundo).
4. "accent": Cor vibrante em hexadecimal para botões, selos e destaques visuais.
5. "text": Cor em hexadecimal para o texto principal do slide (deve ter leitura nítida e alto contraste com o fundo).
6. "subtext": Cor em hexadecimal para legendas e notas secundárias.
7. "preview": A cor mais marcante e representativa do tema (hexadecimal) para o swatch circular.

Retorne EXCLUSIVAMENTE um objeto JSON válido no formato:
{
  "name": "Nome do Tema",
  "bg": "linear-gradient(135deg, #0d0221 0%, #0f0c29 100%)",
  "heading": "#00F0FF",
  "accent": "#FF007F",
  "text": "#F0F6FC",
  "subtext": "#8B949E",
  "preview": "#00F0FF"
}`;

    const modelsToTry = ['gemini-2.5-flash', 'gemini-1.5-flash'];
    let lastError = null;

    for (const model of modelsToTry) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
              contents: [{ parts: [{ text: systemPrompt }] }],
              generationConfig: {
                temperature: 0.7,
                responseMimeType: 'application/json'
              }
            })
          }
        );

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          const errMsg = errData.error?.message || `HTTP ${response.status}`;
          throw new Error(errMsg);
        }

        const data = await response.json();
        const rawOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!rawOutput) {
          throw new Error('Resposta vazia retornada pelo Gemini.');
        }

        const cleaned = rawOutput.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleaned);

        if (!parsed || typeof parsed !== 'object') {
          throw new Error('Formato de dados inválido retornado pelo Gemini.');
        }

        clearTimeout(timeoutId);

        return {
          name: parsed.name || 'Tema IA Personalizado',
          bg: parsed.bg || '#0E1117',
          heading: parsed.heading || '#00D2FF',
          accent: parsed.accent || '#00A3FF',
          text: parsed.text || '#F4F4F5',
          subtext: parsed.subtext || '#94A3B8',
          preview: parsed.preview || parsed.accent || parsed.heading || '#00A3FF'
        };
      } catch (err) {
        lastError = err;
        if (err.name === 'AbortError') {
          break;
        }
        // Tenta o próximo modelo se este falhar
      }
    }

    clearTimeout(timeoutId);

    if (lastError?.name === 'AbortError') {
      throw new Error('Tempo limite de 10s excedido ao conectar com a API do Gemini.');
    }

    throw new Error(`Falha ao gerar tema com IA: ${lastError?.message || 'Erro desconhecido'}`);
  }
};
