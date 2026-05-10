/**
 * ClinicAdminDashboard - Dashboard para Administradores de Clínicas
 * Features: Gestão de profissionais, faturamento, BI, métricas de negócio
 */

import { motion } from 'framer-motion';
import { useState } from 'react';
import InteractiveButton from '@/design-system/atoms/InteractiveButton';
import Chart, { DonutChart, ProgressChart } from '@/design-system/organisms/Chart';
import { QuickActions } from '@/design-system/molecules/QuickActions';
import { StatCard } from '@/design-system/molecules/StatCard';
import DashboardLayout from '@/design-system/templates/DashboardLayout';
import './ClinicAdminDashboard.css';

// Interfaces
interface Professional {
  id: string;
  name: string;
  role: 'therapist' | 'teacher' | 'coordinator';
  avatar?: string;
  activePatients: number;
  sessionsThisMonth: number;
  revenue: number;
  rating: number;
  status: 'active' | 'inactive' | 'vacation';
}

interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface BillingRecord {
  id: string;
  patientName: string;
  amount: number;
  date: Date;
  status: 'paid' | 'pending' | 'overdue';
  professional: string;
}

// Mock data
const mockProfessionals: Professional[] = [
  {
    id: '1',
    name: 'Dr. Carlos Mendes',
    role: 'therapist',
    activePatients: 28,
    sessionsThisMonth: 87,
    revenue: 15400,
    rating: 4.9,
    status: 'active',
  },
  {
    id: '2',
    name: 'Dra. Ana Costa',
    role: 'therapist',
    activePatients: 32,
    sessionsThisMonth: 96,
    revenue: 18200,
    rating: 4.8,
    status: 'active',
  },
  {
    id: '3',
    name: 'Profa. Maria Santos',
    role: 'teacher',
    activePatients: 72,
    sessionsThisMonth: 45,
    revenue: 12500,
    rating: 4.7,
    status: 'active',
  },
  {
    id: '4',
    name: 'Dr. Pedro Silva',
    role: 'therapist',
    activePatients: 24,
    sessionsThisMonth: 68,
    revenue: 13800,
    rating: 4.6,
    status: 'vacation',
  },
];

const mockRevenueData: RevenueData[] = [
  { month: 'Jan', revenue: 45000, expenses: 28000, profit: 17000 },
  { month: 'Fev', revenue: 48000, expenses: 29000, profit: 19000 },
  { month: 'Mar', revenue: 52000, expenses: 30000, profit: 22000 },
  { month: 'Abr', revenue: 49000, expenses: 28500, profit: 20500 },
  { month: 'Mai', revenue: 59900, expenses: 31000, profit: 28900 },
];

const mockBillingRecords: BillingRecord[] = [
  {
    id: '1',
    patientName: 'Maria Silva',
    amount: 450,
    date: new Date('2026-05-10'),
    status: 'paid',
    professional: 'Dr. Carlos Mendes',
  },
  {
    id: '2',
    patientName: 'João Santos',
    amount: 380,
    date: new Date('2026-05-09'),
    status: 'pending',
    professional: 'Dra. Ana Costa',
  },
  {
    id: '3',
    patientName: 'Pedro Oliveira',
    amount: 520,
    date: new Date('2026-04-28'),
    status: 'overdue',
    professional: 'Dr. Carlos Mendes',
  },
];

export default function ClinicAdminDashboard() {
  const [activeView, setActiveView] = useState<'overview' | 'professionals' | 'billing' | 'analytics'>('overview');

  // Calcular estatísticas
  const stats = {
    totalProfessionals: mockProfessionals.filter(p => p.status === 'active').length,
    totalPatients: mockProfessionals.reduce((acc, p) => acc + p.activePatients, 0),
    monthlyRevenue: mockRevenueData[mockRevenueData.length - 1].revenue,
    monthlyProfit: mockRevenueData[mockRevenueData.length - 1].profit,
    pendingBilling: mockBillingRecords.filter(b => b.status === 'pending' || b.status === 'overdue').length,
  };

  const professionalDistribution = [
    {
      label: 'Fonoaudiólogos',
      value: mockProfessionals.filter(p => p.role === 'therapist').length,
      color: 'var(--primary)',
    },
    {
      label: 'Professores',
      value: mockProfessionals.filter(p => p.role === 'teacher').length,
      color: 'var(--accent)',
    },
    {
      label: 'Coordenadores',
      value: mockProfessionals.filter(p => p.role === 'coordinator').length,
      color: 'var(--info)',
    },
  ];

  const revenueChartData = mockRevenueData.map(d => ({
    label: d.month,
    value: d.revenue,
  }));

  const profitChartData = mockRevenueData.map(d => ({
    label: d.month,
    value: d.profit,
  }));

  const quickActions = [
    {
      icon: '➕',
      label: 'Novo Profissional',
      description: 'Cadastrar profissional',
      onClick: () => console.log('Novo profissional'),
      variant: 'primary' as const,
    },
    {
      icon: '💰',
      label: 'Faturamento',
      description: 'Gerenciar cobranças',
      onClick: () => setActiveView('billing'),
      variant: 'success' as const,
    },
    {
      icon: '📊',
      label: 'Relatório BI',
      description: 'Business Intelligence',
      onClick: () => setActiveView('analytics'),
      variant: 'secondary' as const,
    },
    {
      icon: '⚙️',
      label: 'Configurações',
      description: 'Configurar clínica',
      onClick: () => console.log('Configurações'),
      variant: 'fun' as const,
    },
  ];

  return (
    <DashboardLayout
      userRole="admin"
      userName="Dr. Roberto Admin"
      userAvatar="👨‍💼"
    >
      <div className="clinic-admin-dashboard">
        {/* Header */}
        <div className="clinic-admin-dashboard__header">
          <div>
            <h1 className="clinic-admin-dashboard__title">Dashboard Administrador</h1>
            <p className="clinic-admin-dashboard__subtitle">
              Gestão completa da clínica e métricas de negócio
            </p>
          </div>

          <div className="clinic-admin-dashboard__nav">
            <button
              className={`clinic-admin-dashboard__nav-btn ${activeView === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveView('overview')}
            >
              📊 Visão Geral
            </button>
            <button
              className={`clinic-admin-dashboard__nav-btn ${activeView === 'professionals' ? 'active' : ''}`}
              onClick={() => setActiveView('professionals')}
            >
              👥 Profissionais
            </button>
            <button
              className={`clinic-admin-dashboard__nav-btn ${activeView === 'billing' ? 'active' : ''}`}
              onClick={() => setActiveView('billing')}
            >
              💰 Faturamento
            </button>
            <button
              className={`clinic-admin-dashboard__nav-btn ${activeView === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveView('analytics')}
            >
              📈 Analytics
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
            <div className="clinic-admin-dashboard__stats">
              <StatCard
                title="Faturamento do Mês"
                value={`R$ ${(stats.monthlyRevenue / 1000).toFixed(1)}k`}
                icon="💰"
                trend={{ value: 12, direction: 'up' }}
                color="var(--success)"
              />
              <StatCard
                title="Lucro Líquido"
                value={`R$ ${(stats.monthlyProfit / 1000).toFixed(1)}k`}
                icon="📈"
                trend={{ value: 8, direction: 'up' }}
                color="var(--primary)"
              />
              <StatCard
                title="Profissionais Ativos"
                value={stats.totalProfessionals}
                icon="👥"
                subtitle={`${stats.totalPatients} pacientes`}
                color="var(--info)"
              />
              <StatCard
                title="Cobranças Pendentes"
                value={stats.pendingBilling}
                icon="⚠️"
                subtitle="Requer atenção"
                color="var(--warning)"
              />
            </div>

            {/* Quick Actions */}
            <QuickActions actions={quickActions} />

            {/* Charts Grid */}
            <div className="clinic-admin-dashboard__grid">
              {/* Faturamento */}
              <div className="clinic-admin-dashboard__card">
                <h3 className="clinic-admin-dashboard__card-title">Faturamento Mensal</h3>
                <Chart
                  data={revenueChartData}
                  type="bar"
                  height={280}
                  color="var(--success)"
                  gradient
                />
                <div className="clinic-admin-dashboard__chart-summary">
                  <div className="summary-item">
                    <span className="label">Média</span>
                    <span className="value">
                      R$ {(mockRevenueData.reduce((acc, d) => acc + d.revenue, 0) / mockRevenueData.length / 1000).toFixed(1)}k
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Maior</span>
                    <span className="value">
                      R$ {(Math.max(...mockRevenueData.map(d => d.revenue)) / 1000).toFixed(1)}k
                    </span>
                  </div>
                </div>
              </div>

              {/* Lucro */}
              <div className="clinic-admin-dashboard__card">
                <h3 className="clinic-admin-dashboard__card-title">Lucro Mensal</h3>
                <Chart
                  data={profitChartData}
                  type="area"
                  height={280}
                  color="var(--primary)"
                  gradient
                />
                <div className="clinic-admin-dashboard__chart-summary">
                  <div className="summary-item">
                    <span className="label">Margem</span>
                    <span className="value">
                      {Math.round((stats.monthlyProfit / stats.monthlyRevenue) * 100)}%
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Crescimento</span>
                    <span className="value success">+12%</span>
                  </div>
                </div>
              </div>

              {/* Distribuição de Profissionais */}
              <div className="clinic-admin-dashboard__card">
                <h3 className="clinic-admin-dashboard__card-title">Equipe</h3>
                <DonutChart
                  segments={professionalDistribution}
                  size={220}
                  thickness={35}
                  centerContent={
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                        {mockProfessionals.length}
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
                        Profissionais
                      </div>
                    </div>
                  }
                />
              </div>

              {/* Top Performers */}
              <div className="clinic-admin-dashboard__card">
                <h3 className="clinic-admin-dashboard__card-title">Top Performers</h3>
                <div className="clinic-admin-dashboard__top-performers">
                  {mockProfessionals
                    .sort((a, b) => b.revenue - a.revenue)
                    .slice(0, 3)
                    .map((prof, index) => (
                      <div key={prof.id} className="performer-item">
                        <div className="rank">#{index + 1}</div>
                        <div className="info">
                          <h4>{prof.name}</h4>
                          <p>{prof.sessionsThisMonth} sessões</p>
                        </div>
                        <div className="revenue">
                          R$ {(prof.revenue / 1000).toFixed(1)}k
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Professionals View */}
        {activeView === 'professionals' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="clinic-admin-dashboard__professionals-header">
              <h3>Gestão de Profissionais</h3>
              <InteractiveButton
                variant="primary"
                size="md"
                icon="➕"
                effects={{ ripple: true, sound: true }}
              >
                Novo Profissional
              </InteractiveButton>
            </div>

            <div className="clinic-admin-dashboard__professionals-grid">
              {mockProfessionals.map((prof) => (
                <div key={prof.id} className="clinic-admin-dashboard__professional-card">
                  <div className="header">
                    <div className="avatar">{prof.name.charAt(0)}</div>
                    <div className="info">
                      <h4>{prof.name}</h4>
                      <p className={`role role-${prof.role}`}>
                        {prof.role === 'therapist' ? 'Fonoaudiólogo' :
                         prof.role === 'teacher' ? 'Professor' : 'Coordenador'}
                      </p>
                    </div>
                    <span className={`status-badge status-${prof.status}`}>
                      {prof.status === 'active' ? '🟢 Ativo' :
                       prof.status === 'vacation' ? '🌴 Férias' : '⚫ Inativo'}
                    </span>
                  </div>

                  <div className="stats-grid">
                    <div className="stat">
                      <span className="stat-label">Pacientes</span>
                      <span className="stat-value">{prof.activePatients}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Sessões/Mês</span>
                      <span className="stat-value">{prof.sessionsThisMonth}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Receita</span>
                      <span className="stat-value">R$ {(prof.revenue / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Avaliação</span>
                      <span className="stat-value">⭐ {prof.rating}</span>
                    </div>
                  </div>

                  <div className="actions">
                    <InteractiveButton variant="secondary" size="sm">
                      Ver Detalhes
                    </InteractiveButton>
                    <InteractiveButton variant="secondary" size="sm">
                      Agenda
                    </InteractiveButton>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Billing View */}
        {activeView === 'billing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="clinic-admin-dashboard__billing-header">
              <h3>Gestão de Faturamento</h3>
              <div className="billing-summary">
                <div className="summary-card paid">
                  <span className="label">Recebido</span>
                  <span className="value">
                    R$ {mockBillingRecords
                      .filter(b => b.status === 'paid')
                      .reduce((acc, b) => acc + b.amount, 0)
                      .toLocaleString()}
                  </span>
                </div>
                <div className="summary-card pending">
                  <span className="label">Pendente</span>
                  <span className="value">
                    R$ {mockBillingRecords
                      .filter(b => b.status === 'pending')
                      .reduce((acc, b) => acc + b.amount, 0)
                      .toLocaleString()}
                  </span>
                </div>
                <div className="summary-card overdue">
                  <span className="label">Atrasado</span>
                  <span className="value">
                    R$ {mockBillingRecords
                      .filter(b => b.status === 'overdue')
                      .reduce((acc, b) => acc + b.amount, 0)
                      .toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="clinic-admin-dashboard__billing-table">
              <table>
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>Profissional</th>
                    <th>Valor</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBillingRecords.map((record) => (
                    <tr key={record.id}>
                      <td>{record.patientName}</td>
                      <td>{record.professional}</td>
                      <td className="amount">R$ {record.amount.toLocaleString()}</td>
                      <td>{new Intl.DateTimeFormat('pt-BR').format(record.date)}</td>
                      <td>
                        <span className={`status-tag status-${record.status}`}>
                          {record.status === 'paid' ? '✅ Pago' :
                           record.status === 'pending' ? '⏳ Pendente' : '⚠️ Atrasado'}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn">Ver</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Analytics View */}
        {activeView === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="clinic-admin-dashboard__analytics-title">Business Intelligence</h3>

            <div className="clinic-admin-dashboard__analytics-grid">
              {/* KPIs */}
              <div className="clinic-admin-dashboard__card analytics-card">
                <h4>KPIs Principais</h4>
                <div className="kpis">
                  <ProgressChart
                    current={stats.monthlyRevenue}
                    goal={65000}
                    label="Meta de Faturamento"
                    color="var(--success)"
                  />
                  <ProgressChart
                    current={stats.totalPatients}
                    goal={200}
                    label="Meta de Pacientes"
                    color="var(--primary)"
                  />
                  <ProgressChart
                    current={stats.totalProfessionals}
                    goal={8}
                    label="Meta de Profissionais"
                    color="var(--info)"
                  />
                </div>
              </div>

              {/* Projeções */}
              <div className="clinic-admin-dashboard__card analytics-card">
                <h4>Projeções</h4>
                <div className="projections">
                  <div className="projection-item">
                    <span className="projection-label">Faturamento Anual Projetado</span>
                    <span className="projection-value success">R$ 720k</span>
                    <span className="projection-trend">+15% vs ano anterior</span>
                  </div>
                  <div className="projection-item">
                    <span className="projection-label">Crescimento de Pacientes</span>
                    <span className="projection-value info">+45 pacientes/mês</span>
                    <span className="projection-trend">Tendência positiva</span>
                  </div>
                  <div className="projection-item">
                    <span className="projection-label">ROI de Marketing</span>
                    <span className="projection-value primary">320%</span>
                    <span className="projection-trend">Acima da meta (250%)</span>
                  </div>
                </div>
              </div>

              {/* Insights */}
              <div className="clinic-admin-dashboard__card analytics-card full-width">
                <h4>Insights & Recomendações</h4>
                <div className="insights">
                  <div className="insight-item success">
                    <span className="insight-icon">✅</span>
                    <div className="insight-content">
                      <h5>Excelente Performance</h5>
                      <p>Faturamento 12% acima da meta. Continue investindo em marketing digital.</p>
                    </div>
                  </div>
                  <div className="insight-item warning">
                    <span className="insight-icon">⚠️</span>
                    <div className="insight-content">
                      <h5>Atenção: Cobranças Atrasadas</h5>
                      <p>R$ 520 em cobranças atrasadas. Implementar sistema de cobrança automática.</p>
                    </div>
                  </div>
                  <div className="insight-item info">
                    <span className="insight-icon">💡</span>
                    <div className="insight-content">
                      <h5>Oportunidade de Expansão</h5>
                      <p>Demanda 18% acima da capacidade. Considere contratar mais um profissional.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
