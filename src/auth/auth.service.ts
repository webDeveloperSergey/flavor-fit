import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { hash, verify } from 'argon2'
import { CookieOptions, Response } from 'express'
import { UsersService } from '../users/users.service'
import { isDevMode } from '../utilities/isDevMode'
import {
  ALREADY_REGISTERED,
  INVALID_REFRESH_TOKEN,
  USER_NOT_FOUNT,
  WRONG_PASSWORD_OR_EMAIL,
} from './auth.constants'
import { RegisterInput } from './auth.input'
import { AuthTokenData } from './auth.types'
import { AuthRepository } from './auth.repository'

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

  // Делаем getter, поскольку инициализации полей класса выполнится до того, как параметры конструктора будут присвоены
  // Getter вычисляется при вызове, а не на старте (configService уже проинициализируется)
  private get cookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      domain: this.configService.get<string>('DOMAIN'),
      sameSite: isDevMode(this.configService) ? 'none' : 'strict',
      secure: true,
    }
  }

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

  async getNewTokens(refreshToken: string) {
    const validToken: AuthTokenData = this.jwt.verify(refreshToken)
    if (!validToken) throw new BadGatewayException(INVALID_REFRESH_TOKEN)

    const user = await this.usersService.getUserById(validToken.id)
    if (!user) throw new NotFoundException(USER_NOT_FOUNT)

    const tokens = this.generatesTokens({
      id: user.id,
      role: user.role,
    })

    return {
      user,
      ...tokens,
    }
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date()
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAYS_REFRESH_TOKEN)

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      ...this.cookieOptions,
      expires: expiresIn,
    })
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      ...this.cookieOptions,
      expires: new Date(0),
    })
  }

  private async validateUser(input: RegisterInput) {
    const { email, password: inputPwd } = input

    const user = await this.usersService.getUserByEmail(email)
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
