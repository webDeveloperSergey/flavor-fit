import { Query, Resolver } from '@nestjs/graphql'
import { Profile } from 'prisma/generated/prisma/profile/profile.model'
import { UsersService } from './users.service'
import { CurrentUser } from 'src/auth/decorators/current-user.decorate'

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => Profile, { name: 'profile' })
  getProfile(@CurrentUser('id') userId: string) {
    return this.usersService.getUserById(userId, {
      profile: true,
      bodyMeasurement: true,
    })
  }
}
