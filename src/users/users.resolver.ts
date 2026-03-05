import { Query, Resolver } from '@nestjs/graphql'
import { Role } from 'prisma/generated/prisma/enums'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { UsersService } from './users.service'
import { Profile } from 'prisma/generated/models/profile'
import { User } from 'prisma/generated/models/user'

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => Profile, { name: 'profile' })
  @Auth()
  getProfile(@CurrentUser('id') userId: string) {
    return this.usersService.getUserById(userId, {
      profile: true,
      bodyMeasurement: true,
    })
  }

  // Test
  @Query(() => [User], { name: 'users' })
  @Auth(Role.ADMIN)
  async getUsers() {
    return this.usersService.getAllUsers()
  }
}
