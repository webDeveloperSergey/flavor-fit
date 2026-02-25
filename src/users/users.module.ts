import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { PrismaModule } from '../prisma/prisma.module'
import { UsersRepository } from './users.repository'

@Module({
  imports: [PrismaModule],
  providers: [UsersResolver, UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
