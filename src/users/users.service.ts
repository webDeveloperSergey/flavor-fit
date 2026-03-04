import { Injectable } from '@nestjs/common'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async getUserByEmail(email: string) {
    return await this.repository.findByEmail(email)
  }

  async getUserById(id: string) {
    return await this.repository.findById(id)
  }
}
