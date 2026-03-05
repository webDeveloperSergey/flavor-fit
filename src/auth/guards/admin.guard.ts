import { ForbiddenError } from '@nestjs/apollo'
import { CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Role } from 'prisma/generated/prisma/enums'
import { RequestWithUser } from 'src/users/user.types'
import { FORBIDDEN } from '../auth.constants'

export class GqlAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const gqlCtx = GqlExecutionContext.create(context)
    const user = gqlCtx.getContext<{ req: RequestWithUser }>().req.user

    if (user?.role !== Role.ADMIN) {
      throw new ForbiddenError(FORBIDDEN)
    }

    return true
  }
}
