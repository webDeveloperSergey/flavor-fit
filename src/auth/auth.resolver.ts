import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { RegisterInput } from './auth.input'
import { RegisterOutput } from './auth.output'
import type { Cookies, GqlContext } from '../app.type'
import { BadRequestException } from '@nestjs/common'
import { REFRESH_MISSING } from './auth.constants'

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

  @Query(() => RegisterOutput)
  async newTokens(@Context() { res, req }: GqlContext) {
    const cookies = req.cookies as Cookies
    const currentRefreshToken = cookies[this.authService.REFRESH_TOKEN_NAME]
    if (!currentRefreshToken) {
      this.authService.removeRefreshTokenFromResponse(res)
      throw new BadRequestException(REFRESH_MISSING)
    }

    const { refreshToken, ...response } =
      await this.authService.getNewTokens(currentRefreshToken)

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }
}
