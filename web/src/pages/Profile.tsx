/**
 * Página de Criação/Seleção de Perfil
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/stores/useAppStore';
import type { AgeGroup } from '@/types';
import Button from '@/components/Button';
import './Profile.css';

const AVATARS = ['😊', '🦁', '🐯', '🐻', '🐰', '🦊', '🐼', '🐨', '🐸', '🦄', '🌈', '⭐'];

export default function Profile() {
  const navigate = useNavigate();
  const { profiles, createProfile, selectProfile, currentProfile } = useAppStore();

  const [isCreating, setIsCreating] = useState(profiles.length === 0);
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('4-5');

  const handleCreateProfile = () => {
    if (!name.trim()) {
      alert('Por favor, digite um nome!');
      return;
    }

    createProfile({
      name: name.trim(),
      avatar: selectedAvatar,
      ageGroup,
      settings: {
        microphoneSensitivity: 0.7,
        speechSpeed: 'normal',
        enableSoundEffects: true,
        enableMusic: true,
        enableHapticFeedback: true,
      },
    });

    navigate('/');
  };

  const handleSelectProfile = (profileId: string) => {
    selectProfile(profileId);
    navigate('/');
  };

  if (isCreating) {
    return (
      <div className="profile">
        <div className="profile__container">
          <div className="profile__header">
            <h1 className="profile__title">Criar Novo Perfil 🎨</h1>
            <p className="profile__subtitle">Vamos conhecer você!</p>
          </div>

          <div className="profile__form">
            {/* Nome */}
            <div className="profile__field">
              <label className="profile__label">Qual é o seu nome?</label>
              <input
                type="text"
                className="profile__input"
                placeholder="Digite seu nome..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
                autoFocus
              />
            </div>

            {/* Avatar */}
            <div className="profile__field">
              <label className="profile__label">Escolha seu avatar!</label>
              <div className="profile__avatars">
                {AVATARS.map((avatar) => (
                  <button
                    key={avatar}
                    className={`profile__avatar ${selectedAvatar === avatar ? 'profile__avatar--selected' : ''}`}
                    onClick={() => setSelectedAvatar(avatar)}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>

            {/* Idade */}
            <div className="profile__field">
              <label className="profile__label">Quantos anos você tem?</label>
              <div className="profile__age-buttons">
                <button
                  className={`profile__age-button ${ageGroup === '4-5' ? 'profile__age-button--selected' : ''}`}
                  onClick={() => setAgeGroup('4-5')}
                >
                  4-5 anos
                </button>
                <button
                  className={`profile__age-button ${ageGroup === '6-8' ? 'profile__age-button--selected' : ''}`}
                  onClick={() => setAgeGroup('6-8')}
                >
                  6-8 anos
                </button>
              </div>
            </div>

            {/* Botões */}
            <div className="profile__actions">
              {profiles.length > 0 && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setIsCreating(false)}
                >
                  Cancelar
                </Button>
              )}
              <Button
                variant="primary"
                size="lg"
                onClick={handleCreateProfile}
                fullWidth={profiles.length === 0}
              >
                Começar a Jogar! 🚀
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__header">
          <h1 className="profile__title">Escolha seu Perfil 👤</h1>
          <p className="profile__subtitle">Quem vai jogar hoje?</p>
        </div>

        <div className="profile__list">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              className={`profile__card ${currentProfile?.id === profile.id ? 'profile__card--current' : ''}`}
              onClick={() => handleSelectProfile(profile.id)}
            >
              <div className="profile__card-avatar">{profile.avatar}</div>
              <div className="profile__card-info">
                <h3 className="profile__card-name">{profile.name}</h3>
                <div className="profile__card-stats">
                  <span>⭐ {profile.stats.stars}</span>
                  <span>🏆 Nível {profile.stats.level}</span>
                </div>
              </div>
              {currentProfile?.id === profile.id && (
                <div className="profile__card-badge">Atual</div>
              )}
            </button>
          ))}

          {/* Botão para criar novo perfil */}
          <button
            className="profile__card profile__card--new"
            onClick={() => setIsCreating(true)}
          >
            <div className="profile__card-icon">➕</div>
            <h3 className="profile__card-name">Novo Perfil</h3>
          </button>
        </div>

        {currentProfile && (
          <div className="profile__actions">
            <Button variant="primary" size="lg" onClick={() => navigate('/')}>
              Continuar Jogando
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
