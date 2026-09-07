import React, { useState } from 'react';
import { SlideContentTab } from './SlideContentTab.jsx';
import { ThemesTab } from './ThemesTab.jsx';
import { ImageDockingTab } from './ImageDockingTab.jsx';
import { OverlaysTab } from './OverlaysTab.jsx';
import { TypographyTab } from './TypographyTab.jsx';
import { BrandingTab } from './BrandingTab.jsx';
import { FileText, Palette, Type, User, Image, Sparkles, RefreshCw, X } from 'lucide-react';

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
  // 4 Categorias Semânticas Primárias (Decisão de UX do speckit-clarify)
  const [activeCategory, setActiveCategory] = useState('slides-content');
  const [brandSubTab, setBrandSubTab] = useState('profile');

  const categories = [
    { id: 'slides-content', label: 'Lâminas', icon: FileText, title: 'Lâminas & Conteúdo' },
    { id: 'design-themes', label: 'Design', icon: Palette, title: 'Cores & Temas' },
    { id: 'typography', label: 'Tipografia', icon: Type, title: 'Tipografia & Fontes' },
    { id: 'brand-elements', label: 'Marca', icon: User, title: 'Marca & Elementos' }
  ];

  return (
    <aside className={`left-sidebar ${!isOpen ? 'collapsed' : ''}`} aria-label="Painel de Ferramentas">
      {/* Cabeçalho Limpo da Barra Esquerda */}
      <div className="sidebar-header">
        <div className="sidebar-title-group">
          <Sparkles className="brand-badge" size={18} />
          <span className="brand-badge-text">Carousel Studio</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            className="btn-new-project"
            onClick={onNewProject}
            title="Resetar workspace e colar novo roteiro"
          >
            <RefreshCw size={13} />
            <span>Novo</span>
          </button>

          {onClose && (
            <button
              type="button"
              className="sidebar-close-btn"
              onClick={onClose}
              title="Ocultar painel esquerdo"
              aria-label="Fechar painel"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Navegação Consolidada em 4 Categorias Semânticas (Sem Rolagem Horizontal) */}
      <nav className="sidebar-category-nav" role="tablist">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`sidebar-cat-btn ${isSelected ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              title={cat.title}
            >
              <Icon size={16} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Área de Conteúdo da Categoria Ativa */}
      <div className="sidebar-content">
        {/* 1. Lâminas & Conteúdo */}
        {activeCategory === 'slides-content' && (
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

        {/* 2. Design & Cores */}
        {activeCategory === 'design-themes' && (
          <ThemesTab
            currentTheme={currentTheme}
            customThemes={customThemes}
            onSelectTheme={onSelectTheme}
            onSaveCustomTheme={onSaveCustomTheme}
            onDeleteCustomTheme={onDeleteCustomTheme}
          />
        )}

        {/* 3. Tipografia */}
        {activeCategory === 'typography' && (
          <TypographyTab
            activeSlide={activeSlide}
            globalFont={globalFont}
            onUpdateGlobalFont={onUpdateGlobalFont}
            onUpdateSlide={onUpdateSlide}
          />
        )}

        {/* 4. Marca & Elementos (Perfil, Docking e Overlays) */}
        {activeCategory === 'brand-elements' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Sub-Seletor Segmentado */}
            <div className="sub-tab-segmented">
              <button
                type="button"
                className={`sub-tab-btn ${brandSubTab === 'profile' ? 'active' : ''}`}
                onClick={() => setBrandSubTab('profile')}
              >
                <User size={13} />
                <span>Perfil</span>
              </button>
              <button
                type="button"
                className={`sub-tab-btn ${brandSubTab === 'dock' ? 'active' : ''}`}
                onClick={() => setBrandSubTab('dock')}
              >
                <Image size={13} />
                <span>Mídia</span>
              </button>
              <button
                type="button"
                className={`sub-tab-btn ${brandSubTab === 'overlays' ? 'active' : ''}`}
                onClick={() => setBrandSubTab('overlays')}
              >
                <Sparkles size={13} />
                <span>Ícones</span>
              </button>
            </div>

            {brandSubTab === 'profile' && (
              <BrandingTab
                activeSlide={activeSlide}
                profile={profile}
                onUpdateProfile={onUpdateProfile}
                onUpdateSlide={onUpdateSlide}
              />
            )}

            {brandSubTab === 'dock' && (
              <ImageDockingTab
                activeSlide={activeSlide}
                onSetDockedImage={onSetDockedImage}
                onRemoveDockedImage={onRemoveDockedImage}
              />
            )}

            {brandSubTab === 'overlays' && (
              <OverlaysTab
                activeSlide={activeSlide}
                onAddOverlay={onAddOverlay}
                onUpdateOverlay={onUpdateOverlay}
                onRemoveOverlay={onRemoveOverlay}
              />
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
export default LeftSidebar;
