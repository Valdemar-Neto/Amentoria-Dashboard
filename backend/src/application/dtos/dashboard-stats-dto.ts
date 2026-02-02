export interface DashboardStatsOutputs{
    cards:{
        totalStudents: number, // total de estudantes
        averageScore: number, // média geral dos simulados
        totalHoursStudied: number, // engajamento total em horas
        mostPopularSubject: string, // Matéria querida do momento
    };
    charts:{
        scoresEvolution: {date: string; score: number}[], //grafico de linha
        subjectsRanking: {subject: string; hours: number}[],// gráfico de barra
        subjectScoresEvolution: {subject: string; data: {date: string, score: number}[]}[],
        studyDistribution: { category: string; hours: number }[]; // grafico de pizza
        categoryDistribution: { category: string; hours: number }[];
    }
}