import React from 'react';
import * as LucideIcons from 'lucide-react';

export function SlideCard({
  slide,
  index = 0,
  total = 1,
  globalFont = 'Inter',
  profile = null,
  isActive = false,
  onSelect
}) {
  if (!slide) return null;

  const activeFont = slide.fontOverride || globalFont || 'Inter';
  const docked = slide.dockedImage;
  const dockingClass = docked && docked.src ? `dock-${docked.position || 'top'}` : '';

  // Renderiza ícone vetorial dinâmico a partir do nome
  const renderOverlayElement = (ov) => {
    if (ov.type === 'icon') {
      const IconComponent = LucideIcons[ov.iconName] || LucideIcons.Sparkles;
      return (
        <IconComponent
          size={ov.size || 48}
          color={ov.color || 'var(--accent-biolum)'}
          style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}
        />
      );
    }
    if (ov.type === 'image') {
      return (
        <img
          src={ov.iconName}
          alt="Overlay"
          style={{
            width: `${ov.size || 48}px`,
            height: `${ov.size || 48}px`,
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))'
          }}
        />
      );
    }
    return null;
  };

  // Badge label
  const getBadgeLabel = () => {
    if (slide.type === 'cover') return 'Capa';
    if (slide.type === 'cta') return 'Fechamento / CTA';
    return `Slide ${index + 1}`;
  };

  return (
    <div className="slide-card-wrapper">
      <div className="slide-card-header-label">
        <span>{index + 1} de {total}</span>
        {isActive && <span style={{ color: 'var(--accent-biolum)', fontSize: '11px' }}>● Editando</span>}
      </div>

      <div
        className={`slide-card ${isActive ? 'active' : ''} ${dockingClass}`}
        onClick={onSelect}
        data-slide-id={slide.id}
      >
        {/* Camada de Imagem Principal Ancorada */}
        {docked && docked.src && (
          <div className="docked-image-container">
            <img
              src={docked.src}
              alt="Slide media"
              className="docked-img"
              style={{
                transform: `scale(${docked.scale || 1.0})`
              }}
            />
          </div>
        )}

        {/* Camada de Conteúdo e Texto */}
        <div className="slide-content-box">
          <div className="slide-tag">
            {getBadgeLabel()}
          </div>

          <div
            className="slide-text-body"
            style={{
              fontFamily: activeFont,
              fontSize: slide.type === 'cover' ? '22px' : '16px',
              fontWeight: slide.type === 'cover' ? '700' : '400'
            }}
          >
            {slide.content || 'Sem texto...'}
          </div>

          {/* Assinatura do Criador (Branding) */}
          {slide.showBranding && profile && (profile.name || profile.handle) && (
            <div className="slide-branding-bar">
              {profile.avatar && (
                <img src={profile.avatar} alt={profile.name || 'Autor'} className="branding-avatar" />
              )}
              <div className="branding-meta">
                {profile.name && <span className="branding-name">{profile.name}</span>}
                {profile.handle && <span className="branding-handle">{profile.handle}</span>}
              </div>
            </div>
          )}
        </div>

        {/* Camada de Overlays Secundários (Ícones e Imagens Menores na Grade 3x3) */}
        {Array.isArray(slide.overlays) && slide.overlays.length > 0 && (
          <div className="slide-overlay-layer">
            {slide.overlays.map((ov) => (
              <div
                key={ov.id}
                className={`overlay-item anchor-${ov.anchor || 'top-right'}`}
              >
                {renderOverlayElement(ov)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default SlideCard;
