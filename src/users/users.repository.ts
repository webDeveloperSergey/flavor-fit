import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UserIncludes } from './user.types'

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    })
  }

  async findById(id: string, include?: UserIncludes) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include,
    })
  }
}
