import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Adicione este import
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // URL do seu Vite
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Amentoria - Dashboard API')
    .setDescription('Documentação das rotas do ecossistema Amentoria')
    .setVersion('1.0')
    .addBearerAuth() // Isso permite testar rotas protegidas com o Token JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // A documentação estará em /api

  await app.listen(3000);
}
bootstrap();