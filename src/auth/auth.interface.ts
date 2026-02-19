import { Role } from '../../prisma/generated/prisma/enums'

export interface AuthTokenData {
  id: string
  role: Role
}
