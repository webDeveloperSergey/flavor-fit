import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { AuthRepository } from './auth.repository'
import { ALREADY_REGISTERED, WRONG_PASSWORD_OR_EMAIL } from './auth.constants'
import { hash, verify } from 'argon2'
import { RegisterInput } from './auth.input'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { AuthTokenData } from './auth.interface'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private repository: AuthRepository,
    private jwt: JwtService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

  private EXPIRE_HOURS_TOKEN = 1
  private EXPIRE_DAYS_REFRESH_TOKEN = 3
  REFRESH_TOKEN_NAME = 'refresh_token'

  async register(input: RegisterInput) {
    const { email, password } = input

    const findUser = await this.repository.findByEmail(email)
    if (findUser) throw new BadRequestException(ALREADY_REGISTERED)

    const hashPwd = await hash(password)

    const user = await this.repository.createUser(email, hashPwd)

    const tokens = this.generatesTokens({
      id: user.id,
      role: user.role,
    })

    return { user, ...tokens }
  }

  async login(input: RegisterInput) {
    const user = await this.validateUser(input)

    const tokens = this.generatesTokens({
      id: user.id,
      role: user.role,
    })

    return { user, ...tokens }
  }

  private async validateUser(input: RegisterInput) {
    const { email, password: inputPwd } = input

    const user = await this.usersService.getUser(email)
    if (!user) throw new NotFoundException(WRONG_PASSWORD_OR_EMAIL)

    const isPwdValid = await verify(user.password, inputPwd)
    if (!isPwdValid) throw new NotFoundException(WRONG_PASSWORD_OR_EMAIL)

    return user
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
