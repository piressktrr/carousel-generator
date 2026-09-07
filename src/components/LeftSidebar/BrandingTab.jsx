import React, { useRef } from 'react';
import {
  User,
  Eye,
  EyeOff,
  Upload,
  AtSign,
  BadgeCheck,
  Circle,
  Square,
  Compass,
  ArrowUpLeft,
  ArrowUp,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowDown,
  ArrowDownRight,
  RotateCcw
} from 'lucide-react';
import { BRANDING_POSITIONS } from '../../services/workspaceConstants.js';

const POSITION_ICONS = {
  ArrowUpLeft,
  ArrowUp,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowDown,
  ArrowDownRight
};

export function BrandingTab({
  activeSlide,
  profile = { name: '', handle: '', avatar: null, hasVerifiedBadge: false, avatarShape: 'circle', position: 'bottom-left' },
  onUpdateProfile,
  onUpdateSlide
}) {
  const avatarInputRef = useRef(null);

  const handleNameChange = (e) => {
    onUpdateProfile({ ...profile, name: e.target.value });
  };

  const handleHandleChange = (e) => {
    let val = e.target.value;
    if (val && !val.startsWith('@')) {
      val = `@${val}`;
    }
    onUpdateProfile({ ...profile, handle: val });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      if (base64) {
        onUpdateProfile({ ...profile, avatar: base64 });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleToggleVerifiedBadge = (e) => {
    onUpdateProfile({ ...profile, hasVerifiedBadge: e.target.checked });
  };

  const handleAvatarShapeChange = (shape) => {
    onUpdateProfile({ ...profile, avatarShape: shape });
  };

  const handlePositionChange = (position) => {
    onUpdateProfile({ ...profile, position });
  };

  const slideProfilePosition = activeSlide?.profilePosition;
  const isCustomPerSlide = slideProfilePosition !== undefined && slideProfilePosition !== null;
  const isSlideBrandingHidden = slideProfilePosition === 'hidden' || activeSlide?.showBranding === false;
  const isSlideBrandingVisible = !isSlideBrandingHidden;
  const activeSlideEffectivePosition = isCustomPerSlide && slideProfilePosition !== 'hidden'
    ? slideProfilePosition
    : (profile.position || 'bottom-left');

  const handleSetSlidePosition = (posId) => {
    if (!activeSlide) return;
    onUpdateSlide(activeSlide.id, { profilePosition: posId, showBranding: true });
  };

  const handleResetToGlobal = () => {
    if (!activeSlide) return;
    onUpdateSlide(activeSlide.id, { profilePosition: null, showBranding: true });
  };

  const handleHideOnSlide = () => {
    if (!activeSlide) return;
    onUpdateSlide(activeSlide.id, { profilePosition: 'hidden' });
  };

  const handleToggleBrandingVisibility = (e) => {
    if (!activeSlide) return;
    if (e.target.checked) {
      onUpdateSlide(activeSlide.id, {
        showBranding: true,
        profilePosition: slideProfilePosition === 'hidden' ? null : slideProfilePosition
      });
    } else {
      onUpdateSlide(activeSlide.id, {
        profilePosition: 'hidden'
      });
    }
  };

  const avatarShape = profile.avatarShape || 'circle';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Controle e Posição da Assinatura no Slide Ativo */}
      {activeSlide && (
        <div className="control-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label className="section-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Compass size={14} color="var(--accent-biolum)" />
              Assinatura no Slide Ativo
            </label>
            <span style={{
              fontSize: '10px',
              padding: '2px 7px',
              borderRadius: '4px',
              background: slideProfilePosition === 'hidden'
                ? 'rgba(244, 63, 94, 0.15)'
                : isCustomPerSlide
                  ? 'rgba(5, 255, 212, 0.15)'
                  : 'rgba(255, 255, 255, 0.06)',
              color: slideProfilePosition === 'hidden'
                ? '#f43f5e'
                : isCustomPerSlide
                  ? 'var(--accent-biolum)'
                  : 'var(--text-silver)',
              border: slideProfilePosition === 'hidden'
                ? '1px solid rgba(244, 63, 94, 0.3)'
                : isCustomPerSlide
                  ? '1px solid rgba(5, 255, 212, 0.3)'
                  : '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              {slideProfilePosition === 'hidden'
                ? 'Oculto neste slide'
                : isCustomPerSlide
                  ? 'Posição individual'
                  : 'Padrão global'}
            </span>
          </div>

          <p style={{ fontSize: '11px', color: 'var(--text-silver)', margin: '0 0 10px 0', lineHeight: 1.4 }}>
            Escolha uma posição exclusiva para a assinatura neste slide ou alterne entre ocultar e o padrão da marca:
          </p>

          {/* Grid de 6 Posições para o Slide Ativo */}
          <div className="branding-position-grid" style={{ marginBottom: '10px' }}>
            {BRANDING_POSITIONS.map(pos => {
              const isSelected = activeSlideEffectivePosition === pos.id && slideProfilePosition !== 'hidden';
              const IconComp = POSITION_ICONS[pos.icon] || Compass;
              return (
                <button
                  key={pos.id}
                  type="button"
                  className={`branding-position-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSetSlidePosition(pos.id)}
                  title={`Definir ${pos.label} para este slide`}
                >
                  <IconComp size={14} />
                  <span>{pos.label.replace(' (Padrão)', '')}</span>
                </button>
              );
            })}
          </div>

          {/* Ações de Slide: Ocultar neste Slide & Usar Padrão Global */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              type="button"
              onClick={handleHideOnSlide}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '7px 8px',
                fontSize: '11px',
                borderRadius: '6px',
                background: slideProfilePosition === 'hidden' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(0,0,0,0.3)',
                border: slideProfilePosition === 'hidden' ? '1px solid #f43f5e' : '1px solid rgba(255,255,255,0.1)',
                color: slideProfilePosition === 'hidden' ? '#f43f5e' : 'var(--text-silver)',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
              title="Ocultar assinatura apenas neste slide"
            >
              <EyeOff size={13} />
              <span>Ocultar no slide</span>
            </button>

            <button
              type="button"
              onClick={handleResetToGlobal}
              disabled={!isCustomPerSlide}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '7px 8px',
                fontSize: '11px',
                borderRadius: '6px',
                background: !isCustomPerSlide ? 'rgba(255,255,255,0.02)' : 'rgba(5, 255, 212, 0.08)',
                border: !isCustomPerSlide ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(5, 255, 212, 0.25)',
                color: !isCustomPerSlide ? 'rgba(255,255,255,0.3)' : 'var(--accent-biolum)',
                cursor: !isCustomPerSlide ? 'not-allowed' : 'pointer',
                transition: 'var(--transition-fast)'
              }}
              title="Voltar a herdar o alinhamento configurado globalmente"
            >
              <RotateCcw size={13} />
              <span>Padrão Global</span>
            </button>
          </div>
        </div>
      )}

      {/* Identidade do Autor / Perfil Global */}
      <div className="control-card">
        <label className="section-label">
          <User size={14} />
          Identidade do Criador de Conteúdo
        </label>
        
        {/* Foto de Perfil e Formato */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: avatarShape === 'square' ? '10px' : '50%',
              background: 'rgba(0, 20, 19, 0.9)',
              border: '2px solid var(--accent-biolum)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'border-radius 0.2s ease'
            }}
          >
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt="Avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <User size={24} color="var(--text-silver)" />
            )}
          </div>

          <div style={{ flex: 1 }}>
            <button
              type="button"
              className="btn-new-project"
              onClick={() => avatarInputRef.current?.click()}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Upload size={14} /> {profile.avatar ? 'Trocar Foto' : 'Carregar Foto'}
            </button>
            <input
              type="file"
              ref={avatarInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Seletor de Formato de Foto (Redonda vs Quadrada) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
          <label style={{ fontSize: '11px', color: 'var(--text-silver)' }}>Formato da Foto:</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              type="button"
              onClick={() => handleAvatarShapeChange('circle')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px',
                fontSize: '12px',
                borderRadius: '6px',
                background: avatarShape === 'circle' ? 'rgba(5, 255, 212, 0.15)' : 'rgba(0,0,0,0.3)',
                border: avatarShape === 'circle' ? '1px solid var(--accent-biolum)' : '1px solid rgba(255,255,255,0.1)',
                color: avatarShape === 'circle' ? 'var(--accent-biolum)' : 'var(--text-silver)',
                cursor: 'pointer'
              }}
            >
              <Circle size={14} /> Redonda
            </button>
            <button
              type="button"
              onClick={() => handleAvatarShapeChange('square')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px',
                fontSize: '12px',
                borderRadius: '6px',
                background: avatarShape === 'square' ? 'rgba(5, 255, 212, 0.15)' : 'rgba(0,0,0,0.3)',
                border: avatarShape === 'square' ? '1px solid var(--accent-biolum)' : '1px solid rgba(255,255,255,0.1)',
                color: avatarShape === 'square' ? 'var(--accent-biolum)' : 'var(--text-silver)',
                cursor: 'pointer'
              }}
            >
              <Square size={14} /> Quadrada
            </button>
          </div>
        </div>

        {/* Nome do Criador */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
          <label style={{ fontSize: '11px', color: 'var(--text-silver)' }}>Nome de Exibição:</label>
          <input
            type="text"
            placeholder="Ex: Seu Nome ou Marca"
            value={profile.name || ''}
            onChange={handleNameChange}
            style={{ padding: '8px 12px', fontSize: '13px' }}
          />
        </div>

        {/* Selo Verificado Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 12px',
          background: 'rgba(0, 163, 255, 0.08)',
          border: '1px solid rgba(0, 163, 255, 0.25)',
          borderRadius: '8px',
          marginTop: '4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BadgeCheck size={18} color="#00A3FF" />
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-platinum)' }}>Selo Verificado</div>
              <div style={{ fontSize: '10px', color: 'var(--text-silver)' }}>Exibe insígnia verificada ao lado do seu nome</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={Boolean(profile.hasVerifiedBadge)}
            onChange={handleToggleVerifiedBadge}
            style={{ width: '16px', height: '16px', accentColor: '#00A3FF', cursor: 'pointer' }}
          />
        </div>

        {/* @Handle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '11px', color: 'var(--text-silver)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AtSign size={12} /> Identificador nas Redes Sociais:
          </label>
          <input
            type="text"
            placeholder="Ex: @criador.digital"
            value={profile.handle || ''}
            onChange={handleHandleChange}
            style={{ padding: '8px 12px', fontSize: '13px' }}
          />
        </div>

        {/* Posição da Assinatura no Slide */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
          <label style={{ fontSize: '11px', color: 'var(--text-silver)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Compass size={13} color="var(--accent-biolum)" /> Posição da Assinatura no Slide:
          </label>
          <div className="branding-position-grid">
            {BRANDING_POSITIONS.map(pos => {
              const isSelected = (profile.position || 'bottom-left') === pos.id;
              const IconComp = POSITION_ICONS[pos.icon] || Compass;
              return (
                <button
                  key={pos.id}
                  type="button"
                  className={`branding-position-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => handlePositionChange(pos.id)}
                  title={pos.label}
                >
                  <IconComp size={14} />
                  <span>{pos.label.replace(' (Padrão)', '')}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default BrandingTab;
