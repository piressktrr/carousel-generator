# Estrutura de Dados: Gerador de Carrosséis

**Feature**: `001-social-carousel-generator`  
**Date**: 2026-09-05  
**Context**: Definição direta e pragmática do formato dos objetos de dados e do estado gerenciado pela aplicação em JavaScript/React.

---

## 1. Estado Principal do Carrossel (`CarouselState`)

O carrossel é representado por um único objeto de estado reativo, facilitando o salvamento local e a passagem de propriedades entre os componentes:

```javascript
const carouselState = {
  // Identificação e plataforma alvo
  id: "c7b8a109-9f44-48f1-94f7-92518e384e51",
  title: "Meu Carrossel Estratégico",
  platform: "instagram", // "instagram" | "linkedin" | "tiktok"
  aspectRatio: "4:5",     // "1:1" (1080x1080) | "4:5" (1080x1350) | "9:16" (1080x1920)
  currentSlideIndex: 0,

  // Identidade visual do autor (Branding)
  author: {
    name: "Seu Nome",
    handle: "@seu.arroba",
    avatarUrl: null, // string Base64 ou Blob URL da imagem
    position: "footer", // "header" | "footer"
    isVisible: true
  },

  // Tema visual ativo (Cores e Tipografia)
  theme: {
    id: "dark-modern",
    name: "Dark Modern",
    backgroundColor: "#0F172A",
    textColor: "#F8FAFC",
    accentColor: "#38BDF8",
    fontFamily: "Inter, sans-serif"
  },

  // Elementos e pistas de navegação para o leitor
  navigation: {
    showCounter: true,
    counterFormat: "fraction", // "fraction" (ex: 2/7) | "text" (ex: Slide 2 de 7)
    showSwipeCues: true,
    swipeText: "Arraste para o lado →",
    showProgressBar: true,
    ctaHeadline: "Gostou do conteúdo?",
    ctaSubtext: "Salve este carrossel e compartilhe com seus amigos!"
  },

  // Sequência de slides do carrossel
  slides: [
    {
      id: "slide-1",
      orderIndex: 0,
      type: "hook", // "hook" (capa) | "content" (conteúdo) | "cta" (fechamento)
      title: "Como Criar Carrosséis que Retêm 3x Mais Leitores",
      body: "O segredo está em estruturar uma narrativa visual irresistível slide a slide.",
      image: null, // { url: string, scale: 1, posX: 0, posY: 0 }
      seamless: {
        active: false,
        imageUrl: null,
        splitRatio: 0.5 // 50% no slide atual, 50% no seguinte
      },
      showBranding: true
    },
    {
      id: "slide-2",
      orderIndex: 1,
      type: "content",
      title: "1. Gancho Direto e Provocativo",
      body: "A capa precisa vender o próximo clique em menos de 2 segundos.",
      image: null,
      seamless: {
        active: false,
        imageUrl: null,
        splitRatio: 0.5
      },
      showBranding: true
    }
    // ...demais slides (até 10 a 12 slides)
  ]
};
```

---

## 2. Regras e Validações Práticas

1. **Quantidade de Slides**:
   - Mínimo: 1 slide.
   - Recomendado para redes sociais: 5 a 8 slides.
   - Alerta visual suave ao ultrapassar 10 slides.
2. **Textos**:
   - Título: recomendado até 100 caracteres para não estourar a caixa de texto.
   - Corpo: recomendado até 350 caracteres por slide para manter leitura confortável em telas de smartphones.
3. **Imagens por Slide**:
   - Formatos suportados: PNG, JPG, WEBP.
   - Redimensionamento e enquadramento automático preservando a proporção selecionada (1:1, 4:5 ou 9:16).
4. **Efeito Seamless (Contínuo)**:
   - Só pode ser ativado em slides que possuam um slide posterior (`index < slides.length - 1`).
   - O elemento visual conector é dividido exatamente na borda lateral direita do slide de origem e continua na borda lateral esquerda do slide seguinte.

---

## 3. Estrutura de Armazenamento Local (`IndexedDB`)

Os dados são salvos localmente sob duas chaves principais no navegador do usuário:

| Chave | Tipo de Dado | Função |
|---|---|---|
| `carousel_draft` | Objeto `carouselState` | Guarda o carrossel em edição atual para não perder nada se a página for recarregada. |
| `author_profile` | Objeto `author` | Guarda o nome, @arroba e foto do criador para preencher automaticamente em novos carrosséis. |
| `user_api_key` | `string` | Guarda a chave da API do Gemini informada pelo criador (se desejar usar IA própria). |
