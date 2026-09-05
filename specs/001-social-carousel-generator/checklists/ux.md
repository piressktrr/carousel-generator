# UX & Visual Design Requirements Checklist: Gerador de Carrosséis Multiplataforma

**Purpose**: Validar a qualidade, clareza, completude e consistência dos requisitos de experiência do usuário (UX), diagramação visual, adaptação multiplataforma e conformidade com o DESIGN.md antes da implementação.  
**Created**: 2026-09-05  
**Feature**: [spec.md](file:///D:/Carrosseis-Generator/specs/001-social-carousel-generator/spec.md) | [plan.md](file:///D:/Carrosseis-Generator/specs/001-social-carousel-generator/plan.md) | [DESIGN.md](file:///D:/Carrosseis-Generator/.agents/skills/design/DESIGN.md)  

**Note**: Este checklist personalizado é gerado pelo comando `/speckit-checklist` e funciona como um conjunto de "Testes Unitários para Requisitos em Linguagem Natural".  
**Review Ownership**: Este artefato pertence ao revisor técnico de qualidade de requisitos. Marque `[x]` somente após confirmar que o critério de qualidade de especificação foi plenamente satisfeito no texto dos requisitos.  
**Marker Semantics**: `[x]` significa aprovação da redação do requisito pelo revisor; NÃO significa que o código foi implementado.  

---

## 1. Visual Hierarchy & Typography Quality

- [ ] CHK001 Os requisitos de hierarquia tipográfica (diferenciação entre título do gancho, corpo de leitura e notas de rodapé) estão definidos com limites mensuráveis de caracteres por slide? [Clarity, Spec §FR-002, Spec §US1]
- [ ] CHK002 A proporção de contraste tipográfico mínimo (WCAG AA para texto em Platinum/Silver sobre o canvas Liquid Abyss) está explicitamente documentada para todos os temas? [Clarity, DESIGN §2]
- [ ] CHK003 Os requisitos de line-height (1.1-1.2 para títulos e 1.4-1.5 para corpo) e tracking negativo para títulos grandes estão consistentes entre o plano e o guia visual? [Consistency, DESIGN §3]
- [ ] CHK004 Está especificado o comportamento de dimensionamento dinâmico (auto-fit ou truncamento com aviso) quando o texto do slide atinge o limite máximo sugerido? [Completeness, Spec §Edge Cases]

---

## 2. Multiplatform Dimensions & Safe Zones Coverage

- [ ] CHK005 As resoluções nominais exatas em pixels (1080x1080 para 1:1, 1080x1350 para 4:5 e 1080x1920 para 9:16) estão documentadas sem ambiguidade técnica? [Clarity, Spec §FR-009]
- [ ] CHK006 As margens de segurança ("safe zones") verticais do TikTok (área livre de texto nas partes superior e inferior para evitar sobreposição dos ícones nativos do app) estão quantificadas em pixels ou porcentagem? [Coverage, Spec §FR-009, Plan]
- [ ] CHK007 O comportamento do layout ao alternar entre proporções (ex: de 4:5 para 9:16) preserva o conteúdo textual e imagens sem necessidade de redigitação pelo usuário? [Consistency, Spec §Edge Cases]
- [ ] CHK008 Os requisitos de respiro visual (margens internas mínimas de 32px nos slides) estão especificados para evitar textos colados às bordas laterais? [Clarity, Plan, DESIGN §4]

---

## 3. Personal Branding (Identidade do Criador) Requirements

- [ ] CHK009 As dimensões e formato do avatar do autor (círculo de 36px a 48px com raio 9999px) estão claramente definidos na composição do slide? [Clarity, DESIGN §4, Data-Model §2.3]
- [ ] CHK010 Estão especificadas as regras de truncamento ou quebra de linha caso o nome completo do autor ou o @arroba excedam 30 caracteres? [Edge Cases, Spec §Edge Cases]
- [ ] CHK011 A opção de ocultar o branding pontualmente em slides de capa ou encerramento possui critério de aceitação independente documentado? [Completeness, Spec §US2 Acceptance Scenario 3]
- [ ] CHK012 O comportamento de pré-preenchimento automático dos dados de branding através do armazenamento local (IndexedDB) no recarregamento de página está especificado como critério verificável? [Measurability, Spec §SC-002, Spec §US2]

---

## 4. Navigation Cues & Seamless Continuity Requirements

- [ ] CHK013 O formato visual do contador de páginas (ex: fração "2/7" vs texto "Slide 2 de 7") e sua cor de destaque (Lavender Phosphor #fde9ff) estão padronizados nos requisitos? [Consistency, Spec §FR-008, DESIGN §2]
- [ ] CHK014 Os requisitos de ocultação da seta de avanço no último slide e substituição automática pelo componente de CTA estão formalmente descritos? [Completeness, Spec §US4 Acceptance Scenario 3]
- [ ] CHK015 O algoritmo de divisão do conector de carrossel contínuo (efeito seamless com split ratio percentual entre slide de origem e destino) possui especificação de coordenadas matematicamente verificável? [Clarity, Data-Model §2.6, Research §5]
- [ ] CHK016 Está documentado o comportamento do conector seamless caso um slide intermediário com conector ativo seja excluído ou reordenado pelo usuário? [Edge Cases, Spec §Edge Cases]

---

## 5. Theme System & Design Tokens Compliance (DESIGN.md)

- [ ] CHK017 O tema "Abyssal Glow" possui todas as suas variáveis de cores mapeadas individualmente para as propriedades de fundo, superfície, tipografia e destaques? [Traceability, DESIGN §2, Data-Model §1]
- [ ] CHK018 As regras de uso exclusivo do gradiente bioluminescente (aplicado estritamente em botões de ação primária e barras de progresso, evitando uso indiscriminado em fundos) estão refletidas nos requisitos da UI? [Consistency, DESIGN §5.1, Plan]
- [ ] CHK019 O raio de arredondamento dos botões (6px a 8px) e dos cards de slide (16px) está alinhado sem divergências entre o guia de design e a especificação de componentes? [Consistency, DESIGN §4]
- [ ] CHK020 O requisito de flexibilidade cromática (permitir que o criador personalize a cor de destaque mantendo a legibilidade) possui validação de contraste definida? [Coverage, Spec §FR-013, Spec §US3]

---

## 6. Interaction, Responsive States & Accessibility

- [ ] CHK021 Os estados visuais dos botões e controles interativos (hover, active, disabled durante exportação) estão claramente previstos nos requisitos de interface? [Completeness, Gap]
- [ ] CHK022 Os requisitos de feedback visual de carregamento (spinner/skeleton durante a chamada da API de IA e barra de progresso durante a renderização do ZIP de imagens) estão especificados? [Coverage, Spec §SC-005]
- [ ] CHK023 Está documentada a mensagem de aviso não-bloqueante e a ativação do fallback local caso a API de IA retorne erro ou atinja timeout de 10 segundos? [Exception Flow, Spec §FR-003, Contracts §ai-service]
- [ ] CHK024 O comportamento em modo de navegação anônima (alerta orientando o usuário a baixar os arquivos antes de fechar a aba devido à ausência de persistência garantida) está descrito nos requisitos de UX? [Edge Cases, Spec §Edge Cases]

---

## Notes

- Este checklist valida exclusivamente a **qualidade e precisão dos requisitos escritos**, e não o código em execução.
- O revisor deve marcar `[x]` em cada item apenas após inspecionar `spec.md`, `plan.md`, `data-model.md` e `DESIGN.md` e atestar que a redação do requisito é completa, clara e livre de contradições.
- As tarefas do `/speckit-implement` utilizarão o estado deste checklist como um portão de qualidade arquitetural.
