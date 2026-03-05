import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { getJwtConfig } from '../config/jwt.config'
import { PrismaModule } from '../prisma/prisma.module'
import { UsersModule } from '../users/users.module'
import { UsersResolver } from '../users/users.resolver'
import { AuthRepository } from './auth.repository'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    AuthRepository,
    UsersResolver,
    JwtStrategy,
  ],
})
export class AuthModule {}
