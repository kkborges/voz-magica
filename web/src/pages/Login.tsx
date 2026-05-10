/**
 * Login - Página de autenticação
 */

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import InteractiveButton from '@/design-system/atoms/InteractiveButton';
import './Login.css';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('child');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password, selectedRole);
    } catch (err) {
      setError('Email ou senha inválidos');
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = (role: UserRole) => {
    const credentials: Record<string, { email: string; password: string }> = {
      child: { email: 'child@test.com', password: 'senha123' },
      parent: { email: 'parent@test.com', password: 'senha123' },
      therapist: { email: 'therapist@test.com', password: 'senha123' },
      teacher: { email: 'teacher@test.com', password: 'senha123' },
      admin: { email: 'admin@test.com', password: 'senha123' },
    };

    if (role) {
      const cred = credentials[role];
      setEmail(cred.email);
      setPassword(cred.password);
      setSelectedRole(role);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__background" />

      <motion.div
        className="login-page__container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="login-page__logo">
          <span className="logo-icon">🎤</span>
          <h1 className="logo-text">Voz Mágica</h1>
          <p className="logo-subtitle">Desenvolvendo a Comunicação</p>
        </div>

        <form className="login-page__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label>Tipo de Acesso</label>
            <div className="role-selector">
              <button
                type="button"
                className={`role-btn ${selectedRole === 'child' ? 'active' : ''}`}
                onClick={() => setSelectedRole('child')}
              >
                👧 Criança
              </button>
              <button
                type="button"
                className={`role-btn ${selectedRole === 'parent' ? 'active' : ''}`}
                onClick={() => setSelectedRole('parent')}
              >
                👨 Pais
              </button>
              <button
                type="button"
                className={`role-btn ${selectedRole === 'therapist' ? 'active' : ''}`}
                onClick={() => setSelectedRole('therapist')}
              >
                👨‍⚕️ Fonoaudiólogo
              </button>
              <button
                type="button"
                className={`role-btn ${selectedRole === 'teacher' ? 'active' : ''}`}
                onClick={() => setSelectedRole('teacher')}
              >
                👩‍🏫 Professor
              </button>
              <button
                type="button"
                className={`role-btn ${selectedRole === 'admin' ? 'active' : ''}`}
                onClick={() => setSelectedRole('admin')}
              >
                👨‍💼 Admin
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ⚠️ {error}
            </motion.div>
          )}

          <InteractiveButton
            variant="magical"
            size="xl"
            type="submit"
            disabled={isLoading}
            effects={{ ripple: true, sound: true, glow: true }}
            className="login-btn"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </InteractiveButton>
        </form>

        <div className="login-page__quick-access">
          <p className="quick-access-title">Acesso Rápido (Demo)</p>
          <div className="quick-access-buttons">
            <button onClick={() => quickLogin('child')}>👧 Criança</button>
            <button onClick={() => quickLogin('parent')}>👨 Pais</button>
            <button onClick={() => quickLogin('therapist')}>👨‍⚕️ Fono</button>
            <button onClick={() => quickLogin('teacher')}>👩‍🏫 Prof</button>
            <button onClick={() => quickLogin('admin')}>👨‍💼 Admin</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
