/**
 * ChildGameDashboard - Interface de Jogos para Crianças
 * Features: Mini-games, sistema de níveis, recompensas, avatares, achievements
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import InteractiveButton from '@/design-system/atoms/InteractiveButton';
import { AnimatedAvatar, AvatarGroup } from '@/design-system/atoms/AnimatedAvatar';
import { StarCounter, GemCounter, CoinCounter, LevelBadge } from '@/design-system/atoms/ScoreCounter';
import { ProgressRing } from '@/design-system/atoms/ProgressRing';
import { ParticleSystem, ConfettiExplosion } from '@/design-system/molecules/ParticleSystem';
import './ChildGameDashboard.css';

// Interfaces
interface MiniGame {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'phoneme' | 'fluency' | 'vocabulary' | 'listening';
  stars: number;
  isLocked: boolean;
  completionRate: number;
}

interface Reward {
  id: string;
  name: string;
  icon: string;
  price: number;
  currency: 'stars' | 'gems' | 'coins';
  type: 'avatar' | 'background' | 'effect' | 'badge';
  owned: boolean;
}

interface PlayerStats {
  name: string;
  level: number;
  stars: number;
  gems: number;
  coins: number;
  experience: number;
  nextLevelExp: number;
  avatar: string;
  streakDays: number;
}

// Mock data
const mockPlayer: PlayerStats = {
  name: 'Maria',
  level: 12,
  stars: 245,
  gems: 38,
  coins: 1250,
  experience: 780,
  nextLevelExp: 1000,
  avatar: '👧',
  streakDays: 7,
};

const mockGames: MiniGame[] = [
  {
    id: '1',
    title: 'Caça Sons',
    description: 'Encontre os sons corretos!',
    icon: '🎯',
    difficulty: 'easy',
    category: 'phoneme',
    stars: 3,
    isLocked: false,
    completionRate: 85,
  },
  {
    id: '2',
    title: 'Rima Mágica',
    description: 'Forme pares de rimas',
    icon: '✨',
    difficulty: 'easy',
    category: 'vocabulary',
    stars: 3,
    isLocked: false,
    completionRate: 92,
  },
  {
    id: '3',
    title: 'Fala Rápida',
    description: 'Pratique sua fluência',
    icon: '⚡',
    difficulty: 'medium',
    category: 'fluency',
    stars: 2,
    isLocked: false,
    completionRate: 60,
  },
  {
    id: '4',
    title: 'Escuta Atenta',
    description: 'Ouça e repita',
    icon: '👂',
    difficulty: 'easy',
    category: 'listening',
    stars: 3,
    isLocked: false,
    completionRate: 78,
  },
  {
    id: '5',
    title: 'Desafio do R',
    description: 'Domine o som /r/',
    icon: '🎤',
    difficulty: 'hard',
    category: 'phoneme',
    stars: 1,
    isLocked: false,
    completionRate: 35,
  },
  {
    id: '6',
    title: 'Palavras Secretas',
    description: 'Desvende as palavras',
    icon: '🔐',
    difficulty: 'medium',
    category: 'vocabulary',
    stars: 0,
    isLocked: true,
    completionRate: 0,
  },
];

const mockRewards: Reward[] = [
  {
    id: '1',
    name: 'Avatar Unicórnio',
    icon: '🦄',
    price: 50,
    currency: 'gems',
    type: 'avatar',
    owned: false,
  },
  {
    id: '2',
    name: 'Avatar Dragão',
    icon: '🐉',
    price: 75,
    currency: 'gems',
    type: 'avatar',
    owned: false,
  },
  {
    id: '3',
    name: 'Fundo Espacial',
    icon: '🌌',
    price: 100,
    currency: 'stars',
    type: 'background',
    owned: false,
  },
  {
    id: '4',
    name: 'Estrelas Douradas',
    icon: '⭐',
    price: 30,
    currency: 'gems',
    type: 'effect',
    owned: true,
  },
];

export default function ChildGameDashboard() {
  const [activeView, setActiveView] = useState<'games' | 'rewards' | 'profile'>('games');
  const [selectedGame, setSelectedGame] = useState<MiniGame | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [avatarExpression, setAvatarExpression] = useState<'happy' | 'excited' | 'celebrating'>('happy');

  const experiencePercentage = (mockPlayer.experience / mockPlayer.nextLevelExp) * 100;

  const handleGameClick = (game: MiniGame) => {
    if (game.isLocked) {
      setAvatarExpression('sad' as any);
      return;
    }
    setSelectedGame(game);
    setAvatarExpression('excited');
  };

  const handleStartGame = () => {
    // Aqui seria iniciado o jogo real
    console.log('Starting game:', selectedGame?.id);
    setShowCelebration(true);
    setAvatarExpression('celebrating');
    setTimeout(() => setShowCelebration(false), 3000);
  };

  return (
    <div className="child-game-dashboard">
      {/* Particles Effect */}
      <ParticleSystem
        type="stars"
        count={20}
        intensity="low"
        className="child-game-dashboard__particles"
      />

      {showCelebration && (
        <ConfettiExplosion
          duration={3000}
          particleCount={100}
        />
      )}

      {/* Header com Stats */}
      <div className="child-game-dashboard__header">
        <motion.div
          className="child-game-dashboard__player-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <AnimatedAvatar
            emoji={mockPlayer.avatar}
            expression={avatarExpression}
            size="lg"
            animate
          />

          <div className="player-info">
            <h2 className="player-name">Olá, {mockPlayer.name}!</h2>
            <LevelBadge level={mockPlayer.level} />
          </div>

          {/* Streak Indicator */}
          <div className="streak-indicator">
            <span className="streak-icon">🔥</span>
            <span className="streak-text">{mockPlayer.streakDays} dias</span>
          </div>
        </motion.div>

        {/* Currency Display */}
        <div className="child-game-dashboard__currency">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <StarCounter count={mockPlayer.stars} size="md" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <GemCounter count={mockPlayer.gems} size="md" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <CoinCounter count={mockPlayer.coins} size="md" />
          </motion.div>
        </div>
      </div>

      {/* Experience Bar */}
      <motion.div
        className="child-game-dashboard__exp-bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
      >
        <div className="exp-bar-label">
          Experiência: {mockPlayer.experience} / {mockPlayer.nextLevelExp}
        </div>
        <div className="exp-bar-container">
          <motion.div
            className="exp-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${experiencePercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="child-game-dashboard__nav">
        <InteractiveButton
          variant={activeView === 'games' ? 'primary' : 'secondary'}
          size="lg"
          icon="🎮"
          onClick={() => setActiveView('games')}
          effects={{ ripple: true, sound: true, glow: activeView === 'games' }}
        >
          Jogos
        </InteractiveButton>
        <InteractiveButton
          variant={activeView === 'rewards' ? 'primary' : 'secondary'}
          size="lg"
          icon="🎁"
          onClick={() => setActiveView('rewards')}
          effects={{ ripple: true, sound: true, glow: activeView === 'rewards' }}
        >
          Recompensas
        </InteractiveButton>
        <InteractiveButton
          variant={activeView === 'profile' ? 'primary' : 'secondary'}
          size="lg"
          icon="👤"
          onClick={() => setActiveView('profile')}
          effects={{ ripple: true, sound: true, glow: activeView === 'profile' }}
        >
          Perfil
        </InteractiveButton>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {/* Games View */}
        {activeView === 'games' && (
          <motion.div
            key="games"
            className="child-game-dashboard__games"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="child-game-dashboard__section-title">
              Escolha seu Jogo! 🎯
            </h2>

            <div className="child-game-dashboard__games-grid">
              {mockGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  className={`game-card ${game.isLocked ? 'locked' : ''} ${selectedGame?.id === game.id ? 'selected' : ''}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={!game.isLocked ? { scale: 1.05, rotate: 2 } : {}}
                  whileTap={!game.isLocked ? { scale: 0.95 } : {}}
                  onClick={() => handleGameClick(game)}
                >
                  {game.isLocked && (
                    <div className="game-card__lock">
                      <span className="lock-icon">🔒</span>
                    </div>
                  )}

                  <div className="game-card__icon">{game.icon}</div>

                  <h3 className="game-card__title">{game.title}</h3>
                  <p className="game-card__description">{game.description}</p>

                  <div className="game-card__meta">
                    <span className={`difficulty difficulty--${game.difficulty}`}>
                      {game.difficulty === 'easy' ? '🟢 Fácil' :
                       game.difficulty === 'medium' ? '🟡 Médio' : '🔴 Difícil'}
                    </span>

                    {!game.isLocked && (
                      <div className="game-card__stars">
                        {[...Array(3)].map((_, i) => (
                          <span key={i} className={i < game.stars ? 'filled' : ''}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {!game.isLocked && game.completionRate > 0 && (
                    <div className="game-card__progress">
                      <ProgressRing
                        progress={game.completionRate}
                        size="sm"
                        showPercentage={false}
                      />
                      <span className="progress-text">{game.completionRate}%</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {selectedGame && !selectedGame.isLocked && (
              <motion.div
                className="child-game-dashboard__game-detail"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="game-detail-content">
                  <div className="game-detail-icon">{selectedGame.icon}</div>
                  <div className="game-detail-info">
                    <h3>{selectedGame.title}</h3>
                    <p>{selectedGame.description}</p>
                  </div>
                </div>

                <InteractiveButton
                  variant="magical"
                  size="xl"
                  icon="▶️"
                  onClick={handleStartGame}
                  effects={{ ripple: true, sound: true, confetti: true, glow: true, pulse: true }}
                >
                  Jogar Agora!
                </InteractiveButton>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Rewards View */}
        {activeView === 'rewards' && (
          <motion.div
            key="rewards"
            className="child-game-dashboard__rewards"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="child-game-dashboard__section-title">
              Loja de Recompensas! 🎁
            </h2>

            <div className="child-game-dashboard__rewards-grid">
              {mockRewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  className={`reward-card ${reward.owned ? 'owned' : ''}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {reward.owned && (
                    <div className="reward-card__owned-badge">
                      ✅ Possui
                    </div>
                  )}

                  <div className="reward-card__icon">{reward.icon}</div>
                  <h3 className="reward-card__name">{reward.name}</h3>

                  <div className="reward-card__price">
                    {reward.currency === 'stars' && `⭐ ${reward.price}`}
                    {reward.currency === 'gems' && `💎 ${reward.price}`}
                    {reward.currency === 'coins' && `🪙 ${reward.price}`}
                  </div>

                  {!reward.owned && (
                    <InteractiveButton
                      variant="success"
                      size="md"
                      onClick={() => console.log('Buy reward:', reward.id)}
                      effects={{ ripple: true, sound: true }}
                    >
                      Comprar
                    </InteractiveButton>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Profile View */}
        {activeView === 'profile' && (
          <motion.div
            key="profile"
            className="child-game-dashboard__profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="child-game-dashboard__section-title">
              Meu Perfil! 👤
            </h2>

            <div className="child-game-dashboard__profile-content">
              {/* Avatar Selection */}
              <div className="profile-section">
                <h3>Escolha seu Avatar</h3>
                <div className="avatar-selection">
                  <AvatarGroup
                    avatars={[
                      { emoji: '👧', name: 'Menina', onClick: () => console.log('Selected 👧') },
                      { emoji: '👦', name: 'Menino', onClick: () => console.log('Selected 👦') },
                      { emoji: '🦄', name: 'Unicórnio', onClick: () => console.log('Selected 🦄') },
                      { emoji: '🐉', name: 'Dragão', onClick: () => console.log('Selected 🐉') },
                      { emoji: '🦸', name: 'Herói', onClick: () => console.log('Selected 🦸') },
                      { emoji: '🧙', name: 'Mago', onClick: () => console.log('Selected 🧙') },
                    ]}
                    size="lg"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="profile-section">
                <h3>Minhas Estatísticas</h3>
                <div className="profile-stats">
                  <div className="stat-item">
                    <span className="stat-icon">🏆</span>
                    <div className="stat-details">
                      <span className="stat-label">Nível</span>
                      <span className="stat-value">{mockPlayer.level}</span>
                    </div>
                  </div>

                  <div className="stat-item">
                    <span className="stat-icon">🎮</span>
                    <div className="stat-details">
                      <span className="stat-label">Jogos Completados</span>
                      <span className="stat-value">{mockGames.filter(g => g.completionRate === 100).length}</span>
                    </div>
                  </div>

                  <div className="stat-item">
                    <span className="stat-icon">⭐</span>
                    <div className="stat-details">
                      <span className="stat-label">Total de Estrelas</span>
                      <span className="stat-value">{mockPlayer.stars}</span>
                    </div>
                  </div>

                  <div className="stat-item">
                    <span className="stat-icon">🔥</span>
                    <div className="stat-details">
                      <span className="stat-label">Sequência de Dias</span>
                      <span className="stat-value">{mockPlayer.streakDays} dias</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="profile-section">
                <h3>Conquistas Recentes</h3>
                <div className="achievements-showcase">
                  <div className="achievement-badge">
                    <span className="badge-icon">🏆</span>
                    <span className="badge-name">Primeira Vitória</span>
                  </div>
                  <div className="achievement-badge">
                    <span className="badge-icon">🔥</span>
                    <span className="badge-name">Sequência de 7 dias</span>
                  </div>
                  <div className="achievement-badge">
                    <span className="badge-icon">⭐</span>
                    <span className="badge-name">100 Estrelas</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
