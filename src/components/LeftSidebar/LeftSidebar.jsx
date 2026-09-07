import React, { useState } from 'react';
import { SlideContentTab } from './SlideContentTab.jsx';
import { ThemesTab } from './ThemesTab.jsx';
import { ImageDockingTab } from './ImageDockingTab.jsx';
import { OverlaysTab } from './OverlaysTab.jsx';
import { TypographyTab } from './TypographyTab.jsx';
import { BrandingTab } from './BrandingTab.jsx';
import { FileText, Image, Sparkles, Type, User, RefreshCw, Palette, X } from 'lucide-react';

export function LeftSidebar({
  isOpen = true,
  onClose,
  activeSlide,
  slides = [],
  globalFont = 'Inter',
  profile = null,
  currentTheme = 'abyssal-glow',
  customThemes = [],
  onSaveCustomTheme,
  onDeleteCustomTheme,
  apiKey = '',
  onUpdateApiKey,
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
  onApplyTemplateToAll,
  onNewProject
}) {
  const [activeTab, setActiveTab] = useState('content');

  const tabs = [
    { id: 'content', label: 'Slide', icon: FileText },
    { id: 'themes', label: 'Cores', icon: Palette },
    { id: 'typography', label: 'Fonte', icon: Type },
    { id: 'image', label: 'Imagem', icon: Image },
    { id: 'overlays', label: 'Ícones', icon: Sparkles },
    { id: 'branding', label: 'Perfil', icon: User }
  ];

  return (
    <aside className={`left-sidebar ${!isOpen ? 'collapsed' : ''}`}>
      {/* Cabeçalho da Barra Esquerda */}
      <div className="sidebar-header">
        <div className="sidebar-title-group">
          <Sparkles className="brand-badge" size={20} />
          <span className="brand-badge">Carousel Studio</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            className="btn-new-project"
            onClick={onNewProject}
            title="Resetar workspace e colar novo roteiro"
          >
            <RefreshCw size={13} />
            Novo Projeto
          </button>

          {onClose && (
            <button
              type="button"
              className="sidebar-toggle-btn"
              onClick={onClose}
              title="Ocultar barra lateral esquerda"
              style={{ padding: '5px 8px' }}
            >
              <X size={15} />
            </button>
          )}
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

        {activeTab === 'themes' && (
          <ThemesTab
            currentTheme={currentTheme}
            customThemes={customThemes}
            onSelectTheme={onSelectTheme}
            onSaveCustomTheme={onSaveCustomTheme}
            onDeleteCustomTheme={onDeleteCustomTheme}
          />
        )}

        {activeTab === 'typography' && (
          <TypographyTab
            activeSlide={activeSlide}
            globalFont={globalFont}
            onUpdateGlobalFont={onUpdateGlobalFont}
            onUpdateSlide={onUpdateSlide}
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
