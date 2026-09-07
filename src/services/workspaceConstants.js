/**
 * Workspace Constants & Registries
 * Curated typography fonts, Lucide icons, 9-anchor grid definitions, slide templates, and themes.
 */

export const AVAILABLE_FONTS = [
  { id: 'Inter', name: 'Inter (Moderno & Neutro)', category: 'sans-serif' },
  { id: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans (Elegante & Clean)', category: 'sans-serif' },
  { id: 'Playfair Display', name: 'Playfair Display (Editorial & Sofisticado)', category: 'serif' },
  { id: 'Space Grotesk', name: 'Space Grotesk (Tech & Impactante)', category: 'display' },
  { id: 'Montserrat', name: 'Montserrat (Forte & Marcante)', category: 'sans-serif' }
];

export const CURATED_ICONS = [
  { id: 'Sparkles', label: 'Destaque / IA' },
  { id: 'Flame', label: 'Fogo / Tendência' },
  { id: 'Rocket', label: 'Foguete / Crescimento' },
  { id: 'Lightbulb', label: 'Ideia / Dica' },
  { id: 'CheckCircle', label: 'Concluído / Vantagem' },
  { id: 'ArrowRight', label: 'Seta de Deslize' },
  { id: 'Quote', label: 'Citação / Frase' },
  { id: 'Star', label: 'Estrela / Destaque' },
  { id: 'Heart', label: 'Curtida / Empatia' },
  { id: 'AlertCircle', label: 'Atenção / Alerta' }
];

export const GRID_ANCHORS = [
  { id: 'top-left', label: 'TL', title: 'Topo Esquerdo' },
  { id: 'top-center', label: 'TC', title: 'Topo Centro' },
  { id: 'top-right', label: 'TR', title: 'Topo Direito' },
  { id: 'center-left', label: 'CL', title: 'Centro Esquerdo' },
  { id: 'center', label: 'C', title: 'Centro' },
  { id: 'center-right', label: 'CR', title: 'Centro Direito' },
  { id: 'bottom-left', label: 'BL', title: 'Base Esquerda' },
  { id: 'bottom-center', label: 'BC', title: 'Base Centro' },
  { id: 'bottom-right', label: 'BR', title: 'Base Direita' }
];

export const SLIDE_TEMPLATES = [
  { id: 'classic', name: 'Cartão Clássico', description: 'Layout balanceado para leitura direta', icon: 'Layout' },
  { id: 'quote', name: 'Citação Editorial', description: 'Aspas de destaque e tipografia editorial', icon: 'Quote' },
  { id: 'minimalist', name: 'Minimalista Foco', description: 'Espaço generoso com foco essencial na ideia', icon: 'Sparkles' }
];

export const AVATAR_SHAPES = [
  { id: 'circle', label: 'Redonda' },
  { id: 'square', label: 'Quadrada' }
];

export const BRANDING_POSITIONS = [
  { id: 'top-left', label: 'Superior Esquerdo', icon: 'ArrowUpLeft' },
  { id: 'top-center', label: 'Topo Centro', icon: 'ArrowUp' },
  { id: 'top-right', label: 'Superior Direito', icon: 'ArrowUpRight' },
  { id: 'bottom-left', label: 'Inferior Esquerdo (Padrão)', icon: 'ArrowDownLeft' },
  { id: 'bottom-center', label: 'Base Centro', icon: 'ArrowDown' },
  { id: 'bottom-right', label: 'Inferior Direito', icon: 'ArrowDownRight' }
];

export const AVAILABLE_THEMES = [
  // Temas Originais & Bioluminescentes
  { id: 'abyssal-glow', name: 'Abyssal Glow', preview: '#05ffd4', category: 'bioluminescent' },
  { id: 'minimalist-obsidian', name: 'Obsidian Black', preview: '#38bdf8', category: 'dark' },
  { id: 'sunset-nebula', name: 'Sunset Nebula', preview: '#f43f5e', category: 'vibrant' },
  
  // Novo: Azul Celestial Autêntico & Luminoso
  { id: 'celestial-azure', name: 'Azul Celestial', preview: '#00A3FF', category: 'vibrant' },
  
  // Novos: Temas Clean & Minimalistas
  { id: 'clean-ivory', name: 'Clean Ivory (Editorial)', preview: '#FAF8F5', category: 'clean' },
  { id: 'clean-slate', name: 'Scandinavian Slate', preview: '#0E1117', category: 'clean' },
  { id: 'light-clean', name: 'Light Clean (Vivid Sky)', preview: '#00A3FF', category: 'clean' },
  
  // Slot Extensível para Referência Visual / Imagem
  { id: 'reference-aesthetic', name: 'Reference Aesthetic', preview: '#38BDF8', category: 'clean' }
];

export const DEFAULT_THEME_FALLBACK = 'abyssal-glow';

export const DEFAULT_ASPECT_RATIO = '4:5';

export const ASPECT_RATIOS = [
  { id: '4:5', label: '4:5 Retrato', ratioLabel: '4:5', canvasWidth: 380, canvasHeight: 475, exportWidth: 1080, exportHeight: 1350 },
  { id: '1:1', label: '1:1 Quadrado', ratioLabel: '1:1', canvasWidth: 380, canvasHeight: 380, exportWidth: 1080, exportHeight: 1080 }
];

export const CANVAS_DESIGN_MOVEMENTS = [
  {
    id: 'chromatic-silence',
    name: 'Chromatic Silence',
    movementTitle: 'Silêncio Cromático',
    philosophy: 'Espaço profundo noturno, quietude meditativa e nitidez bioluminescente.',
    gradientType: 'radial',
    colorStart: '#05080f',
    colorEnd: '#0c1424',
    headingColor: '#00f0ff',
    accentColor: '#00f0ff',
    textColor: '#f5f7fa',
    subtextColor: '#94a3b8',
    borderColor: 'rgba(0, 240, 255, 0.25)',
    tagBgColor: 'rgba(0, 240, 255, 0.12)'
  },
  {
    id: 'brutalist-joy',
    name: 'Brutalist Joy',
    movementTitle: 'Alegria Brutalista',
    philosophy: 'Energia crua e visceral: base escura monolítica com eletricidade ácida vibrante.',
    gradientType: 'linear',
    gradientAngle: 135,
    colorStart: '#121214',
    colorEnd: '#1e1e24',
    headingColor: '#d4ff00',
    accentColor: '#d4ff00',
    textColor: '#ffffff',
    subtextColor: '#a1a1aa',
    borderColor: 'rgba(212, 255, 0, 0.3)',
    tagBgColor: 'rgba(212, 255, 0, 0.15)'
  },
  {
    id: 'kinetic-vapor',
    name: 'Kinetic Vapor',
    movementTitle: 'Vapor Cinético',
    philosophy: 'Profundidade atmosférica violeta com pulso luminescente magenta e ciano.',
    gradientType: 'linear',
    gradientAngle: 145,
    colorStart: '#09041a',
    colorEnd: '#210b3b',
    headingColor: '#ff2a85',
    accentColor: '#00f5d4',
    textColor: '#f8fafc',
    subtextColor: '#c4b5fd',
    borderColor: 'rgba(255, 42, 133, 0.3)',
    tagBgColor: 'rgba(255, 42, 133, 0.15)'
  },
  {
    id: 'ethereal-aura',
    name: 'Ethereal Aura',
    movementTitle: 'Aura Etérea',
    philosophy: 'Abismo oceânico esmeralda com calor dourado e fosforescência orgânica.',
    gradientType: 'radial',
    colorStart: '#001a18',
    colorEnd: '#00332d',
    headingColor: '#05ffd4',
    accentColor: '#fbbf24',
    textColor: '#f5f7fa',
    subtextColor: '#86efac',
    borderColor: 'rgba(5, 255, 212, 0.25)',
    tagBgColor: 'rgba(5, 255, 212, 0.12)'
  },
  {
    id: 'metabolist-space',
    name: 'Metabolist Space',
    movementTitle: 'Espaço Metabolista',
    philosophy: 'Formas arquitetônicas de grafite escuro combinadas com calor laranja cádmio.',
    gradientType: 'linear',
    gradientAngle: 125,
    colorStart: '#0e0e11',
    colorEnd: '#1c1d24',
    headingColor: '#ff6b35',
    accentColor: '#ff6b35',
    textColor: '#ffffff',
    subtextColor: '#d1d5db',
    borderColor: 'rgba(255, 107, 53, 0.3)',
    tagBgColor: 'rgba(255, 107, 53, 0.15)'
  }
];

export const THEME_CATEGORIES = [
  { id: 'custom', label: 'Temas Personalizados' },
  { id: 'bioluminescent', label: 'Bioluminescente' },
  { id: 'clean', label: 'Clean & Editorial' },
  { id: 'vibrant', label: 'Vibrante' },
  { id: 'dark', label: 'Escuro' }
];

export const SAMPLE_SCRIPT = `5 Hábitos para Turbinar sua Produtividade em 2026

1. Bloqueio de Tempo: reserve blocos de foco absoluto sem notificações para as tarefas mais difíceis.
2. Regra dos 2 Minutos: se algo leva menos de 2 minutos para resolver, faça imediatamente.
3. Planejamento Noturno: defina suas 3 prioridades essenciais do dia seguinte na noite anterior.
4. Descanso Ativo: faça pausas de 5 minutos longe de telas a cada hora de trabalho concentrado.

Qual desses hábitos você vai implementar hoje? Comente abaixo e salve o post para consultar depois!`;
