import React from 'react';
import * as LucideIcons from 'lucide-react';

export function SlideCard({
  slide,
  index = 0,
  total = 1,
  globalFont = 'Inter',
  profile = null,
  themeInlineStyles = {},
  isActive = false,
  onSelect
}) {
  if (!slide) return null;

  const activeFont = slide.fontOverride || globalFont || 'Inter';
  const docked = slide.dockedImage;
  const dockingClass = docked && docked.src ? `dock-${docked.position || 'top'}` : '';
  const templateClass = `slide-template-${slide.slideTemplate || 'classic'}`;

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

  // Renderizador adaptativo para os 3 templates de conteúdo estáveis
  const renderTemplateContent = () => {
    const template = slide.slideTemplate || 'classic';
    const content = slide.content || 'Sem texto...';

    if (template === 'quote') {
      return (
        <div className="slide-template-quote-body">
          <div className="template-quote-glyph">“</div>
          <div className="template-quote-text">{content}</div>
        </div>
      );
    }

    if (template === 'minimalist') {
      return (
        <div className="slide-template-minimalist-body">
          {content}
        </div>
      );
    }

    // Default: 'classic'
    return content;
  };

  return (
    <div className="slide-card-wrapper">
      <div className="slide-card-header-label">
        <span>{index + 1} de {total}</span>
        {isActive && <span style={{ color: 'var(--accent-biolum)', fontSize: '11px' }}>● Editando</span>}
      </div>

      <div
        className={`slide-card ${isActive ? 'active' : ''} ${dockingClass} ${templateClass}`}
        onClick={onSelect}
        data-slide-id={slide.id}
        style={themeInlineStyles}
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
          <div
            className="slide-text-body"
            style={{
              fontFamily: activeFont,
              fontSize: slide.type === 'cover' ? '22px' : '16px',
              fontWeight: slide.type === 'cover' ? '700' : '400'
            }}
          >
            {renderTemplateContent()}
          </div>

          {/* Subtexto Independente (Hierarquia Tipográfica) */}
          {slide.subtext && (
            <div className="slide-subtext" style={{ fontFamily: activeFont }}>
              {slide.subtext}
            </div>
          )}

          {/* Assinatura do Criador (Branding) com Selo Verificado e Avatar Squircle/Circular */}
          {slide.showBranding && profile && (profile.name || profile.handle) && (
            <div className={`slide-branding-bar branding-pos-${profile.position || 'bottom-left'}`}>
              {profile.avatar && (
                <img
                  src={profile.avatar}
                  alt={profile.name || 'Autor'}
                  className={`branding-avatar ${profile.avatarShape === 'square' ? 'avatar-square' : 'avatar-circle'}`}
                />
              )}
              <div className="branding-meta">
                {profile.name && (
                  <div className="branding-name-row">
                    <span className="branding-name">{profile.name}</span>
                    {profile.hasVerifiedBadge && (
                      <span className="verified-badge" title="Perfil Verificado">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </span>
                    )}
                  </div>
                )}
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
