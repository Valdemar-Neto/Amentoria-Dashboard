export interface DashboardStatsOutputs{
    cards:{
        totalStudents: number, // card 1: total de estudantes
        averageScore: number, // card 2: média geral dos simulados
        totalHoursStudied: number, // card 3: engajamento total em horas
        mostPopularSubject: string, // card 4: Matéria querida do momento
    };
    charts:{
        scoresEvolution: {date: string; score: number}[], //grafico de linha
        subjectsRanking: {subject: string; hours: number}[],// gráfico de barra
        subjectScoresEvolution: {subject: string; data: {date: string, score: number}[]}[],
        studyDistribution: { category: string; hours: number }[]; // grafico de pizza
        categoryDistribution: { category: string; hours: number }[];
    }
}