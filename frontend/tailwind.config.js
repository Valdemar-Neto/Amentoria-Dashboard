/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          600: '#7c3aed',
          700: '#6d28d9',
          900: '#4c1d95',
        },
        // Adicionando as Cores de Status (Feedback Visual)
        success: '#10B981', // Emerald-500 (Notas Boas / Metas Batidas)
        warning: '#F59E0B', // Amber-500 (Atenção / Horas Baixas)
        danger: '#EF4444',  // Red-500 (Crítico / Erros)
        
        background: '#F8FAFC',
        surface: '#FFFFFF',
        text: {
          primary: '#0F172A',
          secondary: '#64748B',
        }
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}