/**
 * TeacherDashboard - Dashboard para Professores e Pedagogos
 * Features: Gestão de turmas, atividades em grupo, acompanhamento coletivo, LMS integration
 */

import { motion } from 'framer-motion';
import { useState } from 'react';
import InteractiveButton from '@/design-system/atoms/InteractiveButton';
import { ProgressRing } from '@/design-system/atoms/ProgressRing';
import Chart, { DonutChart, ProgressChart } from '@/design-system/organisms/Chart';
import { QuickActions } from '@/design-system/molecules/QuickActions';
import { StatCard } from '@/design-system/molecules/StatCard';
import DashboardLayout from '@/design-system/templates/DashboardLayout';
import './TeacherDashboard.css';

// Interfaces
interface Student {
  id: string;
  name: string;
  age: number;
  avatar?: string;
  progress: number;
  stars: number;
  level: number;
  activitiesCompleted: number;
  lastActivity?: Date;
  needsAttention: boolean;
}

interface Classroom {
  id: string;
  name: string;
  grade: string;
  studentCount: number;
  averageProgress: number;
  activeActivities: number;
}

interface GroupActivity {
  id: string;
  title: string;
  description: string;
  type: 'phoneme' | 'fluency' | 'vocabulary' | 'listening';
  difficulty: 'easy' | 'medium' | 'hard';
  participants: number;
  completed: number;
  dueDate: Date;
  status: 'active' | 'completed' | 'pending';
}

// Mock data
const mockClassrooms: Classroom[] = [
  {
    id: '1',
    name: 'Turma A - Manhã',
    grade: '1º Ano',
    studentCount: 24,
    averageProgress: 68,
    activeActivities: 5,
  },
  {
    id: '2',
    name: 'Turma B - Tarde',
    grade: '1º Ano',
    studentCount: 22,
    averageProgress: 72,
    activeActivities: 3,
  },
  {
    id: '3',
    name: 'Turma C - Manhã',
    grade: '2º Ano',
    studentCount: 26,
    averageProgress: 85,
    activeActivities: 4,
  },
];

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Ana Silva',
    age: 6,
    progress: 85,
    stars: 245,
    level: 12,
    activitiesCompleted: 45,
    lastActivity: new Date('2026-05-10'),
    needsAttention: false,
  },
  {
    id: '2',
    name: 'Bruno Costa',
    age: 7,
    progress: 45,
    stars: 98,
    level: 5,
    activitiesCompleted: 18,
    lastActivity: new Date('2026-05-08'),
    needsAttention: true,
  },
  {
    id: '3',
    name: 'Carlos Mendes',
    age: 6,
    progress: 72,
    stars: 189,
    level: 9,
    activitiesCompleted: 34,
    lastActivity: new Date('2026-05-09'),
    needsAttention: false,
  },
  {
    id: '4',
    name: 'Diana Souza',
    age: 7,
    progress: 90,
    stars: 312,
    level: 15,
    activitiesCompleted: 56,
    lastActivity: new Date('2026-05-10'),
    needsAttention: false,
  },
];

const mockActivities: GroupActivity[] = [
  {
    id: '1',
    title: 'Roda de Contos',
    description: 'Atividade de escuta e expressão oral',
    type: 'listening',
    difficulty: 'easy',
    participants: 24,
    completed: 18,
    dueDate: new Date('2026-05-15'),
    status: 'active',
  },
  {
    id: '2',
    title: 'Caça ao Tesouro Fonético',
    description: 'Identificação de fonemas em grupo',
    type: 'phoneme',
    difficulty: 'medium',
    participants: 22,
    completed: 22,
    dueDate: new Date('2026-05-12'),
    status: 'completed',
  },
  {
    id: '3',
    title: 'Construção de Frases',
    description: 'Atividade colaborativa de vocabulário',
    type: 'vocabulary',
    difficulty: 'medium',
    participants: 26,
    completed: 15,
    dueDate: new Date('2026-05-18'),
    status: 'active',
  },
];

export default function TeacherDashboard() {
  const [activeView, setActiveView] = useState<'overview' | 'classrooms' | 'students' | 'activities'>('overview');
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(mockClassrooms[0]);

  const stats = {
    totalStudents: mockClassrooms.reduce((acc, c) => acc + c.studentCount, 0),
    totalClassrooms: mockClassrooms.length,
    averageProgress: Math.round(
      mockClassrooms.reduce((acc, c) => acc + c.averageProgress, 0) / mockClassrooms.length
    ),
    activeActivities: mockActivities.filter(a => a.status === 'active').length,
  };

  const progressDistribution = [
    { label: 'Excelente (80-100%)', value: 12, color: 'var(--success)' },
    { label: 'Bom (60-79%)', value: 35, color: 'var(--info)' },
    { label: 'Regular (40-59%)', value: 18, color: 'var(--warning)' },
    { label: 'Precisa Atenção (<40%)', value: 7, color: 'var(--error)' },
  ];

  const weeklyEngagementData = [
    { label: 'Seg', value: 85 },
    { label: 'Ter', value: 92 },
    { label: 'Qua', value: 88 },
    { label: 'Qui', value: 95 },
    { label: 'Sex', value: 78 },
    { label: 'Sáb', value: 45 },
    { label: 'Dom', value: 30 },
  ];

  const quickActions = [
    {
      icon: '➕',
      label: 'Nova Atividade',
      description: 'Criar atividade em grupo',
      onClick: () => setActiveView('activities'),
      variant: 'primary' as const,
    },
    {
      icon: '👥',
      label: 'Ver Turmas',
      description: 'Gerenciar turmas',
      onClick: () => setActiveView('classrooms'),
      variant: 'secondary' as const,
    },
    {
      icon: '📊',
      label: 'Relatório Coletivo',
      description: 'Gerar relatório da turma',
      onClick: () => console.log('Relatório'),
      variant: 'success' as const,
    },
    {
      icon: '🎯',
      label: 'Alunos em Destaque',
      description: 'Ver alunos que precisam atenção',
      onClick: () => setActiveView('students'),
      variant: 'fun' as const,
    },
  ];

  return (
    <DashboardLayout
      userRole="teacher"
      userName="Profa. Maria Santos"
      userAvatar="👩‍🏫"
    >
      <div className="teacher-dashboard">
        {/* Header */}
        <div className="teacher-dashboard__header">
          <div>
            <h1 className="teacher-dashboard__title">Dashboard Professor</h1>
            <p className="teacher-dashboard__subtitle">
              Acompanhe o desenvolvimento coletivo e individual dos alunos
            </p>
          </div>

          <div className="teacher-dashboard__nav">
            <button
              className={`teacher-dashboard__nav-btn ${activeView === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveView('overview')}
            >
              📊 Visão Geral
            </button>
            <button
              className={`teacher-dashboard__nav-btn ${activeView === 'classrooms' ? 'active' : ''}`}
              onClick={() => setActiveView('classrooms')}
            >
              🏫 Turmas
            </button>
            <button
              className={`teacher-dashboard__nav-btn ${activeView === 'students' ? 'active' : ''}`}
              onClick={() => setActiveView('students')}
            >
              👨‍🎓 Alunos
            </button>
            <button
              className={`teacher-dashboard__nav-btn ${activeView === 'activities' ? 'active' : ''}`}
              onClick={() => setActiveView('activities')}
            >
              🎯 Atividades
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
            <div className="teacher-dashboard__stats">
              <StatCard
                title="Total de Alunos"
                value={stats.totalStudents}
                icon="👨‍🎓"
                subtitle={`${stats.totalClassrooms} turmas`}
                color="var(--primary)"
              />
              <StatCard
                title="Progresso Médio"
                value={`${stats.averageProgress}%`}
                icon="📈"
                trend={{ value: 5, direction: 'up' }}
                color="var(--success)"
              />
              <StatCard
                title="Atividades Ativas"
                value={stats.activeActivities}
                icon="🎯"
                subtitle="Em andamento"
                color="var(--accent)"
              />
              <StatCard
                title="Taxa de Engajamento"
                value="87%"
                icon="⭐"
                trend={{ value: 3, direction: 'up' }}
                color="var(--info)"
              />
            </div>

            {/* Quick Actions */}
            <QuickActions actions={quickActions} />

            {/* Main Grid */}
            <div className="teacher-dashboard__grid">
              {/* Engajamento Semanal */}
              <div className="teacher-dashboard__card">
                <h3 className="teacher-dashboard__card-title">Engajamento Semanal</h3>
                <Chart
                  data={weeklyEngagementData}
                  type="area"
                  height={250}
                  color="var(--primary)"
                  gradient
                />
              </div>

              {/* Distribuição de Progresso */}
              <div className="teacher-dashboard__card">
                <h3 className="teacher-dashboard__card-title">Distribuição de Progresso</h3>
                <DonutChart
                  segments={progressDistribution}
                  size={220}
                  thickness={35}
                  centerContent={
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                        {stats.totalStudents}
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
                        Alunos
                      </div>
                    </div>
                  }
                />
              </div>

              {/* Turmas */}
              <div className="teacher-dashboard__card teacher-dashboard__card--full">
                <h3 className="teacher-dashboard__card-title">Minhas Turmas</h3>
                <div className="teacher-dashboard__classrooms">
                  {mockClassrooms.map((classroom) => (
                    <motion.div
                      key={classroom.id}
                      className="teacher-dashboard__classroom-card"
                      whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
                      onClick={() => setSelectedClassroom(classroom)}
                    >
                      <div className="teacher-dashboard__classroom-header">
                        <div>
                          <h4>{classroom.name}</h4>
                          <p>{classroom.grade}</p>
                        </div>
                        <ProgressRing
                          progress={classroom.averageProgress}
                          size="sm"
                          showLabel
                          label="Média"
                        />
                      </div>

                      <div className="teacher-dashboard__classroom-stats">
                        <div className="teacher-dashboard__classroom-stat">
                          <span className="label">Alunos</span>
                          <span className="value">👨‍🎓 {classroom.studentCount}</span>
                        </div>
                        <div className="teacher-dashboard__classroom-stat">
                          <span className="label">Atividades</span>
                          <span className="value">🎯 {classroom.activeActivities}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Alunos que Precisam Atenção */}
              <div className="teacher-dashboard__card teacher-dashboard__card--full">
                <h3 className="teacher-dashboard__card-title">Alunos que Precisam Atenção</h3>
                <div className="teacher-dashboard__attention-list">
                  {mockStudents
                    .filter(s => s.needsAttention || s.progress < 50)
                    .map(student => (
                      <div key={student.id} className="teacher-dashboard__student-card">
                        <div className="teacher-dashboard__student-avatar">
                          {student.name.charAt(0)}
                        </div>
                        <div className="teacher-dashboard__student-info">
                          <h4>{student.name}</h4>
                          <p>{student.age} anos</p>
                        </div>
                        <div className="teacher-dashboard__student-progress">
                          <ProgressChart
                            current={student.progress}
                            goal={100}
                            label="Progresso"
                            color="var(--warning)"
                          />
                        </div>
                        <InteractiveButton
                          variant="secondary"
                          size="sm"
                          onClick={() => console.log('Ver detalhes', student.id)}
                        >
                          Ver Detalhes
                        </InteractiveButton>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Classrooms View */}
        {activeView === 'classrooms' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="teacher-dashboard__classrooms-grid">
              {mockClassrooms.map((classroom) => (
                <div key={classroom.id} className="teacher-dashboard__classroom-detail">
                  <div className="teacher-dashboard__classroom-detail-header">
                    <h3>{classroom.name}</h3>
                    <span className="badge">{classroom.grade}</span>
                  </div>

                  <div className="teacher-dashboard__classroom-metrics">
                    <div className="metric">
                      <span className="metric-label">Alunos</span>
                      <span className="metric-value">{classroom.studentCount}</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Progresso Médio</span>
                      <span className="metric-value">{classroom.averageProgress}%</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Atividades Ativas</span>
                      <span className="metric-value">{classroom.activeActivities}</span>
                    </div>
                  </div>

                  <InteractiveButton
                    variant="primary"
                    size="md"
                    onClick={() => setSelectedClassroom(classroom)}
                    effects={{ ripple: true }}
                  >
                    Gerenciar Turma
                  </InteractiveButton>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Students View */}
        {activeView === 'students' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="teacher-dashboard__students-grid">
              {mockStudents.map((student) => (
                <div key={student.id} className="teacher-dashboard__student-detail-card">
                  <div className="header">
                    <div className="avatar">{student.name.charAt(0)}</div>
                    <div className="info">
                      <h4>{student.name}</h4>
                      <p>{student.age} anos</p>
                    </div>
                    {student.needsAttention && (
                      <span className="attention-badge">⚠️ Atenção</span>
                    )}
                  </div>

                  <div className="stats">
                    <ProgressRing
                      progress={student.progress}
                      size="md"
                      showPercentage
                    />

                    <div className="stats-grid">
                      <div className="stat">
                        <span className="stat-icon">⭐</span>
                        <span className="stat-value">{student.stars}</span>
                        <span className="stat-label">Estrelas</span>
                      </div>
                      <div className="stat">
                        <span className="stat-icon">🏆</span>
                        <span className="stat-value">{student.level}</span>
                        <span className="stat-label">Nível</span>
                      </div>
                      <div className="stat">
                        <span className="stat-icon">✅</span>
                        <span className="stat-value">{student.activitiesCompleted}</span>
                        <span className="stat-label">Atividades</span>
                      </div>
                    </div>
                  </div>

                  <div className="actions">
                    <InteractiveButton
                      variant="secondary"
                      size="sm"
                      onClick={() => console.log('Ver progresso', student.id)}
                    >
                      Ver Progresso
                    </InteractiveButton>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Activities View */}
        {activeView === 'activities' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="teacher-dashboard__activities-header">
              <h3>Atividades em Grupo</h3>
              <InteractiveButton
                variant="primary"
                size="md"
                icon="➕"
                effects={{ ripple: true, sound: true }}
              >
                Nova Atividade
              </InteractiveButton>
            </div>

            <div className="teacher-dashboard__activities-grid">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="teacher-dashboard__activity-card">
                  <div className="activity-header">
                    <h4>{activity.title}</h4>
                    <span className={`status-badge status-${activity.status}`}>
                      {activity.status === 'active' ? '🟢 Ativa' :
                       activity.status === 'completed' ? '✅ Concluída' : '⏸️ Pendente'}
                    </span>
                  </div>

                  <p className="activity-description">{activity.description}</p>

                  <div className="activity-meta">
                    <span className="meta-item">📚 {activity.type}</span>
                    <span className="meta-item">
                      {activity.difficulty === 'easy' ? '🟢' :
                       activity.difficulty === 'medium' ? '🟡' : '🔴'} {activity.difficulty}
                    </span>
                  </div>

                  <ProgressChart
                    current={activity.completed}
                    goal={activity.participants}
                    label="Participação"
                    color="var(--success)"
                  />

                  <div className="activity-footer">
                    <span className="due-date">
                      📅 {new Intl.DateTimeFormat('pt-BR').format(activity.dueDate)}
                    </span>
                    <InteractiveButton
                      variant="secondary"
                      size="sm"
                      onClick={() => console.log('Ver atividade', activity.id)}
                    >
                      Gerenciar
                    </InteractiveButton>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
