/**
 * Card de Mini-Jogo
 * Exibe informações sobre cada jogo disponível
 */

import { MiniGame } from '@/types';
import './GameCard.css';

interface GameCardProps {
  game: MiniGame;
  onClick: () => void;
}

export default function GameCard({ game, onClick }: GameCardProps) {
  return (
    <div
      className={`game-card ${game.isLocked ? 'game-card--locked' : ''}`}
      onClick={game.isLocked ? undefined : onClick}
    >
      <div className="game-card__icon">{game.icon}</div>

      <div className="game-card__content">
        <h3 className="game-card__title">{game.name}</h3>
        <p className="game-card__description">{game.description}</p>

        <div className="game-card__meta">
          <span className="game-card__age">
            {game.minAge}-{game.maxAge} anos
          </span>
          <span className={`game-card__difficulty game-card__difficulty--${game.difficulty.toLowerCase()}`}>
            {game.difficulty === 'EASY' && '⭐'}
            {game.difficulty === 'MEDIUM' && '⭐⭐'}
            {game.difficulty === 'HARD' && '⭐⭐⭐'}
          </span>
        </div>
      </div>

      {game.isLocked && (
        <div className="game-card__lock">
          <div className="game-card__lock-icon">🔒</div>
          <div className="game-card__lock-text">
            {game.unlockRequirement?.stars && (
              <>Desbloqueie com {game.unlockRequirement.stars} ⭐</>
            )}
            {game.unlockRequirement?.level && (
              <>Alcance o nível {game.unlockRequirement.level}</>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
