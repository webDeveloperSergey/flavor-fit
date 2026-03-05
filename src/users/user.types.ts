import { User } from 'prisma/generated/prisma/client'
import type { UserInclude } from '../../prisma/generated/prisma/models/User'

type IncludesFields = keyof UserInclude
type IncludeFieldsData = Record<IncludesFields, boolean>

export type UserIncludes = Partial<IncludeFieldsData>

export type CurrentUser = Omit<User, 'password' | 'createdAt' | 'updatedAt'>
export type RequestWithUser = {
  user?: CurrentUser
}
