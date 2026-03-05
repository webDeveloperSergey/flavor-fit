import { Query, Resolver } from '@nestjs/graphql'
import { Profile } from 'prisma/generated/prisma/profile/profile.model'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => Profile)
  getProfile() {
    return this.usersService.getUserById('1', {
      profile: true,
      bodyMeasurement: true,
    })
  }
}
