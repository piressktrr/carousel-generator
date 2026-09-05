import React, { useState, useEffect, useRef } from 'react';
import { LeftSidebar } from './LeftSidebar/LeftSidebar.jsx';
import { SlidesCanvas } from './SlidesCanvas.jsx';
import { ExportToolbar } from './ExportToolbar.jsx';
import { workspaceService } from '../services/workspaceService.js';
import { storageService } from '../services/storageService.js';

export function StudioWorkspace({
  initialWorkspace,
  onNewProject
}) {
  const [slides, setSlides] = useState(initialWorkspace?.slides || []);
  const [activeSlideId, setActiveSlideId] = useState(
    initialWorkspace?.activeSlideId || initialWorkspace?.slides?.[0]?.id || null
  );
  const [globalFont, setGlobalFont] = useState(initialWorkspace?.globalFont || 'Inter');
  const [currentTheme, setCurrentTheme] = useState(initialWorkspace?.currentTheme || 'abyssal-glow');
  const [profile, setProfile] = useState(
    initialWorkspace?.profile || { name: '', handle: '', avatar: null }
  );

  const activeSlide = slides.find(s => s.id === activeSlideId) || slides[0] || null;
  const autosaveTimerRef = useRef(null);

  // 1. Debounced Auto-Save (400ms) para o IndexedDB
  useEffect(() => {
    if (!slides || slides.length === 0) return;

    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
    }

    autosaveTimerRef.current = setTimeout(() => {
      const stateToSave = {
        id: initialWorkspace?.id || `proj-${Date.now()}`,
        title: initialWorkspace?.title || 'Carrossel em Edição',
        rawScript: initialWorkspace?.rawScript || '',
        activeSlideId,
        globalFont,
        currentTheme,
        profile,
        slides,
        lastModified: Date.now()
      };
      storageService.saveWorkspace(stateToSave);
      storageService.saveProfile(profile);
    }, 400);

    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
    };
  }, [slides, activeSlideId, globalFont, currentTheme, profile]);

  // 2. Atalhos de Teclado (Navegação com Setas e Esc)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignora se estiver digitando em input ou textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const curIdx = slides.findIndex(s => s.id === activeSlideId);
        if (curIdx >= 0 && curIdx < slides.length - 1) {
          setActiveSlideId(slides[curIdx + 1].id);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const curIdx = slides.findIndex(s => s.id === activeSlideId);
        if (curIdx > 0) {
          setActiveSlideId(slides[curIdx - 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides, activeSlideId]);

  // 3. Mutações de Slide e Domínio
  const handleUpdateSlide = (slideId, changes) => {
    setSlides(prev => workspaceService.updateSlide(prev, slideId, changes));
  };

  const handleAddSlide = (afterIndex) => {
    const updated = workspaceService.addSlide(slides, afterIndex);
    setSlides(updated);
    const added = updated[afterIndex + 1] || updated[updated.length - 1];
    if (added) setActiveSlideId(added.id);
  };

  const handleRemoveSlide = (slideId) => {
    if (slides.length <= 1) return;
    const curIdx = slides.findIndex(s => s.id === slideId);
    const updated = workspaceService.removeSlide(slides, slideId);
    setSlides(updated);

    // Seleciona o slide adjacente
    const nextIdx = Math.max(0, curIdx - 1);
    if (updated[nextIdx]) {
      setActiveSlideId(updated[nextIdx].id);
    }
  };

  const handleReorderSlide = (slideId, direction) => {
    const idx = slides.findIndex(s => s.id === slideId);
    if (idx === -1) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= slides.length) return;

    const list = [...slides];
    const [moved] = list.splice(idx, 1);
    list.splice(targetIdx, 0, moved);

    const reordered = list.map((s, i) => ({ ...s, order: i + 1 }));
    setSlides(reordered);
    setActiveSlideId(moved.id);
  };

  const handleSetDockedImage = (slideId, imageSrc, position, scale) => {
    const target = slides.find(s => s.id === slideId);
    if (!target) return;
    const updatedSlide = workspaceService.setDockedImage(target, imageSrc, position, scale);
    handleUpdateSlide(slideId, updatedSlide);
  };

  const handleRemoveDockedImage = (slideId) => {
    const target = slides.find(s => s.id === slideId);
    if (!target) return;
    const updatedSlide = workspaceService.removeDockedImage(target);
    handleUpdateSlide(slideId, updatedSlide);
  };

  const handleAddOverlay = (slideId, type, asset, anchor, size, color) => {
    const target = slides.find(s => s.id === slideId);
    if (!target) return;
    const updatedSlide = workspaceService.addOverlay(target, type, asset, anchor, size, color);
    handleUpdateSlide(slideId, updatedSlide);
  };

  const handleUpdateOverlay = (slideId, overlayId, changes) => {
    const target = slides.find(s => s.id === slideId);
    if (!target) return;
    const updatedSlide = workspaceService.updateOverlay(target, overlayId, changes);
    handleUpdateSlide(slideId, updatedSlide);
  };

  const handleRemoveOverlay = (slideId, overlayId) => {
    const target = slides.find(s => s.id === slideId);
    if (!target) return;
    const updatedSlide = workspaceService.removeOverlay(target, overlayId);
    handleUpdateSlide(slideId, updatedSlide);
  };

  const handlePromptNewProject = () => {
    if (window.confirm('Deseja iniciar um novo projeto? As alterações atuais serão arquivadas para dar lugar ao novo roteiro.')) {
      onNewProject();
    }
  };

  return (
    <div className="studio-workspace" data-theme={currentTheme}>
      {/* Barra Lateral de Ferramentas Fixada no Lado Esquerdo */}
      <LeftSidebar
        activeSlide={activeSlide}
        slides={slides}
        globalFont={globalFont}
        profile={profile}
        currentTheme={currentTheme}
        onUpdateSlide={handleUpdateSlide}
        onAddSlide={handleAddSlide}
        onRemoveSlide={handleRemoveSlide}
        onReorderSlide={handleReorderSlide}
        onSetDockedImage={handleSetDockedImage}
        onRemoveDockedImage={handleRemoveDockedImage}
        onAddOverlay={handleAddOverlay}
        onUpdateOverlay={handleUpdateOverlay}
        onRemoveOverlay={handleRemoveOverlay}
        onUpdateGlobalFont={setGlobalFont}
        onUpdateProfile={setProfile}
        onSelectTheme={setCurrentTheme}
        onNewProject={handlePromptNewProject}
      />

      {/* Palco Interativo de Slides Ocupando o Quadrante Direito */}
      <SlidesCanvas
        slides={slides}
        activeSlideId={activeSlideId}
        globalFont={globalFont}
        profile={profile}
        currentTheme={currentTheme}
        onSelectSlide={setActiveSlideId}
        renderTopRight={<ExportToolbar slides={slides} />}
      />
    </div>
  );
}
export default StudioWorkspace;
