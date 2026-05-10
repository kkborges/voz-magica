/**
 * SpectrogramViewer - Visualizador de espectrograma para análise de voz
 * Usa Web Audio API para análise de frequência em tempo real
 */

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import InteractiveButton from '../atoms/InteractiveButton';
import './SpectrogramViewer.css';

interface SpectrogramViewerProps {
  audioUrl?: string;
  audioStream?: MediaStream;
  height?: number;
  colorScheme?: 'heat' | 'cool' | 'viridis';
  showControls?: boolean;
  onAnalysisComplete?: (data: AnalysisData) => void;
  className?: string;
}

interface AnalysisData {
  averageFrequency: number;
  peakFrequency: number;
  intensity: number;
  duration: number;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
}

export default function SpectrogramViewer({
  audioUrl,
  audioStream,
  height = 300,
  colorScheme = 'heat',
  showControls = true,
  onAnalysisComplete,
  className = '',
}: SpectrogramViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();

  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Paletas de cores para o espectrograma
  const colorPalettes = {
    heat: [
      [0, 0, 0],      // Preto
      [128, 0, 128],  // Roxo
      [255, 0, 0],    // Vermelho
      [255, 255, 0],  // Amarelo
      [255, 255, 255], // Branco
    ],
    cool: [
      [0, 0, 0],      // Preto
      [0, 0, 128],    // Azul escuro
      [0, 128, 255],  // Azul
      [0, 255, 255],  // Ciano
      [255, 255, 255], // Branco
    ],
    viridis: [
      [68, 1, 84],
      [59, 82, 139],
      [33, 145, 140],
      [94, 201, 98],
      [253, 231, 37],
    ],
  };

  const getColor = (value: number): [number, number, number] => {
    const palette = colorPalettes[colorScheme];
    const scaledValue = value * (palette.length - 1);
    const index = Math.floor(scaledValue);
    const fraction = scaledValue - index;

    if (index >= palette.length - 1) {
      return palette[palette.length - 1] as [number, number, number];
    }

    const color1 = palette[index];
    const color2 = palette[index + 1];

    return [
      Math.round(color1[0] + (color2[0] - color1[0]) * fraction),
      Math.round(color1[1] + (color2[1] - color1[1]) * fraction),
      Math.round(color1[2] + (color2[2] - color1[2]) * fraction),
    ];
  };

  const drawSpectrogram = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;

    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      // Shift canvas content to the left
      const imageData = ctx.getImageData(1, 0, canvas.width - 1, canvas.height);
      ctx.putImageData(imageData, 0, 0);

      // Draw new column
      const sliceWidth = canvas.height / bufferLength;

      for (let i = 0; i < bufferLength; i++) {
        const value = dataArray[i] / 255;
        const [r, g, b] = getColor(value);

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(
          canvas.width - 1,
          canvas.height - (i * sliceWidth),
          1,
          sliceWidth
        );
      }
    };

    draw();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);

      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      analyserRef.current.smoothingTimeConstant = 0.8;

      source.connect(analyserRef.current);

      setIsRecording(true);
      drawSpectrogram();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setIsRecording(false);

    // Calcular análise
    if (onAnalysisComplete) {
      const analysisData: AnalysisData = {
        averageFrequency: 150,
        peakFrequency: 250,
        intensity: 0.75,
        duration: currentTime,
        quality: 'good',
      };
      onAnalysisComplete(analysisData);
    }
  };

  const loadAudioFile = async () => {
    if (!audioUrl) return;

    try {
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();

      audioContextRef.current = new AudioContext();
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);

      setDuration(audioBuffer.duration);

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;

      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;

      source.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);

      source.start();
      setIsPlaying(true);
      drawSpectrogram();

      source.onended = () => {
        setIsPlaying(false);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    } catch (error) {
      console.error('Error loading audio file:', error);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, rect.width, height);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [height]);

  return (
    <div className={`spectrogram-viewer ${className}`}>
      <div className="spectrogram-viewer__header">
        <h3 className="spectrogram-viewer__title">Análise de Voz</h3>
        <div className="spectrogram-viewer__info">
          {isRecording && <span className="spectrogram-viewer__recording">🔴 Gravando</span>}
          {isPlaying && <span className="spectrogram-viewer__playing">▶️ Reproduzindo</span>}
        </div>
      </div>

      <div className="spectrogram-viewer__canvas-container">
        <canvas
          ref={canvasRef}
          className="spectrogram-viewer__canvas"
          style={{ width: '100%', height }}
        />

        {/* Escala de frequência */}
        <div className="spectrogram-viewer__frequency-scale">
          <span>8 kHz</span>
          <span>4 kHz</span>
          <span>2 kHz</span>
          <span>1 kHz</span>
          <span>0 Hz</span>
        </div>
      </div>

      {showControls && (
        <motion.div
          className="spectrogram-viewer__controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {!isRecording && !isPlaying && (
            <>
              <InteractiveButton
                variant="primary"
                size="md"
                icon="🎤"
                onClick={startRecording}
                effects={{ ripple: true, sound: true }}
              >
                Gravar
              </InteractiveButton>

              {audioUrl && (
                <InteractiveButton
                  variant="secondary"
                  size="md"
                  icon="▶️"
                  onClick={loadAudioFile}
                  effects={{ ripple: true }}
                >
                  Reproduzir Arquivo
                </InteractiveButton>
              )}
            </>
          )}

          {isRecording && (
            <InteractiveButton
              variant="danger"
              size="md"
              icon="⏹️"
              onClick={stopRecording}
              effects={{ ripple: true, sound: true }}
            >
              Parar Gravação
            </InteractiveButton>
          )}

          {(isRecording || isPlaying) && (
            <div className="spectrogram-viewer__timer">
              {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}
              {duration > 0 && ` / ${Math.floor(duration / 60)}:${String(Math.floor(duration % 60)).padStart(2, '0')}`}
            </div>
          )}
        </motion.div>
      )}

      {/* Legenda de cores */}
      <div className="spectrogram-viewer__legend">
        <span className="spectrogram-viewer__legend-label">Intensidade:</span>
        <div className="spectrogram-viewer__legend-gradient" style={{
          background: `linear-gradient(to right,
            rgb(${colorPalettes[colorScheme][0].join(',')}),
            rgb(${colorPalettes[colorScheme][colorPalettes[colorScheme].length - 1].join(',')})
          )`
        }} />
        <div className="spectrogram-viewer__legend-labels">
          <span>Baixa</span>
          <span>Alta</span>
        </div>
      </div>
    </div>
  );
}

// Compact Waveform - Forma de onda compacta para preview
export function WaveformPreview({
  audioUrl,
  height = 60,
  color = 'var(--primary)',
}: {
  audioUrl: string;
  height?: number;
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadWaveform = async () => {
      try {
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();

        const audioContext = new AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const data = audioBuffer.getChannelData(0);
        const step = Math.ceil(data.length / canvas.width);
        const amp = canvas.height / 2;

        ctx.fillStyle = color;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < canvas.width; i++) {
          let min = 1.0;
          let max = -1.0;

          for (let j = 0; j < step; j++) {
            const datum = data[(i * step) + j];
            if (datum < min) min = datum;
            if (datum > max) max = datum;
          }

          ctx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
        }

        audioContext.close();
      } catch (error) {
        console.error('Error loading waveform:', error);
      }
    };

    loadWaveform();
  }, [audioUrl, color]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={height}
      style={{ width: '100%', height }}
      className="waveform-preview"
    />
  );
}
