import React, { useState, useEffect } from 'react';
import TextInputModal from './components/TextInputModal';
import CarouselPreview from './components/CarouselPreview';
import BrandingForm from './components/BrandingForm';
import ThemeSelector from './components/ThemeSelector';
import ExportToolbar from './components/ExportToolbar';
import { aiService } from './services/aiService';
import { storageService } from './services/storageService';
import { THEMES } from './services/carouselConstants';

function App() {
  const [slides, setSlides] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [profile, setProfile] = useState({ name: '', handle: '', avatar: null });
  const [currentTheme, setCurrentTheme] = useState(THEMES.ABYSSAL_GLOW.id);

  useEffect(() => {
    storageService.getProfile().then(p => {
      if(p) setProfile(p);
    });
  }, []);

  const handleGenerate = async (text, apiKey) => {
    setIsGenerating(true);
    try {
      const generatedSlides = await aiService.generateCarousel(text, apiKey);
      setSlides(generatedSlides);
    } catch (error) {
      console.error(error);
      alert('Erro ao gerar carrossel');
    } finally {
      setIsGenerating(false);
    }
  };

  const updateSlide = (id, content) => {
    setSlides(slides.map(s => s.id === id ? { ...s, content } : s));
  };

  const removeSlide = (id) => {
    setSlides(slides.filter(s => s.id !== id));
  };

  return (
    <div className="app-container" data-theme={currentTheme}>
      <header className="app-header" style={{ padding: '20px', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <h1>Social Carousel Generator</h1>
      </header>
      <main className="app-content">
        <BrandingForm onProfileUpdate={setProfile} />
        <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
        {slides.length === 0 ? (
          <TextInputModal onGenerate={handleGenerate} />
        ) : (
          <div>
            <div style={{ padding: '20px', display: 'flex', gap: '15px' }}>
              <button onClick={() => setSlides([])} style={{ padding: '10px 20px', background: 'var(--bg-secondary)', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                Novo Carrossel
              </button>
            </div>
            <ExportToolbar />
            <CarouselPreview 
              slides={slides} 
              updateSlide={updateSlide} 
              removeSlide={removeSlide}
              profile={profile}
              theme={currentTheme}
            />
          </div>
        )}
        {isGenerating && <div style={{ padding: '20px', textAlign: 'center' }}>Gerando slides, aguarde...</div>}
      </main>
    </div>
  );
}

export default App;
