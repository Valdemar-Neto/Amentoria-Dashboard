import { PrismaClient, Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando o Super Seed...');

  // 1. Limpeza Total para evitar duplicatas
  await prisma.simulationScore.deleteMany({});
  await prisma.studySession.deleteMany({});
  await prisma.student.deleteMany({});

  const passwordHash = await hash('123456', 8);
  const subjects = ['Matemática', 'História', 'Física', 'Química', 'Biologia', 'Português'];
  const categories = ['AULA', 'EXERCICIO', 'REVISAO'];

  // 2. Criar 3 Alunos
  const studentsData = [
    { name: 'Aluno Dedicado', email: 'aluno.top@amentoria.com' },
    { name: 'João Silva', email: 'joao@email.com' },
    { name: 'Maria Souza', email: 'maria@email.com' },
  ];

  const createdStudents = [];
  for (const s of studentsData) {
    const student = await prisma.student.create({
      data: { ...s, password: passwordHash },
    });
    createdStudents.push(student);
  }

  const mainStudent = createdStudents[0];

  console.log('👤 Alunos criados.');

  // 3. Criar Volume Massivo de Sessões de Estudo
  const sessions: Prisma.StudySessionCreateManyInput[] = []; 

  for (let i = 0; i < 250; i++) {
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomMinutes = Math.floor(Math.random() * 90) + 45; 
    
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90)); 

    sessions.push({
      studentId: mainStudent.id,
      subject: randomSubject,
      category: randomCategory,
      minutes: randomMinutes,
      date: date,
    });
  }

  await prisma.studySession.createMany({ data: sessions });
  console.log(`📚 ${sessions.length} sessões de estudo criadas.`);

  // 4. Criar Notas de Simulado (Evolução por Matéria)
  const scores: Prisma.SimulationScoreCreateManyInput[] = []; 
  
  subjects.forEach((subject, subjectIndex) => {
    for (let i = 0; i < 15; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (15 - i) * 6); 

      const baseStart = 500 + (subjectIndex * 40); 
      const evolution = i * 25;
      const randomness = Math.floor(Math.random() * 60);
      
      const finalScore = baseStart + evolution + randomness;

      scores.push({
        studentId: mainStudent.id,
        subject: subject,
        score: finalScore > 1000 ? 1000 : finalScore,
        date: date,
      });
    }
  });

  await prisma.simulationScore.createMany({ data: scores });
  console.log(`📝 ${scores.length} notas de simulado distribuídas por matérias.`);

  console.log('✅ Super Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });