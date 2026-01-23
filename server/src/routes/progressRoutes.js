/**
 * Rotas para relatórios de progresso
 */

import express from 'express';

const router = express.Router();

// Armazenamento em memória
let sessions = [];

// GET - Obter progresso de um perfil
router.get('/:profileId', (req, res) => {
  const profileSessions = sessions.filter(s => s.profileId === req.params.profileId);

  // Calcula estatísticas
  const totalSessions = profileSessions.length;
  const totalAttempts = profileSessions.reduce((sum, s) => sum + s.attempts.length, 0);

  const successfulAttempts = profileSessions.reduce((sum, s) => {
    return sum + s.attempts.filter(a => a.result === 'PERFECT' || a.result === 'GOOD').length;
  }, 0);

  const averageAccuracy = totalAttempts > 0
    ? Math.round((successfulAttempts / totalAttempts) * 100)
    : 0;

  const totalPlayTime = profileSessions.reduce((sum, s) => {
    if (s.endedAt) {
      const duration = new Date(s.endedAt) - new Date(s.startedAt);
      return sum + Math.floor(duration / 1000 / 60); // minutos
    }
    return sum;
  }, 0);

  // Palavras mais praticadas
  const wordFrequency = {};
  profileSessions.forEach(session => {
    session.attempts.forEach(attempt => {
      wordFrequency[attempt.wordText] = (wordFrequency[attempt.wordText] || 0) + 1;
    });
  });

  const mostPracticedWords = Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));

  // Palavras com dificuldade
  const wordAccuracy = {};
  profileSessions.forEach(session => {
    session.attempts.forEach(attempt => {
      if (!wordAccuracy[attempt.wordText]) {
        wordAccuracy[attempt.wordText] = { attempts: 0, successes: 0 };
      }
      wordAccuracy[attempt.wordText].attempts++;
      if (attempt.result === 'PERFECT' || attempt.result === 'GOOD') {
        wordAccuracy[attempt.wordText].successes++;
      }
    });
  });

  const difficultWords = Object.entries(wordAccuracy)
    .map(([word, data]) => ({
      word,
      attempts: data.attempts,
      successRate: Math.round((data.successes / data.attempts) * 100)
    }))
    .filter(w => w.attempts >= 3 && w.successRate < 60)
    .sort((a, b) => a.successRate - b.successRate)
    .slice(0, 10);

  res.json({
    success: true,
    data: {
      summary: {
        totalSessions,
        totalWords: totalAttempts,
        averageAccuracy,
        totalPlayTime
      },
      mostPracticedWords,
      difficultWords,
      recentSessions: profileSessions
        .sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt))
        .slice(0, 10)
    }
  });
});

// POST - Registrar sessão de jogo
router.post('/', (req, res) => {
  const session = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString()
  };

  sessions.push(session);

  res.status(201).json({
    success: true,
    data: session
  });
});

// GET - Relatório detalhado para os pais
router.get('/:profileId/report', (req, res) => {
  const { startDate, endDate } = req.query;

  let filteredSessions = sessions.filter(s => s.profileId === req.params.profileId);

  if (startDate) {
    filteredSessions = filteredSessions.filter(s =>
      new Date(s.startedAt) >= new Date(startDate)
    );
  }

  if (endDate) {
    filteredSessions = filteredSessions.filter(s =>
      new Date(s.startedAt) <= new Date(endDate)
    );
  }

  // Progresso por categoria
  const categoryProgress = {};
  filteredSessions.forEach(session => {
    if (!categoryProgress[session.category]) {
      categoryProgress[session.category] = {
        attempts: 0,
        successes: 0
      };
    }

    session.attempts.forEach(attempt => {
      categoryProgress[session.category].attempts++;
      if (attempt.result === 'PERFECT' || attempt.result === 'GOOD') {
        categoryProgress[session.category].successes++;
      }
    });
  });

  const categoryStats = Object.entries(categoryProgress).map(([category, data]) => ({
    category,
    wordsAttempted: data.attempts,
    successRate: Math.round((data.successes / data.attempts) * 100)
  }));

  // Tendência de melhoria
  const improvement = calculateImprovement(filteredSessions);

  res.json({
    success: true,
    data: {
      period: {
        startDate: startDate || filteredSessions[0]?.startedAt,
        endDate: endDate || new Date().toISOString()
      },
      categoryProgress: categoryStats,
      improvement,
      recommendations: generateRecommendations(categoryStats, filteredSessions)
    }
  });
});

// Função auxiliar para calcular melhoria
function calculateImprovement(sessions) {
  if (sessions.length < 2) return 0;

  const sorted = sessions.sort((a, b) => new Date(a.startedAt) - new Date(b.startedAt));
  const firstHalf = sorted.slice(0, Math.floor(sorted.length / 2));
  const secondHalf = sorted.slice(Math.floor(sorted.length / 2));

  const firstAvg = calculateAverageAccuracy(firstHalf);
  const secondAvg = calculateAverageAccuracy(secondHalf);

  return Math.round(((secondAvg - firstAvg) / firstAvg) * 100);
}

function calculateAverageAccuracy(sessions) {
  const totalAttempts = sessions.reduce((sum, s) => sum + s.attempts.length, 0);
  const successes = sessions.reduce((sum, s) =>
    sum + s.attempts.filter(a => a.result === 'PERFECT' || a.result === 'GOOD').length, 0
  );

  return totalAttempts > 0 ? (successes / totalAttempts) : 0;
}

// Gera recomendações personalizadas
function generateRecommendations(categoryStats, sessions) {
  const recommendations = [];

  // Recomendação baseada em categorias com baixo desempenho
  const weakCategories = categoryStats.filter(c => c.successRate < 60);
  if (weakCategories.length > 0) {
    recommendations.push(
      `Pratique mais exercícios nas categorias: ${weakCategories.map(c => c.category).join(', ')}`
    );
  }

  // Recomendação baseada em frequência
  if (sessions.length < 5) {
    recommendations.push('Tente jogar pelo menos 3 vezes por semana para melhores resultados');
  }

  // Recomendação positiva
  const strongCategories = categoryStats.filter(c => c.successRate >= 80);
  if (strongCategories.length > 0) {
    recommendations.push(
      `Excelente progresso em: ${strongCategories.map(c => c.category).join(', ')}! Continue assim!`
    );
  }

  return recommendations;
}

export default router;
