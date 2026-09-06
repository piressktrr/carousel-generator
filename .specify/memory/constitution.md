<!--
Sync Impact Report:
- Version change: 2.1.0 → 2.2.0
- List of modified principles:
  - I. Clean Architecture, Paradigma Funcional e Responsabilidade Única (SRP): formalização do uso de arquitetura funcional e composição de componentes, retendo o Princípio da Responsabilidade Única (SRP) e desestimulando heranças e burocracias de POO clássica.
- Added principles: None
- Added sections / subsections: None
- Removed sections: None
- Follow-up TODOs: None
-->

# Carrosseis-Generator Constitution

## Core Principles

### I. Clean Architecture, Paradigma Funcional e Responsabilidade Única (SRP)
O código de domínio e as regras de negócio centrais DEVEM ser estritamente agnósticos em relação a frameworks visuais ou mecanismos de persistência de dados.
- A aplicação adota formalmente **Arquitetura Funcional com Composição de Componentes** em React.
- Do acrônimo SOLID, o **Princípio da Responsabilidade Única (SRP)** DEVE ser rigorosamente cumprido: cada módulo de serviço, utilitário, hook ou componente visual deve possuir uma responsabilidade única, coesa e claramente delimitada.
- Regras de negócio, manipulação de estado, fatiamento de texto e cálculos de layout geométrico DEVEM ser implementados como **funções puras** e sem efeitos colaterais na camada de serviços (`src/services/`).
- O uso de hierarquias pesadas de classes, padrões de herança profunda e abstrações corporativas de POO é expressamente desencorajado em favor da simplicidade funcional e composição modular (KISS).
- **Rationale**: Garante total longevidade, previsibilidade e testabilidade das regras de negócio, eliminando o inchaço de boilerplate e mantendo o código intuitivo e performático no navegador.

### II. Pragmatismo Técnico e Combate ao Overengineering (KISS/YAGNI)
A equipe DEVE adotar a solução mais simples e direta que satisfaça com segurança e eficiência os requisitos funcionais e não funcionais validados.
- A adoção de padrões arquiteturais complexos (como CQRS completo, Event Sourcing, pipelines distribuídos ou microsserviços prematuros) DEVE ser formalmente justificada através de análise prévia de trade-offs.
- Camadas cosméticas, abstrações especulativas e código antecipatório sem caso de uso concreto (YAGNI) são ESTRITAMENTE PROIBIDOS.
- Complexidade adicional só DEVE ser introduzida quando houver ganho comprovável em manutenibilidade, escalabilidade ou isolamento de falhas.
- **Rationale**: Impede o desperdício de esforço de desenvolvimento, evita custos operacionais invisíveis e maximiza a velocidade de entrega sustentável.

### III. Concorrência Segura, Resiliência e Pensamento Sistêmico
Todo componente com processamento concorrente, paralelo ou assíncrono DEVE ser projetado para garantir thread safety, uso de primitivas atômicas e prevenção comprovada de deadlocks e condições de corrida.
- Qualquer integração entre serviços ou dependências externas DEVE prever indisponibilidade parcial e implementar mecanismos de contenção de falhas (timeouts explícitos, Circuit Breakers, retentativas com backoff e estratégias defensivas de fallback).
- O design de cada serviço DEVE considerar o ecossistema como um todo orgânico (pensamento sistêmico), prevenindo que falhas pontuais provoquem degradação em cascata na infraestrutura.
- Mecanismos de concorrência DEVEM utilizar abstrações estruturadas e pools de execução explicitamente dimensionados e monitorados.
- **Rationale**: Sistemas modernos operam sob concorrência e dependências instáveis; a arquitetura deve conter anomalias e falhar de maneira controlada e graciosa.

### IV. Versionamento Estrito de Dados e Paridade de Infraestrutura
Todas as alterações em estruturas de dados, schemas de bancos de dados ou contratos de armazenamento DEVEM ser versionadas, auditáveis e aplicadas unicamente via scripts de migração automatizados e determinísticos.
- Alterações manuais de schema ou estado em ambientes compartilhados ou produtivos são ESTRITAMENTE PROIBIDAS.
- Aplicações e dependências de infraestrutura DEVEM ser conteinerizadas (ex: Docker) para garantir paridade total entre os ambientes de desenvolvimento local, teste e produção.
- Toda rotina de migração DEVE ser idempotente e planejada com estratégia de compatibilidade reversa sempre que aplicável.
- **Rationale**: Elimina o problema de divergência entre ambientes ("funciona na minha máquina"), protege a integridade dos dados e viabiliza deploys automatizados e reprodutíveis.

### V. Padronização de APIs, Integração de IA e Modelagem Visual
A comunicação externa e entre componentes DEVE adotar contratos padronizados (ex: APIs RESTful ou protocolos bem definidos), com schemas previsíveis, códigos semânticos e tratamento uniforme de payloads de erro.
- A integração com modelos e provedores de Inteligência Artificial DEVE ser encapsulada em componentes ou gateways isolados, dotados de rate limiting defensivo, orquestração de timeouts e fallbacks adequados contra variações de latência.
- Toda tomada de decisão arquitetural complexa DEVE ser acompanhada de documentação visual padronizada (diagramas de arquitetura e fluxos lógicos no formato Mermaid).
- **Rationale**: Contratos explícitos e diagramas visuais tornam a integração transparente entre equipes e ferramentas, enquanto o isolamento da IA protege a estabilidade transacional da aplicação.

### VI. Isolamento de Features via Branches (Git Workflow)
Commits diretos na branch principal (`main` ou `master`) são ESTRITAMENTE PROIBIDOS para implementação de funcionalidades, alterações em especificações ou refatorações de código.
- Toda nova funcionalidade, plano técnico ou conjunto de tarefas DEVE ser desenvolvido em uma branch isolada e dedicada (padronizada no formato `feat/NNN-nome-da-feature` ou `NNN-nome-da-feature`).
- A branch principal DEVE permanecer continuamente estável, compilável e pronta para deploy a qualquer momento.
- A mesclagem de código para a branch principal DEVE ocorrer exclusivamente via Pull Request revisado ou merge aprovado após atendimento integral dos critérios de aceite e quality gates.
- **Rationale**: Impede contaminação da base principal com código instável ou inacabado, permite desenvolvimento paralelo seguro e garante histórico de auditoria transparente por feature.

## Política de Seleção Tecnológica e Prontidão de Stack

- **Definição Pós-Formalização da Ideia:** A escolha de linguagens de programação, frameworks web, provedores de banco de dados (SQL/NoSQL) e SDKs específicos de IA NÃO DEVE ser fixada previamente. Ela DEVE ocorrer estritamente após a especificação funcional completa da ideia (`spec.md` e `plan.md`).
- **Critérios de Habilitação da Stack:** Quando o momento da seleção da stack chegar, as tecnologias candidatas DEVEM ser aprovadas mediante conformidade com:
  1. Capacidade de isolamento de domínio (Clean Architecture e SOLID);
  2. Suporte maduro a migrações determinísticas e versionadas de dados;
  3. Primitivas confiáveis de concorrência e resiliência;
  4. Facilidade de execução conteinerizada (Docker);
  5. Ergonomia e segurança para integração de modelos de IA.
- **Proibição de Bloqueio Tecnológico Prematuro:** Nenhum código boilerplate ou dependência de infraestrutura rígida deve ser acoplado ao repositório antes de a necessidade da funcionalidade estar formalizada e documentada.

## Processo de Design Arquitetural e Governança Técnica

- **Formalização Prévia de Ideias:** Nenhuma implementação estrutural ou escolha de framework deve ser iniciada sem que os requisitos, casos de uso e escopo estejam descritos e aprovados no processo de especificação.
- **Fluxo de Branches Obrigatório:** Cada ciclo de entrega DEVE se iniciar pela criação e checkout de uma branch temática a partir da branch principal atualizada. Todo o ciclo de vida (especificação, plano, tarefas e código) pertence à sua branch correspondente até a conclusão.
- **Análise Prévia de Trade-offs:** Toda decisão de arquitetura ou escolha de ferramentas com impacto técnico relevante DEVE conter uma matriz comparativa (ex: Custo vs. Complexidade vs. Benefício) documentada antes de sua adoção.
- **Diagnóstico de Causa Raiz:** Antes de propor alterações arquiteturais ou refatorações de código, a causa raiz e o gargalo estrutural DEVEM ser formalmente diagnosticados.
- **Critérios de Aceite em Revisões (Quality Gate):** Pull Requests e especificações DEVEM comprovar aderência aos princípios SOLID, integridade dos mecanismos de migração, isolamento de branches e conformidade de concorrência.

## Governance

- **Autoridade:** Esta constituição estabelece as diretrizes arquiteturais soberanas do projeto Carrosseis-Generator e tem precedência sobre hábitos informais ou preferências isoladas.
- **Proteção da Branch Principal:** A branch principal (`main`/`master`) é inviolável contra commits diretos de trabalho em andamento. Nenhuma alteração de código ou feature pode ser enviada sem transitar por branch isolada e validação.
- **Conformidade em Revisões:** Toda especificação técnica, plano de implementação e Pull Request DEVE ser revisado e validado contra os princípios aqui ratificados.
- **Justificativa de Complexidade:** Qualquer desvio das regras de simplicidade técnica (Princípio II) ou introdução de bibliotecas externas adicionais exige justificativa formal contendo avaliação de trade-offs.
- **Procedimento de Emenda:** Alterações neste documento devem seguir o versionamento semântico:
  - **MAJOR (X.0.0):** Remoção, enfraquecimento ou alteração estrutural de princípios fundamentais ou mudanças na política de stack.
  - **MINOR (2.X.0):** Adição de novos princípios (como o Princípio VI de Branching), formalização da stack tecnológica aprovada ou expansão material de diretrizes existentes.
  - **PATCH (2.0.X):** Correções ortográficas, esclarecimentos de redação ou refinamentos não-semânticos.

**Version**: 2.2.0 | **Ratified**: 2026-09-03 | **Last Amended**: 2026-09-05
