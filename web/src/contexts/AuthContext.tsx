/**
 * AuthContext - Contexto de autenticação e controle de acesso
 * Gerencia usuário logado e perfil de acesso
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'child' | 'parent' | 'therapist' | 'teacher' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Carrega usuário do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('@VozMagica:user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Simulação de login - em produção, fazer requisição à API
    const mockUsers: Record<string, User> = {
      'child@test.com': {
        id: '1',
        name: 'Maria',
        email: 'child@test.com',
        role: 'child',
        avatar: '👧',
      },
      'parent@test.com': {
        id: '2',
        name: 'Roberto Silva',
        email: 'parent@test.com',
        role: 'parent',
        avatar: '👨',
      },
      'therapist@test.com': {
        id: '3',
        name: 'Dr. Carlos Mendes',
        email: 'therapist@test.com',
        role: 'therapist',
        avatar: '👨‍⚕️',
      },
      'teacher@test.com': {
        id: '4',
        name: 'Profa. Maria Santos',
        email: 'teacher@test.com',
        role: 'teacher',
        avatar: '👩‍🏫',
      },
      'admin@test.com': {
        id: '5',
        name: 'Dr. Roberto Admin',
        email: 'admin@test.com',
        role: 'admin',
        avatar: '👨‍💼',
      },
    };

    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    const authenticatedUser = mockUsers[email];

    if (authenticatedUser && password === 'senha123') {
      setUser(authenticatedUser);
      localStorage.setItem('@VozMagica:user', JSON.stringify(authenticatedUser));
    } else {
      throw new Error('Credenciais inválidas');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('@VozMagica:user');
  };

  const switchRole = (role: UserRole) => {
    if (user && role) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('@VozMagica:user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
