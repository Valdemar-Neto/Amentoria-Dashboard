import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { JSX } from 'react';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth();

  // 1. IMPORTANTE: Esperar o AuthContext ler o localStorage
  if (loading) {
    return <div className="flex items-center justify-center h-screen text-brand-600">Carregando...</div>;
  }

  // 2. Se não autenticado, volta pro Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. Se autenticado, libera o Dashboard
  return children;
}