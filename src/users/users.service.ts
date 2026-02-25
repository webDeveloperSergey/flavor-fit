import { Injectable } from '@nestjs/common'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async getUser(email: string) {
    return await this.repository.findByEmail(email)
  }
}
