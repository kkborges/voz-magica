# 🎤 Voz Mágica - Guia Completo do Projeto

> Aplicativo completo de terapia de fala para crianças de 4 a 8 anos com integração Gemini AI

## 📋 Visão Geral

O **Voz Mágica** é uma solução completa para auxiliar crianças com dificuldades de fala através de jogos interativos, reconhecimento de voz inteligente e feedback personalizado.

### ✨ Destaques

- 🤖 **Integração Gemini AI** - Análise inteligente de pronúncia
- 🎮 **5 Mini-Jogos Interativos** - Categorias diversificadas
- 🎤 **Reconhecimento de Voz** - Web Speech API em português
- 🏆 **Sistema de Gamificação** - Estrelas, níveis, conquistas
- 📊 **Painel dos Pais** - Relatórios detalhados de progresso
- 📱 **Design Responsivo** - Funciona em qualquer dispositivo
- 💾 **Backend Opcional** - APIs para funcionalidades avançadas

## 🏗️ Arquitetura do Projeto

```
voz-magica/
├── web/                    # Frontend React + Vite
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas principais
│   │   ├── services/       # Gemini AI, Voice Service
│   │   ├── stores/         # Zustand state management
│   │   ├── data/           # Banco de 75+ palavras
│   │   ├── types/          # TypeScript interfaces
│   │   └── styles/         # CSS global e temas
│   └── package.json
│
├── server/                 # Backend Node.js + Express
│   ├── src/
│   │   ├── routes/         # Endpoints da API
│   │   └── server.js       # Servidor principal
│   └── package.json
│
├── android/                # Configuração Android nativa
├── ios/                    # Configuração iOS nativa
└── docs/                   # Documentação

```

## 🚀 Início Rápido

### 1️⃣ Instalar Dependências

```bash
# Frontend
cd web
npm install

# Backend (opcional)
cd ../server
npm install
```

### 2️⃣ Configurar Gemini AI

```bash
# No diretório web/
cp .env.example .env

# Edite o arquivo .env e adicione sua chave:
# VITE_GEMINI_API_KEY=sua_chave_aqui
```

**Obter chave Gemini:** https://makersuite.google.com/app/apikey

### 3️⃣ Executar

```bash
# Terminal 1 - Frontend
cd web
npm run dev
# Acesse: http://localhost:3000

# Terminal 2 - Backend (opcional)
cd server
npm run dev
# API em: http://localhost:3001
```

## 🎮 Funcionalidades Principais

### 5 Mini-Jogos Interativos

| Jogo | Categoria | Dificuldade | Palavras |
|------|-----------|-------------|----------|
| 🦁 Mundo Animal | Animais | Fácil-Difícil | 15 |
| 🎨 Minhas Coisas | Objetos | Fácil-Difícil | 15 |
| 🌈 Cores Mágicas | Cores | Fácil-Difícil | 15 |
| 🔢 Números Divertidos | Números | Médio-Difícil | 15 |
| 🍎 Hora da Comida | Alimentos | Fácil-Médio | 15 |

**Total: 75 palavras** organizadas por dificuldade (Easy/Medium/Hard)

### Sistema de Feedback Inteligente

O Gemini AI analisa cada pronúncia e fornece:

- ✅ **Perfeito** (100%) - Celebração com confetes
- 😊 **Muito Bom** (80-99%) - Feedback positivo
- 🌟 **Quase Lá** (50-79%) - Dicas e divisão silábica
- 💪 **Tente Novamente** (<50%) - Apoio e encorajamento

### Gamificação Completa

- ⭐ **Estrelas** - 1 por palavra perfeita
- 🏆 **Níveis** - Sistema de XP progressivo
- 🎯 **Conquistas** - 10 conquistas desbloqueáveis
- 📈 **Progresso** - Estatísticas detalhadas
- 🔥 **Streaks** - Dias consecutivos de jogo

### Perfis Personalizáveis

- 👤 Múltiplos perfis
- 😊 12 avatares diferentes
- 🎂 Faixas etárias (4-5 e 6-8 anos)
- ⚙️ Configurações individuais

## 🧠 Tecnologias Utilizadas

### Frontend

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| React | 18.2 | Framework UI |
| TypeScript | 5.3 | Type safety |
| Vite | 5.0 | Build tool |
| Zustand | 4.4 | State management |
| React Router | 6.21 | Navegação |
| Framer Motion | 10.18 | Animações |
| Google Gemini AI | 0.2 | IA para análise |
| Lucide React | 0.303 | Ícones |

### Backend

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Node.js | 18+ | Runtime |
| Express | 4.18 | Web framework |
| CORS | 2.8 | Cross-origin |

### APIs Nativas

- **Web Speech API** - Reconhecimento de voz
- **Speech Synthesis API** - Text-to-Speech
- **MediaDevices API** - Acesso ao microfone

## 📊 Sistema de Análise

### Algoritmo de Similaridade

O sistema usa **Levenshtein Distance** normalizado para calcular a precisão da pronúncia:

```javascript
similarity = ((maxLength - distance) / maxLength) * 100
```

### Categorização de Resultados

- **PERFECT**: 100% de similaridade
- **GOOD**: ≥ 80% de similaridade
- **CLOSE**: 50-79% de similaridade
- **INCORRECT**: < 50% de similaridade

### Feedback Personalizado com Gemini

Para cada tentativa, o Gemini analisa:

1. Palavra alvo vs palavra falada
2. Idade da criança
3. Tentativas anteriores
4. Contexto de aprendizado

E gera:

- Mensagem encorajadora
- Dicas específicas
- Divisão silábica (se necessário)
- Apoio visual/sonoro

## 📱 Compatibilidade

### Navegadores Suportados

| Navegador | Suporte | Notas |
|-----------|---------|-------|
| Chrome | ✅ Completo | Recomendado |
| Edge | ✅ Completo | Recomendado |
| Safari | ✅ Completo | iOS/macOS |
| Firefox | ⚠️ Parcial | Speech API limitada |

### Dispositivos

- 💻 Desktop (Windows, macOS, Linux)
- 📱 Mobile (iOS, Android via navegador)
- 📲 Tablets (iPad, Android tablets)

## 🎨 Design System

### Paleta de Cores

```css
--primary: #FF6B9D     /* Rosa vibrante */
--secondary: #FFA94D   /* Laranja */
--accent: #FFD93D      /* Amarelo */
--success: #6BCF7F     /* Verde */
--info: #4ECDC4        /* Turquesa */
```

### Tipografia

- **Fonte Principal**: Fredoka (Google Fonts)
- **Fonte Secundária**: Comic Neue
- **Sizes**: 12px - 48px

### Animações

- Bounce, Pulse, Shake, Spin
- Fade In, Slide In, Scale In
- Transições suaves (150-350ms)

## 📚 Banco de Dados de Palavras

### Estrutura

```typescript
{
  id: string
  text: string
  category: GameCategory
  difficulty: DifficultyLevel
  syllables: string[]
  phoneticTranscription: string
  imageUrl: string
  hint?: string
  audioUrl?: string
}
```

### Distribuição por Dificuldade

- **EASY**: 25 palavras (3-5 letras, fonemas simples)
- **MEDIUM**: 30 palavras (6-8 letras)
- **HARD**: 20 palavras (8+ letras, fonemas complexos)

## 🔌 API Backend

### Endpoints Principais

```
GET    /api/profiles              # Gerenciar perfis
GET    /api/progress/:profileId   # Relatórios de progresso
POST   /api/achievements/check    # Verificar conquistas
GET    /api/achievements/leaderboard/top
```

Ver [server/README.md](server/README.md) para detalhes completos.

## 📈 Métricas e Progresso

### Estatísticas Rastreadas

- Total de palavras tentadas
- Taxa de sucesso (%)
- Tempo de jogo (minutos)
- Streak de dias consecutivos
- Estrelas coletadas
- Nível e XP
- Palavras mais praticadas
- Palavras com dificuldade

### Relatórios para Pais

- Resumo de sessões
- Progresso por categoria
- Palavras difíceis
- Tendência de melhoria
- Recomendações personalizadas

## 🛠️ Desenvolvimento

### Estrutura de Componentes

```
├── Button           # Botão customizado
├── GameCard         # Card de mini-jogo
├── Home             # Página inicial
├── Profile          # Criação/seleção de perfil
└── GamePlay         # Tela principal do jogo
```

### State Management

```javascript
// Store principal (Zustand)
{
  profiles: [],
  currentProfile: null,
  currentSession: null,
  availableGames: [],
  achievements: [],
  // ...actions
}
```

### Hooks Customizados

- Uso de React Router para navegação
- Zustand para estado global
- Web Speech API via service singleton

## 🚧 Roadmap

### Fase Atual: MVP ✅

- [x] 5 mini-jogos funcionais
- [x] Integração Gemini AI
- [x] Sistema de gamificação
- [x] Perfis e avatares
- [x] Backend básico

### Próximos Passos

- [ ] Painel dos pais completo
- [ ] Gráficos de progresso
- [ ] Exportação de relatórios (PDF)
- [ ] Modo offline
- [ ] Mais mini-jogos (6-10)
- [ ] Modo multiplayer
- [ ] Integração com fonoaudiólogos
- [ ] App móvel nativo (React Native)

## 💡 Dicas de Uso

### Para melhor reconhecimento de voz:

1. Use fone de ouvido com microfone
2. Ambiente silencioso
3. Fale claramente e pausadamente
4. Mantenha 15-20cm de distância do mic
5. Use Chrome/Edge para melhor suporte

### Para terapeutas:

1. Monitore palavras com dificuldade
2. Ajuste sensibilidade do microfone
3. Use velocidade de fala "slow" no início
4. Revise relatórios semanalmente
5. Celebre pequenas vitórias!

## 🤝 Contribuindo

Este é um projeto educacional focado em ajudar crianças. Contribuições são bem-vindas!

## 📄 Licença

Projeto educacional - Voz Mágica © 2025

---

Desenvolvido com ❤️ para transformar a terapia de fala em uma experiência mágica! ✨🎤

**Que comece a mágica!** 🎮
