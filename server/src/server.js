/**
 * Servidor backend simples para Voz Mágica
 * Fornece endpoints para funcionalidades avançadas
 */

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Rotas
import profileRoutes from './routes/profileRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/', (req, res) => {
  res.json({
    message: '🎤 Voz Mágica API - Funcionando!',
    version: '1.0.0',
    status: 'online',
    endpoints: {
      profiles: '/api/profiles',
      progress: '/api/progress',
      achievements: '/api/achievements',
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Rotas da API
app.use('/api/profiles', profileRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/achievements', achievementRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🎤 Voz Mágica - Backend Server      ║
║   Servidor rodando em:                 ║
║   http://localhost:${PORT}              ║
╚════════════════════════════════════════╝
  `);
});

export default app;
