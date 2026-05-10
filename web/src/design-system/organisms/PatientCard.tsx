/**
 * PatientCard - Card de paciente para dashboards profissionais
 */

import { motion } from 'framer-motion';
import { useState } from 'react';
import ProgressRing from '../atoms/ProgressRing';
import './PatientCard.css';

export interface Patient {
  id: string;
  name: string;
  age: number;
  avatar?: string;
  diagnosis?: string;
  progress: number; // 0-100
  sessionsCompleted: number;
  totalSessions: number;
  lastSession?: Date;
  nextSession?: Date;
  stars: number;
  level: number;
  priority?: 'low' | 'medium' | 'high';
  notes?: string;
}

interface PatientCardProps {
  patient: Patient;
  onClick?: () => void;
  onSchedule?: () => void;
  onViewProgress?: () => void;
  compact?: boolean;
  showActions?: boolean;
  className?: string;
}

export default function PatientCard({
  patient,
  onClick,
  onSchedule,
  onViewProgress,
  compact = false,
  showActions = true,
  className = '',
}: PatientCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const priorityColors = {
    low: 'var(--success)',
    medium: 'var(--warning)',
    high: 'var(--error)',
  };

  const formatDate = (date?: Date) => {
    if (!date) return '-';
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).format(date);
  };

  return (
    <motion.div
      className={`patient-card ${compact ? 'patient-card--compact' : ''} ${className}`}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
      whileTap={{ scale: 0.98 }}
    >
      {patient.priority && (
        <div
          className="patient-card__priority"
          style={{ backgroundColor: priorityColors[patient.priority] }}
        />
      )}

      <div className="patient-card__header">
        <div className="patient-card__avatar">
          {patient.avatar ? (
            <img src={patient.avatar} alt={patient.name} />
          ) : (
            <div className="patient-card__avatar-placeholder">
              {patient.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="patient-card__info">
          <h3 className="patient-card__name">{patient.name}</h3>
          <p className="patient-card__age">{patient.age} anos</p>
          {patient.diagnosis && (
            <p className="patient-card__diagnosis">{patient.diagnosis}</p>
          )}
        </div>

        {!compact && (
          <ProgressRing
            progress={patient.progress}
            size="sm"
            showPercentage={false}
            icon="⭐"
          />
        )}
      </div>

      <div className="patient-card__stats">
        <div className="patient-card__stat">
          <span className="patient-card__stat-label">Sessões</span>
          <span className="patient-card__stat-value">
            {patient.sessionsCompleted}/{patient.totalSessions}
          </span>
        </div>

        <div className="patient-card__stat">
          <span className="patient-card__stat-label">Estrelas</span>
          <span className="patient-card__stat-value">⭐ {patient.stars}</span>
        </div>

        <div className="patient-card__stat">
          <span className="patient-card__stat-label">Nível</span>
          <span className="patient-card__stat-value">🏆 {patient.level}</span>
        </div>

        {!compact && (
          <div className="patient-card__stat">
            <span className="patient-card__stat-label">Progresso</span>
            <span className="patient-card__stat-value">{patient.progress}%</span>
          </div>
        )}
      </div>

      {!compact && (
        <div className="patient-card__dates">
          <div className="patient-card__date">
            <span className="patient-card__date-label">Última sessão</span>
            <span className="patient-card__date-value">
              {formatDate(patient.lastSession)}
            </span>
          </div>
          <div className="patient-card__date">
            <span className="patient-card__date-label">Próxima sessão</span>
            <span className="patient-card__date-value patient-card__date-value--next">
              {formatDate(patient.nextSession)}
            </span>
          </div>
        </div>
      )}

      {showActions && isHovered && (
        <motion.div
          className="patient-card__actions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <button
            className="patient-card__action"
            onClick={(e) => {
              e.stopPropagation();
              onViewProgress?.();
            }}
          >
            📊 Ver Progresso
          </button>
          <button
            className="patient-card__action"
            onClick={(e) => {
              e.stopPropagation();
              onSchedule?.();
            }}
          >
            📅 Agendar
          </button>
        </motion.div>
      )}

      {patient.notes && (
        <div className="patient-card__notes">
          <span className="patient-card__notes-icon">📝</span>
          <span className="patient-card__notes-text">{patient.notes}</span>
        </div>
      )}
    </motion.div>
  );
}

// Patient List - Lista de pacientes com filtros
export function PatientList({
  patients,
  onPatientClick,
  filter,
  sortBy = 'name',
}: {
  patients: Patient[];
  onPatientClick?: (patient: Patient) => void;
  filter?: string;
  sortBy?: 'name' | 'progress' | 'priority' | 'nextSession';
}) {
  const filteredAndSorted = patients
    .filter(p =>
      filter
        ? p.name.toLowerCase().includes(filter.toLowerCase()) ||
          p.diagnosis?.toLowerCase().includes(filter.toLowerCase())
        : true
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'progress':
          return b.progress - a.progress;
        case 'priority': {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return (
            (priorityOrder[b.priority || 'low'] || 0) -
            (priorityOrder[a.priority || 'low'] || 0)
          );
        }
        case 'nextSession':
          if (!a.nextSession) return 1;
          if (!b.nextSession) return -1;
          return a.nextSession.getTime() - b.nextSession.getTime();
        default:
          return 0;
      }
    });

  return (
    <div className="patient-list">
      {filteredAndSorted.map((patient, index) => (
        <motion.div
          key={patient.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <PatientCard
            patient={patient}
            onClick={() => onPatientClick?.(patient)}
          />
        </motion.div>
      ))}

      {filteredAndSorted.length === 0 && (
        <div className="patient-list__empty">
          <span className="patient-list__empty-icon">🔍</span>
          <p className="patient-list__empty-text">Nenhum paciente encontrado</p>
        </div>
      )}
    </div>
  );
}
