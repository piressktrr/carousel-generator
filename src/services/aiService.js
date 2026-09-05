import { textSegmenter } from './textSegmenter';

export const aiService = {
  async generateCarousel(text, apiKey) {
    if (!apiKey) {
      console.warn("No API key provided, falling back to local segmentation.");
      return textSegmenter.segmentText(text);
    }
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    
    try {
      // Mocked fetch for Gemini API integration (to be replaced with actual endpoint/sdk)
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Crie um carrossel atraente a partir do texto a seguir. Retorne EXATAMENTE um JSON array onde cada objeto tenha a propriedade "content". O primeiro slide deve ser um gancho, e o último uma chamada para ação. Máximo de 250 caracteres por slide. Texto: ${text}`
            }]
          }]
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // Basic JSON extraction (assuming Gemini returns code block or raw JSON array)
      const jsonStr = generatedText.replace(/```json\n?|\n?```/g, '').trim();
      const parsed = JSON.parse(jsonStr);
      
      return parsed.map((item, index) => ({
        id: `slide-ai-${Date.now()}-${index}`,
        content: item.content,
        isCover: index === 0,
        isCTA: index === parsed.length - 1 && parsed.length > 1
      }));
      
    } catch (error) {
      clearTimeout(timeoutId);
      console.error("AI Generation failed, falling back to local:", error);
      return textSegmenter.segmentText(text);
    }
  }
};
