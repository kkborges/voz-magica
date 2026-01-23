/**
 * Componente principal do aplicativo Voz Mágica
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './stores/useAppStore';

import Home from './pages/Home';
import Profile from './pages/Profile';
import GamePlay from './pages/GamePlay';

import './styles/globals.css';

function App() {
  const { currentProfile } = useAppStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota de criação/seleção de perfil */}
        <Route path="/profile" element={<Profile />} />

        {/* Rotas protegidas (requerem perfil) */}
        <Route
          path="/"
          element={currentProfile ? <Home /> : <Navigate to="/profile" />}
        />

        <Route
          path="/game/:gameId"
          element={currentProfile ? <GamePlay /> : <Navigate to="/profile" />}
        />

        {/* Rotas futuras */}
        <Route
          path="/progress"
          element={
            currentProfile ? (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>📊 Progresso</h1>
                <p>Em desenvolvimento...</p>
              </div>
            ) : (
              <Navigate to="/profile" />
            )
          }
        />

        <Route
          path="/achievements"
          element={
            currentProfile ? (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>🏆 Conquistas</h1>
                <p>Em desenvolvimento...</p>
              </div>
            ) : (
              <Navigate to="/profile" />
            )
          }
        />

        <Route
          path="/parent-panel"
          element={
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h1>👨‍👩‍👧 Painel dos Pais</h1>
              <p>Em desenvolvimento...</p>
            </div>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h1>404 - Página não encontrada</h1>
              <a href="/">Voltar para o início</a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
