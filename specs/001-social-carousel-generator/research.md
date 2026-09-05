# Research: Gerador de Carrosséis Multiplataforma

**Feature**: `001-social-carousel-generator`  
**Date**: 2026-09-05  
**Context**: Escolha de stack e decisões arquiteturais baseadas na especificação e na Constituição v2.1.0 (Clean Architecture, KISS, stack leve em JavaScript sem sobrecarga de frameworks desnecessários).

---

## 1. Web Build Tool e Framework de Interface

### Decisão
- **Ferramenta de Build**: Vite (Vanilla / React template).
- **Framework de UI**: React (versão enxuta) com JavaScript moderno (ES Modules, JSX).
- **Estilização**: CSS modular / utilitário com variáveis CSS (CSS Custom Properties) para temas dinâmicos em tempo real.

### Rationale
- O usuário requisitou explicitamente JavaScript na web com uso parcimonioso de frameworks (ex: React utilizado sem inchar o projeto).
- O Vite oferece o ambiente de desenvolvimento mais leve, veloz (Hot Module Replacement instantâneo) e gera bundles enxutos para produção sem a complexidade de frameworks full-stack pesados.
- React é ideal para o gerenciamento de estados dinâmicos e reativos (pré-visualização ao vivo, edição de texto instantânea por slide, arrastar e reordenar slides e manipulação de formulários de branding).
- O uso de CSS Custom Properties nativo permite alternar temas (Dark, Light, Minimalista) instantaneamente nos slides sem re-renderizações custosas.

### Alternativas Consideradas
- **Next.js / Nuxt**: Rejeitado por violar o Princípio II (KISS/YAGNI). Trata-se de uma aplicação focada no cliente com processamento local; um servidor SSR/Node full-stack adicionaria complexidade de deploy e infraestrutura desnecessária.
- **Vanilla JS puro (sem framework)**: Avaliado, mas a manipulação manual do DOM para slides com texto reativo, uploads de imagens em tempo real e reordenação de múltiplos quadros tornaria o código frágil e propenso a inconsistências de estado. React fornece reatividade declarativa com custo mínimo de setup.

---

## 2. Renderização de Slides e Motor de Exportação (Imagens e PDF)

### Decisão
- **Renderização de Imagens (PNG)**: Biblioteca leve `html-to-image` combinada com a API nativa de `HTMLCanvasElement`.
- **Empacotamento ZIP**: `jszip` + `file-saver` para geração e download direto do arquivo `.zip` contendo os slides numerados sequencialmente.
- **Geração de PDF (LinkedIn)**: `jspdf` para compor os slides renderizados como páginas individuais de alta resolução em um único arquivo PDF.

### Rationale
- `html-to-image` aproveita o próprio DOM/CSS já desenhado e estilizado pelo navegador para gerar vetores e bitmaps fiéis com renderização de fontes e imagens, garantindo que o que o usuário vê na pré-visualização (WYSIWYG) seja 100% idêntico ao arquivo exportado.
- Os carrosséis necessitam de resoluções nominais exatas:
  - Instagram Quadrado: 1080 x 1080 px
  - Instagram Retrato: 1080 x 1350 px
  - LinkedIn: 1080 x 1080 px ou 1080 x 1350 px em PDF multipágina
  - TikTok: 1080 x 1920 px (com safe zones)
- Todo o processamento ocorre no próprio navegador do cliente (client-side), sem tráfego de dados pesados para servidores ou custos de renderização remota.

### Alternativas Consideradas
- **html2canvas**: Mais pesado, apresenta bugs históricos conhecidos com flexbox moderno, sombras e recorte de bordas arredondadas. `html-to-image` usa SVG `foreignObject` nativo do navegador, sendo muito mais leve e preciso.
- **Renderização Backend com Puppeteer/Playwright**: Rejeitado por violar o Princípio II (KISS). Exigiria gerenciar instâncias de Chromium no servidor, encarecendo a infraestrutura e aumentando o tempo de exportação.

---

## 3. Armazenamento e Persistência Offline-First

### Decisão
- **Armazenamento**: `IndexedDB` no navegador através de um wrapper minimalista e seguro (ex: `idb-keyval` com menos de 1KB, ou implementação nativa desacoplada).

### Rationale
- Conforme clarificado na sessão de requisitos (Questão 2), o MVP não deve impor cadastro nem login para o criador.
- `IndexedDB` suporta armazenamento de dados estruturados (projetos de carrossel) e objetos binários (Blobs de imagens enviadas pelo usuário e foto de avatar) sem o limite restrito de 5MB do `localStorage`.
- Permite que o criador feche o navegador, reinicie o computador e retorne para continuar o trabalho exatamente de onde parou.

### Alternativas Consideradas
- **LocalStorage puro**: Rejeitado para imagens; armazenar fotos em Base64 dentro do LocalStorage estoura rapidamente a cota de 5MB e bloqueia a thread principal.
- **Banco de Dados Remoto (Firebase/Supabase/PostgreSQL)**: Rejeitado para o MVP, em conformidade com a decisão do usuário de priorizar simplicidade e privacidade local.

---

## 4. Integração com IA e Fallback Heurístico Local

### Decisão
- **Serviço de IA**: Integração com a API do Google Gemini (`@google/genai` ou chamada REST direta `fetch` via endpoint seguro/configurável pelo usuário).
- **Fallback Determinístico**: Módulo de segmentação algorítmica local baseado em regras de parágrafos, contagem de caracteres por slide e extração da primeira sentença como título/gancho.

### Rationale
- Alinha-se diretamente ao Princípio V da Constituição (integração estruturada de IA com tratamento de erros) e à decisão de clarificação Q1 (motor híbrido).
- O prompt solicita à IA uma resposta em formato estruturado (JSON com array de slides: `title`, `body`, `type: 'hook' | 'content' | 'cta'`).
- Caso a chave de API não esteja configurada ou ocorra timeout/falha de rede, o algoritmo local assume instantaneamente sem quebrar a experiência do criador.

### Alternativas Consideradas
- **Apenas IA obrigatória**: Rejeitado por impedir uso offline ou por usuários sem chave de API.
- **Apenas algoritmo sem IA**: Rejeitado pois o usuário aprovou explicitamente a abordagem híbrida para gerar títulos magnéticos e ganchos inteligentes.

---

## 5. Algoritmo de Efeito Contínuo (Seamless / Infinito)

### Decisão
- **Modelo de Coordenadas de Conector Seamless**: Elementos contínuos pertencem logicamente à junção entre o `Slide[i]` e o `Slide[i+1]`.
- **Renderização**: Durante a edição, um canvas ou container com overflow visível exibe a continuidade. Durante a exportação:
  - O slide `i` renderiza a metade esquerda do elemento conector cortado no limite direito (`x = width - offset`).
  - O slide `i+1` renderiza a metade direita do elemento conector iniciando no limite esquerdo (`x = -offset`).

### Rationale
- Atende à decisão Q5 escolhida pelo usuário (Carrossel Contínuo / Seamless).
- Garante alinhamento milimétrico em pixels nos formatos 1:1, 4:5 e 9:16, gerando o efeito panorâmico fluido quando o leitor arrasta o carrossel no feed.

---

## Resumo da Arquitetura e Bibliotecas

| Função | Escolha Tecnológica | Custo / Peso | Justificativa |
|---|---|---|---|
| **Build Tool & Runtime** | Vite | Ultra leve (~0 runtime) | Servidor de dev instantâneo e bundling ótimo |
| **Framework de UI** | React (JavaScript / JSX) | ~40 KB gzipped | Reatividade essencial para preview ao vivo |
| **Persistência Local** | `idb-keyval` (IndexedDB) | ~600 bytes | Suporte a imagens em Blob sem limite de 5MB |
| **Geração de Imagens** | `html-to-image` | ~15 KB | Renderização pixel-perfect via foreignObject |
| **Download ZIP** | `jszip` + `file-saver` | ~25 KB | Empacotamento sequencial client-side |
| **Geração de PDF** | `jspdf` | ~35 KB | Padrão da indústria para carrosséis LinkedIn |
| **IA Generativa** | Gemini API (REST / SDK) | Minimal fetch | Síntese de ganchos e roteirização híbrida |
