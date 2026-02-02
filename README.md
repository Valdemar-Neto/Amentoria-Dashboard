# 🚀 Amentoria - Dashboard de Performance Acadêmica

Este repositório contém o código fonte do **Amentoria**, um dashboard interativo desenvolvido para monitoramento de desempenho acadêmico. O projeto foi construído com foco em **React**, **TypeScript** e **Visualização de Dados**, simulando um ambiente real de tutoria estudantil.

<img width="1906" height="904" alt="login" src="https://github.com/user-attachments/assets/6c7d1678-70ee-4bbd-b14b-5ea8681b4798" />

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

## 🛡️ Engenharia de Software e Segurança

### 🔐 Segurança e Controle de Acesso
- **Criptografia de Ponta (Bcrypt):** Implementação de hashing de senhas utilizando algoritmos robustos (*salt rounds*), garantindo que credenciais sensíveis nunca sejam armazenadas ou trafegadas em texto plano, mitigando riscos de vazamento de dados.
- **Auth Guards (Rotas Protegidas):** Sistema de proteção de rotas no *React Router Dom*. Middleware lógico que intercepta navegações para áreas privadas (Dashboard, Notas), validando a existência e expiração do token de sessão antes de renderizar o componente, redirecionando automaticamente requisições não autorizadas.
- **Gestão de Sessão Segura:** Implementação de persistência de estado de autenticação isolada, prevenindo acesso indevido e garantindo o ciclo de vida correto do login/logout.

### 🏗️ Arquitetura e Design Patterns
A construção do software seguiu rigorosamente princípios de arquitetura limpa para garantir desacoplamento e testabilidade:

- **Arquitetura Hexagonal (Ports & Adapters):** A lógica de negócio e as regras de domínio estão isoladas da camada de visualização (React) e da camada de infraestrutura (API), permitindo que o frontend seja agnóstico à fonte dos dados.
- **SOLID & Clean Code:** Aplicação estrita de princípios como *Single Responsibility* (Componentes e Hooks atômicos) e *Dependency Inversion* (injeção de dependências via Context API), facilitando a manutenção e escalabilidade.
- **Domain-Driven Design (DDD):** O código reflete a linguagem ubíqua do domínio acadêmico, com limites claros (*Bounded Contexts*) entre as entidades de Estudante, Sessão de Estudo e Métricas.
- **TDD (Test-Driven Development):** Desenvolvimento guiado por testes para garantir a integridade das funcionalidades críticas antes mesmo da implementação visual.
- **Tratamento de Erros Resiliente:** Camada de serviço HTTP (*Service Layer*) centralizada para interceptação e tratamento padronizado de exceções e respostas da API.


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
