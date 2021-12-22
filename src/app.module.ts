import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CaslModule } from './casl/casl.module';
import { PrimsaModule } from './database/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CaslModule, PrimsaModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
