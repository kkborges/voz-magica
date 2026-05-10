/**
 * Componente principal do aplicativo Voz Mágica
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAppStore } from './stores/useAppStore';

import Home from './pages/Home';
import Profile from './pages/Profile';
import GamePlay from './pages/GamePlay';
import Login from './pages/Login';

// Dashboards Enterprise
import {
  TherapistDashboard,
  TeacherDashboard,
  ClinicAdminDashboard,
  ParentDashboard,
  ChildGameDashboard,
} from './pages/dashboards';

import './styles/globals.css';

function App() {
  const { currentProfile } = useAppStore();

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rota de Login/Autenticação */}
          <Route path="/login" element={<Login />} />

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

          {/* Dashboards Enterprise - Rotas profissionais */}
          <Route path="/dashboard/therapist" element={<TherapistDashboard />} />
          <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
          <Route path="/dashboard/admin" element={<ClinicAdminDashboard />} />
          <Route path="/dashboard/parent" element={<ParentDashboard />} />
          <Route path="/dashboard/child" element={<ChildGameDashboard />} />

          {/* Rotas de progresso e conquistas */}
          <Route
            path="/progress"
            element={
              currentProfile ? (
                <ParentDashboard />
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
            element={<ParentDashboard />}
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
    </AuthProvider>
  );
}

export default App;
