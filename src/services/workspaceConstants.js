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

export const SAMPLE_SCRIPT = `5 Hábitos para Turbinar sua Produtividade em 2026

1. Bloqueio de Tempo: reserve blocos de foco absoluto sem notificações para as tarefas mais difíceis.
2. Regra dos 2 Minutos: se algo leva menos de 2 minutos para resolver, faça imediatamente.
3. Planejamento Noturno: defina suas 3 prioridades essenciais do dia seguinte na noite anterior.
4. Descanso Ativo: faça pausas de 5 minutos longe de telas a cada hora de trabalho concentrado.

Qual desses hábitos você vai implementar hoje? Comente abaixo e salve o post para consultar depois!`;
