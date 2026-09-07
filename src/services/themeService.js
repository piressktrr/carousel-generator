/**
 * Theme Service
 * Pure functional theme calculations, dynamic CSS variable resolution,
 * multi-stop angular gradient generation, and WCAG contrast calculations.
 */

/**
 * Converts a hex color string (#RGB or #RRGGBB) to { r, g, b } numbers.
 * @param {string} hex
 * @returns {{ r: number, g: number, b: number }}
 */
export function hexToRgb(hex) {
  let cleanHex = (hex || '#000000').replace(/^#/, '').trim();
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  if (cleanHex.length !== 6) {
    return { r: 0, g: 0, b: 0 };
  }
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

/**
 * Converts hex + opacity (0..1) to rgba(...) string or returns hex if opacity is 1.
 * @param {string} hex
 * @param {number} [opacity=1]
 * @returns {string}
 */
export function hexToRgba(hex, opacity = 1) {
  if (opacity === undefined || opacity === null || opacity >= 1) {
    return hex;
  }
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, opacity))})`;
}

/**
 * Generates a valid CSS gradient string from a GradientConfig.
 * @param {Object} config
 * @param {string} [config.type='linear']
 * @param {number} [config.angle=135]
 * @param {Array<{ color: string, position: number, opacity?: number }>} config.stops
 * @returns {string}
 */
export function generateGradientCss(config) {
  if (!config || !Array.isArray(config.stops) || config.stops.length === 0) {
    return '#0E1117';
  }

  const { type = 'linear', angle = 135, stops } = config;
  const sortedStops = [...stops].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  const stopsString = sortedStops
    .map(s => {
      const colorVal = hexToRgba(s.color, s.opacity !== undefined ? s.opacity : 1);
      const pos = Math.max(0, Math.min(100, s.position ?? 0));
      return `${colorVal} ${pos}%`;
    })
    .join(', ');

  if (type === 'radial') {
    return `radial-gradient(circle at center, ${stopsString})`;
  }

  const cleanAngle = isNaN(angle) ? 135 : ((Number(angle) % 360) + 360) % 360;
  return `linear-gradient(${cleanAngle}deg, ${stopsString})`;
}

/**
 * Resolves CSS variable overrides for a given theme ID.
 * Returns an object with CSS variables to apply inline, or empty object for native themes.
 * @param {string} themeId
 * @param {Array<Object>} [customThemes=[]]
 * @returns {Record<string, string>}
 */
export function resolveThemeVariables(themeId, customThemes = []) {
  if (!themeId) return {};

  const customTheme = (customThemes || []).find(t => t.id === themeId);
  if (!customTheme) {
    return {};
  }

  const accentHex = customTheme.accent || '#00A3FF';
  return {
    '--slide-bg': customTheme.bg,
    '--slide-heading': customTheme.heading,
    '--slide-accent': customTheme.accent,
    '--slide-text': customTheme.text,
    '--slide-subtext': customTheme.subtext,
    '--slide-border': customTheme.border || hexToRgba(accentHex, 0.25)
  };
}

/**
 * Constructs and validates a new CustomTheme object.
 * @param {Object} input
 * @returns {Object} CustomTheme
 */
export function createCustomTheme(input = {}) {
  const id = input.id || `custom-theme-${Date.now()}`;
  const name = (input.name && input.name.trim()) || 'Novo Tema';
  const heading = input.heading || '#FFFFFF';
  const accent = input.accent || '#00A3FF';
  const text = input.text || '#F4F4F5';
  const subtext = input.subtext || '#A1A1AA';

  let bg = input.bg;
  if (!bg) {
    if (input.gradientConfig) {
      bg = generateGradientCss(input.gradientConfig);
    } else {
      bg = '#0E1117';
    }
  }

  const preview = input.preview || accent || heading || '#00A3FF';

  return {
    id,
    name,
    category: 'custom',
    preview,
    isCustom: true,
    bg,
    heading,
    accent,
    text,
    subtext,
    gradientConfig: input.gradientConfig || null,
    createdAt: input.createdAt || Date.now()
  };
}

/**
 * Calculates WCAG 2.1 relative luminance for a given hex color.
 * @param {string} hex
 * @returns {number} Relative luminance [0..1]
 */
export function calculateLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const normalize = (channel) => {
    const v = channel / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b);
}

/**
 * Calculates WCAG contrast ratio between foreground and background hex colors.
 * @param {string} foregroundHex
 * @param {string} backgroundHex
 * @returns {number} Ratio between 1 and 21 (e.g. 4.5)
 */
export function calculateContrastRatio(foregroundHex, backgroundHex) {
  const lum1 = calculateLuminance(foregroundHex);
  const lum2 = calculateLuminance(backgroundHex);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Number(ratio.toFixed(2));
}

export const themeService = {
  hexToRgb,
  hexToRgba,
  generateGradientCss,
  resolveThemeVariables,
  createCustomTheme,
  calculateLuminance,
  calculateContrastRatio
};

export default themeService;
