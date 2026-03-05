import { Injectable } from '@nestjs/common'
import { UserIncludes } from './user.types'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async getAllUsers() {
    return await this.repository.findAll()
  }

  async getUserByEmail(email: string) {
    return await this.repository.findByEmail(email)
  }

  async getUserById(id: string, include?: UserIncludes) {
    return await this.repository.findById(id, include)
  }
}
