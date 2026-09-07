import React, { useState, useEffect } from 'react';
import { ScriptInputView } from './components/ScriptInputView.jsx';
import { StudioWorkspace } from './components/StudioWorkspace.jsx';
import { workspaceService } from './services/workspaceService.js';
import { storageService } from './services/storageService.js';

export function App() {
  const [workspace, setWorkspace] = useState(null);
  const [isLoadingStorage, setIsLoadingStorage] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  // Carrega rascunho persistido do IndexedDB na inicialização
  useEffect(() => {
    async function initStorage() {
      try {
        const savedWorkspace = await storageService.getWorkspace();
        const savedProfile = await storageService.getProfile();

        if (savedWorkspace && Array.isArray(savedWorkspace.slides) && savedWorkspace.slides.length > 0) {
          setWorkspace({
            ...savedWorkspace,
            profile: savedProfile || savedWorkspace.profile || { name: '', handle: '', avatar: null, hasVerifiedBadge: false, avatarShape: 'circle', position: 'bottom-left' }
          });
        }
      } catch (err) {
        console.error('[App] Erro ao recuperar sessão salva:', err);
      } finally {
        setIsLoadingStorage(false);
      }
    }

    initStorage();
  }, []);

  // Processa o roteiro bruto e converte em slides estruturados
  const handleGenerateSlides = async (rawScript, apiKey = null) => {
    setIsGenerating(true);
    try {
      const generatedSlides = await workspaceService.generateSlidesFromScript(rawScript, apiKey);
      const savedProfile = (await storageService.getProfile()) || { name: '', handle: '', avatar: null, hasVerifiedBadge: false, avatarShape: 'circle', position: 'bottom-left' };

      const newWorkspace = {
        id: `proj-${Date.now()}`,
        title: 'Novo Carrossel',
        rawScript,
        activeSlideId: generatedSlides[0]?.id || null,
        globalFont: 'Inter',
        currentTheme: 'abyssal-glow',
        apiKey: apiKey || '',
        profile: savedProfile,
        slides: generatedSlides,
        lastModified: Date.now()
      };

      if (apiKey) {
        await storageService.saveGeminiApiKey(apiKey);
      }
      await storageService.saveWorkspace(newWorkspace);
      setWorkspace(newWorkspace);
    } catch (err) {
      console.error('[App] Falha ao gerar slides:', err);
      alert('Ocorreu um erro ao estruturar o roteiro. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Reseta o projeto para colar novo roteiro
  const handleNewProject = async () => {
    await storageService.clearWorkspace();
    setWorkspace(null);
  };

  if (isLoadingStorage) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-darkest)',
          color: 'var(--accent-biolum)',
          fontWeight: '600'
        }}
      >
        Iniciando Carousel Studio...
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {workspace && workspace.slides && workspace.slides.length > 0 ? (
        <StudioWorkspace
          initialWorkspace={workspace}
          onNewProject={handleNewProject}
        />
      ) : (
        <ScriptInputView
          onGenerate={handleGenerateSlides}
          isGenerating={isGenerating}
        />
      )}
    </div>
  );
}
export default App;
