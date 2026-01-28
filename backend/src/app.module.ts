import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/prisma/database.module';
import { HttpModule } from './infrastructure/http/http.module';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
