import { BadRequestException, Injectable } from '@nestjs/common'
import { AuthRepository } from './auth.repository'
import { ALREADY_REGISTERED } from './auth.constants'
import { hash } from 'argon2'
import { RegisterInput } from './auth.input'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { AuthTokenData } from './auth.interface'

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  private EXPIRE_HOURS_TOKEN = 1
  private EXPIRE_DAYS_REFRESH_TOKEN = 3
  REFRESH_TOKEN_NAME = 'refresh_token'

  async register(input: RegisterInput) {
    const { email, password } = input

    const findUser = await this.authRepository.findByEmail(email)

    if (findUser) {
      throw new BadRequestException(ALREADY_REGISTERED)
    }

    const hashPwd = await hash(password)

    const user = await this.authRepository.createUser(email, hashPwd)

    const tokens = this.generatesTokens({
      id: user.id,
      role: user.role,
    })

    return { user, ...tokens }
  }

  private generatesTokens(data: AuthTokenData) {
    const accessToken = this.jwt.sign(data, {
      expiresIn: `${this.EXPIRE_HOURS_TOKEN}h`,
    })

    const refreshToken = this.jwt.sign(
      { id: data.id },
      {
        expiresIn: `${this.EXPIRE_DAYS_REFRESH_TOKEN}d`,
      },
    )

    return { accessToken, refreshToken }
  }
}
