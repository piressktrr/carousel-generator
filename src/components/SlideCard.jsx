import React from 'react';

export default function SlideCard({ slide, index, total, onChange, onRemove, profile, theme }) {
  return (
    <div className="slide-card" style={{ 
      width: '1080px', 
      height: '1080px', // Using 1:1 as default for preview, scale down with CSS transform
      minWidth: '320px', 
      minHeight: '320px',
      transform: 'scale(0.3)',
      transformOrigin: 'top left',
      marginBottom: '-70%', // Compensate for scale
      marginRight: '-70%', // Compensate for scale
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      padding: '60px',
      borderRadius: 'var(--radius-card)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <div style={{ position: 'absolute', top: '20px', right: '20px', color: 'var(--accent)', fontSize: '24px' }}>
        {index + 1} / {total}
      </div>
      
      {profile && (
        <div style={{ position: 'absolute', top: '40px', left: '40px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          {profile.avatar && <img src={profile.avatar} alt="avatar" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />}
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'var(--text-primary)' }}>{profile.name}</div>
            <div style={{ fontSize: '20px', color: 'var(--text-secondary)' }}>{profile.handle}</div>
          </div>
        </div>
      )}

      <textarea 
        value={slide.content}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          height: '60%',
          background: 'transparent',
          border: 'none',
          color: 'inherit',
          fontSize: slide.isCover ? '64px' : '48px',
          fontWeight: slide.isCover ? '700' : '400',
          resize: 'none',
          outline: 'none',
          fontFamily: 'inherit',
          lineHeight: '1.2'
        }}
      />
      
      {index > 0 && (
        <button 
          onClick={onRemove}
          style={{ position: 'absolute', bottom: '20px', right: '20px', padding: '10px 20px', background: 'red', color: 'white', border: 'none', cursor: 'pointer', zIndex: 10, fontSize: '24px' }}
        >
          Remover Slide
        </button>
      )}
    </div>
  );
}
