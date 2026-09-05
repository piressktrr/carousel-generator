# Implementation Plan: Gerador de Carrosséis Multiplataforma

**Branch**: `001-social-carousel-generator` | **Date**: 2026-09-05 | **Spec**: [spec.md](file:///D:/Carrosseis-Generator/specs/001-social-carousel-generator/spec.md)

**Input**: Feature specification from `specs/001-social-carousel-generator/spec.md`

## Summary

Aplicação web dinâmica e leve desenvolvida em **JavaScript (Vite + React)** para geração de carrosséis de alta retenção para Instagram, LinkedIn e TikTok. A aplicação recebe texto livre do criador e utiliza um motor híbrido (IA com fallback algorítmico local) para estruturar títulos/ganchos e fatiar o conteúdo em slides equilibrados. Permite personalização completa da identidade do autor (foto, nome, @arroba), inserção de imagens individuais por slide, aplicação de temas visuais pré-configurados e efeitos de continuidade contínua (*seamless*), com download direto em PNG (ZIP) e PDF para LinkedIn, sem necessidade de cadastro ou backend pesado (persistência local no navegador).

## Technical Context

**Language/Version**: JavaScript (ES2022+ / JSX), HTML5, CSS3  
**Primary Dependencies**: 
- `react` e `react-dom` (reatividade de preview e estado em tempo real)
- `vite` (bundler ultra veloz e servidor de desenvolvimento leve)
- `html-to-image` (renderização client-side de nós DOM para imagens de alta resolução 1080px)
- `jszip` + `file-saver` (empacotamento e download do arquivo ZIP de imagens)
- `jspdf` (composição do documento PDF multipágina para carrosséis de documentos do LinkedIn)
- `@google/genai` ou chamada REST direta via `fetch` para API do Gemini  
**Storage**: `IndexedDB` no próprio navegador (via `idb-keyval` <1KB) para persistência offline-first de rascunhos e perfil do criador  
**Testing**: Testes manuais via cenários do `quickstart.md` e testes unitários de funções de domínio com `vitest` (se necessário)  
**Target Platform**: Navegadores Web modernos (Chrome, Edge, Firefox, Safari)  
**Project Type**: Single Page Application (SPA Client-Side)  
**Performance Goals**: 
- Geração inicial de slides em < 2 segundos no modo local (< 5 segundos com IA)
- Exportação de carrossel de 10 slides em < 10 segundos
- 60 FPS na navegação entre slides no preview  
**Constraints**: 
- 100% client-side para privacidade total dos dados e custo zero de infraestrutura
- Respeito às safe zones verticais do TikTok (9:16) e formatos nominais do Instagram (1:1 e 4:5) e LinkedIn  
**Scale/Scope**: Carrosséis de 1 a 12 slides por projeto

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Princípio I (Clean Architecture & SOLID)**: Aprovado. A lógica de fatiamento de texto, cálculo de cortes seamless e geração de arquivos reside em serviços puros de JavaScript (`src/services/`), totalmente desacoplados dos componentes de interface React.
- **Princípio II (Pragmatismo Técnico & KISS/YAGNI)**: Aprovado. Eliminados bancos de dados remotos, servidores SSR desnecessários e diagramas burocráticos de classes. O projeto utiliza apenas os pacotes estritamente necessários para renderizar e exportar.
- **Princípio III (Concorrência Segura & Resiliência)**: Aprovado. Chamadas assíncronas para IA contam com tratamento de timeout e acionam automaticamente o fallback algorítmico local sem bloquear a interface.
- **Princípio IV (Dados & Infraestrutura)**: Aprovado. Persistência offline-first segura no IndexedDB do navegador sem risco de corrupção ou divergência de schema.
- **Princípio V (Padronização & IA)**: Aprovado. Integração limpa com Gemini API encapsulada em um cliente isolado, com preview visual interativo em tempo real.
- **Princípio VI (Branching Workflow)**: Aprovado. O plano e todo o ciclo da funcionalidade estão isolados na branch `001-social-carousel-generator`.

## Project Structure

### Documentation (this feature)

```text
specs/001-social-carousel-generator/
├── plan.md              # Este plano de implementação
├── research.md          # Decisões tecnológicas e justificativas
├── data-model.md        # Estrutura do estado da aplicação em JavaScript
├── quickstart.md        # Guia prático de execução e validação da feature
└── contracts/           # Contratos das interfaces dos serviços JavaScript
```

### Source Code (repository root)

```text
/
├── index.html                   # Shell HTML da aplicação
├── package.json                 # Dependências e scripts de execução
├── vite.config.js               # Configuração leve do Vite
├── public/                      # Ícones e fontes estáticas
└── src/
    ├── main.jsx                 # Bootstrap da aplicação React
    ├── App.jsx                  # Layout principal e orquestração do fluxo
    ├── components/
    │   ├── CarouselPreview.jsx  # Pré-visualização ao vivo em tempo real dos slides
    │   ├── SlideCard.jsx        # Renderização do slide individual com temas e branding
    │   ├── SlideEditor.jsx      # Editor de texto, imagem e posicionamento por slide
    │   ├── BrandingForm.jsx     # Formulário de perfil (foto, nome, @arroba)
    │   ├── ThemeSelector.jsx    # Seletor de temas (Dark, Minimalista, Editorial, etc.)
    │   ├── TextInputModal.jsx   # Modal para colar texto bruto e acionar IA / fallback
    │   └── ExportToolbar.jsx    # Botões de seleção de plataforma e download (ZIP/PDF)
    ├── services/
    │   ├── textSegmenter.js     # Divisão algorítmica e heurística local de texto
    │   ├── aiService.js         # Integração com Gemini API para ganchos e síntese
    │   ├── exportService.js     # Motor de renderização em PNG e documento PDF
    │   └── storageService.js    # Gerenciamento de persistência local no IndexedDB
    └── styles/
        ├── index.css            # Reset e layout global
        └── themes.css           # Variáveis CSS para paletas de cores dos temas
```

**Structure Decision**: Aplicação web única (Single Project) com Vite e React, estruturada com separação limpa entre componentes de UI (`src/components/`) e regras de negócio puras (`src/services/`).

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| *Nenhuma violação* | O design é 100% aderente ao KISS e aos princípios constitucionais | Abordagens mais pesadas (Next.js/Node/DB) foram rejeitadas por adicionar complexidade desnecessária |
