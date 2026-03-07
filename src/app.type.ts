import { Request, Response } from 'express'

export type Cookies = Record<string, string | undefined>

export type RequestWithCookies = Request & {
  cookies: Cookies
}

export type GqlContext = {
  req: RequestWithCookies
  res: Response
}
