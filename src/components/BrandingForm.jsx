import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

export default function BrandingForm({ onProfileUpdate }) {
  const [profile, setProfile] = useState({ name: '', handle: '', avatar: null });

  useEffect(() => {
    storageService.getProfile().then(saved => {
      if (saved) {
        setProfile(saved);
        onProfileUpdate(saved);
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newProfile = { ...profile, [name]: value };
    setProfile(newProfile);
    storageService.saveProfile(newProfile);
    onProfileUpdate(newProfile);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfile = { ...profile, avatar: reader.result };
        setProfile(newProfile);
        storageService.saveProfile(newProfile);
        onProfileUpdate(newProfile);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="branding-form" style={{ padding: '20px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderRadius: 'var(--radius-card)', margin: '20px' }}>
      <h3>Identidade Visual (Branding)</h3>
      <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
        <input 
          type="text" 
          name="name" 
          placeholder="Nome Completo" 
          value={profile.name} 
          onChange={handleChange}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--color-silver-mist)' }}
        />
        <input 
          type="text" 
          name="handle" 
          placeholder="@arroba" 
          value={profile.handle} 
          onChange={handleChange}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--color-silver-mist)' }}
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
}
