# Voz Mágica - Backend Server 🚀

Backend simples em Node.js + Express para funcionalidades avançadas do aplicativo Voz Mágica.

## 🎯 Funcionalidades

- **Gerenciamento de Perfis** - CRUD completo de perfis de usuário
- **Relatórios de Progresso** - Análise detalhada de desempenho
- **Sistema de Conquistas** - Gamificação e recompensas
- **Sincronização de Dados** - Backup e restore de dados
- **Leaderboard** - Ranking de jogadores

## 📦 Instalação

```bash
# Navegar para o diretório do servidor
cd server

# Instalar dependências
npm install
```

## 🏃 Executar

```bash
# Modo desenvolvimento (com auto-reload)
npm run dev

# Modo produção
npm start
```

O servidor estará disponível em `http://localhost:3001`

## 📚 Endpoints da API

### Health Check

```
GET /
GET /health
```

### Perfis

```
GET    /api/profiles              # Listar todos os perfis
GET    /api/profiles/:id          # Obter perfil específico
POST   /api/profiles              # Criar novo perfil
PUT    /api/profiles/:id          # Atualizar perfil
DELETE /api/profiles/:id          # Deletar perfil
POST   /api/profiles/sync         # Sincronizar perfis do cliente
```

**Exemplo de criação de perfil:**

```json
POST /api/profiles
{
  "name": "João",
  "avatar": "😊",
  "ageGroup": "4-5"
}
```

### Progresso

```
GET  /api/progress/:profileId          # Obter progresso completo
POST /api/progress                     # Registrar sessão de jogo
GET  /api/progress/:profileId/report   # Relatório detalhado
```

**Parâmetros do relatório:**
- `startDate` - Data inicial (opcional)
- `endDate` - Data final (opcional)

**Exemplo de resposta:**

```json
{
  "success": true,
  "data": {
    "summary": {
      "totalSessions": 15,
      "totalWords": 120,
      "averageAccuracy": 85,
      "totalPlayTime": 45
    },
    "mostPracticedWords": [...],
    "difficultWords": [...],
    "recentSessions": [...]
  }
}
```

### Conquistas

```
GET  /api/achievements                      # Listar todas as conquistas
GET  /api/achievements/:profileId           # Conquistas de um perfil
POST /api/achievements/:profileId/unlock/:achievementId
POST /api/achievements/:profileId/check     # Verificar conquistas baseadas em stats
GET  /api/achievements/leaderboard/top      # Top jogadores
```

**Exemplo de verificação de conquistas:**

```json
POST /api/achievements/:profileId/check
{
  "totalWords": 50,
  "stars": 25,
  "currentStreak": 5,
  "successRate": 0.85,
  "playTime": 60,
  "gamesCompleted": 3,
  "perfectStreak": 8
}
```

## 🗂️ Estrutura de Dados

### Profile

```typescript
{
  id: string
  name: string
  avatar: string
  ageGroup: '4-5' | '6-8'
  createdAt: string
  stats: {
    totalWords: number
    successRate: number
    playTime: number
    currentStreak: number
    stars: number
    level: number
    xp: number
  }
}
```

### GameSession

```typescript
{
  id: string
  profileId: string
  category: string
  startedAt: string
  endedAt: string
  attempts: WordAttempt[]
  score: number
  starsEarned: number
}
```

### Achievement

```typescript
{
  id: string
  title: string
  description: string
  icon: string
  requirement: {
    type: 'words' | 'stars' | 'streak' | 'accuracy' | 'playtime' | 'games'
    target: number
  }
  points: number
  unlocked?: boolean
  unlockedAt?: string
}
```

## 🔧 Configuração

O servidor usa armazenamento em memória por padrão. Para produção, considere integrar um banco de dados real (MongoDB, PostgreSQL, etc.).

## 📊 Conquistas Disponíveis

1. **Primeira Palavra** ⭐ - Fale sua primeira palavra (10 pts)
2. **Mestre das Palavras** 📚 - Fale 50 palavras (50 pts)
3. **Colecionador de Estrelas** 🌟 - Colete 10 estrelas (25 pts)
4. **Mestre das Estrelas** 💫 - Colete 100 estrelas (100 pts)
5. **Persistente** 🔥 - Jogue 3 dias seguidos (30 pts)
6. **Dedicado** 🎯 - Jogue 7 dias seguidos (75 pts)
7. **Mestre da Pronúncia** 🏆 - 90% de acerto (100 pts)
8. **Jogador Dedicado** ⏰ - 60 minutos de jogo (50 pts)
9. **Explorador** 🗺️ - Complete todos os 5 mini-jogos (80 pts)
10. **Perfeccionista** 💯 - 10 palavras perfeitas seguidas (150 pts)

## 🚀 Melhorias Futuras

- [ ] Integração com banco de dados
- [ ] Autenticação JWT
- [ ] WebSocket para sincronização em tempo real
- [ ] Rate limiting
- [ ] Logging avançado
- [ ] Backup automático
- [ ] API de exportação de relatórios (PDF)
- [ ] Notificações push

## 📝 Licença

Parte do projeto Voz Mágica - Aplicativo de terapia de fala infantil.
