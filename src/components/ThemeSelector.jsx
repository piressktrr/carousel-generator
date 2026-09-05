import React from 'react';
import { THEMES } from '../services/carouselConstants';

export default function ThemeSelector({ currentTheme, onThemeChange }) {
  return (
    <div style={{ padding: '20px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', margin: '20px' }}>
      <h3>Tema Visual</h3>
      <select 
        value={currentTheme} 
        onChange={(e) => onThemeChange(e.target.value)}
        style={{ padding: '8px', marginTop: '10px' }}
      >
        {Object.values(THEMES).map(theme => (
          <option key={theme.id} value={theme.id}>{theme.name}</option>
        ))}
      </select>
    </div>
  );
}
