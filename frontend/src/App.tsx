import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DefaultLayout } from './layouts/DefaultLayout'; // Certifique-se de criar este arquivo!

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rotas Protegidas com Layout (Sidebar) */}
          <Route element={
            <ProtectedRoute>
              <DefaultLayout />
            </ProtectedRoute>
          }>
            {/* Todas as rotas aqui dentro herdarão a Sidebar automaticamente */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Futuras rotas: <Route path="/perfil" element={<Profile />} /> */}
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}