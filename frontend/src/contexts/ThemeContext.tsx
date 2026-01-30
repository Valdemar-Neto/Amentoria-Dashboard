import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // 1. Tenta pegar do localStorage ou usa 'dark' como padrão
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('@Amentoria:theme');
    return (storedTheme as Theme) || 'dark';
  });

  // 2. Aplica a classe no HTML sempre que o tema mudar
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove a classe antiga e adiciona a nova
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Salva no storage
    localStorage.setItem('@Amentoria:theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}