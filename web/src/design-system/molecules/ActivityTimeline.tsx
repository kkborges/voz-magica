/**
 * ActivityTimeline - Timeline de atividades para dashboards
 * Mostra histórico de ações e eventos
 */

import { motion } from 'framer-motion';
import './ActivityTimeline.css';

export interface Activity {
  id: string;
  icon: string;
  iconVariant?: 'success' | 'warning' | 'info' | 'error' | 'primary';
  title: string;
  description: string;
  time: string;
  badge?: {
    label: string;
    variant?: 'success' | 'warning' | 'info' | 'error';
  };
}

interface ActivityTimelineProps {
  title?: string;
  activities: Activity[];
  onViewAll?: () => void;
  onActivityClick?: (activity: Activity) => void;
  className?: string;
}

export default function ActivityTimeline({
  title = 'Atividades Recentes',
  activities,
  onViewAll,
  onActivityClick,
  className = '',
}: ActivityTimelineProps) {
  if (activities.length === 0) {
    return (
      <div className={`activity-timeline ${className}`}>
        <div className="activity-timeline__header">
          <h3 className="activity-timeline__title">{title}</h3>
        </div>
        <div className="activity-timeline__empty">
          <div className="activity-timeline__empty-icon">📭</div>
          <div className="activity-timeline__empty-text">
            Nenhuma atividade recente
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`activity-timeline ${className}`}>
      <div className="activity-timeline__header">
        <h3 className="activity-timeline__title">{title}</h3>
        {onViewAll && (
          <button
            className="activity-timeline__view-all"
            onClick={onViewAll}
          >
            Ver todas →
          </button>
        )}
      </div>

      <div className="activity-timeline__list">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="activity-timeline__item"
            onClick={() => onActivityClick?.(activity)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 4 }}
          >
            <div className="activity-timeline__icon-wrapper">
              <motion.div
                className={`activity-timeline__icon ${
                  activity.iconVariant
                    ? `activity-timeline__icon--${activity.iconVariant}`
                    : ''
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 + 0.1, type: 'spring' }}
              >
                {activity.icon}
              </motion.div>
              <div className="activity-timeline__line" />
            </div>

            <div className="activity-timeline__content">
              <div className="activity-timeline__title-text">
                {activity.title}
              </div>
              <div className="activity-timeline__description">
                {activity.description}
              </div>
              <div className="activity-timeline__meta">
                <span className="activity-timeline__time">
                  <span>🕐</span>
                  <span>{activity.time}</span>
                </span>
                {activity.badge && (
                  <span
                    className={`activity-timeline__badge ${
                      activity.badge.variant
                        ? `activity-timeline__badge--${activity.badge.variant}`
                        : ''
                    }`}
                  >
                    {activity.badge.label}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
