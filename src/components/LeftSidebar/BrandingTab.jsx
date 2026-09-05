import React, { useRef } from 'react';
import { User, Eye, EyeOff, Upload, AtSign } from 'lucide-react';

export function BrandingTab({
  activeSlide,
  profile = { name: '', handle: '', avatar: null },
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

  const handleToggleBrandingVisibility = (e) => {
    if (!activeSlide) return;
    onUpdateSlide(activeSlide.id, { showBranding: e.target.checked });
  };

  const isSlideBrandingVisible = activeSlide?.showBranding !== false;

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
        
        {/* Foto de Perfil */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(0, 20, 19, 0.9)',
              border: '2px solid var(--accent-biolum)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
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

        {/* Nome do Criador */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
          <label style={{ fontSize: '11px', color: 'var(--text-silver)' }}>Nome de Exibição:</label>
          <input
            type="text"
            placeholder="Ex: Seu Nome ou Marca"
            value={profile.name || ''}
            onChange={handleNameChange}
            style={{ padding: '8px 12px', fontSize: '13px' }}
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
