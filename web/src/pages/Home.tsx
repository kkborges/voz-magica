/**
 * Página Home - Seleção de Mini-Jogos
 */

import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/stores/useAppStore';
import GameCard from '@/components/GameCard';
import Button from '@/components/Button';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const { currentProfile, availableGames } = useAppStore();

  if (!currentProfile) {
    navigate('/profile/create');
    return null;
  }

  const handleGameClick = (gameId: string) => {
    navigate(`/game/${gameId}`);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="home">
      {/* Header com informações do perfil */}
      <header className="home__header">
        <div className="home__profile" onClick={handleProfileClick}>
          <div className="home__avatar">{currentProfile.avatar}</div>
          <div className="home__profile-info">
            <h2 className="home__profile-name">Olá, {currentProfile.name}! 👋</h2>
            <div className="home__profile-stats">
              <span className="home__stat">
                <span className="home__stat-icon">⭐</span>
                {currentProfile.stats.stars}
              </span>
              <span className="home__stat">
                <span className="home__stat-icon">🏆</span>
                Nível {currentProfile.stats.level}
              </span>
              <span className="home__stat">
                <span className="home__stat-icon">🎯</span>
                {Math.round(currentProfile.stats.successRate * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Barra de progresso de XP */}
        <div className="home__xp-bar">
          <div className="home__xp-label">
            <span>XP: {currentProfile.stats.xp} / {currentProfile.stats.level * 100}</span>
          </div>
          <div className="home__xp-progress">
            <div
              className="home__xp-fill"
              style={{
                width: `${(currentProfile.stats.xp / (currentProfile.stats.level * 100)) * 100}%`,
              }}
            />
          </div>
        </div>
      </header>

      {/* Título da seção de jogos */}
      <section className="home__games">
        <div className="home__games-header">
          <h1 className="home__title">
            Escolha um Jogo! 🎮
          </h1>
          <p className="home__subtitle">
            Aprenda a falar brincando com jogos divertidos!
          </p>
        </div>

        {/* Grid de jogos */}
        <div className="home__games-grid">
          {availableGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => handleGameClick(game.id)}
            />
          ))}
        </div>
      </section>

      {/* Footer com botões extras */}
      <footer className="home__footer">
        <Button
          variant="secondary"
          size="md"
          onClick={() => navigate('/progress')}
          icon="📊"
        >
          Meu Progresso
        </Button>
        <Button
          variant="fun"
          size="md"
          onClick={() => navigate('/achievements')}
          icon="🏆"
        >
          Conquistas
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={() => {
            const pinCode = prompt('Digite o PIN dos pais (padrão: 1234):');
            if (pinCode && useAppStore.getState().verifyParentPin(pinCode)) {
              navigate('/parent-panel');
            } else {
              alert('PIN incorreto!');
            }
          }}
          icon="👨‍👩‍👧"
        >
          Painel dos Pais
        </Button>
      </footer>
    </div>
  );
}
