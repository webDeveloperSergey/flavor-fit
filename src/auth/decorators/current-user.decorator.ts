import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import type {
  CurrentUser as CurrentUserType,
  RequestWithUser,
} from 'src/users/user.types'

export const CurrentUser = createParamDecorator(
  (data: keyof CurrentUserType, ctx: ExecutionContext) => {
    let user: CurrentUserType | null | undefined = null

    if (ctx.getType() === 'http') {
      user = ctx.switchToHttp().getRequest<RequestWithUser>().user
    } else {
      const gqlCtx = GqlExecutionContext.create(ctx)
      user = gqlCtx.getContext<{ req: RequestWithUser }>().req.user
    }

    if (!user) return null

    return data ? user[data] : user
  },
)
