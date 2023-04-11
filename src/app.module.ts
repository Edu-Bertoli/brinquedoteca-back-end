import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { CreateUserDto } from './modules/usuario/dtos/create.user.dto.service';
import { BrinquedoModule } from './modules/brinquedo/brinquedo.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AlunoModule } from './modules/aluno/aluno.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt.auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 25,
      limit: 20,
    }),
    BrinquedoModule,
    UsuarioModule,
    AlunoModule,
    AuthModule
    
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    CreateUserDto,
  ],
})
export class AppModule {}
