/**
 * TherapistDashboard - Dashboard completo para Fonoaudiólogos
 * Features: Gestão de pacientes, análise de voz, prescrição de exercícios, relatórios
 */

import { motion } from 'framer-motion';
import { useState } from 'react';
import InteractiveButton from '@/design-system/atoms/InteractiveButton';
import { ProgressRing } from '@/design-system/atoms/ProgressRing';
import { LevelBadge } from '@/design-system/atoms/ScoreCounter';
import Chart, { DonutChart, ProgressChart } from '@/design-system/organisms/Chart';
import PatientCard, { Patient, PatientList } from '@/design-system/organisms/PatientCard';
import SpectrogramViewer from '@/design-system/organisms/SpectrogramViewer';
import { QuickActions } from '@/design-system/molecules/QuickActions';
import { StatCard } from '@/design-system/molecules/StatCard';
import DashboardLayout from '@/design-system/templates/DashboardLayout';
import './TherapistDashboard.css';

// Mock data - será substituído por dados reais da API
const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Maria Silva',
    age: 6,
    diagnosis: 'Dislalia',
    progress: 75,
    sessionsCompleted: 12,
    totalSessions: 16,
    lastSession: new Date('2026-05-08'),
    nextSession: new Date('2026-05-12'),
    stars: 145,
    level: 8,
    priority: 'medium',
    notes: 'Ótimo progresso no som /r/',
  },
  {
    id: '2',
    name: 'João Santos',
    age: 7,
    diagnosis: 'Gagueira',
    progress: 45,
    sessionsCompleted: 8,
    totalSessions: 20,
    lastSession: new Date('2026-05-09'),
    nextSession: new Date('2026-05-11'),
    stars: 98,
    level: 5,
    priority: 'high',
    notes: 'Precisa de mais prática de fluência',
  },
  {
    id: '3',
    name: 'Ana Costa',
    age: 5,
    diagnosis: 'Atraso de Linguagem',
    progress: 60,
    sessionsCompleted: 15,
    totalSessions: 24,
    lastSession: new Date('2026-05-07'),
    nextSession: new Date('2026-05-13'),
    stars: 203,
    level: 10,
    priority: 'low',
  },
  {
    id: '4',
    name: 'Pedro Oliveira',
    age: 8,
    diagnosis: 'Distúrbio Fonológico',
    progress: 85,
    sessionsCompleted: 20,
    totalSessions: 24,
    lastSession: new Date('2026-05-10'),
    nextSession: new Date('2026-05-14'),
    stars: 312,
    level: 14,
    priority: 'low',
  },
];

export default function TherapistDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeView, setActiveView] = useState<'overview' | 'patients' | 'analysis' | 'prescription'>('overview');
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'priority' | 'nextSession'>('nextSession');

  // Estatísticas gerais
  const stats = {
    totalPatients: mockPatients.length,
    activeToday: 3,
    averageProgress: Math.round(
      mockPatients.reduce((acc, p) => acc + p.progress, 0) / mockPatients.length
    ),
    completionRate: 78,
  };

  // Dados para gráficos
  const weeklySessionsData = [
    { label: 'Seg', value: 8 },
    { label: 'Ter', value: 12 },
    { label: 'Qua', value: 10 },
    { label: 'Qui', value: 15 },
    { label: 'Sex', value: 11 },
    { label: 'Sáb', value: 5 },
    { label: 'Dom', value: 2 },
  ];

  const diagnosisDistribution = [
    { label: 'Dislalia', value: 35, color: 'var(--primary)' },
    { label: 'Gagueira', value: 25, color: 'var(--accent)' },
    { label: 'Atraso de Linguagem', value: 20, color: 'var(--success)' },
    { label: 'Distúrbio Fonológico', value: 15, color: 'var(--warning)' },
    { label: 'Outros', value: 5, color: 'var(--info)' },
  ];

  const quickActions = [
    {
      icon: '📅',
      label: 'Agendar Sessão',
      description: 'Agendar nova sessão',
      onClick: () => console.log('Agendar'),
      variant: 'primary' as const,
    },
    {
      icon: '📋',
      label: 'Prescrever Exercícios',
      description: 'Criar plano de exercícios',
      onClick: () => setActiveView('prescription'),
      variant: 'secondary' as const,
    },
    {
      icon: '📊',
      label: 'Relatórios',
      description: 'Gerar relatório de progresso',
      onClick: () => console.log('Relatórios'),
      variant: 'success' as const,
    },
    {
      icon: '🎤',
      label: 'Análise de Voz',
      description: 'Analisar gravação de voz',
      onClick: () => setActiveView('analysis'),
      variant: 'fun' as const,
    },
  ];

  return (
    <DashboardLayout
      userRole="therapist"
      userName="Dr. Carlos Mendes"
      userAvatar="👨‍⚕️"
    >
      <div className="therapist-dashboard">
        {/* Header com navegação */}
        <div className="therapist-dashboard__header">
          <div>
            <h1 className="therapist-dashboard__title">Dashboard Fonoaudiólogo</h1>
            <p className="therapist-dashboard__subtitle">
              Gerencie seus pacientes e acompanhe o progresso terapêutico
            </p>
          </div>

          <div className="therapist-dashboard__nav">
            <button
              className={`therapist-dashboard__nav-btn ${activeView === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveView('overview')}
            >
              📊 Visão Geral
            </button>
            <button
              className={`therapist-dashboard__nav-btn ${activeView === 'patients' ? 'active' : ''}`}
              onClick={() => setActiveView('patients')}
            >
              👥 Pacientes
            </button>
            <button
              className={`therapist-dashboard__nav-btn ${activeView === 'analysis' ? 'active' : ''}`}
              onClick={() => setActiveView('analysis')}
            >
              🎤 Análise de Voz
            </button>
            <button
              className={`therapist-dashboard__nav-btn ${activeView === 'prescription' ? 'active' : ''}`}
              onClick={() => setActiveView('prescription')}
            >
              📋 Prescrição
            </button>
          </div>
        </div>

        {/* Visão Geral */}
        {activeView === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="therapist-dashboard__overview"
          >
            {/* Estatísticas */}
            <div className="therapist-dashboard__stats">
              <StatCard
                title="Total de Pacientes"
                value={stats.totalPatients}
                icon="👥"
                trend={{ value: 12, direction: 'up' }}
                color="var(--primary)"
              />
              <StatCard
                title="Sessões Hoje"
                value={stats.activeToday}
                icon="📅"
                subtitle="3 agendadas"
                color="var(--accent)"
              />
              <StatCard
                title="Progresso Médio"
                value={`${stats.averageProgress}%`}
                icon="📈"
                trend={{ value: 8, direction: 'up' }}
                color="var(--success)"
              />
              <StatCard
                title="Taxa de Conclusão"
                value={`${stats.completionRate}%`}
                icon="✅"
                trend={{ value: 5, direction: 'up' }}
                color="var(--info)"
              />
            </div>

            {/* Quick Actions */}
            <QuickActions actions={quickActions} />

            {/* Gráficos e Pacientes */}
            <div className="therapist-dashboard__grid">
              {/* Sessões da Semana */}
              <div className="therapist-dashboard__card">
                <h3 className="therapist-dashboard__card-title">Sessões desta Semana</h3>
                <Chart
                  data={weeklySessionsData}
                  type="bar"
                  height={250}
                  color="var(--primary)"
                  gradient
                />
              </div>

              {/* Distribuição de Diagnósticos */}
              <div className="therapist-dashboard__card">
                <h3 className="therapist-dashboard__card-title">Distribuição de Diagnósticos</h3>
                <DonutChart
                  segments={diagnosisDistribution}
                  size={220}
                  thickness={35}
                  centerContent={
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                        {stats.totalPatients}
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
                        Pacientes
                      </div>
                    </div>
                  }
                />
              </div>

              {/* Próximas Sessões */}
              <div className="therapist-dashboard__card therapist-dashboard__card--full">
                <h3 className="therapist-dashboard__card-title">Próximas Sessões</h3>
                <div className="therapist-dashboard__upcoming">
                  {mockPatients
                    .filter(p => p.nextSession)
                    .sort((a, b) =>
                      (a.nextSession?.getTime() || 0) - (b.nextSession?.getTime() || 0)
                    )
                    .slice(0, 4)
                    .map((patient) => (
                      <PatientCard
                        key={patient.id}
                        patient={patient}
                        compact
                        onClick={() => setSelectedPatient(patient)}
                      />
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Lista de Pacientes */}
        {activeView === 'patients' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="therapist-dashboard__patients"
          >
            <div className="therapist-dashboard__filters">
              <input
                type="text"
                placeholder="Buscar paciente..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="therapist-dashboard__search"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="therapist-dashboard__sort"
              >
                <option value="name">Nome</option>
                <option value="progress">Progresso</option>
                <option value="priority">Prioridade</option>
                <option value="nextSession">Próxima Sessão</option>
              </select>
            </div>

            <PatientList
              patients={mockPatients}
              onPatientClick={setSelectedPatient}
              filter={searchFilter}
              sortBy={sortBy}
            />
          </motion.div>
        )}

        {/* Análise de Voz */}
        {activeView === 'analysis' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="therapist-dashboard__analysis"
          >
            <SpectrogramViewer
              height={350}
              colorScheme="viridis"
              showControls
              onAnalysisComplete={(data) => {
                console.log('Análise completa:', data);
              }}
            />

            <div className="therapist-dashboard__analysis-info">
              <h3>Como usar a Análise de Voz</h3>
              <ul>
                <li>🎤 Clique em "Gravar" para iniciar a captura de áudio em tempo real</li>
                <li>📊 O espectrograma mostra frequências de 0 a 8 kHz no eixo vertical</li>
                <li>🎨 Cores mais quentes indicam maior intensidade sonora</li>
                <li>⏹️ Clique em "Parar" para finalizar e obter a análise automática</li>
                <li>💾 Gravações podem ser salvas e comparadas ao longo do tempo</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Prescrição de Exercícios */}
        {activeView === 'prescription' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="therapist-dashboard__prescription"
          >
            <div className="therapist-dashboard__card">
              <h3 className="therapist-dashboard__card-title">Prescrever Exercícios</h3>

              <div className="therapist-dashboard__form">
                <div className="therapist-dashboard__form-group">
                  <label>Paciente</label>
                  <select className="therapist-dashboard__select">
                    <option value="">Selecione um paciente</option>
                    {mockPatients.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="therapist-dashboard__form-group">
                  <label>Tipo de Exercício</label>
                  <select className="therapist-dashboard__select">
                    <option value="phoneme">Exercício Fonêmico</option>
                    <option value="fluency">Exercício de Fluência</option>
                    <option value="articulation">Exercício de Articulação</option>
                    <option value="breathing">Exercício Respiratório</option>
                    <option value="vocabulary">Exercício de Vocabulário</option>
                  </select>
                </div>

                <div className="therapist-dashboard__form-group">
                  <label>Dificuldade</label>
                  <select className="therapist-dashboard__select">
                    <option value="easy">Fácil</option>
                    <option value="medium">Médio</option>
                    <option value="hard">Difícil</option>
                  </select>
                </div>

                <div className="therapist-dashboard__form-group">
                  <label>Duração (minutos/dia)</label>
                  <input type="number" className="therapist-dashboard__input" defaultValue={15} />
                </div>

                <div className="therapist-dashboard__form-group">
                  <label>Frequência (dias/semana)</label>
                  <input type="number" className="therapist-dashboard__input" defaultValue={5} />
                </div>

                <div className="therapist-dashboard__form-group therapist-dashboard__form-group--full">
                  <label>Observações</label>
                  <textarea
                    className="therapist-dashboard__textarea"
                    rows={4}
                    placeholder="Instruções específicas para o exercício..."
                  />
                </div>

                <div className="therapist-dashboard__form-actions">
                  <InteractiveButton
                    variant="primary"
                    size="lg"
                    icon="✅"
                    effects={{ ripple: true, sound: true, confetti: true }}
                  >
                    Prescrever Exercício
                  </InteractiveButton>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
