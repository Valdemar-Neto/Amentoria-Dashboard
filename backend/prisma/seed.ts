import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando o Seed...');

  // 1. Criar (ou buscar) um Aluno para teste
  const email = 'aluno.top@amentoria.com';
  
  // Deleta se já existir para não dar erro de unique
  await prisma.simulationScore.deleteMany({ where: { student: { email } } });
  await prisma.studySession.deleteMany({ where: { student: { email } } });
  await prisma.student.deleteMany({ where: { email } });

  const passwordHash = await hash('123456', 8);

  const student = await prisma.student.create({
    data: {
      name: 'Aluno Dedicado',
      email,
      password: passwordHash,
    },
  });

  console.log(`👤 Aluno criado: ${student.name} (${student.id})`);

  // 2. Criar Sessões de Estudo (Últimos 30 dias)
  const subjects = ['Matemática', 'História', 'Física', 'Química', 'Biologia'];
  const categories = ['AULA', 'EXERCICIO', 'REVISAO'];

  const sessions = [];
  for (let i = 0; i < 50; i++) {
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomMinutes = Math.floor(Math.random() * 120) + 30; // 30 a 150 min
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // Data aleatória nos últimos 30 dias

    sessions.push({
      studentId: student.id,
      subject: randomSubject,
      category: randomCategory,
      minutes: randomMinutes,
      date: date,
    });
  }

  await prisma.studySession.createMany({ data: sessions });
  console.log(`📚 ${sessions.length} sessões de estudo criadas.`);

  // 3. Criar Notas de Simulado (Evolução)
  const scores = [];
  for (let i = 0; i < 10; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (10 - i) * 3); // Um simulado a cada 3 dias

    // Nota sobe um pouco a cada vez (pra ficar bonito no gráfico)
    const baseScore = 600 + (i * 20) + Math.floor(Math.random() * 50); 

    scores.push({
      studentId: student.id,
      subject: 'Simulado Geral',
      score: baseScore > 1000 ? 1000 : baseScore,
      date: date,
    });
  }

  await prisma.simulationScore.createMany({ data: scores });
  console.log(`📝 ${scores.length} notas de simulado criadas.`);

  console.log('✅ Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });