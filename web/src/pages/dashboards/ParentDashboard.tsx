/**
 * ParentDashboard - Dashboard para Pais/Responsáveis
 * Features: Acompanhamento de progresso, dicas, comunicação com profissionais
 */

import { motion } from 'framer-motion';
import { useState } from 'react';
import InteractiveButton from '@/design-system/atoms/InteractiveButton';
import { ProgressRing } from '@/design-system/atoms/ProgressRing';
import { StarCounter, LevelBadge } from '@/design-system/atoms/ScoreCounter';
import Chart, { ProgressChart } from '@/design-system/organisms/Chart';
import { QuickActions } from '@/design-system/molecules/QuickActions';
import { StatCard } from '@/design-system/molecules/StatCard';
import { ActivityTimeline } from '@/design-system/molecules/ActivityTimeline';
import DashboardLayout from '@/design-system/templates/DashboardLayout';
import './ParentDashboard.css';

// Interfaces
interface Child {
  id: string;
  name: string;
  age: number;
  avatar?: string;
  level: number;
  stars: number;
  progress: number;
  activitiesCompleted: number;
  streakDays: number;
  lastActivity?: Date;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: Date;
  category: 'milestone' | 'streak' | 'mastery';
}

interface Tip {
  id: string;
  title: string;
  description: string;
  category: 'practice' | 'motivation' | 'technique';
  icon: string;
}

interface Message {
  id: string;
  from: string;
  role: 'therapist' | 'teacher';
  message: string;
  date: Date;
  read: boolean;
}

// Mock data
const mockChild: Child = {
  id: '1',
  name: 'Maria',
  age: 6,
  level: 12,
  stars: 245,
  progress: 75,
  activitiesCompleted: 48,
  streakDays: 7,
  lastActivity: new Date('2026-05-10'),
};

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Primeira Estrela!',
    description: 'Completou sua primeira atividade',
    icon: '⭐',
    date: new Date('2026-04-15'),
    category: 'milestone',
  },
  {
    id: '2',
    title: 'Sequência de 7 dias',
    description: 'Praticou 7 dias seguidos',
    icon: '🔥',
    date: new Date('2026-05-10'),
    category: 'streak',
  },
  {
    id: '3',
    title: 'Mestre do Som /r/',
    description: 'Dominou o fonema /r/',
    icon: '🏆',
    date: new Date('2026-05-08'),
    category: 'mastery',
  },
];

const mockTips: Tip[] = [
  {
    id: '1',
    title: 'Pratique Diariamente',
    description: 'Reserve 15 minutos por dia para praticar com seu filho. A consistência é mais importante que a duração.',
    category: 'practice',
    icon: '📅',
  },
  {
    id: '2',
    title: 'Use Jogos e Brincadeiras',
    description: 'Transforme exercícios em brincadeiras divertidas. Crianças aprendem melhor quando se divertem!',
    category: 'motivation',
    icon: '🎮',
  },
  {
    id: '3',
    title: 'Elogie o Esforço',
    description: 'Celebre cada pequena conquista. O reforço positivo aumenta a motivação e autoconfiança.',
    category: 'motivation',
    icon: '👏',
  },
  {
    id: '4',
    title: 'Leitura em Voz Alta',
    description: 'Leia histórias juntos e incentive seu filho a repetir palavras e frases. Isso ajuda na pronúncia e fluência.',
    category: 'technique',
    icon: '📚',
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    from: 'Dr. Carlos Mendes',
    role: 'therapist',
    message: 'Maria está fazendo um ótimo progresso com o som /r/! Continue praticando os exercícios em casa.',
    date: new Date('2026-05-09'),
    read: true,
  },
  {
    id: '2',
    from: 'Profa. Ana Santos',
    role: 'teacher',
    message: 'Parabéns! Maria completou todas as atividades desta semana. Ela está muito engajada!',
    date: new Date('2026-05-10'),
    read: false,
  },
];

export default function ParentDashboard() {
  const [activeView, setActiveView] = useState<'overview' | 'progress' | 'tips' | 'messages'>('overview');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const weeklyProgressData = [
    { label: 'Seg', value: 85 },
    { label: 'Ter', value: 90 },
    { label: 'Qua', value: 75 },
    { label: 'Qui', value: 95 },
    { label: 'Sex', value: 88 },
    { label: 'Sáb', value: 92 },
    { label: 'Dom', value: 78 },
  ];

  const timelineActivities = [
    {
      id: '1',
      title: 'Exercício de Fonemas',
      description: 'Praticou sons /r/ e /l/ por 15 minutos',
      timestamp: new Date('2026-05-10T14:30:00'),
      icon: '🎤',
      type: 'success' as const,
    },
    {
      id: '2',
      title: 'Jogo da Memória Fonética',
      description: 'Completou nível 5 com 3 estrelas',
      timestamp: new Date('2026-05-10T10:15:00'),
      icon: '🎮',
      type: 'success' as const,
    },
    {
      id: '3',
      title: 'Subiu de Nível!',
      description: 'Alcançou o nível 12',
      timestamp: new Date('2026-05-09T16:45:00'),
      icon: '🏆',
      type: 'milestone' as const,
    },
  ];

  const quickActions = [
    {
      icon: '🎮',
      label: 'Começar Atividade',
      description: 'Iniciar prática diária',
      onClick: () => console.log('Começar atividade'),
      variant: 'primary' as const,
    },
    {
      icon: '📊',
      label: 'Ver Progresso Completo',
      description: 'Relatório detalhado',
      onClick: () => setActiveView('progress'),
      variant: 'secondary' as const,
    },
    {
      icon: '💡',
      label: 'Dicas para Pais',
      description: 'Como ajudar em casa',
      onClick: () => setActiveView('tips'),
      variant: 'fun' as const,
    },
    {
      icon: '💬',
      label: 'Mensagens',
      description: `${mockMessages.filter(m => !m.read).length} não lidas`,
      onClick: () => setActiveView('messages'),
      variant: 'success' as const,
    },
  ];

  return (
    <DashboardLayout
      userRole="parent"
      userName="Roberto Silva"
      userAvatar="👨"
    >
      <div className="parent-dashboard">
        {/* Header */}
        <div className="parent-dashboard__header">
          <div className="parent-dashboard__child-info">
            <div className="child-avatar">
              {mockChild.avatar || mockChild.name.charAt(0)}
            </div>
            <div className="child-details">
              <h1 className="parent-dashboard__title">Progresso de {mockChild.name}</h1>
              <p className="parent-dashboard__subtitle">{mockChild.age} anos</p>
            </div>
            <LevelBadge level={mockChild.level} />
          </div>

          <div className="parent-dashboard__nav">
            <button
              className={`parent-dashboard__nav-btn ${activeView === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveView('overview')}
            >
              🏠 Início
            </button>
            <button
              className={`parent-dashboard__nav-btn ${activeView === 'progress' ? 'active' : ''}`}
              onClick={() => setActiveView('progress')}
            >
              📊 Progresso
            </button>
            <button
              className={`parent-dashboard__nav-btn ${activeView === 'tips' ? 'active' : ''}`}
              onClick={() => setActiveView('tips')}
            >
              💡 Dicas
            </button>
            <button
              className={`parent-dashboard__nav-btn ${activeView === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveView('messages')}
            >
              💬 Mensagens
              {mockMessages.filter(m => !m.read).length > 0 && (
                <span className="badge">{mockMessages.filter(m => !m.read).length}</span>
              )}
            </button>
          </div>
        </div>

        {/* Overview */}
        {activeView === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Stats */}
            <div className="parent-dashboard__stats">
              <StatCard
                title="Estrelas Ganhas"
                value={mockChild.stars}
                icon="⭐"
                trend={{ value: 45, direction: 'up' }}
                subtitle="Esta semana"
                color="var(--accent)"
              />
              <StatCard
                title="Atividades Concluídas"
                value={mockChild.activitiesCompleted}
                icon="✅"
                subtitle="No total"
                color="var(--success)"
              />
              <StatCard
                title="Sequência Atual"
                value={`${mockChild.streakDays} dias`}
                icon="🔥"
                subtitle="Continue assim!"
                color="var(--primary)"
              />
              <StatCard
                title="Progresso Geral"
                value={`${mockChild.progress}%`}
                icon="📈"
                trend={{ value: 12, direction: 'up' }}
                color="var(--info)"
              />
            </div>

            {/* Quick Actions */}
            <QuickActions actions={quickActions} />

            {/* Main Grid */}
            <div className="parent-dashboard__grid">
              {/* Weekly Progress */}
              <div className="parent-dashboard__card">
                <h3 className="parent-dashboard__card-title">Desempenho da Semana</h3>
                <Chart
                  data={weeklyProgressData}
                  type="area"
                  height={250}
                  color="var(--primary)"
                  gradient
                />
                <div className="parent-dashboard__chart-footer">
                  <div className="footer-stat">
                    <span className="label">Média</span>
                    <span className="value">{Math.round(weeklyProgressData.reduce((a, b) => a + b.value, 0) / 7)}%</span>
                  </div>
                  <div className="footer-stat">
                    <span className="label">Melhor dia</span>
                    <span className="value">Qui (95%)</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="parent-dashboard__card">
                <h3 className="parent-dashboard__card-title">Atividades Recentes</h3>
                <ActivityTimeline activities={timelineActivities} />
              </div>

              {/* Achievements */}
              <div className="parent-dashboard__card">
                <h3 className="parent-dashboard__card-title">Conquistas Recentes</h3>
                <div className="parent-dashboard__achievements">
                  {mockAchievements.slice(0, 3).map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      className="achievement-item"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="achievement-icon">{achievement.icon}</div>
                      <div className="achievement-content">
                        <h4>{achievement.title}</h4>
                        <p>{achievement.description}</p>
                        <span className="achievement-date">
                          {new Intl.DateTimeFormat('pt-BR').format(achievement.date)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Next Session */}
              <div className="parent-dashboard__card">
                <h3 className="parent-dashboard__card-title">Próxima Sessão</h3>
                <div className="parent-dashboard__next-session">
                  <div className="session-icon">📅</div>
                  <div className="session-details">
                    <h4>Sessão com Dr. Carlos Mendes</h4>
                    <p className="session-date">Quinta-feira, 12 de Maio, 14:00</p>
                    <p className="session-type">Fonoaudiologia - Exercícios de Pronúncia</p>
                  </div>
                  <InteractiveButton
                    variant="primary"
                    size="sm"
                    effects={{ ripple: true }}
                  >
                    Ver Detalhes
                  </InteractiveButton>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Progress Detail */}
        {activeView === 'progress' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="parent-dashboard__progress-view">
              <div className="parent-dashboard__card">
                <h3 className="parent-dashboard__card-title">Progresso por Área</h3>
                <div className="progress-areas">
                  <ProgressChart
                    current={85}
                    goal={100}
                    label="Pronúncia"
                    color="var(--success)"
                  />
                  <ProgressChart
                    current={70}
                    goal={100}
                    label="Fluência"
                    color="var(--info)"
                  />
                  <ProgressChart
                    current={92}
                    goal={100}
                    label="Vocabulário"
                    color="var(--primary)"
                  />
                  <ProgressChart
                    current={65}
                    goal={100}
                    label="Compreensão"
                    color="var(--accent)"
                  />
                </div>
              </div>

              <div className="parent-dashboard__card">
                <h3 className="parent-dashboard__card-title">Todas as Conquistas</h3>
                <div className="parent-dashboard__all-achievements">
                  {mockAchievements.map((achievement) => (
                    <div key={achievement.id} className="achievement-card">
                      <div className="achievement-badge">{achievement.icon}</div>
                      <h4>{achievement.title}</h4>
                      <p>{achievement.description}</p>
                      <span className="date">
                        {new Intl.DateTimeFormat('pt-BR').format(achievement.date)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tips */}
        {activeView === 'tips' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="parent-dashboard__section-title">Dicas para Ajudar em Casa</h3>
            <div className="parent-dashboard__tips-grid">
              {mockTips.map((tip) => (
                <div key={tip.id} className="parent-dashboard__tip-card">
                  <div className="tip-icon">{tip.icon}</div>
                  <h4 className="tip-title">{tip.title}</h4>
                  <p className="tip-description">{tip.description}</p>
                  <span className={`tip-category tip-category--${tip.category}`}>
                    {tip.category === 'practice' ? '📅 Prática' :
                     tip.category === 'motivation' ? '⭐ Motivação' : '🎯 Técnica'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Messages */}
        {activeView === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="parent-dashboard__section-title">Mensagens dos Profissionais</h3>
            <div className="parent-dashboard__messages">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`parent-dashboard__message-card ${!message.read ? 'unread' : ''}`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="message-header">
                    <div className="message-from">
                      <span className="from-icon">
                        {message.role === 'therapist' ? '👨‍⚕️' : '👩‍🏫'}
                      </span>
                      <div>
                        <h4>{message.from}</h4>
                        <p className="role">
                          {message.role === 'therapist' ? 'Fonoaudiólogo' : 'Professor'}
                        </p>
                      </div>
                    </div>
                    <span className="message-date">
                      {new Intl.DateTimeFormat('pt-BR').format(message.date)}
                    </span>
                  </div>
                  <p className="message-text">{message.message}</p>
                  {!message.read && <span className="unread-indicator">●</span>}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
