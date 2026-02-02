import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DefaultLayout } from './layouts/DefaultLayout'; 
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Toaster } from 'sonner';
import { Simulados } from './pages/Simulados';
import { Cronograma } from './pages/Cronogra';
import { Materiais } from './pages/Materiais';
import { Configuracoes } from './pages/Config';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Toaster position="top-right" richColors theme="dark" 
            toastOptions={{
              style:{
                background:'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white'
              },

              className:'glass-pannel'
            }}/>
          <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Rotas Protegidas com Layout */}
            <Route element={
              <ProtectedRoute>
                <DefaultLayout />
              </ProtectedRoute>
            }>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/simulados" element={<Simulados/>} />
              <Route path="/cronograma" element={<Cronograma/>} />
              <Route path='/materiais' element={<Materiais/>} />
              <Route path='/configuracoes' element={<Configuracoes/>} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}