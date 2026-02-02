# 🚀 Amentoria - Dashboard de Performance Acadêmica

Este repositório contém o código fonte do **Amentoria**, um dashboard interativo desenvolvido para monitoramento de desempenho acadêmico. O projeto foi construído com foco em **React**, **TypeScript** e **Visualização de Dados**, simulando um ambiente real de tutoria estudantil.

---
## 📄 Descrição do Projeto

O **Amentoria** é uma plataforma robusta de monitoramento de desempenho acadêmico desenvolvida para oferecer uma experiência fluida, responsiva e inteligente para estudantes e tutores. O foco principal deste projeto foi a criação de uma interface de alta fidelidade que se adapta perfeitamente a qualquer dispositivo, desde monitores ultrawide até smartphones.

--- 
## 📊 Tipo de Dado Escolhido

Para este dashboard, foi escolhido um conjunto de dados que simula a **Rotina Acadêmica de um Estudante de Engenharia/Tecnologia**.

Os dados visualizados incluem:
1.  **Sessões de Estudo:** Registros temporais (data, duração em minutos, matéria).
2.  **Desempenho (Notas):** Evolução histórica de pontuação (0 a 1000) por disciplina (ex: Matemática, Física, Biologia).
3.  **Distribuição de Foco:** Categorização percentual do tempo investido por área de conhecimento.

> *Nota: Os dados são mockados e obtidos a partir de um seed para popular o banco de dados para consumo da api e reposta para os gráficos presentes na aplicação*

---

## ✨ Destaques de Engenharia e UX

### 🏗️ Arquitetura e Padrões de Projeto (Advanced)
A construção deste software seguiu rigorosamente os princípios de engenharia moderna para garantir robustez e desacoplamento:

- **Arquitetura Hexagonal (Ports & Adapters):** A lógica de negócio e as regras de domínio estão isoladas da camada de visualização (React) e da camada de infraestrutura (API), permitindo que o frontend seja agnóstico à fonte dos dados.
- **DDD (Domain-Driven Design):** O código foi estruturado em torno do domínio acadêmico, com limites claros (Bounded Contexts) entre as entidades de *Sessão*, *Nota* e *Estudante*, refletindo a linguagem ubíqua do negócio.
- **SOLID:** Aplicação estrita dos princípios, com destaque para:
  - *Single Responsibility Principle (SRP):* Componentes e Hooks com responsabilidades únicas.
  - *Dependency Inversion Principle (DIP):* Injeção de dependências através de Contexts e Services abstratos.
- **TDD (Test-Driven Development):** Desenvolvimento guiado por testes para garantir a integridade das funcionalidades críticas antes mesmo da implementação visual.

### 📱 Responsividade de Próxima Geração
- **Sidebar Híbrida Inteligente:** Menu lateral no Desktop que se transforma em *Drawer Overlay* no Mobile.
- **Gráficos Fluidos:** Implementação de *Reflow* automático em gráficos Highcharts para adaptação a qualquer viewport.
- **UI Adaptável:** Filtros e tabelas que transitam de layout em linha para colunas ou grids dependendo do dispositivo.
### 🤖 Automação e DevOps (CI/CD)
Para otimizar o fluxo de trabalho, foi implementada uma cultura de automação via **GitHub Actions**:
- **Deploy Contínuo:** Integração direta com a Vercel, onde cada atualização na branch principal dispara o build de produção instantaneamente.

### 📊 Funcionalidades Chave
- **Indicadores de Performance (KPIs):** Visualização rápida de médias, horas estudadas e metas.
- **Análise de Tendências:** Gráficos de evolução por disciplinas e distribuição percentual de temas.
- **Alertas do Tutor:** Sistema visual de alerta para matérias com desempenho abaixo do esperado.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 18, TypeScript, Tailwind CSS.
- **Iconografia:** Lucide React.
- **Gráficos:** Highcharts & Highcharts React.
- **Navegação:** React Router Dom.
- **Automação:** GitHub Actions (CI/CD).
- **Gerenciador de Pacotes:** PNPM.

---

## 🚀 Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/amentoria.git](https://github.com/seu-usuario/amentoria.git)
   ```
2. **Instalar Depências** 
    ```bash
    pnpm install #na raiz do projeto
    ```
3. **Variáveis de ambiente**
    ```bash
    VITE_API_URL=http://localhost:3000 # no frontend
    ```
4. **Executar em modo desenvolvimento**
    ```bash
    pnpm dev ## na raiz do frontend
    ```

## 🔑 Credenciais de Teste
    Email: aluno@amentoria.com
    Senha: 123456

## 👨‍💻 Autor
Desenvolvido por Valdemar Neto
- Graduando em Engenharia Mecatrônica (UFRN);
- Técnico em Informática para Internet (IEMA).