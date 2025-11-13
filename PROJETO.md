# 📋 Plano Detalhado do Projeto Voz Mágica

## 🎯 Visão Geral

Este documento complementa o README.md com detalhes técnicos, decisões de arquitetura e sugestões de melhorias para o projeto Voz Mágica.

## 💡 Sugestões de Melhorias e Novas Funcionalidades

### 1. Tela de Onboarding Interativo
**Prioridade**: Alta
**Fase**: MVP

- **Tutorial Animado**: Mascote guia a criança pelos primeiros passos
- **Teste de Microfone**: Verificação inicial da qualidade do áudio
- **Calibração de Voz**: Ajuste automático da sensibilidade baseado na voz da criança
- **Escolha de Avatar**: Primeira personalização para engajamento imediato

### 2. Modo Offline First
**Prioridade**: Alta
**Fase**: MVP

- Cache de conteúdo essencial (imagens, áudios, palavras)
- Sincronização inteligente quando online
- Indicador visual de status (online/offline)
- Fila de upload para dados de progresso

### 3. Desafios Diários
**Prioridade**: Média
**Fase**: 2

- Uma palavra/frase especial por dia
- Bônus de estrelas por completar
- Notificações amigáveis (aprovadas pelos pais)
- Histórico de desafios completados

### 4. Biblioteca de Sons
**Prioridade**: Média
**Fase**: 2

- Acesso livre a todas as pronúncias
- Filtro por categoria
- Modo comparação (voz da criança vs. pronúncia correta)
- Favoritos

### 5. Modo Dueto
**Prioridade**: Baixa
**Fase**: 3

- Pais/responsáveis fazem junto com a criança
- Reconhecimento simultâneo de duas vozes
- Fortalece vínculo familiar
- Modo "pai e filho"

### 6. Telas de Configuração Avançadas

#### Configurações de Áudio
- Ajuste de velocidade da fala (0.5x - 2x)
- Escolha de vozes (masculina/feminina/infantil)
- Volume independente (voz/efeitos/música)
- Equalização para diferentes ambientes

#### Acessibilidade
- Modo daltônico (protanopia, deuteranopia, tritanopia)
- Alto contraste
- Tamanho de fonte (P, M, G, GG)
- Redução de movimento (para crianças sensíveis)
- Legendas visuais

### 7. Diário de Progresso Visual
**Prioridade**: Alta
**Fase**: 2

- Gráfico de evolução semanal/mensal
- Visualização de streaks com calendário
- Mapa de jornada (trilha de progresso)
- Comparação com objetivos

### 8. Modo Terapeuta Expandido
**Prioridade**: Alta
**Fase**: 3

#### Funcionalidades
- Criação de listas de palavras personalizadas
- Agrupamento por fonemas problemáticos
- Planos de exercícios semanais/mensais
- Metas individualizadas
- Exportação de relatórios profissionais (PDF)
- Integração com prontuários eletrônicos
- Anotações do terapeuta

#### API para Clínicas
- Endpoint para múltiplos pacientes
- Dashboard web administrativo
- Relatórios consolidados
- Estatísticas de grupo

### 9. Comunidade (Futuro)
**Prioridade**: Baixa
**Fase**: 5

- Compartilhar conquistas (sem dados pessoais)
- Desafios semanais globais
- Modo competitivo opcional (com aprovação parental)
- Fórum de pais (moderado)

### 10. Recursos de IA Avançados
**Prioridade**: Alta
**Fase**: 4

#### Análise Fonética com IA
- Identificação precisa de fonemas problemáticos
- Sugestões de exercícios personalizados
- Comparação de espectrograma de voz
- Detecção de padrões de erro

#### Sistema Adaptativo
- Ajuste automático de dificuldade
- Recomendações de palavras baseadas no histórico
- Predição de áreas que precisam de reforço
- Algoritmo de espaçamento de repetição

### 11. Recursos Sociais e Motivacionais

#### Mascotes Virtuais
- Mascote que "cresce" com o progresso da criança
- Interações diárias
- Precisa ser "alimentado" com estrelas
- Diferentes personalidades para escolher

#### Eventos Especiais
- Desafios temáticos (Natal, Páscoa, etc.)
- Recompensas limitadas por tempo
- Histórias interativas

## 🏗️ Arquitetura Técnica

### Estrutura de Pastas Detalhada

```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Avatar.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Modal.tsx
│   │   └── index.ts
│   ├── game/
│   │   ├── WordCard.tsx
│   │   ├── VoiceRecorder.tsx
│   │   ├── FeedbackAnimation.tsx
│   │   ├── HintDisplay.tsx
│   │   └── GameProgress.tsx
│   ├── profile/
│   │   ├── AvatarSelector.tsx
│   │   ├── StatsCard.tsx
│   │   ├── LevelBadge.tsx
│   │   └── ProfileCard.tsx
│   ├── feedback/
│   │   ├── SuccessAnimation.tsx
│   │   ├── EncouragementMessage.tsx
│   │   ├── SyllableBreakdown.tsx
│   │   └── RhythmHelper.tsx
│   └── rewards/
│       ├── StarAnimation.tsx
│       ├── AchievementBadge.tsx
│       ├── RewardShopItem.tsx
│       └── StreakCounter.tsx
├── screens/
│   ├── onboarding/
│   │   ├── WelcomeScreen.tsx
│   │   ├── MicrophoneTestScreen.tsx
│   │   ├── ProfileCreationScreen.tsx
│   │   └── TutorialScreen.tsx
│   ├── home/
│   │   ├── HomeScreen.tsx
│   │   ├── ModuleGridScreen.tsx
│   │   └── DailyChallengeScreen.tsx
│   ├── game/
│   │   ├── GameScreen.tsx
│   │   ├── GameResultsScreen.tsx
│   │   └── PracticeScreen.tsx
│   ├── progress/
│   │   ├── ProgressScreen.tsx
│   │   ├── AchievementsScreen.tsx
│   │   └── StatisticsScreen.tsx
│   ├── settings/
│   │   ├── SettingsScreen.tsx
│   │   ├── AudioSettingsScreen.tsx
│   │   └── AccessibilityScreen.tsx
│   └── parent/
│       ├── ParentDashboardScreen.tsx
│       ├── ReportsScreen.tsx
│       ├── TherapistModeScreen.tsx
│       └── CustomListsScreen.tsx
└── services/
    ├── voice/
    │   ├── VoiceRecognitionService.ts ✅
    │   ├── PhonemeAnalyzer.ts
    │   └── SpeechQualityChecker.ts
    ├── audio/
    │   ├── AudioService.ts ✅
    │   ├── TTSService.ts
    │   └── SoundEffectsManager.ts
    ├── storage/
    │   ├── StorageService.ts ✅
    │   ├── CacheManager.ts
    │   └── BackupService.ts
    ├── api/
    │   ├── ApiClient.ts
    │   ├── ContentAPI.ts
    │   └── AnalyticsAPI.ts
    └── analytics/
        ├── ProgressTracker.ts
        ├── EventLogger.ts
        └── PerformanceAnalyzer.ts
```

### Decisões de Arquitetura

#### 1. Estado Global com Zustand
**Por quê?**
- Mais simples que Redux
- Menos boilerplate
- Ótima performance
- Fácil integração com TypeScript

#### 2. Armazenamento com AsyncStorage
**Por quê?**
- Nativo do React Native
- Simples e eficiente para dados estruturados
- Offline-first por padrão

**Alternativas consideradas:**
- Realm: Mais complexo, overkill para MVP
- SQLite: Necessário apenas para grandes volumes

#### 3. Reconhecimento de Voz
**Opções:**
1. **Google Speech-to-Text** (Recomendado)
   - Melhor precisão
   - Suporte a pt-BR
   - Modelo adaptável

2. **Azure Speech Services**
   - Boa precisão
   - Análise fonética avançada
   - Mais caro

3. **AWS Transcribe**
   - Bom custo-benefício
   - Precisão aceitável

**Decisão:** Começar com Google, avaliar Azure para análise fonética na Fase 4

#### 4. Text-to-Speech (TTS)
**Opções:**
1. **Áudio Pré-gravado** (Fase 1)
   - Qualidade consistente
   - Sem dependência de API
   - Controle total

2. **Google TTS** (Fase 2+)
   - Vozes naturais
   - Múltiplas vozes
   - Dinâmico

## 📊 Modelo de Dados

### Relacionamentos

```
ParentAccount (1) ──── (N) ChildProfile
ChildProfile (1) ──── (N) GameSession
ChildProfile (1) ──── (N) Achievement
GameSession (1) ──── (N) GameAttempt
GameModule (1) ──── (N) GameWord
CustomWordList (1) ──── (N) GameWord
ExercisePlan (1) ──── (N) CustomWordList
```

### Estimativa de Dados

**Por Criança (6 meses de uso):**
- Perfil: ~2 KB
- Sessões: ~150 sessões × 1 KB = 150 KB
- Tentativas: ~1500 tentativas × 500 bytes = 750 KB
- **Total**: ~1 MB por criança

**Armazenamento de Áudio (opcional):**
- 5 segundos × 16 kHz × 16 bits = ~160 KB por gravação
- 1500 gravações = ~240 MB
- **Com compressão (MP3)**: ~50 MB

## 🎨 Design System

### Componentes Base

1. **Typography**
   - Heading (XS, S, M, L, XL)
   - Body (S, M, L)
   - Caption

2. **Colors**
   - Tema Light (padrão)
   - Tema Dark (opcional)
   - Temas personalizados (recompensa)

3. **Spacing**
   - Sistema de 4px (4, 8, 16, 24, 32, 48)

4. **Animações**
   - Entrada/Saída
   - Feedback de toque
   - Transições de tela
   - Celebrações

## 🧪 Estratégia de Testes

### Testes Unitários (Jest)
- Serviços (voice, audio, storage)
- Utilities (helpers, validators)
- Stores (Zustand)
- **Coverage Target**: 80%+

### Testes de Componente (React Native Testing Library)
- Componentes comuns
- Telas principais
- Fluxos de usuário
- **Coverage Target**: 70%+

### Testes E2E (Detox - Futuro)
- Fluxo completo de jogo
- Criação de perfil
- Painel dos pais

### Testes de Usabilidade
- Testes com crianças reais (5-10 por faixa etária)
- Feedback de fonoaudiólogos
- A/B testing de feedback

## 🚀 Estratégia de Lançamento

### Soft Launch (Fase 1)
1. **Beta Fechado**: 50 famílias selecionadas
2. **Beta Aberto**: 500 usuários (Android primeiro)
3. **Lançamento**: Google Play e App Store

### Marketing
1. **Parcerias**:
   - Clínicas de fonoaudiologia
   - Escolas especializadas
   - Influenciadores de educação infantil

2. **Conteúdo**:
   - Blog com dicas de fonoaudiologia
   - Vídeos demonstrativos
   - Depoimentos de pais

3. **SEO/ASO**:
   - Keywords: "fala infantil", "fonoaudiologia", "speech therapy kids"
   - Screenshots otimizados
   - Descrição clara e objetiva

## 💰 Monetização Detalhada

### Modelo Freemium

#### Gratuito (Forever Free)
- 1 perfil de criança
- Módulo "Mundo Animal" completo (15 palavras)
- Sistema de recompensas básico
- Relatório semanal simples

#### Premium Individual ($4.99/mês ou $39.99/ano)
- Até 3 perfis
- Todos os módulos desbloqueados
- Desafios diários
- Relatórios detalhados
- Sem anúncios
- Modo offline expandido

#### Premium Família ($7.99/mês ou $59.99/ano)
- Até 5 perfis
- Tudo do Premium Individual
- Modo dueto
- Listas personalizadas (10)
- Backup em nuvem

#### Terapeuta Pro ($19.99/mês ou $179.99/ano)
- Perfis ilimitados
- Listas personalizadas ilimitadas
- Planos de exercícios
- Relatórios profissionais
- Exportação PDF
- API de integração
- Suporte prioritário

### Projeção de Receita (12 meses)

**Cenário Conservador:**
- 10,000 downloads
- 5% conversão premium = 500 assinantes
- Ticket médio: $50/ano
- **Receita Anual**: $25,000

**Cenário Otimista:**
- 50,000 downloads
- 10% conversão premium = 5,000 assinantes
- Ticket médio: $55/ano
- **Receita Anual**: $275,000

## 🔒 Considerações de Privacidade

### LGPD (Brasil)
- Consentimento explícito dos pais
- Dados minimizados
- Direito ao esquecimento
- Portabilidade de dados
- Termo de uso claro

### COPPA (EUA)
- Não coletar dados de crianças < 13 anos sem consentimento parental
- Notificação aos pais
- Opção de deletar dados

### Boas Práticas
- Criptografia em repouso (AES-256)
- Criptografia em trânsito (TLS 1.3)
- Não compartilhar com terceiros
- Auditoria regular de segurança

## 📈 Métricas de Sucesso

### KPIs Principais
1. **Engajamento**
   - DAU/MAU ratio > 0.3
   - Sessões por usuário/dia > 2
   - Tempo médio de sessão > 10 min

2. **Retenção**
   - D1: > 70%
   - D7: > 40%
   - D30: > 20%

3. **Impacto**
   - Taxa de melhoria na pronúncia (avaliada por pais/terapeutas)
   - NPS > 50
   - 4.5+ estrelas nas lojas

4. **Monetização**
   - Conversão free → premium: > 5%
   - Churn mensal: < 5%
   - LTV/CAC ratio > 3

## 🎯 Próximos Passos Imediatos

1. ✅ Estrutura do projeto criada
2. ✅ Tipos e interfaces definidos
3. ✅ Serviços core implementados
4. [ ] Implementar navegação
5. [ ] Criar telas de onboarding
6. [ ] Implementar tela de jogo básica
7. [ ] Integrar reconhecimento de voz
8. [ ] Desenvolver sistema de feedback
9. [ ] Criar banco de palavras inicial
10. [ ] Testes com usuários reais

---

**Última atualização**: 2025-11-13
