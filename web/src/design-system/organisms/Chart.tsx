/**
 * Chart - Componentes de gráficos reutilizáveis
 * Usa canvas para performance otimizada
 */

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import './Chart.css';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface ChartProps {
  data: DataPoint[];
  type?: 'line' | 'bar' | 'area';
  height?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  animate?: boolean;
  color?: string;
  gradient?: boolean;
  className?: string;
}

export default function Chart({
  data,
  type = 'line',
  height = 300,
  showGrid = true,
  showLabels = true,
  animate = true,
  color = 'var(--primary)',
  gradient = false,
  className = '',
}: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (animate) {
      setProgress(0);
      const timer = setTimeout(() => setProgress(1), 100);
      return () => clearTimeout(timer);
    } else {
      setProgress(1);
    }
  }, [data, animate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const chartHeight = rect.height - (showLabels ? 40 : 20);
    const padding = 40;

    // Clear canvas
    ctx.clearRect(0, 0, width, rect.height);

    if (data.length === 0) return;

    // Encontrar valores min/max
    const values = data.map(d => d.value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values, 0);
    const range = maxValue - minValue || 1;

    // Desenhar grid
    if (showGrid) {
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;

      for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight - padding * 2) * (i / 5);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }
    }

    // Calcular pontos
    const points = data.map((d, i) => {
      const x = padding + ((width - padding * 2) / (data.length - 1 || 1)) * i;
      const normalizedValue = (d.value - minValue) / range;
      const y = chartHeight - padding - (chartHeight - padding * 2) * normalizedValue;
      return { x, y, value: d.value, label: d.label };
    });

    // Aplicar progresso da animação
    const visiblePoints = points.slice(0, Math.ceil(points.length * progress));

    if (type === 'bar') {
      // Desenhar barras
      const barWidth = (width - padding * 2) / data.length * 0.7;

      visiblePoints.forEach((point, i) => {
        const barHeight = chartHeight - padding - point.y;

        if (gradient) {
          const grad = ctx.createLinearGradient(0, point.y, 0, chartHeight - padding);
          grad.addColorStop(0, color);
          grad.addColorStop(1, color + '40');
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = data[i].color || color;
        }

        ctx.fillRect(
          point.x - barWidth / 2,
          point.y,
          barWidth,
          barHeight * progress
        );
      });
    } else if (type === 'area' || type === 'line') {
      // Desenhar área (se aplicável)
      if (type === 'area' && visiblePoints.length > 0) {
        ctx.beginPath();
        ctx.moveTo(visiblePoints[0].x, chartHeight - padding);

        visiblePoints.forEach(point => {
          ctx.lineTo(point.x, point.y);
        });

        ctx.lineTo(visiblePoints[visiblePoints.length - 1].x, chartHeight - padding);
        ctx.closePath();

        if (gradient) {
          const grad = ctx.createLinearGradient(0, 0, 0, chartHeight);
          grad.addColorStop(0, color + '40');
          grad.addColorStop(1, color + '00');
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = color + '20';
        }

        ctx.fill();
      }

      // Desenhar linha
      if (visiblePoints.length > 1) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(visiblePoints[0].x, visiblePoints[0].y);

        // Smooth curve usando quadratic bezier
        for (let i = 1; i < visiblePoints.length; i++) {
          const prev = visiblePoints[i - 1];
          const curr = visiblePoints[i];
          const cpx = (prev.x + curr.x) / 2;
          const cpy = (prev.y + curr.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, cpx, cpy);
        }

        const last = visiblePoints[visiblePoints.length - 1];
        ctx.lineTo(last.x, last.y);
        ctx.stroke();

        // Desenhar pontos
        visiblePoints.forEach(point => {
          ctx.fillStyle = '#fff';
          ctx.strokeStyle = color;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        });
      }
    }

    // Desenhar labels
    if (showLabels) {
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px var(--font-primary)';
      ctx.textAlign = 'center';

      points.forEach(point => {
        ctx.fillText(point.label, point.x, rect.height - 10);
      });
    }

  }, [data, progress, type, showGrid, showLabels, color, gradient]);

  return (
    <div className={`chart chart--${type} ${className}`}>
      <canvas ref={canvasRef} style={{ width: '100%', height }} />
    </div>
  );
}

// Progress Chart - Gráfico de progresso específico
export function ProgressChart({
  current,
  goal,
  label,
  color = 'var(--success)'
}: {
  current: number;
  goal: number;
  label: string;
  color?: string;
}) {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className="progress-chart">
      <div className="progress-chart__header">
        <span className="progress-chart__label">{label}</span>
        <span className="progress-chart__value">{current} / {goal}</span>
      </div>

      <div className="progress-chart__bar">
        <motion.div
          className="progress-chart__fill"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>

      <div className="progress-chart__percentage">
        {Math.round(percentage)}%
      </div>
    </div>
  );
}

// Donut Chart - Gráfico de rosca
export function DonutChart({
  segments,
  size = 200,
  thickness = 30,
  showLegend = true,
  centerContent,
}: {
  segments: Array<{ label: string; value: number; color: string }>;
  size?: number;
  thickness?: number;
  showLegend?: boolean;
  centerContent?: React.ReactNode;
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const radius = size / 2 - thickness / 2;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;

  return (
    <div className="donut-chart">
      <div className="donut-chart__svg-container" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          {segments.map((segment, index) => {
            const percentage = segment.value / total;
            const segmentLength = circumference * percentage;
            const offset = currentOffset;
            currentOffset += segmentLength;

            return (
              <motion.circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={thickness}
                strokeDasharray={`${segmentLength} ${circumference}`}
                strokeDashoffset={-offset}
                initial={{ strokeDasharray: `0 ${circumference}` }}
                animate={{ strokeDasharray: `${segmentLength} ${circumference}` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
              />
            );
          })}
        </svg>

        {centerContent && (
          <div className="donut-chart__center">
            {centerContent}
          </div>
        )}
      </div>

      {showLegend && (
        <div className="donut-chart__legend">
          {segments.map((segment, index) => (
            <div key={index} className="donut-chart__legend-item">
              <div
                className="donut-chart__legend-color"
                style={{ backgroundColor: segment.color }}
              />
              <span className="donut-chart__legend-label">{segment.label}</span>
              <span className="donut-chart__legend-value">
                {segment.value} ({Math.round((segment.value / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
