import { Role } from '../../prisma/generated/prisma/enums'

export type AuthTokenData = {
  id: string
  role: Role
}
