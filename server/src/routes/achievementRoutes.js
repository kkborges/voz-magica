/**
 * Rotas para gerenciamento de conquistas
 */

import express from 'express';

const router = express.Router();

// Conquistas padrão
const defaultAchievements = [
  {
    id: 'first-word',
    title: 'Primeira Palavra',
    description: 'Fale sua primeira palavra corretamente!',
    icon: '⭐',
    requirement: { type: 'words', target: 1 },
    points: 10
  },
  {
    id: 'word-master',
    title: 'Mestre das Palavras',
    description: 'Fale 50 palavras corretamente',
    icon: '📚',
    requirement: { type: 'words', target: 50 },
    points: 50
  },
  {
    id: 'star-collector',
    title: 'Colecionador de Estrelas',
    description: 'Colete 10 estrelas',
    icon: '🌟',
    requirement: { type: 'stars', target: 10 },
    points: 25
  },
  {
    id: 'star-master',
    title: 'Mestre das Estrelas',
    description: 'Colete 100 estrelas',
    icon: '💫',
    requirement: { type: 'stars', target: 100 },
    points: 100
  },
  {
    id: 'persistent',
    title: 'Persistente',
    description: 'Jogue 3 dias seguidos',
    icon: '🔥',
    requirement: { type: 'streak', target: 3 },
    points: 30
  },
  {
    id: 'dedicated',
    title: 'Dedicado',
    description: 'Jogue 7 dias seguidos',
    icon: '🎯',
    requirement: { type: 'streak', target: 7 },
    points: 75
  },
  {
    id: 'accuracy-master',
    title: 'Mestre da Pronúncia',
    description: 'Consiga 90% de acerto',
    icon: '🏆',
    requirement: { type: 'accuracy', target: 90 },
    points: 100
  },
  {
    id: 'time-player',
    title: 'Jogador Dedicado',
    description: 'Jogue por 60 minutos',
    icon: '⏰',
    requirement: { type: 'playtime', target: 60 },
    points: 50
  },
  {
    id: 'explorer',
    title: 'Explorador',
    description: 'Complete todos os 5 mini-jogos',
    icon: '🗺️',
    requirement: { type: 'games', target: 5 },
    points: 80
  },
  {
    id: 'perfectionist',
    title: 'Perfeccionista',
    description: 'Consiga 10 palavras perfeitas seguidas',
    icon: '💯',
    requirement: { type: 'perfect_streak', target: 10 },
    points: 150
  }
];

// Armazenamento em memória
let userAchievements = {}; // { profileId: [...achievements] }

// GET - Listar todas as conquistas disponíveis
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: defaultAchievements.length,
    data: defaultAchievements
  });
});

// GET - Obter conquistas de um perfil
router.get('/:profileId', (req, res) => {
  const profileAchievements = userAchievements[req.params.profileId] || [];

  const achievementsWithStatus = defaultAchievements.map(achievement => {
    const unlocked = profileAchievements.find(ua => ua.id === achievement.id);

    return {
      ...achievement,
      unlocked: !!unlocked,
      unlockedAt: unlocked?.unlockedAt || null
    };
  });

  const stats = {
    total: defaultAchievements.length,
    unlocked: profileAchievements.length,
    locked: defaultAchievements.length - profileAchievements.length,
    totalPoints: profileAchievements.reduce((sum, a) => {
      const achievement = defaultAchievements.find(da => da.id === a.id);
      return sum + (achievement?.points || 0);
    }, 0)
  };

  res.json({
    success: true,
    data: achievementsWithStatus,
    stats
  });
});

// POST - Desbloquear conquista
router.post('/:profileId/unlock/:achievementId', (req, res) => {
  const { profileId, achievementId } = req.params;

  const achievement = defaultAchievements.find(a => a.id === achievementId);

  if (!achievement) {
    return res.status(404).json({
      success: false,
      error: 'Conquista não encontrada'
    });
  }

  if (!userAchievements[profileId]) {
    userAchievements[profileId] = [];
  }

  // Verifica se já está desbloqueada
  const alreadyUnlocked = userAchievements[profileId].find(a => a.id === achievementId);

  if (alreadyUnlocked) {
    return res.status(400).json({
      success: false,
      error: 'Conquista já desbloqueada'
    });
  }

  // Desbloqueia
  const unlockedAchievement = {
    ...achievement,
    unlockedAt: new Date().toISOString()
  };

  userAchievements[profileId].push(unlockedAchievement);

  res.json({
    success: true,
    message: 'Conquista desbloqueada!',
    data: unlockedAchievement
  });
});

// POST - Verificar conquistas baseadas nas estatísticas
router.post('/:profileId/check', (req, res) => {
  const { profileId } = req.params;
  const stats = req.body; // { totalWords, stars, currentStreak, successRate, playTime }

  if (!userAchievements[profileId]) {
    userAchievements[profileId] = [];
  }

  const newlyUnlocked = [];

  defaultAchievements.forEach(achievement => {
    // Verifica se já está desbloqueada
    const alreadyUnlocked = userAchievements[profileId].find(a => a.id === achievement.id);
    if (alreadyUnlocked) return;

    // Verifica se os requisitos foram atingidos
    let shouldUnlock = false;

    switch (achievement.requirement.type) {
      case 'words':
        shouldUnlock = stats.totalWords >= achievement.requirement.target;
        break;
      case 'stars':
        shouldUnlock = stats.stars >= achievement.requirement.target;
        break;
      case 'streak':
        shouldUnlock = stats.currentStreak >= achievement.requirement.target;
        break;
      case 'accuracy':
        shouldUnlock = (stats.successRate * 100) >= achievement.requirement.target;
        break;
      case 'playtime':
        shouldUnlock = stats.playTime >= achievement.requirement.target;
        break;
      case 'games':
        shouldUnlock = stats.gamesCompleted >= achievement.requirement.target;
        break;
      case 'perfect_streak':
        shouldUnlock = stats.perfectStreak >= achievement.requirement.target;
        break;
    }

    if (shouldUnlock) {
      const unlockedAchievement = {
        ...achievement,
        unlockedAt: new Date().toISOString()
      };

      userAchievements[profileId].push(unlockedAchievement);
      newlyUnlocked.push(unlockedAchievement);
    }
  });

  res.json({
    success: true,
    message: newlyUnlocked.length > 0
      ? `${newlyUnlocked.length} nova(s) conquista(s) desbloqueada(s)!`
      : 'Nenhuma nova conquista',
    data: newlyUnlocked
  });
});

// GET - Leaderboard (top jogadores por pontos de conquistas)
router.get('/leaderboard/top', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;

  const leaderboard = Object.entries(userAchievements).map(([profileId, achievements]) => {
    const totalPoints = achievements.reduce((sum, a) => {
      const achievement = defaultAchievements.find(da => da.id === a.id);
      return sum + (achievement?.points || 0);
    }, 0);

    return {
      profileId,
      achievementsUnlocked: achievements.length,
      totalPoints
    };
  })
  .sort((a, b) => b.totalPoints - a.totalPoints)
  .slice(0, limit);

  res.json({
    success: true,
    data: leaderboard
  });
});

export default router;
