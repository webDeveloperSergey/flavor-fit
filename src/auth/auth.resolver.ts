import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { RegisterInput } from './auth.input'
import { RegisterOutput } from './auth.output'

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  // Заглушка
  @Query(() => String)
  hello() {
    return 'Hello'
  }

  // TODO: add captcha
  @Mutation(() => RegisterOutput)
  async register(@Args('data') input: RegisterInput) {
    // TODO: add cookie
    return this.authService.register(input)
  }
}
