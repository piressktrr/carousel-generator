import React, { useRef } from 'react';
import { User, Eye, EyeOff, Upload, AtSign, BadgeCheck, Circle, Square } from 'lucide-react';

export function BrandingTab({
  activeSlide,
  profile = { name: '', handle: '', avatar: null, hasVerifiedBadge: false, avatarShape: 'circle' },
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

  const handleToggleBrandingVisibility = (e) => {
    if (!activeSlide) return;
    onUpdateSlide(activeSlide.id, { showBranding: e.target.checked });
  };

  const isSlideBrandingVisible = activeSlide?.showBranding !== false;
  const avatarShape = profile.avatarShape || 'circle';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Controle de Visibilidade Granular no Slide Ativo */}
      {activeSlide && (
        <div className="control-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label className="section-label" style={{ margin: 0 }}>
              {isSlideBrandingVisible ? <Eye size={14} /> : <EyeOff size={14} />}
              Visibilidade da Assinatura no Slide Ativo
            </label>
            <input
              type="checkbox"
              checked={isSlideBrandingVisible}
              onChange={handleToggleBrandingVisibility}
              style={{ width: '16px', height: '16px', accentColor: 'var(--accent-biolum)', cursor: 'pointer' }}
            />
          </div>

          <p style={{ fontSize: '11px', color: 'var(--text-silver)', marginTop: '4px' }}>
            {isSlideBrandingVisible
              ? 'A assinatura (foto e @handle) está VISÍVEL neste slide.'
              : 'A assinatura está OCULTA neste slide (ideal para capas de alto impacto). Os demais slides não são afetados.'}
          </p>
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
      </div>
    </div>
  );
}
export default BrandingTab;
