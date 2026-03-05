import type { UserInclude } from '../../prisma/generated/prisma/models/User'

type IncludesFields = keyof UserInclude
type IncludeFieldsData = Record<IncludesFields, boolean>

export type UserIncludes = Partial<IncludeFieldsData>
