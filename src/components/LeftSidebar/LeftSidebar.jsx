import React, { useState } from 'react';
import { RawScriptTab } from './RawScriptTab.jsx';
import { SlideContentTab } from './SlideContentTab.jsx';
import { ImageDockingTab } from './ImageDockingTab.jsx';
import { OverlaysTab } from './OverlaysTab.jsx';
import { TypographyTab } from './TypographyTab.jsx';
import { BrandingTab } from './BrandingTab.jsx';
import { AlignLeft, FileText, Image, Sparkles, Type, User, RefreshCw, Palette } from 'lucide-react';
import { AVAILABLE_THEMES } from '../../services/workspaceConstants.js';

export function LeftSidebar({
  activeSlide,
  slides = [],
  rawScript = '',
  globalFont = 'Inter',
  profile = null,
  currentTheme = 'abyssal-glow',
  onUpdateSlide,
  onAddSlide,
  onRemoveSlide,
  onReorderSlide,
  onSetDockedImage,
  onRemoveDockedImage,
  onAddOverlay,
  onUpdateOverlay,
  onRemoveOverlay,
  onUpdateGlobalFont,
  onUpdateProfile,
  onSelectTheme,
  onRegenerateFromScript,
  onApplyTemplateToAll,
  onNewProject
}) {
  const [activeTab, setActiveTab] = useState('content');

  const tabs = [
    { id: 'script', label: 'Roteiro', icon: AlignLeft },
    { id: 'content', label: 'Slide', icon: FileText },
    { id: 'image', label: 'Imagem', icon: Image },
    { id: 'overlays', label: 'Ícones', icon: Sparkles },
    { id: 'typography', label: 'Fonte', icon: Type },
    { id: 'branding', label: 'Perfil', icon: User }
  ];

  return (
    <aside className="left-sidebar">
      {/* Cabeçalho da Barra Esquerda */}
      <div className="sidebar-header">
        <div className="sidebar-title-group">
          <Sparkles className="brand-badge" size={20} />
          <span className="brand-badge">Carousel Studio</span>
        </div>

        <button
          type="button"
          className="btn-new-project"
          onClick={onNewProject}
          title="Resetar workspace e colar novo roteiro"
        >
          <RefreshCw size={13} />
          Novo Projeto
        </button>
      </div>

      {/* Seletor de Tema Visual Rápido */}
      <div
        style={{
          padding: '8px 16px',
          background: 'rgba(0, 15, 14, 0.4)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span style={{ fontSize: '11px', color: 'var(--text-silver)', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Palette size={13} color="var(--accent-biolum)" /> Tema:
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {AVAILABLE_THEMES.map(theme => (
            <div
              key={theme.id}
              onClick={() => onSelectTheme && onSelectTheme(theme.id)}
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: theme.preview,
                cursor: 'pointer',
                border: currentTheme === theme.id ? '2px solid white' : '1px solid rgba(0,0,0,0.5)',
                boxShadow: currentTheme === theme.id ? '0 0 8px ' + theme.preview : 'none'
              }}
              title={theme.name}
            />
          ))}
        </div>
      </div>

      {/* Navegação por Abas */}
      <nav className="sidebar-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              className={`sidebar-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Conteúdo da Aba Ativa */}
      <div className="sidebar-content">
        {activeTab === 'script' && (
          <RawScriptTab
            rawScript={rawScript}
            slidesCount={slides.length}
            onRegenerateFromScript={onRegenerateFromScript}
          />
        )}

        {activeTab === 'content' && (
          <SlideContentTab
            activeSlide={activeSlide}
            slides={slides}
            onUpdateSlide={onUpdateSlide}
            onAddSlide={onAddSlide}
            onRemoveSlide={onRemoveSlide}
            onReorderSlide={onReorderSlide}
            onApplyTemplateToAll={onApplyTemplateToAll}
          />
        )}

        {activeTab === 'image' && (
          <ImageDockingTab
            activeSlide={activeSlide}
            onSetDockedImage={onSetDockedImage}
            onRemoveDockedImage={onRemoveDockedImage}
          />
        )}

        {activeTab === 'overlays' && (
          <OverlaysTab
            activeSlide={activeSlide}
            onAddOverlay={onAddOverlay}
            onUpdateOverlay={onUpdateOverlay}
            onRemoveOverlay={onRemoveOverlay}
          />
        )}

        {activeTab === 'typography' && (
          <TypographyTab
            activeSlide={activeSlide}
            globalFont={globalFont}
            currentTheme={currentTheme}
            onSelectTheme={onSelectTheme}
            onUpdateGlobalFont={onUpdateGlobalFont}
            onUpdateSlide={onUpdateSlide}
          />
        )}

        {activeTab === 'branding' && (
          <BrandingTab
            activeSlide={activeSlide}
            profile={profile}
            onUpdateProfile={onUpdateProfile}
            onUpdateSlide={onUpdateSlide}
          />
        )}
      </div>
    </aside>
  );
}
export default LeftSidebar;
