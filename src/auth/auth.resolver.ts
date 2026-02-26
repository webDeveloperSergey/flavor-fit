import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { RegisterInput } from './auth.input'
import { RegisterOutput } from './auth.output'
import type { GqlContext } from '../app.interface'

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
  async login(
    @Args('data') input: RegisterInput,
    @Context() { res }: GqlContext,
  ) {
    const { refreshToken, ...response } = await this.authService.login(input)
    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  // TODO: add captcha
  @Mutation(() => RegisterOutput)
  async register(
    @Args('data') input: RegisterInput,
    @Context() { res }: GqlContext,
  ) {
    const { refreshToken, ...response } = await this.authService.register(input)
    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }
}
